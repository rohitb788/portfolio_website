// Thin wrapper around the GitHub Contents API. Used only from server-side
// admin routes to commit content-file edits — never imported by client code.

interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

function getConfig(): GitHubConfig {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_REPO_BRANCH || "main";

  if (!token || !owner || !repo) {
    throw new Error(
      "GITHUB_TOKEN, GITHUB_REPO_OWNER, and GITHUB_REPO_NAME environment variables must all be set."
    );
  }
  return { token, owner, repo, branch };
}

function apiHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export class GitHubApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}

export async function getRepoFile(
  path: string
): Promise<{ content: string; sha: string }> {
  const { token, owner, repo, branch } = getConfig();
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(
    branch
  )}`;

  const res = await fetch(url, { headers: apiHeaders(token), cache: "no-store" });
  if (!res.ok) {
    const body = await res.text();
    throw new GitHubApiError(`Failed to read ${path} from GitHub: ${body}`, res.status);
  }

  const data = (await res.json()) as { content: string; sha: string };
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content, sha: data.sha };
}

export async function updateRepoFile(
  path: string,
  newContent: string,
  message: string
): Promise<{ commitUrl: string }> {
  const { token, owner, repo, branch } = getConfig();

  // Re-fetch the current sha immediately before writing so we always update
  // against the latest committed version (single-admin, last-write-wins).
  const { sha } = await getRepoFile(path);

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { ...apiHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(newContent, "utf-8").toString("base64"),
      sha,
      branch,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new GitHubApiError(`Failed to write ${path} to GitHub: ${body}`, res.status);
  }

  const data = (await res.json()) as { commit: { html_url: string } };
  return { commitUrl: data.commit.html_url };
}
