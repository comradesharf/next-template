import { defaultClasses, modelOptions } from "@typegoose/typegoose";
import { TypegooseSchemaOptions } from "#utils/SchemaOptions.ts";
import "@casl/ability";

@modelOptions({
    schemaOptions: TypegooseSchemaOptions,
})
class Base extends defaultClasses.TimeStamps {
    declare __v: number;
}

export { Base };
