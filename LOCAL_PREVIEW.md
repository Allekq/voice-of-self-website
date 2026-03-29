# Local Preview

You can open the site locally before publishing it.

## Current local dev URL

- Home: `http://127.0.0.1:4321/`
- Privacy Policy: `http://127.0.0.1:4321/privacy-policy/`
- Terms of Service: `http://127.0.0.1:4321/terms-of-service/`

## Start the local site yourself

From the repo root, run:

```bash
npm run dev
```

Astro will print the local URL in the terminal.

## Quick open script

If you want the site to open in your browser automatically, run:

```bash
python3 open_local_site.py
```

This root-level script starts the Astro dev server if needed and opens the homepage for you.

## Easiest IDE option

If you want to just click your IDE's Run button on a file, use:

`run_site.py`

That file is a tiny root-level entrypoint that launches the same local preview flow, but is easier to spot and run directly from an editor.

## Important note

This repo now serves from the domain root, so the local homepage is just `/`.

If port `4321` is already taken, Astro may choose another port and print the updated URL in the terminal.
