export default {
  spec_dir: "spec",
  spec_files: ["**/*[sS]pec.ts", "**/*[sS]pec.?(m)js"],
  helpers: ["helpers/**/*.ts", "helpers/**/*.?(m)js"],
  env: {
    stopSpecOnExpectationFailure: false,
    random: false,
    forbidDuplicateNames: true,
  },
};
