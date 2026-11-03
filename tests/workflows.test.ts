import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// tests/artifacts/neovim.test.ts throws when CI is set and nvim is missing, so
// every workflow job that runs `bun test` has to install Neovim first.

const WORKFLOWS_DIR = join(import.meta.dir, "..", ".github", "workflows");

interface Step {
	run?: string;
	uses?: string;
}

interface Workflow {
	jobs: Record<string, { steps?: Step[] }>;
}

const runsBunTest = (step: Step) => /\bbun test\b/.test(step.run ?? "");
const installsNeovim = (step: Step) =>
	/\binstall\b.*\bneovim\b/.test(step.run ?? "") ||
	/neovim|setup-vim/i.test(step.uses ?? "");

const testJobs = readdirSync(WORKFLOWS_DIR)
	.filter((file) => /\.ya?ml$/.test(file))
	.flatMap((file) => {
		const source = readFileSync(join(WORKFLOWS_DIR, file), "utf8");
		const workflow = Bun.YAML.parse(source) as Workflow;
		return Object.entries(workflow.jobs)
			.filter(([, job]) => job.steps?.some(runsBunTest))
			.map(([id, job]) => ({
				name: `${file} > ${id}`,
				steps: job.steps ?? [],
			}));
	});

describe("workflow jobs that run bun test", () => {
	test("are found", () => {
		expect(testJobs.length).toBeGreaterThan(0);
	});

	test.each(testJobs)("$name installs Neovim before running tests", ({
		steps,
	}) => {
		const install = steps.findIndex(installsNeovim);
		expect(install).toBeGreaterThanOrEqual(0);
		expect(install).toBeLessThan(steps.findIndex(runsBunTest));
	});
});
