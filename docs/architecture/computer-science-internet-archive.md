# Computer Science Internet Archive — current architecture

## Main entrances

- Library — Subjects, Topics, Resources
- Guide — navigation, topic lookup, learning and archive guidance
- Computer Scientists
- History
- Practice & Projects

Archive tools remain FAQ, Lessons, About the Archive, Research Resources (external research directory), and Search.

## Library model

The 17 core subjects remain the primary disciplinary map. Topics have stable IDs and can be linked to multiple subjects. Resources (books, papers, standards, source code and technical documents) have one canonical bibliographic record per work/edition. Subject and topic indexes derive their entries from relationships, not duplicate copies. A resource may be associated directly with a subject and/or indirectly through topics.

The current implementation uses the existing TypeScript catalog, not a new database or API. `computerScienceCatalog.ts` defines topic relationships and derives indexes; existing reading routes and resource records are preserved. Topic coverage is an initial scaffold; empty collections are labeled. A later database migration can normalize these links into subject-topic, topic-resource and subject-resource relations.

Long works should normally begin as bibliographic entries linking to stable lawful sources. Selected shorter papers may receive HTML reading pages; existing local annotations are preserved.

## Active routes

- `/computer-science/library`
- `/computer-science/library/subjects` and `/computer-science/library/subjects/:id`
- `/computer-science/library/topics` and `/computer-science/library/topics/:id`
- `/computer-science/library/resources`
- `/computer-science/guide`
- `/computer-science/resources` — external research directory, distinct from Library resources
- Legacy `/computer-science/subjects` and `/computer-science/subjects/algorithms` remain available.
- Existing paper/book routes, scientists, history, practice, FAQ, search, and lessons remain available.

## Document reading standard

All local paper and book reading templates, and standalone Markdown reading routes, use the same neutral-white paper texture at `/reading/paper-texture.webp` and shared stylesheet `/reading/document-paper.css`. The asset is a web-optimized crop of the approved paper image, repeated at its native size across the full reading surface. No green frame, outer side panels, or card shadow. Archive home, Library indexes, Guide, Search, research directory and other navigation pages keep their existing styling. Original PDFs, figures, tables and annotations remain intact. Future standalone HTML reading pages can link the shared stylesheet and set `class="archive-paper"` on the body; React paper/book routes can reuse the document-reading shell.
