import { defaultClasses, modelOptions } from "@typegoose/typegoose";
import { TypegooseSchemaOptions } from "#SchemaOptions.ts";
import "@casl/ability";

@modelOptions({
    schemaOptions: TypegooseSchemaOptions,
})
class Base extends defaultClasses.TimeStamps {
    declare __v: number;
}

export { Base };
