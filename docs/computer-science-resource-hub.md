# Computer Science Research & Learning Directory

**Location**: `/computer-science/resources` (linked from the Computer Science archive and the existing Library).

## What has been added

- 81 curated official URLs in six groups: paper archives/indexes; magazines/history; books/publishers; societies/communities; learning/events; developers/labs.
- Search, category filters, and incremental display on desktop and mobile.
- A searchable 200-book catalog migrated from the original `RET_Connected_Computer_Science_200_Books.xlsx` without dropping the 15 knowledge layers, titles, authors, priorities, and notes.
- Existing Computer Science Library routes and their published books/papers remain unchanged.

### Source vs. file

The 200-book sheet is an **annotated reading catalog**, not proof that 200 files have been downloaded. It deliberately has no guessed PDF URLs. The original Library retains publisher/author-approved external links and existing HTML sample readers. The public GitHub repository does not contain personal PDFs.

## Index PDFs on your own computer

Example on macOS:

```bash
cd "/Users/mac/Marx/Standard Science"
python3 scripts/index_cs_pdfs.py "$HOME/Downloads" \
  --output "$HOME/Documents/Standard-Science-private/cs-pdf-index.csv"
```

The script scans recursively, matches titles to the 200-book catalog, groups results by knowledge layer, and flags duplicates by SHA-256. It writes a local CSV manifest by default; **does not upload, move or delete files**.

Optional categorized *copies*, still outside the public repository:

```bash
python3 scripts/index_cs_pdfs.py "$HOME/Downloads" \
  --copy-to "$HOME/Documents/Standard-Science-private/Books-by-Subject"
```

Only high-confidence title matches are copied. Unmatched files remain listed for manual review. Never copy book PDFs into `apps/web/public` or commit the local manifest.

## Maintaining the directory

- Edit `apps/web/src/data/computerScienceResources.ts` to add or update official URLs.
- Edit `apps/web/src/data/computerScienceBookCatalog.ts` to maintain the reading list.
- Do not link to unauthorized copies of copyrighted works.
- Keep paper metadata distinct: preprint vs peer-reviewed publication, and title record vs full-text access.
- Before adding a URL, verify it belongs to the named institution or project.

## Build

```bash
cd apps/web
npm ci
npm run build
```
