result = await x.create_post(reply_text, reply_to=post_id)

# 👇ここ追加（記憶保存）
import requests
import base64
import json

repo = os.getenv("GITHUB_REPO")
token = os.getenv("GITHUB_TOKEN")
branch = os.getenv("GITHUB_BRANCH", "main")

url = f"https://api.github.com/repos/{repo}/contents/data/memory.json"

headers = {
    "Authorization": f"token {token}",
    "Accept": "application/vnd.github+json"
}

# 既存データ取得
res = requests.get(url, headers=headers)
data = res.json()

content = json.loads(base64.b64decode(data["content"]).decode())

# 追加
content.append({
    "text": reply_text,
    "time": int(time.time()),
    "likes": 0
})

# 更新
requests.put(url, headers=headers, json={
    "message": "update memory",
    "content": base64.b64encode(json.dumps(content, indent=2).encode()).decode(),
    "sha": data["sha"],
    "branch": branch
})