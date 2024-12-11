import type { Meta, StoryObj } from "@storybook/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "#app/_components/accordion.tsx";

const meta: Meta<typeof Accordion> = {
    component: Accordion,
    subcomponents: {
        AccordionContent,
        AccordionItem,
        AccordionTrigger,
    } as Meta["subcomponents"],
    tags: ["autodocs"],
    args: {
        collapsible: true,
        type: "single",
    },
    argTypes: {
        type: {
            options: ["single", "multiple"],
            control: { type: "radio" },
        },
    },
    parameters: {
        layout: "padded",
        docs: {
            story: {
                inline: true,
            },
        },
    },
    render(args) {
        return (
            <Accordion {...args} className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable
                        it if you prefer.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {};
