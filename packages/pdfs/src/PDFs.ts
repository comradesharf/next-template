import * as ReactPDF from '@react-pdf/renderer';

export function renderToBuffer(
    ...props: Parameters<(typeof ReactPDF)['renderToBuffer']>
) {
    return ReactPDF.renderToBuffer(...props);
}
