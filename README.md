# avr run and GitHub job URLs (unofficial demo)

Unofficial demo by Cheryl Aurelia: not affiliated with Avrea.

## The problem

`avr run view` and `avr run diagnose` reject GitHub job URLs (`/actions/runs/R/job/J`) with "Invalid run reference".
`gh pr checks` prints this form ([example PR](https://github.com/avrea-com/cli/pull/77)), and
[`avr job view --web` prints it too](https://github.com/avrea-com/cli/blob/df6d102dce45014c55d0929307b29603c6806e94/avrea_cli/commands/job.py#L582).
No user has reported this; I found it by running the CLI.

## What this page shows

The patched behaviour next to the current one. The patch itself is on
[the fork branch](https://github.com/cherylaurelia/cli/compare/main...fix/run-job-urls).

The transcripts in `app/transcripts.ts` are trimmed output from the real CLI:

- Before: `avr` from source at `df6d102`, with a real job URL from `avrea-com/cli`. It fails at parsing.
- After: `avr` from the fix branch, pointed by `AVR_HOST` at a local stub API with made-up data. **Nothing was run
  against the live Avrea API.**

## Run it

```sh
npm install
npm run dev
```
