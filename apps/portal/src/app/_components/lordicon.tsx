"use client";

import dynamic from "next/dynamic";

export const Lordicon = dynamic(
    () => import("#app/_components/lordicon/component.tsx"),
    {
        ssr: false,
    },
);
