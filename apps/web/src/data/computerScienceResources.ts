/** Standard Science — curated primary-source research directory. */
export type ResearchResource = { id: string; group: string; title: string; url: string; note: string }
export type ResourceGroup = { name: string; description: string }
export const resourceGroups: ResourceGroup[] = [
  {
    "name": "Papers & Indexes",
    "description": "Research papers, proceedings, open-access archives, and discovery tools"
  },
  {
    "name": "Magazines & History",
    "description": "Readable technology magazines, reviews, and computing history"
  },
  {
    "name": "Books & Publishers",
    "description": "Books, technical monographs, academic publishers and catalogs"
  },
  {
    "name": "Societies & Communities",
    "description": "Professional associations, special interest groups and research communities"
  },
  {
    "name": "Learning & Events",
    "description": "Free talks, technical learning, student research and official curricula"
  },
  {
    "name": "Developers & Labs",
    "description": "Company research publications, engineering documents, and open-source projects"
  }
]
export const researchResources: ResearchResource[] = [
  {
    "id": "acm-digital-library",
    "group": "Papers & Indexes",
    "title": "ACM Digital Library",
    "url": "https://dl.acm.org/",
    "note": "ACM journals, proceedings, and scholarly publications"
  },
  {
    "id": "ieee-xplore",
    "group": "Papers & Indexes",
    "title": "IEEE Xplore",
    "url": "https://ieeexplore.ieee.org/",
    "note": "Electrical engineering and computer engineering publications"
  },
  {
    "id": "arxiv-computer-science",
    "group": "Papers & Indexes",
    "title": "arXiv Computer Science",
    "url": "https://arxiv.org/archive/cs",
    "note": "Open preprints; check peer-review status separately"
  },
  {
    "id": "dblp",
    "group": "Papers & Indexes",
    "title": "DBLP",
    "url": "https://dblp.org/",
    "note": "Bibliographic index of computer science literature"
  },
  {
    "id": "usenix-proceedings",
    "group": "Papers & Indexes",
    "title": "USENIX Proceedings",
    "url": "https://www.usenix.org/publications/proceedings",
    "note": "Systems, security, networking papers and talks"
  },
  {
    "id": "openreview",
    "group": "Papers & Indexes",
    "title": "OpenReview",
    "url": "https://openreview.net/",
    "note": "Conference submissions and peer review"
  },
  {
    "id": "pmlr",
    "group": "Papers & Indexes",
    "title": "PMLR",
    "url": "https://proceedings.mlr.press/",
    "note": "Machine learning conference proceedings"
  },
  {
    "id": "acl-anthology",
    "group": "Papers & Indexes",
    "title": "ACL Anthology",
    "url": "https://aclanthology.org/",
    "note": "NLP and computational linguistics papers"
  },
  {
    "id": "cvf-open-access",
    "group": "Papers & Indexes",
    "title": "CVF Open Access",
    "url": "https://openaccess.thecvf.com/",
    "note": "Computer vision conference papers"
  },
  {
    "id": "neurips-proceedings",
    "group": "Papers & Indexes",
    "title": "NeurIPS Proceedings",
    "url": "https://proceedings.neurips.cc/",
    "note": "Neural information processing systems proceedings"
  },
  {
    "id": "dagstuhl-drops",
    "group": "Papers & Indexes",
    "title": "Dagstuhl DROPS",
    "url": "https://drops.dagstuhl.de/",
    "note": "Theory of computing and informatics proceedings"
  },
  {
    "id": "semantic-scholar",
    "group": "Papers & Indexes",
    "title": "Semantic Scholar",
    "url": "https://www.semanticscholar.org/",
    "note": "Research literature search and citation network"
  },
  {
    "id": "google-scholar",
    "group": "Papers & Indexes",
    "title": "Google Scholar",
    "url": "https://scholar.google.com/",
    "note": "Cross-publisher scholarly discovery"
  },
  {
    "id": "rfc-editor",
    "group": "Papers & Indexes",
    "title": "RFC Editor",
    "url": "https://www.rfc-editor.org/",
    "note": "Internet standards and historical RFCs"
  },
  {
    "id": "communications-of-the-acm",
    "group": "Magazines & History",
    "title": "Communications of the ACM",
    "url": "https://cacm.acm.org/",
    "note": "ACM flagship computing magazine"
  },
  {
    "id": "acm-queue",
    "group": "Magazines & History",
    "title": "ACM Queue",
    "url": "https://queue.acm.org/",
    "note": "Software and systems engineering in practice"
  },
  {
    "id": "acm-ubiquity",
    "group": "Magazines & History",
    "title": "ACM Ubiquity",
    "url": "https://ubiquity.acm.org/",
    "note": "Computing perspectives and research viewpoints"
  },
  {
    "id": "acm-inroads",
    "group": "Magazines & History",
    "title": "ACM Inroads",
    "url": "https://inroads.acm.org/",
    "note": "Computer science teaching and curriculum"
  },
  {
    "id": "acm-xrds",
    "group": "Magazines & History",
    "title": "ACM XRDS",
    "url": "https://xrds.acm.org/",
    "note": "Student-oriented computing magazine"
  },
  {
    "id": "acm-interactions",
    "group": "Magazines & History",
    "title": "ACM interactions",
    "url": "https://interactions.acm.org/",
    "note": "Human-computer interaction magazine"
  },
  {
    "id": "acm-elearn",
    "group": "Magazines & History",
    "title": "ACM eLearn",
    "url": "https://elearnmag.acm.org/",
    "note": "Digital education and learning technology"
  },
  {
    "id": "ieee-spectrum",
    "group": "Magazines & History",
    "title": "IEEE Spectrum",
    "url": "https://spectrum.ieee.org/",
    "note": "Engineering and computing news and features"
  },
  {
    "id": "ieee-computer",
    "group": "Magazines & History",
    "title": "IEEE Computer",
    "url": "https://www.computer.org/csdl/magazine/co",
    "note": "IEEE Computer Society magazine"
  },
  {
    "id": "ieee-annals-of-the-history-of-computing",
    "group": "Magazines & History",
    "title": "IEEE Annals of the History of Computing",
    "url": "https://www.computer.org/csdl/magazine/an",
    "note": "Peer-reviewed history of computing"
  },
  {
    "id": "computer-history-museum",
    "group": "Magazines & History",
    "title": "Computer History Museum",
    "url": "https://computerhistory.org/",
    "note": "Historical archives, exhibits, and oral histories"
  },
  {
    "id": "acm-books",
    "group": "Books & Publishers",
    "title": "ACM Books",
    "url": "https://books.acm.org/",
    "note": "ACM research books and computing history"
  },
  {
    "id": "mit-press",
    "group": "Books & Publishers",
    "title": "MIT Press",
    "url": "https://mitpress.mit.edu/",
    "note": "Computer science and research monographs"
  },
  {
    "id": "mit-press-open-access",
    "group": "Books & Publishers",
    "title": "MIT Press Open Access",
    "url": "https://mitpress.mit.edu/open-access-at-mit-press/books/",
    "note": "Free-to-read books from MIT Press"
  },
  {
    "id": "springer-nature-lncs",
    "group": "Books & Publishers",
    "title": "Springer Nature / LNCS",
    "url": "https://link.springer.com/bookseries/558",
    "note": "Lecture Notes in Computer Science"
  },
  {
    "id": "cambridge-university-press",
    "group": "Books & Publishers",
    "title": "Cambridge University Press",
    "url": "https://www.cambridge.org/core/",
    "note": "Academic CS, mathematics and AI books"
  },
  {
    "id": "oxford-university-press",
    "group": "Books & Publishers",
    "title": "Oxford University Press",
    "url": "https://academic.oup.com/",
    "note": "Research books and scholarly journals"
  },
  {
    "id": "elsevier-morgan-kaufmann",
    "group": "Books & Publishers",
    "title": "Elsevier / Morgan Kaufmann",
    "url": "https://www.elsevier.com/",
    "note": "Computer architecture and technical books"
  },
  {
    "id": "siam-books",
    "group": "Books & Publishers",
    "title": "SIAM Books",
    "url": "https://www.siam.org/publications/books/",
    "note": "Scientific computing and applied mathematics"
  },
  {
    "id": "o-reilly",
    "group": "Books & Publishers",
    "title": "O'Reilly",
    "url": "https://www.oreilly.com/",
    "note": "Programming and systems engineering titles"
  },
  {
    "id": "manning",
    "group": "Books & Publishers",
    "title": "Manning",
    "url": "https://www.manning.com/",
    "note": "Practice-oriented software development books"
  },
  {
    "id": "no-starch-press",
    "group": "Books & Publishers",
    "title": "No Starch Press",
    "url": "https://nostarch.com/",
    "note": "Linux, security, and programming"
  },
  {
    "id": "pearson-addison-wesley",
    "group": "Books & Publishers",
    "title": "Pearson / Addison-Wesley",
    "url": "https://www.pearson.com/",
    "note": "Computing textbooks and professional references"
  },
  {
    "id": "wiley",
    "group": "Books & Publishers",
    "title": "Wiley",
    "url": "https://www.wiley.com/",
    "note": "Engineering and computational research books"
  },
  {
    "id": "crc-press",
    "group": "Books & Publishers",
    "title": "CRC Press",
    "url": "https://www.routledge.com/",
    "note": "Technical and mathematical references"
  },
  {
    "id": "acm",
    "group": "Societies & Communities",
    "title": "ACM",
    "url": "https://www.acm.org/",
    "note": "Global computing professional society"
  },
  {
    "id": "acm-membership",
    "group": "Societies & Communities",
    "title": "ACM Membership",
    "url": "https://www.acm.org/membership",
    "note": "Student and professional membership options"
  },
  {
    "id": "acm-special-interest-groups",
    "group": "Societies & Communities",
    "title": "ACM Special Interest Groups",
    "url": "https://www.acm.org/special-interest-groups",
    "note": "Domain-specific communities"
  },
  {
    "id": "acm-sigops",
    "group": "Societies & Communities",
    "title": "ACM SIGOPS",
    "url": "https://www.sigops.org/",
    "note": "Operating systems"
  },
  {
    "id": "acm-sigplan",
    "group": "Societies & Communities",
    "title": "ACM SIGPLAN",
    "url": "https://www.sigplan.org/",
    "note": "Programming languages"
  },
  {
    "id": "acm-sigarch",
    "group": "Societies & Communities",
    "title": "ACM SIGARCH",
    "url": "https://www.sigarch.org/",
    "note": "Computer architecture"
  },
  {
    "id": "acm-sigact",
    "group": "Societies & Communities",
    "title": "ACM SIGACT",
    "url": "https://sigact.acm.org/",
    "note": "Algorithms and theory"
  },
  {
    "id": "acm-sigai",
    "group": "Societies & Communities",
    "title": "ACM SIGAI",
    "url": "https://sigai.acm.org/",
    "note": "Artificial intelligence"
  },
  {
    "id": "acm-sigcomm",
    "group": "Societies & Communities",
    "title": "ACM SIGCOMM",
    "url": "https://www.sigcomm.org/",
    "note": "Networking"
  },
  {
    "id": "acm-sigecom",
    "group": "Societies & Communities",
    "title": "ACM SIGecom",
    "url": "https://www.sigecom.org/",
    "note": "Economics and computation"
  },
  {
    "id": "ieee",
    "group": "Societies & Communities",
    "title": "IEEE",
    "url": "https://www.ieee.org/",
    "note": "Global engineering professional association"
  },
  {
    "id": "ieee-computer-society",
    "group": "Societies & Communities",
    "title": "IEEE Computer Society",
    "url": "https://www.computer.org/",
    "note": "Computing professionals, research and education"
  },
  {
    "id": "usenix",
    "group": "Societies & Communities",
    "title": "USENIX",
    "url": "https://www.usenix.org/",
    "note": "Advanced computing systems research"
  },
  {
    "id": "aaai",
    "group": "Societies & Communities",
    "title": "AAAI",
    "url": "https://aaai.org/",
    "note": "Artificial intelligence research association"
  },
  {
    "id": "siam",
    "group": "Societies & Communities",
    "title": "SIAM",
    "url": "https://www.siam.org/",
    "note": "Industrial and applied mathematics"
  },
  {
    "id": "linux-foundation",
    "group": "Societies & Communities",
    "title": "Linux Foundation",
    "url": "https://www.linuxfoundation.org/",
    "note": "Open-source technologies and communities"
  },
  {
    "id": "cncf",
    "group": "Societies & Communities",
    "title": "CNCF",
    "url": "https://www.cncf.io/",
    "note": "Cloud-native software and open infrastructure"
  },
  {
    "id": "acm-techtalks",
    "group": "Learning & Events",
    "title": "ACM TechTalks",
    "url": "https://learning.acm.org/techtalks",
    "note": "Technical lectures and on-demand talks"
  },
  {
    "id": "acm-learning-center",
    "group": "Learning & Events",
    "title": "ACM Learning Center",
    "url": "https://learning.acm.org/",
    "note": "Professional education, workshops and resources"
  },
  {
    "id": "acm-bytecast",
    "group": "Learning & Events",
    "title": "ACM ByteCast",
    "url": "https://learning.acm.org/bytecast",
    "note": "Researcher conversations and interviews"
  },
  {
    "id": "acm-distinguished-speakers",
    "group": "Learning & Events",
    "title": "ACM Distinguished Speakers",
    "url": "https://speakers.acm.org/",
    "note": "Expert lectures"
  },
  {
    "id": "acm-student-research-competition",
    "group": "Learning & Events",
    "title": "ACM Student Research Competition",
    "url": "https://src.acm.org/",
    "note": "Student research opportunities"
  },
  {
    "id": "acm-cs-curricula",
    "group": "Learning & Events",
    "title": "ACM CS Curricula",
    "url": "https://csed.acm.org/",
    "note": "Computer science curriculum guidelines"
  },
  {
    "id": "ieee-computer-society-learning",
    "group": "Learning & Events",
    "title": "IEEE Computer Society Learning",
    "url": "https://www.computer.org/education",
    "note": "Computer Society education resources"
  },
  {
    "id": "mit-opencourseware",
    "group": "Learning & Events",
    "title": "MIT OpenCourseWare",
    "url": "https://ocw.mit.edu/",
    "note": "Open university computing courses"
  },
  {
    "id": "stanford-engineering-everywhere",
    "group": "Learning & Events",
    "title": "Stanford Engineering Everywhere",
    "url": "https://see.stanford.edu/",
    "note": "Open Stanford engineering courses"
  },
  {
    "id": "nvidia-deep-learning-institute",
    "group": "Learning & Events",
    "title": "NVIDIA Deep Learning Institute",
    "url": "https://www.nvidia.com/en-us/training/",
    "note": "GPU, CUDA and AI learning"
  },
  {
    "id": "microsoft-learn",
    "group": "Learning & Events",
    "title": "Microsoft Learn",
    "url": "https://learn.microsoft.com/training/",
    "note": "Free technical training"
  },
  {
    "id": "google-for-developers",
    "group": "Learning & Events",
    "title": "Google for Developers",
    "url": "https://developers.google.com/",
    "note": "Developer guides and events"
  },
  {
    "id": "google-research",
    "group": "Developers & Labs",
    "title": "Google Research",
    "url": "https://research.google/",
    "note": "Research publications and projects"
  },
  {
    "id": "google-deepmind",
    "group": "Developers & Labs",
    "title": "Google DeepMind",
    "url": "https://deepmind.google/research/",
    "note": "Frontier AI research"
  },
  {
    "id": "microsoft-research",
    "group": "Developers & Labs",
    "title": "Microsoft Research",
    "url": "https://www.microsoft.com/en-us/research/",
    "note": "Computing and AI publications"
  },
  {
    "id": "nvidia-developer",
    "group": "Developers & Labs",
    "title": "NVIDIA Developer",
    "url": "https://developer.nvidia.com/",
    "note": "CUDA, GPU software, tools and documentation"
  },
  {
    "id": "nvidia-cuda-documentation",
    "group": "Developers & Labs",
    "title": "NVIDIA CUDA Documentation",
    "url": "https://docs.nvidia.com/cuda/",
    "note": "CUDA programming and performance guides"
  },
  {
    "id": "openai-research",
    "group": "Developers & Labs",
    "title": "OpenAI Research",
    "url": "https://openai.com/research/",
    "note": "AI technical reports and research"
  },
  {
    "id": "meta-ai-research",
    "group": "Developers & Labs",
    "title": "Meta AI Research",
    "url": "https://ai.meta.com/research/",
    "note": "AI and systems research"
  },
  {
    "id": "github-open-source",
    "group": "Developers & Labs",
    "title": "GitHub Open Source",
    "url": "https://github.com/topics/computer-science",
    "note": "Community code and repositories"
  },
  {
    "id": "linux-kernel-archives",
    "group": "Developers & Labs",
    "title": "Linux Kernel Archives",
    "url": "https://www.kernel.org/",
    "note": "Linux releases and technical resources"
  },
  {
    "id": "linux-kernel-documentation",
    "group": "Developers & Labs",
    "title": "Linux Kernel Documentation",
    "url": "https://docs.kernel.org/",
    "note": "Kernel subsystem guides and internals"
  },
  {
    "id": "llvm-project",
    "group": "Developers & Labs",
    "title": "LLVM Project",
    "url": "https://llvm.org/",
    "note": "Compilers, toolchains and language infrastructure"
  },
  {
    "id": "pytorch",
    "group": "Developers & Labs",
    "title": "PyTorch",
    "url": "https://pytorch.org/",
    "note": "Open machine learning framework"
  },
  {
    "id": "aws-builders-library",
    "group": "Developers & Labs",
    "title": "AWS Builders' Library",
    "url": "https://aws.amazon.com/builders-library/",
    "note": "Real-world distributed systems design"
  }
]
