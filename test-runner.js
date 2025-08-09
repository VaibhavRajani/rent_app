#!/usr/bin/env node

const { execSync } = require("child_process");

try {
  // Run ts-node with jasmine and path resolution
  execSync(
    "npx ts-node -r tsconfig-paths/register --project tsconfig.test.json node_modules/jasmine/bin/jasmine.js --config=spec/support/jasmine.json",
    {
      stdio: "inherit",
    }
  );
} catch (error) {
  console.error("Test run failed:", error.message);
  process.exit(1);
}
