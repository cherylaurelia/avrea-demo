// Output captured from the real CLI. See README.md for how each was produced.

export const beforeTranscript = `$ avr run view https://github.com/avrea-com/cli/actions/runs/41417336523/job/125184285246
Error: Invalid run reference. Expected an Avrea run ID, a positive GitHub run ID, a GitHub Actions run URL, or an Avrea console run URL.
[exit 1]
$ avr run diagnose https://github.com/avrea-com/cli/actions/runs/41417336523/job/125184285246
Error: Invalid run reference. Expected an Avrea run ID, a positive GitHub run ID, a GitHub Actions run URL, or an Avrea console run URL.
[exit 1]`;

export const afterTranscript = `$ avr run view https://github.com/acme/widgets/actions/runs/123456789/job/987654321?pr=78#step:3:10
Title       Fix flaky retry test
Conclusion  ✗ failure
Run         #412 (attempt 1)

JOBS

  ✗  test (1m 11s)  job-019e5a2e474e76ca13d52ca70c883e11

OTHER ATTEMPTS

  ✓  attempt 2      3m 04s   run-019e5a2e474e76ca13d52ca70c883e02
[exit 0]`;

export const attemptTranscript = `$ avr run view https://github.com/acme/widgets/actions/runs/123456789/job/987654321 --json run_id,run_attempt,conclusion
{
  "run_id": "run-019e5a2e474e76ca13d52ca70c883e01",
  "run_attempt": 1,
  "conclusion": "failure"
}
[exit 0]
$ avr run view https://github.com/acme/widgets/actions/runs/123456789/job/111 --json run_id
Error: GitHub job 111 is not listed in any visible attempt of run 123456789 in this organization. Avrea may not track that job. To see the latest attempt, pass the run instead: avr run view 123456789
[exit 1]
$ avr run rerun https://github.com/acme/widgets/actions/runs/123456789/job/987654321 --yes
Error: This is a job URL, but \`avr run rerun\` acts on a whole run. Pass the run instead: avr run rerun 123456789
[exit 1]`;
