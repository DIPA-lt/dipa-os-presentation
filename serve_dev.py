"""
Local dev server: same as `python -m http.server` but sends Cache-Control: no-store
so CSS/JS changes always apply (avoids stale styles when ?v= was unchanged).

Usage (from this folder):
  py serve_dev.py 8080
Then open http://localhost:8080/
"""

from __future__ import annotations

import http.server
import socketserver
import sys


class NoCacheRequestHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".svg": "image/svg+xml",
        ".webmanifest": "application/manifest+json",
    }

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()


def main() -> None:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    with socketserver.TCPServer(("", port), NoCacheRequestHandler) as httpd:
        print(f"Serving at http://127.0.0.1:{port}/  (no-cache headers on all files)")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
