import { type Mock, vi } from "vitest";

export const isDocument: Mock = vi
    .fn()
    .mockName("isDocument")
    .mockResolvedValue(true);
