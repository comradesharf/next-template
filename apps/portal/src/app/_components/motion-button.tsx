"use client";

import type { MotionProps } from "framer-motion";
import * as m from "framer-motion/m";
import type { ComponentType } from "react";
import { Button, type ButtonProps } from "#app/_components/button.tsx";

export interface MotionButtonProps
    extends MotionProps,
        Omit<ButtonProps, keyof MotionProps> {}

export const MotionButton = m.create(
    Button,
) as ComponentType<MotionButtonProps>;
