import LocalFont from "next/font/local";

export const poppins = LocalFont({
    display: "swap",
    src: [
        {
            path: "./poppins-latin-400-normal.woff2",
            style: "normal",
            weight: "400",
        },
        {
            path: "./poppins-latin-500-normal.woff2",
            style: "normal",
            weight: "500",
        },
        {
            path: "./poppins-latin-600-normal.woff2",
            style: "normal",
            weight: "600",
        },
        {
            path: "./poppins-latin-700-normal.woff2",
            style: "normal",
            weight: "700",
        },
    ],
    preload: true,
    variable: "--font-poppins",
});
