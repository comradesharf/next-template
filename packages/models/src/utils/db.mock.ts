import { fn } from "@vitest/spy";
import type { Mock } from "vitest";

export const db: Mock = fn().mockName("db");
