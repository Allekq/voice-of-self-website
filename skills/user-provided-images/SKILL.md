---
name: user-provided-images
description: Use when landing-page or site work would benefit from a new image or illustration asset. Before generating placeholder art or inventing a substitute, ask whether the user wants to create or provide the image themselves, then give them an exact repo path and filename to paste it into.
---

# User Provided Images

Use this skill when the site needs a new image, illustration, or visual asset and the user may prefer to make or source it themselves.

## Workflow

1. Before generating or faking an image, ask whether the user wants to provide the asset.
2. If yes, choose a concrete repo path and filename first.
3. Tell the user exactly where to paste the file.
4. Prefer `public/images/...` for static site assets unless there is a stronger existing owner.
5. After the user confirms the file is present, use that exact asset directly.
6. Do not keep a generated placeholder if the user has provided a real asset to use instead.

## Output Style

- Keep the ask short and practical.
- Give one exact file path, not multiple options unless there is a real tradeoff.
- Suggest PNG or WEBP unless another format is clearly better.
- If the user wants help making the image, you can still provide a prompt for them to use.
