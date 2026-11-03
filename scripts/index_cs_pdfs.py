#!/usr/bin/env python3
"""Build a private inventory of local CS PDF books using Standard Science's 200-book map.

Default: read-only scan. No PDFs are uploaded, deleted, renamed, or moved.
Optional --copy-to creates categorized copies OUTSIDE the Git repository.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import shutil
import sys
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "apps/web/src/data/computerScienceBookCatalog.ts"
DEFAULT_OUTPUT = Path.home() / "Documents/Standard-Science-private/cs-pdf-index.csv"


def normalize(value: str) -> str:
    value = unicodedata.normalize("NFKC", value).lower()
    value = re.sub(r"\\([^)]*(?:z-library|1lib|z-lib|pdfdrive|archive)[^)]*\\)", "", value)
    value = re.sub(r"[^\\w]+", " ", value, flags=re.UNICODE)
    return " ".join(value.split())


def title_match(stem: str, books: list[dict]) -> tuple[dict | None, float]:
    name = normalize(stem)
    if not name:
        return None, 0.0
    best, best_score = None, 0.0
    for book in books:
        title = normalize(book["title"])
        if len(title) >= 15 and title in name:
            score = 0.99
        else:
            similarity = SequenceMatcher(None, name, title).ratio()
            a, b = set(name.split()), set(title.split())
            jaccard = len(a & b) / len(a | b) if a | b else 0.0
            score = max(similarity, jaccard * 0.93)
        if score > best_score:
            best, best_score = book, score
    return best, best_score


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def safe_layer(layer: str) -> str:
    return re.sub(r"[^A-Za-z0-9 _-]", "", layer).strip().replace("  ", " ") or "Unmatched"


def outside_repo(path: Path) -> bool:
    candidate = path.expanduser().resolve()
    return candidate != ROOT and ROOT not in candidate.parents


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("folder", type=Path, help="Local folder containing PDFs (scans recursively)")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="Private CSV manifest destination")
    parser.add_argument("--copy-to", type=Path, default=None, help="Optional categorized COPIES directory, outside repository")
    args = parser.parse_args()
    folder = args.folder.expanduser().resolve()
    output = args.output.expanduser().resolve()
    if not folder.is_dir():
        parser.error(f"Folder not found: {folder}")
    if not outside_repo(output):
        parser.error("The inventory contains local file paths; save it outside the Git repository.")
    if args.copy_to is not None and not outside_repo(args.copy_to):
        parser.error("Never put local PDF copies inside this public Git repository.")
    raw = CATALOG.read_text(encoding="utf-8").split("computerScienceBookCatalog: ComputerScienceCatalogBook[] = ", 1)[1].strip()
    books = json.loads(raw)
    pdfs = sorted(p for p in folder.rglob("*") if p.is_file() and p.suffix.casefold() == ".pdf")
    seen = {}
    records = []
    copies = 0
    for pdf in pdfs:
        digest = sha256(pdf)
        duplicate = seen.get(digest, "")
        if not duplicate:
            seen[digest] = str(pdf)
        book, score = title_match(pdf.stem, books)
        status = "catalog-match" if score >= 0.88 else "review" if score >= 0.72 else "unmatched"
        if duplicate:
            status = "duplicate"
        record = {
            "filename": pdf.name, "path_private": str(pdf),
            "matched_title": book["title"] if book and score >= 0.72 else "",
            "authors": book["authors"] if book and score >= 0.72 else "",
            "knowledge_layer": book["layer"] if book and score >= 0.72 else "Unmatched",
            "original_domain": book["domain"] if book and score >= 0.72 else "",
            "match_score": f"{score:.3f}", "status": status,
            "duplicate_of": duplicate, "sha256": digest,
        }
        records.append(record)
        if args.copy_to and status == "catalog-match":
            destdir = args.copy_to.expanduser().resolve() / safe_layer(book["layer"])
            destdir.mkdir(parents=True, exist_ok=True)
            destination = destdir / pdf.name
            if destination.exists() and sha256(destination) != digest:
                destination = destdir / (pdf.stem + "-" + digest[:8] + pdf.suffix)
            if not destination.exists():
                shutil.copy2(pdf, destination)
                copies += 1
    output.parent.mkdir(parents=True, exist_ok=True)
    fields = ["filename", "path_private", "matched_title", "authors", "knowledge_layer", "original_domain", "match_score", "status", "duplicate_of", "sha256"]
    with output.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(records)
    print(f"Scanned {len(pdfs)} PDFs. Matched {sum(x['status'] == 'catalog-match' for x in records)}; review {sum(x['status'] == 'review' for x in records)}; duplicates {sum(x['status'] == 'duplicate' for x in records)}.")
    print(f"Private manifest: {output}")
    print(f"Categorized copies created: {copies}. Original PDFs were not changed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
