import fetch from "node-fetch";

const token = process.env.GITHUB_TOKEN!;
const repo = process.env.GITHUB_REPO!;
const branch = process.env.GITHUB_BRANCH || "main";

const API = "https://api.github.com";

export async function getFileSha(path: string) {
  const res = await fetch(`${API}/repos/${repo}/contents/${path}?ref=${branch}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github+json"
    }
  });

  if (res.status === 404) return null;

  const data = await res.json();
  return data.sha;
}

export async function pushFile(path: string, content: any) {
  const sha = await getFileSha(path);

  const body = {
    message: "update memory",
    content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
    branch,
    sha
  };

  const res = await fetch(`${API}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github+json"
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  console.log("GitHub push:", data.content?.path || data.message);
}