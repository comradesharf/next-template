"use client";

import type { MotionProps } from "framer-motion";
import * as m from "framer-motion/m";
import type { ComponentProps, ComponentType } from "react";
import { Button } from "#app/_components/button.tsx";

export interface MotionButtonProps
    extends MotionProps,
        Omit<ComponentProps<typeof Button>, keyof MotionProps> {}

export const MotionButton = m.create(
    Button,
) as ComponentType<MotionButtonProps>;
