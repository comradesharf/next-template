import { on } from "node:events";
import {
    type DocumentType,
    type ReturnModelType,
    modelOptions,
    prop,
} from "@typegoose/typegoose";
import { DelayedMessageStatus } from "app-core/DelayedMessages";
import { Log } from "app-core/Log";
import type { DelayedMessageId } from "app-schemas/DelayedMessageIdSchema";
import { type Duration, add } from "date-fns";
import { Base } from "#Base.ts";
import { generateIdWithPrefix } from "#model-utils.ts";

declare module "@casl/ability" {
    interface RecordTypes {
        DelayedMessage: DelayedMessage;
    }
}

const _log = Log.child({
    Model: "DelayedMessage",
});

@modelOptions({
    options: {
        customName: "DelayedMessage",
    },
    schemaOptions: {
        collectionOptions: {
            changeStreamPreAndPostImages: {
                enabled: true,
            },
        },
        discriminatorKey: "type",
    },
})
class DelayedMessage extends Base {
    @prop({
        required: true,
        type: String,
        default: generateIdWithPrefix("delmsg"),
    })
    _id!: DelayedMessageId;

    @prop({
        required: true,
        type: Date,
        expires: 0,
        index: true,
    })
    executedAt!: Date;

    @prop({
        type: String,
        enum: DelayedMessageStatus,
        default: DelayedMessageStatus.FRESH,
    })
    status!: DelayedMessageStatus;

    @prop({
        required: true,
        type: Number,
        default: 0,
    })
    retryCount!: number;

    type!: string;

    reschedule(this: DocumentType<DelayedMessage>, duration?: Duration) {
        this.retryCount = this.retryCount + 1;
        this.status = DelayedMessageStatus.FRESH;
        this.executedAt = add(
            new Date(),
            duration ?? { minutes: this.retryCount * 2 },
        );
        return this.save();
    }

    /**
     * Iterates over all the delayed messages in the collection.
     */
    static async *iterate(
        this: ReturnModelType<typeof DelayedMessage>,
        {
            signal,
        }: {
            signal: AbortSignal;
        },
    ) {
        const emitter = this.watch(
            [
                {
                    $match: {
                        operationType: "delete",
                        "fullDocumentBeforeChange.status":
                            DelayedMessageStatus.FRESH,
                    },
                },
            ],
            {
                fullDocumentBeforeChange: "required",
            },
        );

        const controller = new AbortController();
        emitter.once("error", (error) => controller.abort(error));

        for await (const [change] of on(emitter, "change", {
            signal: AbortSignal.any([controller.signal, signal]),
        })) {
            yield change.fullDocumentBeforeChange as DelayedMessage;
        }
    }
}

export { DelayedMessage };
