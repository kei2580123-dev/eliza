import { pushFile } from "./github";

async function test() {
  const data = [
    {
      text: "テスト投稿",
      likes: 1
    }
  ];

  await pushFile("data/memory.json", data);
}

test();