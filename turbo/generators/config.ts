import type { PlopTypes } from "@turbo/gen";
// @ts-expect-error
import fuzzypath from "inquirer-fuzzy-path";
import { camelCase, kebabCase, lowerCase, upperFirst } from "lodash";

export default function generator(plop: PlopTypes.NodePlopAPI) {
    plop.setDefaultInclude({
        generators: true,
    });

    plop.setPrompt(
        "fuzzypath",
        fuzzypath as unknown as Parameters<typeof plop.setPrompt>[1],
    );

    plop.setHelper("includes", function (this: any, haystack, needle, options) {
        return haystack.includes(needle)
            ? options.fn(this)
            : options.inverse(this);
    });

    plop.setGenerator("query", {
        description: "Create a new query in the app",
        prompts: [
            {
                type: "input",
                name: "file",
                message: "What is your file name?",
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return "A file name is required";
                    }

                    if (kebabCase(value) !== value) {
                        return `File name must be kebab-case: ${kebabCase(value)}`;
                    }

                    return true;
                },
            },
            {
                type: "input",
                name: "name",
                message: "What is your query name?",
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return "A query name is required";
                    }

                    if (camelCase(value) !== value) {
                        return `Query name must be camelCase: ${camelCase(value)}`;
                    }

                    return true;
                },
            },
        ],
        actions: [
            {
                type: "addMany",
                skipIfExists: true,
                templateFiles: "query/**/*.hbs",
                base: "query",
                destination: ".",
            },
            {
                type: "append",
                path: "apps/portal/src/app/_queries/{{ file }}.mock.ts",
                unique: true,
                pattern: /$(?![\r\n])/,
                template: `
export const {{name}}: Mock = fn()
    .mockName('{{name}}')
    .mockResolvedValue(undefined);
                `,
            },
            {
                type: "append",
                path: "apps/portal/src/app/_queries/{{ file }}.ts",
                unique: true,
                pattern: /$(?![\r\n])/,
                template: `
export const {{ name }} = cache(() => {});
                `,
            },
        ],
    });

    plop.setGenerator("component", {
        description: "Create a new component in the app",
        prompts: [
            {
                type: "fuzzypath",
                name: "dir",
                message: "Where should the component be created?",
                rootPath: "apps/portal/src/app",
                itemType: "directory",
                excludeFilter: (nodePath: string) =>
                    nodePath.includes("_components") ||
                    nodePath.includes("src/app/api"),
                suggestOnly: true,
                validate(value?: string) {
                    if (!value?.trim().length) {
                        return "A directory is required";
                    }

                    if (!value.startsWith("apps/portal/src/app")) {
                        return "The directory must be inside the src/app folder";
                    }

                    return true;
                },
                filter(value: string) {
                    return {
                        absolute: value.replace("apps/portal/src/", "#"),
                        original: value,
                        [Symbol.toPrimitive]() {
                            return this.original;
                        },
                    };
                },
            } as PlopTypes.PromptQuestion,
            {
                type: "input",
                name: "name",
                message: "What is your component name?",
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return "A component name is required";
                    }

                    if (kebabCase(value) !== value) {
                        return `Component name must be kebab-case: ${kebabCase(value)}`;
                    }

                    return true;
                },
            },
        ],
        actions: [
            {
                type: "addMany",
                destination: "{{ dir.original }}",
                templateFiles: "component/**/*.hbs",
                skipIfExists: true,
            },
        ],
    });

    plop.setGenerator("route", {
        description: "Create a new route in the app",
        prompts: [
            {
                type: "fuzzypath",
                name: "dir",
                message: "Where should the component be created?",
                rootPath: "apps/portal/src/app",
                itemType: "directory",
                excludeFilter: (nodePath: string) =>
                    nodePath.includes("_components"),
                suggestOnly: true,
                validate(value?: string) {
                    if (!value?.trim().length) {
                        return "A directory is required";
                    }

                    if (!value.startsWith("apps/portal/src/app")) {
                        return "The directory must be inside the src/app folder";
                    }

                    return true;
                },
                filter(value: string) {
                    return {
                        absolute: value.replace("apps/portal/src/", "#"),
                        original: value,
                        [Symbol.toPrimitive]() {
                            return this.original;
                        },
                    };
                },
            } as PlopTypes.PromptQuestion,
            {
                type: "checkbox",
                name: "types",
                message: "What type of route should be added?",
                choices: [
                    {
                        name: "Page",
                        value: "page",
                        checked: true,
                    },
                    {
                        name: "Layout",
                        value: "layout",
                        checked: true,
                    },
                    {
                        name: "Loading",
                        value: "loading",
                        checked: true,
                    },
                    {
                        name: "Error",
                        value: "error",
                        checked: true,
                    },
                    {
                        name: "Not Found",
                        value: "not-found",
                        checked: true,
                    },
                    {
                        name: "Template",
                        value: "template",
                        checked: false,
                    },
                    {
                        name: "Default",
                        value: "default",
                        checked: false,
                    },
                ],
                validate(input?: string[]) {
                    if (!input?.length) {
                        return "At least one type must be selected";
                    }
                    if (
                        input.includes("template") &&
                        input.includes("layout")
                    ) {
                        return "A route cannot be both a template and a layout";
                    }
                    return true;
                },
            },
            {
                name: "lingui",
                type: "confirm",
                message:
                    "Wrap with Lingui HOC? (only applies to page and layout)",
                default: false,
            },
        ],
        actions(data) {
            const _actions: Array<PlopTypes.ActionType> = [];

            if (data?.types.includes("page")) {
                _actions.push({
                    type: "addMany",
                    destination: "{{ dir.original }}",
                    templateFiles: "page/**/*.hbs",
                    skipIfExists: true,
                });
            }

            if (data?.types.includes("layout")) {
                _actions.push({
                    type: "addMany",
                    destination: "{{ dir.original }}",
                    templateFiles: "layout/**/*.hbs",
                    skipIfExists: true,
                });
            }

            if (data?.types.includes("loading")) {
                _actions.push({
                    type: "addMany",
                    destination: "{{ dir.original }}",
                    templateFiles: "loading/**/*.hbs",
                    skipIfExists: true,
                });
            }

            if (data?.types.includes("error")) {
                _actions.push({
                    type: "addMany",
                    destination: "{{ dir.original }}",
                    templateFiles: "error/**/*.hbs",
                    skipIfExists: true,
                });
            }

            if (data?.types.includes("not-found")) {
                _actions.push({
                    type: "addMany",
                    destination: "{{ dir.original }}",
                    templateFiles: "not-found/**/*.hbs",
                    skipIfExists: true,
                });
            }

            if (data?.types.includes("template")) {
                _actions.push({
                    type: "addMany",
                    destination: "{{ dir.original }}",
                    templateFiles: "template/**/*.hbs",
                    skipIfExists: true,
                });
            }

            if (data?.types.includes("default")) {
                _actions.push({
                    type: "addMany",
                    destination: "{{ dir.original }}",
                    templateFiles: "default/**/*.hbs",
                    skipIfExists: true,
                });
            }

            return _actions;
        },
    });

    plop.setGenerator("action", {
        description: "Create a new action in the app",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is your action name?",
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return "A action name is required";
                    }

                    if (camelCase(value) !== value) {
                        return "The action name must be in camelCase";
                    }

                    return true;
                },
            },
            {
                type: "confirm",
                name: "schema",
                message: "Does this action require a schema?",
                default: true,
            },
        ],
        actions(data) {
            const _actions: Array<PlopTypes.ActionType> = [
                {
                    type: "addMany",
                    skipIfExists: true,
                    templateFiles: "action/**/*.hbs",
                    base: "action",
                    destination: ".",
                },
            ];

            if (data?.schema) {
                _actions.push(
                    {
                        type: "addMany",
                        skipIfExists: true,
                        templateFiles: "action-schema/**/*.hbs",
                        base: "action-schema",
                        destination: ".",
                    },
                    {
                        type: "append",
                        path: "./packages/schemas/package.json",
                        unique: true,
                        pattern: '"exports": {',
                        template: `"./{{ pascalCase name }}Schema": {
                            "types": "./src/{{ pascalCase name }}Schema.ts",
                            "default": "./dist/{{ pascalCase name }}Schema.js"
                        },`,
                    },
                );
            }

            return _actions;
        },
    });

    plop.setGenerator("trpc", {
        description: "Create a new trpc endpoint in the app",
        prompts: [
            {
                type: "list",
                name: "type",
                message: "What is your trpc endpoint type?",
                choices: ["admin", "client"],
            },
            {
                type: "input",
                name: "group",
                message: "What is your trpc endpoint group?",
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return "A trpc endpoint group is required";
                    }

                    if (camelCase(value) !== value) {
                        return "The trpc endpoint group must be in camelCase";
                    }

                    return true;
                },
            },
            {
                type: "input",
                name: "name",
                message: "What is your trpc endpoint name?",
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return "A trpc endpoint name is required";
                    }

                    if (camelCase(value) !== value) {
                        return "The trpc endpoint name must be in camelCase";
                    }

                    return true;
                },
            },
        ],
        actions(data) {
            const _actions = [
                {
                    type: "addMany",
                    skipIfExists: true,
                    templateFiles: "trpc/**/*.hbs",
                    base: "trpc",
                    destination: ".",
                },

                {
                    type: "addMany",
                    skipIfExists: true,
                    templateFiles: "action-schema/**/*.hbs",
                    base: "action-schema",
                    destination: ".",
                },
                {
                    type: "append",
                    path: "./packages/schemas/package.json",
                    unique: true,
                    pattern: '"exports": {',
                    template: `"./{{ pascalCase name }}Schema": "./src/{{ pascalCase name }}Schema.ts",
                `,
                },
                {
                    type: "append",
                    path: "packages/trpc/src/{{ type }}/{{ group }}.ts",
                    unique: true,
                    pattern: /$(?![\r\n])/,
                    template: `
export const {{ name }} = privateProcedure
    .input({{ pascalCase name }}Schema)
    .mutation(async ({ input }) => {});
                `,
                },
                {
                    type: "append",
                    path: "packages/trpc/src/{{ type }}/{{ group }}.ts",
                    unique: true,
                    pattern: /import [.\s\S]+ from .+;/g,
                    template: `
import { {{ pascalCase name }}Schema } from "app-schemas/{{ pascalCase name }}Schema";`,
                },
            ];

            if (data.type === "admin") {
                _actions.push(
                    {
                        type: "append",
                        path: "apps/cli/src/{{ group }}.ts",
                        unique: true,
                        pattern: "// start:import",
                        template: `
import { {{ pascalCase name }}Schema } from "app-schemas/{{ pascalCase name }}Schema";`,
                    },
                    {
                        type: "append",
                        path: "apps/cli/src/{{ group }}.ts",
                        unique: true,
                        pattern: "// start:command",
                        template: `.addCommand(
        new PrivateTRPCCommand("{{ name }}")
            .argument("<input>", "Request body")
            .action(async function (this: PrivateTRPCCommand, input) {
                const params = {{ pascalCase name }}Schema.parse(JSON.parse(input));
                const response =
                    await this.trpc.{{ group }}.{{ name }}.mutate(params);
                console.dir(response, { depth: null });
            }),
    )`,
                    },
                );
            }

            return _actions;
        },
    });

    plop.setGenerator("model", {
        description: "Create a new model in the app",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is your model name?",
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return "A model name is required";
                    }

                    if (upperFirst(camelCase(value)) !== value) {
                        return "The model name must be in PascalCase";
                    }

                    return true;
                },
            },
            {
                type: "input",
                name: "prefix",
                message: "What is your model prefix?",
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return "A model prefix is required";
                    }

                    if (lowerCase(camelCase(value)) !== value) {
                        return "The model prefix must be in lowercase and has no spaces";
                    }

                    return true;
                },
            },
        ],
        actions: [
            {
                type: "addMany",
                skipIfExists: true,
                templateFiles: "model/**/*.hbs",
                base: "model",
                destination: ".",
            },
            {
                type: "append",
                path: "./packages/models/src/models.ts",
                unique: true,
                pattern: /$(?![\r\n])/,
                template: `export const {{ name }}Model = getModelForClass(Struct{{ name }}.{{ name }});

export type { Struct{{ name }} };
`,
            },
            {
                type: "append",
                path: "./packages/models/src/models.ts",
                unique: true,
                pattern: /import [.\s\S]+ from "#(\w+)\.ts";/g,
                template: `import * as Struct{{ name }} from "#{{ name }}.ts";`,
            },
            {
                type: "append",
                path: "./packages/models-mocks/package.json",
                unique: true,
                pattern: '"exports": {',
                template: `"./{{ name }}": "./src/{{ name }}.ts",
                `,
            },
            {
                type: "append",
                path: "./packages/schemas/package.json",
                unique: true,
                pattern: '"exports": {',
                template: `"./{{ name }}IdSchema": "./src/{{ name }}IdSchema.ts",
                `,
            },
        ],
    });
}
