import specTestConfig from "app-vitest-spec-config";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    specTestConfig(["localstack", "stripe", "twilio"]),
]);
