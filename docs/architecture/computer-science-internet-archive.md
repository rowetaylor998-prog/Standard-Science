# Computer Science Internet Archive — v0.1 Architecture

## Purpose

The Computer Science Internet Archive is the first fully developed subject archive inside Standard Science.

Its information architecture is organized around four orthogonal ways to navigate the same knowledge universe:

- **Subjects** — concepts and fields: what is being studied?
- **Library** — works and technical artifacts: what should be read, inspected, or preserved?
- **Computer Scientists** — people: who did the work?
- **History** — chronology and development: how did the field change over time?

Two additional systems connect knowledge to action and community:

- **Practice & Projects** — real-world engineering, experiments, simulations, and measurable artifacts.
- **Open Meetings** — live discussion and collaboration.

Supporting entrances:

- **Lessons** — learning methods and practical lessons.
- **Search** — archive-wide discovery.
- **About the Archive** — reserved for the Computer Science archive manifesto and project explanation.

## Current v0.1 routes

- `/computer-science`
- `/computer-science/subjects`
- `/computer-science/subjects/algorithms`
- `/computer-science/library`
- `/computer-science/library/reader`
- `/computer-science/scientists`
- `/computer-science/history`
- `/computer-science/practice-projects`
- `/computer-science/search`

Existing routes reused without structural rewrite:

- `/meetings`
- `/methods-and-lessons`

## Subject model

The first subject map uses sixteen top-level fields:

1. Mathematical Foundations
2. Theory of Computation
3. Algorithms & Data Structures
4. Programming
5. Programming Languages
6. Compilers
7. Computer Architecture
8. Operating Systems
9. Networking & Internet
10. Databases & Data Systems
11. Distributed & Parallel Computing
12. Security & Cryptography
13. Software Engineering
14. Graphics & Human–Computer Interaction
15. Artificial Intelligence
16. Specialized Computing Systems

The old 25-item Computer Science tree remains available as legacy source material during migration. It should not remain the long-term canonical navigation.

## Library model

The public Library stores or links to:

- bibliographic metadata
- public-domain material
- open-access works
- permissively licensed works
- lawful external sources
- papers
- source code
- RFCs and standards
- manuals
- lecture notes
- datasets and benchmarks
- historical documents

Copyrighted books owned by an individual user are not redistributed by Standard Science.

The Personal Reader opens local files on the user's device. The first version supports PDF, Markdown, and plain text. Local files are not uploaded by the reader.

Long-term reading architecture:

```
PDF / EPUB / HTML / LaTeX / Markdown
                ↓
        ingestion / parsing
                ↓
      canonical document model
                ↓
     Standard Science web reader
                ↓
 annotations / search / links / AI context
```

The preferred public reading form is structured web text when legally and technically possible. PDF remains an archival and compatibility fallback.

## Annotation principle

Annotations should ultimately follow a stable document-selection model rather than raw visual coordinates alone.

Desired capabilities:

- selected quote
- surrounding context
- note type
- user note
- timestamp
- stable document/block identity

The existing AnnotationPanel remains useful as an MVP and should be migrated rather than discarded.

## Practice & Projects principle

Projects should connect theory to modern, real technology.

Preferred sequence:

```
Subject
  ↓
Concept
  ↓
Mini Lab
  ↓
Applied Project
  ↓
Capstone
```

Projects should produce a measurable artifact and explicit evidence that the implementation works.

Examples include search systems, speech-to-text, distributed storage, autonomous-driving perception simulation, robot navigation simulation, GPU kernels, architecture simulation, reusable-rocket landing simulation, and open AI systems.

## AI principle

Do not advertise a generic AI chat box as a primary archive feature.

AI becomes valuable when it is archive-aware and context-aware:

- current subject
- current document
- current paragraph or selection
- current project
- current exercise or error
- annotations and notes
- relevant Library works

The existing AI provider abstraction and annotation-improvement backend are retained for later integration.

## Legacy migration

### Keep and migrate

- Markdown content engine
- content indexing and search
- AI provider abstraction
- annotation system
- Open Meetings
- Computer Science legacy tree as migration source
- Algorithms Markdown content
- Methods & Lessons
- deployment scripts and Docker configuration
- contribution/governance documents

### Split or relocate

- old KnowledgePage → Subjects + Library + Search + other discipline archives
- old People database → appropriate historical/social-science archive, not Computer Scientists
- political-economy material → Social Science / Political Thought
- general Methods & Lessons → general lessons plus future discipline-specific lessons

### Retire from primary navigation

- old global Navigation for new archive routes
- old KnowledgePage as an all-purpose hub
- old VitePress navigation after content migration
- Archive of Sparks as a primary Computer Science product feature
- generic AI Tutor button on the Computer Science archive homepage

## Source-of-truth direction

The long-term source of truth should be structured content and metadata, rendered by the React application.

Legacy VitePress structures may remain temporarily for migration and archival reference, but they should not compete with the new archive information architecture.
