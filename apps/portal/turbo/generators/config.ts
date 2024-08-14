import type { PlopTypes } from '@turbo/gen';
import fuzzypath from 'inquirer-fuzzy-path';
import { kebabCase } from 'lodash';

export default function generator(plop: PlopTypes.NodePlopAPI) {
    plop.setDefaultInclude({
        generators: true,
    });

    plop.setPrompt(
        'fuzzypath',
        fuzzypath as unknown as Parameters<typeof plop.setPrompt>[1],
    );

    plop.setHelper('includes', function (haystack, needle, options) {
        return haystack.includes(needle)
            ? // @ts-ignore
              options.fn(this)
            : // @ts-ignore
              options.inverse(this);
    });

    // noinspection JSUnusedGlobalSymbols
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
                    console.error(value);
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
                type: 'add',
                // language=Handlebars
                path: '{{ dir.original }}/_components/{{ name }}.tsx',
                // language=Handlebars
                template: `export interface {{pascalCase name}}Props {
}

export function {{pascalCase name}}({}: {{pascalCase name}}Props) {
    return null;
}
`,
                skipIfExists: true,
            },
            {
                type: 'add',
                // language=Handlebars
                path: '{{ dir.original }}/_components/{{ name }}.stories.tsx',
                // language=Handlebars
                template: `import { {{pascalCase name}} } from "{{ dir.absolute }}/_components/{{ name }}.tsx";
import type { Meta, StoryObj } from "@storybook/react";
                
const meta: Meta<typeof {{pascalCase name}}> = {
    component: {{pascalCase name}},
    tags: ["autodocs"],
    args: {},
    parameters: {
        layout: "padded",
        docs: {
            story: {
                inline: true,
            },
        },
    }
};

export default meta;

type Story = StoryObj<typeof {{pascalCase name}}>;

export const Primary: Story = {
};
`,
                skipIfExists: true,
            },
        ],
    });

    // noinspection JSUnusedGlobalSymbols
    plop.setGenerator('route', {
        description: 'Create a new route in the app',
        prompts: [
            {
                type: 'fuzzypath',
                name: 'dir',
                message: 'Where should the component be created?',
                rootPath: 'apps/portal/src/app',
                itemType: 'directory',
                excludeFilter: (nodePath: string) =>
                    nodePath.includes('_components'),
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
                        name: 'Default',
                        value: 'default',
                        checked: false,
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
                ],
                validate(input?: string[]) {
                    if (!input?.length) {
                        return 'At least one type must be selected';
                    }
                    return true;
                },
            },
        ],
        actions(data) {
            const _actions: Array<PlopTypes.ActionType> = [];

            if (data?.types.includes('page')) {
                _actions.push(
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/page.tsx',
                        // language=Handlebars
                        template: `import { withLinguiPage } from '#libs/locales/withLingui.tsx';

export default withLinguiPage(function Page() {
    return null;
});
                        `,
                        skipIfExists: true,
                    },
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/page.stories.tsx',
                        // language=Handlebars
                        template: `import Page from "{{ dir.absolute }}/page.tsx";
{{#includes types "layout"}}
    import Layout from "{{ dir.absolute }}/layout.tsx";
{{/includes}}
import type { Meta, StoryObj } from "@storybook/react";
import { withI18n, withAppendClassNamesToBody } from '#libs/decorators.tsx';
import { inter } from '#libs/Fonts.ts';

const meta = {
    component: Page,
    parameters: {},
    decorators: [
        withI18n,
        withAppendClassNamesToBody(
            'antialiased',
            '[font-synthesis-weight:none]',
            inter.variable,
        ),
        {{#includes types "layout"~}}
        (Story) => (
            <Layout>
                <Story/>
            </Layout>
        ),
        {{/includes}}
    ],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
`,
                        skipIfExists: true,
                    },
                );
            }

            if (data?.types.includes('loading')) {
                _actions.push(
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/loading.tsx',
                        template: `export { default } from '#app/_components/Loading.tsx';`,
                        skipIfExists: true,
                    },
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/loading.stories.tsx',
                        // language=Handlebars
                        template: `import Loading from "{{ dir.absolute }}/loading.tsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    component: Loading,
    parameters: {},
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof Loading>;

export const Primary: Story = {};
`,
                        skipIfExists: true,
                    },
                );
            }

            if (data?.types.includes('layout')) {
                _actions.push(
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/layout.tsx',
                        // language=Handlebars
                        template: `import { PropsWithChildren } from 'react';

export type LayoutProps = PropsWithChildren;

export default function Layout({children}: LayoutProps) {
    return <>{children}</>;
}
`,
                        skipIfExists: true,
                    },
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/layout.stories.tsx',
                        // language=Handlebars
                        template: `import Layout from "{{ dir.absolute }}/layout.tsx";
import type { Meta, StoryObj } from "@storybook/react";
import { withI18n, withAppendClassNamesToBody } from '#libs/decorators.tsx';

const meta = {
    component: Layout,
    args: {},
    parameters: {},
    decorators: [
        withI18n,
        withAppendClassNamesToBody(
            'antialiased',
            '[font-synthesis-weight:none]',
            inter.variable,
        ),
    ],
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof Layout>;

export const Primary: Story = {};
`,
                        skipIfExists: true,
                    },
                );
            }

            if (data?.types.includes('error')) {
                _actions.push(
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/error.tsx',
                        // language=Handlebars
                        template: `'use client';

export { default } from '#app/_components/Error.tsx';
`,
                        skipIfExists: true,
                    },
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/error.stories.tsx',
                        // language=Handlebars
                        template: `import ErrorPage from "{{ dir.absolute }}/error.tsx";
{{#includes types "layout"}}
    import Layout from "{{ dir.absolute }}/layout.tsx";
{{/includes}}
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    component: ErrorPage,
    parameters: {},
    {{#includes types "layout"~}}
        decorators: [
            (Story) => (
                <Layout>
                    <Story/>
                </Layout>
            ),
        ],
    {{/includes}}
} satisfies Meta<typeof ErrorPage>;

export default meta;

type Story = StoryObj<typeof ErrorPage>;

export const Primary: Story = {};
`,
                        skipIfExists: true,
                    },
                );
            }

            if (data?.types.includes('not-found')) {
                _actions.push(
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/not-found.tsx',
                        // language=Handlebars
                        template: `export { default } from '#app/_components/NotFound.tsx';`,
                        skipIfExists: true,
                    },
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/not-found.stories.tsx',
                        // language=Handlebars
                        template: `import NotFound from "{{ dir.absolute }}/not-found.tsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    component: NotFound,
    parameters: {},
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof NotFound>;

export const Primary: Story = {};
`,
                        skipIfExists: true,
                    },
                );
            }

            if (data?.types.includes('template')) {
                _actions.push(
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/template.tsx',
                        // language=Handlebars
                        template: `import { PropsWithChildren } from 'react';

export type TemplateProps = PropsWithChildren;

export default function Template({children}: TemplateProps) {
    return <>{children}</>;
}
`,
                        skipIfExists: true,
                    },
                    {
                        type: 'add',
                        // language=Handlebars
                        path: '{{ dir.original }}/template.stories.tsx',
                        // language=Handlebars
                        template: `import Template from "{{ dir.absolute }}/template.tsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    component: Template,
    args: {},
    parameters: {},
} satisfies Meta<typeof Template>;

export default meta;

type Story = StoryObj<typeof Template>;

export const Primary: Story = {};
`,
                        skipIfExists: true,
                    },
                );
            }

            if (data?.types.includes('default')) {
                _actions.push({
                    type: 'add',
                    // language=Handlebars
                    path: '{{ dir.original }}/default.tsx',
                    // language=Handlebars
                    template: `export interface DefaultProps {
}

export default function Default({}: DefaultProps) {
    return null;
}
`,
                    skipIfExists: true,
                });
            }

            return _actions;
        },
    });
}
