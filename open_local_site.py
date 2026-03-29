#!/usr/bin/env python3
"""Open the local Astro site in a browser.

Behavior:
- If a local Astro dev server is already running on the default port, reuse it.
- Otherwise start `npm run dev -- --host 127.0.0.1`, wait for the local URL,
  and open the homepage in the default browser.
- Keep the dev server attached so Ctrl+C cleanly stops it.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
import webbrowser
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen


REPO_ROOT = Path(__file__).resolve().parent
DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 4321
DEFAULT_PAGE_PATH = "/"
URL_PATTERN = re.compile(r"https?://[^\s]+")


def build_default_url(host: str, port: int = DEFAULT_PORT) -> str:
    return f"http://{host}:{port}{DEFAULT_PAGE_PATH}"


def detect_existing_server(host: str) -> str | None:
    url = build_default_url(host)

    try:
        with urlopen(url, timeout=0.8) as response:
            if 200 <= response.status < 400:
                return url
    except URLError:
        return None
    except OSError:
        return None

    return None


def open_browser(url: str, should_open: bool) -> None:
    if not should_open:
        print(f"Local site ready: {url}")
        return

    opened = webbrowser.open(url, new=2)
    if opened:
        print(f"Opened in browser: {url}")
    else:
        print(f"Could not auto-open browser. Open this URL manually:\n{url}")


def start_dev_server(host: str) -> subprocess.Popen[str]:
    command = ["npm", "run", "dev", "--", "--host", host]
    process = subprocess.Popen(
        command,
        cwd=REPO_ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
    )

    if process.stdout is None:
        raise RuntimeError("Could not capture Astro dev server output.")

    return process


def wait_for_url_and_stream_output(process: subprocess.Popen[str], should_open_browser: bool) -> int:
    opened_url = False
    assert process.stdout is not None

    try:
        for line in process.stdout:
            sys.stdout.write(line)
            sys.stdout.flush()

            if opened_url:
                continue

            match = URL_PATTERN.search(line)
            if not match:
                continue

            url = match.group(0).rstrip("/")
            open_browser(url, should_open_browser)
            opened_url = True
    except KeyboardInterrupt:
        print("\nStopping local Astro server...")
        process.terminate()
        try:
            process.wait(timeout=3)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait()
        return 130

    return process.wait()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Start the local Astro site and open it in a browser.")
    parser.add_argument("--host", default=DEFAULT_HOST, help="Host for Astro dev. Default: 127.0.0.1")
    parser.add_argument(
        "--no-browser",
        action="store_true",
        help="Start or reuse the local site without opening a browser tab.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    existing_url = detect_existing_server(args.host)
    if existing_url:
        print(f"Reusing existing local site: {existing_url}")
        open_browser(existing_url, not args.no_browser)
        return 0

    print("Starting Astro dev server...")
    process = start_dev_server(args.host)
    exit_code = wait_for_url_and_stream_output(process, not args.no_browser)

    if exit_code not in (0, 130):
        print(f"Astro dev server exited with code {exit_code}.", file=sys.stderr)

    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
