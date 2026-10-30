# GitHub collection and publication

Use an authenticated GitHub tool or `gh` with equivalent coverage. Never print authentication
tokens. For a URL, pin its host, owner, repo and PR number; for a number, resolve the repository
from the checkout. Examples below use `gh api --hostname "$pr_host"` for the verified host.
Assign `pr_owner`, `pr_repo`, `pr_number`, and `pr_host` from the verified input; quote all values.
Store outputs inside the local report directory, not in tracked files.

## Complete read-only collection

Fetch metadata with `repos/$pr_owner/$pr_repo/pulls/$pr_number`; record URL, title/body, state,
base/head repository and ref/SHA. Retrieve every page of the following REST collections:

```bash
gh api --hostname "$pr_host" --paginate --slurp "repos/$pr_owner/$pr_repo/pulls/$pr_number/reviews?per_page=100"
gh api --hostname "$pr_host" --paginate --slurp "repos/$pr_owner/$pr_repo/issues/$pr_number/comments?per_page=100"
gh api --hostname "$pr_host" --paginate --slurp "repos/$pr_owner/$pr_repo/pulls/$pr_number/comments?per_page=100"
```

`--slurp` returns arrays of pages: flatten exactly one level, preserving every record. Include
review bodies as well as comments, and retain author, ID, URL, timestamps, commit IDs, diff context,
and reply relationships. Deduplicate the same inline comment if collected through both APIs.
REST inline comments do not provide the thread's resolved state; also fetch GraphQL threads.

Paginate the **outer** thread connection separately from each thread's comments:

```bash
gh api --hostname "$pr_host" graphql --paginate --slurp \
  -F owner="$pr_owner" -F repo="$pr_repo" -F number="$pr_number" \
  -f query='
query($owner: String!, $repo: String!, $number: Int!, $endCursor: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $number) {
      reviewThreads(first: 100, after: $endCursor) {
        nodes { id isResolved isOutdated path line originalLine startLine diffSide }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
}'
```

For **every** returned `thread_id`, fetch all comment pages, even for resolved/outdated threads:

```bash
gh api --hostname "$pr_host" graphql --paginate --slurp -f thread="$thread_id" \
  -f query='
query($thread: ID!, $endCursor: String) {
  node(id: $thread) {
    ... on PullRequestReviewThread {
      comments(first: 100, after: $endCursor) {
        nodes {
          id databaseId url body author { login } createdAt updatedAt
          path line originalLine diffHunk replyTo { id }
          commit { oid } originalCommit { oid }
          pullRequestReview { id state }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
}'
```

Inspect exit status **and** GraphQL `errors`, missing/null repository/PR/thread data, and pagination
completion. Do not infer “no comments” from denied access or null nodes. If any endpoint fails,
record incomplete coverage; fixes based on complete independent evidence may continue, but
affected conclusions and publication must wait for sufficient context. Record endpoint counts
and collection time; do not confuse retrieved records with the number of distinct requests.
The visible API cannot supply deleted comments or other users' unpublished pending reviews;
report those limits if relevant instead of claiming access to invisible feedback.

## Publication protocol

Read this section only after the user approves a concrete reply batch (`SKILL.md`, step 5).

1. "Send these replies" or "approve batch 2" authorises the shown text and its proposed
   resolutions. "Choose B" approves an implementation choice only. Honour subsets, "reply only",
   "leave this open", and user edits.
2. Before each action, refresh the PR head, the target conversation, its resolution state, and the
   relevant code. New feedback, changed text, or code changes affecting a claim invalidate only
   that item's approval.
3. Post the exact approved text in the original inline thread. Reviews and general comments have
   no resolvable thread: use a PR conversation comment linking the source, only if that
   destination was in the approved batch. Never dismiss or submit a review.
4. Resolve only after the reply succeeds and the request is settled: a verified fix is on the
   remote PR head, it was already addressed, or a supported decline settles it. Keep open for
   local-only fixes, questions, pending decisions, or an instruction to continue discussion.
   Do not reopen resolved threads.
5. Record each returned URL and resolution result immediately. After a timeout, refresh and check
   for an identical reply before retrying; never duplicate a write. Once a separately authorised
   push puts a local fix on the PR, its recorded resolution can proceed without a second approval.

## Approved writes only

The examples below are **publication steps**, never part of collection. Execute only for the
approved report items after the refresh and eligibility checks above. Use existing node
IDs from the fetched data, not file/line guesses. Write exact approved text to `reply_body_file`.
`-F body=@file` reads the file contents without executing reviewer text in the shell.

Reply within the inline review thread:

```bash
gh api --hostname "$pr_host" graphql -f thread="$thread_id" -F body=@"$reply_body_file" \
  -f query='
mutation($thread: ID!, $body: String!) {
  addPullRequestReviewThreadReply(input: {pullRequestReviewThreadId: $thread, body: $body}) {
    comment { id url body }
  }
}'
```

Only after a successful reply and verified eligibility, resolve that thread separately:

```bash
gh api --hostname "$pr_host" graphql -f thread="$thread_id" -f query='
mutation($thread: ID!) {
  resolveReviewThread(input: {threadId: $thread}) {
    thread { id isResolved }
  }
}'
```

For an approved general-conversation reply (including a response to a review summary), create a
PR conversation comment linking its source. These comments cannot be marked resolved:

```bash
gh api --hostname "$pr_host" --method POST \
  "repos/$pr_owner/$pr_repo/issues/$pr_number/comments" -F body=@"$reply_body_file"
```

Check mutation errors and returned fields; persist reply URLs and actual resolution state after
each operation. Re-fetch before retrying an uncertain write. Do not replace exact approved text,
resolve the whole PR, dismiss reviews, or push local commits as a side effect.

## API references

- [GitHub CLI API manual](https://cli.github.com/manual/gh_api)
- [GraphQL pagination](https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api)
- [Pull request GraphQL schema](https://docs.github.com/en/graphql/reference/pulls)
- [Reply and resolve mutations](https://docs.github.com/en/graphql/reference/pulls#addpullrequestreviewthreadreply)
- [REST review comments](https://docs.github.com/en/rest/pulls/comments)
