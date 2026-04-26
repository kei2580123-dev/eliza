import { pushFile } from "./github";
import fetch from "node-fetch";

const token = process.env.GITHUB_TOKEN!;
const repo = process.env.GITHUB_REPO!;
const branch = process.env.GITHUB_BRANCH!;

const API = "https://api.github.com";

export async function loadMemory() {
  const res = await fetch(`${API}/repos/${repo}/contents/data/memory.json?ref=${branch}`, {
    headers: {
      Authorization: `token ${token}`
    }
  });

  const data = await res.json();

  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return JSON.parse(content);
}

export async function saveMemory(newItem: any) {
  const current = await loadMemory();

  current.push(newItem);

  await pushFile("data/memory.json", current);
}