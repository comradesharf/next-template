import specTestConfig from "app-vitest-spec-config";
import unitTestConfig from "app-vitest-unit-config";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([unitTestConfig, specTestConfig()]);
