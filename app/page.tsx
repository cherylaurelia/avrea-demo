import { afterTranscript, attemptTranscript, beforeTranscript } from "./transcripts";

const branchUrl = "https://github.com/avrea-com/cli/pull/79";
const repoUrl = "https://github.com/avrea-com/cli";
const commit = "https://github.com/avrea-com/cli/blob/df6d102dce45014c55d0929307b29603c6806e94";

function Terminal({ label, tone, text }: { label: string; tone: "bad" | "good"; text: string }) {
  return (
    <figure className="min-w-0 overflow-hidden rounded-xl border border-line bg-panel">
      <figcaption
        className={`border-b border-line px-4 py-2.5 text-sm font-medium ${tone === "bad" ? "text-bad" : "text-good"}`}
      >
        {label}
      </figcaption>
      <pre
        aria-label={`Terminal output: ${label}`}
        className="whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-6 text-strong"
      >
        {text}
      </pre>
    </figure>
  );
}

function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-accent underline underline-offset-2 hover:text-strong">
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <p className="text-sm text-accent">Unofficial demo for the avr CLI</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-strong sm:text-5xl">
        <code className="font-mono text-[0.85em]">avr run</code> rejects the GitHub job link you have when a check
        fails.
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8">
        This patch accepts those links and opens the attempt the job belongs to, instead of the latest one.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href={branchUrl} className="rounded-lg bg-strong px-4 py-2.5 text-sm font-medium text-page hover:bg-accent">
          See the PR
        </a>
        <a
          href={repoUrl}
          className="rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-strong hover:border-accent"
        >
          avrea-com/cli
        </a>
      </div>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <Terminal label="Before: v0.5.0 source, a real job link from your repo" tone="bad" text={beforeTranscript} />
        <Terminal label="After: patched CLI, stub API with made-up data, output trimmed" tone="good" text={afterTranscript} />
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-serif text-2xl text-strong">Where these links come from</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
          <li>
            <code className="font-mono text-sm text-strong">gh pr checks</code> printed this form for every Actions check
            on <Source href={`${repoUrl}/pull/77`}>your PR 77</Source>.
          </li>
          <li>
            <code className="font-mono text-sm text-strong">avr job view --web</code>{" "}
            <Source href={`${commit}/avrea_cli/commands/job.py#L582`}>prints the same form</Source>, and{" "}
            <Source href={`${commit}/avrea_cli/run_refs.py#L74`}>the run parser</Source> rejects it.
          </li>
          <li>
            You already <Source href={`${repoUrl}/commit/d07b00e`}>allowed query strings</Source> in pasted run URLs, so
            pasting links is a flow you support.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-strong">Why not just drop the job ID?</h2>
        <p className="mt-4 max-w-3xl leading-7">
          A re-run gets new job IDs: on{" "}
          <Source href="https://github.com/astral-sh/uv/actions/runs/41474552262">this re-run uv workflow</Source>, the 68
          jobs in attempt 1 and the 68 in attempt 2 share none. So the job ID says which attempt you meant, and dropping
          it could show a passing attempt 2 when you asked about a failure in attempt 1. If no visible attempt lists the
          job, the patch returns an error rather than describing a different attempt.
        </p>
        <div className="mt-6">
          <Terminal label="Picks attempt 1, or fails clearly (stub API)" tone="good" text={attemptTranscript} />
        </div>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-serif text-2xl text-strong">What each command does with a job link</h2>
        <dl className="mt-4 space-y-4 leading-7">
          <div>
            <dt className="font-mono text-sm text-strong">run view, run diagnose, run watch</dt>
            <dd>Work on the job&apos;s whole attempt.</dd>
          </div>
          <div>
            <dt className="font-mono text-sm text-strong">run logs</dt>
            <dd>Shows only that job&apos;s logs.</dd>
          </div>
          <div>
            <dt className="font-mono text-sm text-strong">run rerun, run cancel</dt>
            <dd>Refuse it and name the run to pass, because they act on a whole run.</dd>
          </div>
        </dl>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="font-serif text-2xl text-strong">What I did not verify</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
          <li>
            <strong className="text-strong">The patch never ran against your live API.</strong> I have no Avrea account. The
            patch assumes the runs list with <code className="font-mono text-sm">include=jobs</code> returns{" "}
            <code className="font-mono text-sm">platform_job_id</code>, as your CLI code and test stubs suggest. One real{" "}
            <code className="font-mono text-sm">avr run view &lt;job URL&gt; --json run_id,run_attempt</code> would settle
            it.
          </li>
          <li>No user has reported this. I found it by reading and running the CLI.</li>
          <li>
            Your draft Go port (PR 75) isn&apos;t covered. This patch changes the Python CLI only. All 1801 tests pass
            there, including 28 new ones, and <code className="font-mono text-sm">make lint</code> and{" "}
            <code className="font-mono text-sm">make docs-check</code> are clean.
          </li>
        </ul>
      </section>

      <footer className="mt-16 border-t border-line pt-6 text-sm">
        Unofficial demo by Cheryl Aurelia: not affiliated with Avrea.
      </footer>
    </main>
  );
}
