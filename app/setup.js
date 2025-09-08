// Node script to aggregate all question sets from `questions/questions.js`
// and write them into a single JSON file: `questions/all-questions.json`.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

function main() {
  const srcPath = path.join(process.cwd(), "questions", "questions.js");
  const outDir = path.join(process.cwd(), "data");
  const outPath = path.join(outDir, "data.json");

  if (!fs.existsSync(srcPath)) {
    console.error(`Source not found: ${srcPath}`);
    process.exit(1);
  }

  const source = fs.readFileSync(srcPath, "utf8");

  // Transform the module syntax so it can be evaluated in a VM context.
  // 1) Remove ESM exports
  // 2) Convert const -> var for the exported sets so they are accessible on the context
  const transformed = source
    // Replace `export const setX` with `var setX`
    .replace(/export\s+const\s+(set\w+)\s*=\s*\[/g, (m, name) => `var ${name} = [`);

  // Create sandbox and evaluate the transformed code
  const sandbox = {};
  vm.createContext(sandbox);
  try {
    vm.runInContext(transformed, sandbox, { timeout: 10_000, filename: "questions.js" });
  } catch (err) {
    console.error("Failed to evaluate questions file:", err.message);
    process.exit(1);
  }

  // Collect all variables that look like set*, keep insertion order by sorting by natural number when present
  const setEntries = Object.entries(sandbox).filter(([k, v]) => /^set\w+/i.test(k) && Array.isArray(v));

  if (setEntries.length === 0) {
    console.error("No question sets found in questions/questions.js");
    process.exit(1);
  }

  // Sort by numeric suffix if available (e.g., set1, set2, set10), otherwise by name
  setEntries.sort(([a], [b]) => {
    const na = Number(a.replace(/[^0-9]/g, ""));
    const nb = Number(b.replace(/[^0-9]/g, ""));
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    return a.localeCompare(b);
  });

  const allQuestions = setEntries.flatMap(([, arr]) => arr);

  // Write as pretty-printed JSON
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(outPath, JSON.stringify(allQuestions, null, 2), "utf8");

  const verbose = process.argv.includes("--verbose") || process.env.LOG_SETS === "1";
  if (verbose) {
    const names = setEntries.map(([name]) => name).join(", ");
    console.log(`Included sets: ${names}`);
  }
  console.log(
    `Wrote ${allQuestions.length} questions from ${setEntries.length} sets to ${path.relative(process.cwd(), outPath)}`
  );
}

main();
