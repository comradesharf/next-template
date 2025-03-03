export * from "#lingui.node.tsx";

export function msg(literals: TemplateStringsArray, ...placeholders: any[]) {
    return literals.reduce((acc, literal, index) => {
        return acc + literal + (placeholders[index] ?? "");
    }, "");
}
