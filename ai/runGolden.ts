import fs from 'fs';
import path from 'path';
import { summarizeFailure } from './summarizeFailure';

type GoldenCase = {
  id: string;
  log: string;
  expectCauseIncludes: string;
};

const casesPath = path.join(__dirname, 'golden', 'cases.json');
const cases: GoldenCase[] = JSON.parse(fs.readFileSync(casesPath, 'utf-8'));

let failed = 0;

for (const c of cases) {
  const summary = summarizeFailure(c.log);
  const ok = summary.cause
    .toLowerCase()
    .includes(c.expectCauseIncludes.toLowerCase());

  if (ok) {
    console.log(`PASS ${c.id}`);
  } else {
    failed++;
    console.log(`FAIL ${c.id}`);
    console.log(`  expected cause to include: ${c.expectCauseIncludes}`);
    console.log(`  got: ${summary.cause}`);
  }
}

if (failed > 0) {
  console.log(`\n${failed} failed`);
  process.exit(1);
}

console.log(`\nAll ${cases.length} passed`);