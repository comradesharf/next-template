import type { PlopTypes } from '@turbo/gen';
import fuzzypath from 'inquirer-fuzzy-path';
import { camelCase, kebabCase } from 'lodash';

export default function generator(plop: PlopTypes.NodePlopAPI) {
    plop.setDefaultInclude({
        generators: true,
    });

    plop.setPrompt(
        'fuzzypath',
        fuzzypath as unknown as Parameters<typeof plop.setPrompt>[1],
    );

    plop.setHelper('includes', function (this: any, haystack, needle, options) {
        return haystack.includes(needle)
            ? options.fn(this)
            : options.inverse(this);
    });

    plop.setGenerator('component', {
        description: 'Create a new component in the app',
        prompts: [
            {
                type: 'fuzzypath',
                name: 'dir',
                message: 'Where should the component be created?',
                rootPath: 'apps/portal/src/app',
                itemType: 'directory',
                excludeFilter: (nodePath: string) =>
                    nodePath.includes('_components') ||
                    nodePath.includes('src/app/api'),
                suggestOnly: true,
                validate(value?: string) {
                    if (!value?.trim().length) {
                        return 'A directory is required';
                    }

                    if (!value.startsWith('apps/portal/src/app')) {
                        return 'The directory must be inside the src/app folder';
                    }

                    return true;
                },
                filter(value: string) {
                    return {
                        absolute: value.replace('apps/portal/src/', '#'),
                        original: value.replace('apps/portal/', ''),
                        [Symbol.toPrimitive]() {
                            return this.original;
                        },
                    };
                },
            } as PlopTypes.PromptQuestion,
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?',
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return 'A component name is required';
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
                type: 'addMany',
                destination: '{{ dir.original }}',
                templateFiles: 'component/**/*.hbs',
                skipIfExists: true,
            },
        ],
    });

    plop.setGenerator('route', {
        description: 'Create a new route in the app',
        prompts: [
            {
                type: 'fuzzypath',
                name: 'dir',
                message: 'Where should the component be created?',
                rootPath: 'apps/portal/src/app/[lang]',
                itemType: 'directory',
                excludeFilter: (nodePath: string) =>
                    nodePath.includes('_components'),
                suggestOnly: true,
                validate(value?: string) {
                    if (!value?.trim().length) {
                        return 'A directory is required';
                    }

                    if (!value.startsWith('apps/portal/src/app/[lang]')) {
                        return 'The directory must be inside the src/app folder';
                    }

                    return true;
                },
                filter(value: string) {
                    return {
                        absolute: value.replace('apps/portal/src/', '#'),
                        original: value.replace('apps/portal/', ''),
                        [Symbol.toPrimitive]() {
                            return this.original;
                        },
                    };
                },
            } as PlopTypes.PromptQuestion,
            {
                type: 'checkbox',
                name: 'types',
                message: 'What type of route should be added?',
                choices: [
                    {
                        name: 'Page',
                        value: 'page',
                        checked: true,
                    },
                    {
                        name: 'Layout',
                        value: 'layout',
                        checked: true,
                    },
                    {
                        name: 'Loading',
                        value: 'loading',
                        checked: true,
                    },
                    {
                        name: 'Error',
                        value: 'error',
                        checked: false,
                    },
                    {
                        name: 'Not Found',
                        value: 'not-found',
                        checked: false,
                    },
                    {
                        name: 'Template',
                        value: 'template',
                        checked: false,
                    },
                    {
                        name: 'Default',
                        value: 'default',
                        checked: false,
                    },
                ],
                validate(input?: string[]) {
                    if (!input?.length) {
                        return 'At least one type must be selected';
                    }
                    if (
                        input.includes('template') &&
                        input.includes('layout')
                    ) {
                        return 'A route cannot be both a template and a layout';
                    }
                    return true;
                },
            },
            {
                name: 'lingui',
                type: 'confirm',
                message:
                    'Wrap with Lingui HOC? (only applies to page and layout)',
                default: false,
            },
        ],
        actions(data) {
            const _actions: Array<PlopTypes.ActionType> = [];

            if (data?.types.includes('page')) {
                _actions.push({
                    type: 'addMany',
                    destination: '{{ dir.original }}',
                    templateFiles: 'page/**/*.hbs',
                    skipIfExists: true,
                });
            }

            if (data?.types.includes('layout')) {
                _actions.push({
                    type: 'addMany',
                    destination: '{{ dir.original }}',
                    templateFiles: 'layout/**/*.hbs',
                    skipIfExists: true,
                });
            }

            if (data?.types.includes('loading')) {
                _actions.push({
                    type: 'addMany',
                    destination: '{{ dir.original }}',
                    templateFiles: 'loading/**/*.hbs',
                    skipIfExists: true,
                });
            }

            if (data?.types.includes('error')) {
                _actions.push({
                    type: 'addMany',
                    destination: '{{ dir.original }}',
                    templateFiles: 'error/**/*.hbs',
                    skipIfExists: true,
                });
            }

            if (data?.types.includes('not-found')) {
                _actions.push({
                    type: 'addMany',
                    destination: '{{ dir.original }}',
                    templateFiles: 'not-found/**/*.hbs',
                    skipIfExists: true,
                });
            }

            if (data?.types.includes('template')) {
                _actions.push({
                    type: 'addMany',
                    destination: '{{ dir.original }}',
                    templateFiles: 'template/**/*.hbs',
                    skipIfExists: true,
                });
            }

            if (data?.types.includes('default')) {
                _actions.push({
                    type: 'addMany',
                    destination: '{{ dir.original }}',
                    templateFiles: 'default/**/*.hbs',
                    skipIfExists: true,
                });
            }

            return _actions;
        },
    });

    plop.setGenerator('action', {
        description: 'Create a new action in the app',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your action name?',
                validate: (value?: string) => {
                    if (!value?.trim().length) {
                        return 'A action name is required';
                    }

                    if (camelCase(value) !== value) {
                        return 'The action name must be in camelCase';
                    }

                    return true;
                },
            },
            {
                type: 'confirm',
                name: 'schema',
                message: 'Does this action require a schema?',
                default: true,
            },
        ],
        actions(data) {
            const _actions: Array<PlopTypes.ActionType> = [
                {
                    type: 'addMany',
                    skipIfExists: true,
                    templateFiles: 'action/**/*.hbs',
                    base: 'action',
                    destination: '../..',
                },
            ];

            if (data?.schema) {
                _actions.push({
                    type: 'addMany',
                    skipIfExists: true,
                    templateFiles: 'action-schema/**/*.hbs',
                    base: 'action-schema',
                    destination: '../..',
                });
            }

            return _actions;
        },
    });
}
