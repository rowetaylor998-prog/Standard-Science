export type ComputerScienceSubject = {
  title: string
  description: string
  route?: string
}

export type LibraryCollection = {
  title: string
  description: string
  examples: string[]
}

export type ComputerScientist = {
  name: string
  years?: string
  fields: string[]
  note: string
}

export type HistoryEra = {
  period: string
  title: string
  description: string
  milestones: string[]
}

export type PracticeProject = {
  title: string
  level: 'Foundation' | 'Applied' | 'Capstone'
  description: string
  subjects: string[]
  outcome: string
}

export const computerScienceSubjects: ComputerScienceSubject[] = [
  {
    title: 'Mathematical Foundations',
    description:
      'Discrete mathematics, logic, probability, statistics, linear algebra, proof, and the mathematical language used throughout computing.'
  },
  {
    title: 'Theory of Computation',
    description:
      'Automata, formal languages, computability, complexity, and the limits of what machines can compute.'
  },
  {
    title: 'Algorithms & Data Structures',
    description:
      'Algorithm design, complexity, data structures, graph methods, optimization, approximation, and modern algorithmic systems.',
    route: '/computer-science/subjects/algorithms'
  },
  {
    title: 'Programming',
    description:
      'Program construction, debugging, decomposition, testing, APIs, tooling, and the craft of turning ideas into working software.'
  },
  {
    title: 'Programming Languages',
    description:
      'Language paradigms, type systems, semantics, abstraction, runtime systems, and the design of programming languages.'
  },
  {
    title: 'Compilers',
    description:
      'Lexing, parsing, intermediate representations, optimization, code generation, interpreters, JITs, and toolchains.'
  },
  {
    title: 'Computer Architecture',
    description:
      'Processors, instruction sets, memory hierarchies, accelerators, GPUs, storage, and the hardware organization beneath software.'
  },
  {
    title: 'Operating Systems',
    description:
      'Processes, threads, scheduling, virtual memory, file systems, concurrency, virtualization, devices, and resource management.'
  },
  {
    title: 'Networking & Internet',
    description:
      'Protocols, routing, transport, distributed communication, internet architecture, network measurement, reliability, and performance.'
  },
  {
    title: 'Databases & Data Systems',
    description:
      'Data models, storage engines, indexes, transactions, query processing, analytics, streaming, and modern data infrastructure.'
  },
  {
    title: 'Distributed & Parallel Computing',
    description:
      'Concurrency, parallel algorithms, distributed systems, cloud systems, clusters, consistency, fault tolerance, and high-performance computing.'
  },
  {
    title: 'Security & Cryptography',
    description:
      'Cryptographic foundations, system security, software security, network security, privacy, authentication, and trustworthy computing.'
  },
  {
    title: 'Software Engineering',
    description:
      'Architecture, requirements, testing, maintenance, reliability, DevOps, collaboration, code review, and large-scale software development.'
  },
  {
    title: 'Graphics & Human–Computer Interaction',
    description:
      'Computer graphics, visualization, interactive systems, user interfaces, accessibility, and how people work with computing systems.'
  },
  {
    title: 'Artificial Intelligence',
    description:
      'Machine learning, deep learning, language models, computer vision, agents, reasoning, robotics, evaluation, and AI systems.'
  },
  {
    title: 'Specialized Computing Systems',
    description:
      'Embedded, mobile, web, edge, cyber-physical, real-time, scientific, and domain-specific computing systems.'
  }
]

export const libraryCollections: LibraryCollection[] = [
  {
    title: 'Foundations of Computing',
    description:
      'Primary works on computation, information, logic, automata, computability, and the mathematical foundations of computer science.',
    examples: ['Turing', 'Church', 'Shannon', 'early computability and information theory']
  },
  {
    title: 'Early Computers & Architecture',
    description:
      'Reports, manuals, papers, and technical records from the development of programmable electronic computers and modern architecture.',
    examples: ['von Neumann', 'ENIAC', 'IAS', 'early stored-program systems']
  },
  {
    title: 'Programming Languages & Compilers',
    description:
      'Language specifications, compiler papers, manuals, source code, and documents tracing the evolution of software abstraction.',
    examples: ['Hopper', 'FORTRAN', 'Lisp', 'C', 'Smalltalk', 'modern compiler infrastructure']
  },
  {
    title: 'Algorithms & Theory',
    description:
      'Books, papers, lecture notes, and technical documents on algorithms, complexity, data structures, optimization, and computation theory.',
    examples: ['Knuth', 'Dijkstra', 'graph algorithms', 'complexity theory']
  },
  {
    title: 'UNIX, Operating Systems & Systems Software',
    description:
      'Source code, manuals, papers, and documentation for operating systems, systems programming, and foundational software platforms.',
    examples: ['UNIX', 'BSD', 'GNU', 'Linux', 'systems papers']
  },
  {
    title: 'Networks & the Internet',
    description:
      'RFCs, protocol specifications, research papers, manuals, and historical documents on packet networking and the internet.',
    examples: ['ARPANET', 'TCP/IP', 'RFCs', 'the Web', 'network measurement']
  },
  {
    title: 'Database Systems',
    description:
      'Foundational database papers, query languages, system manuals, transaction research, distributed databases, and data infrastructure.',
    examples: ['relational model', 'SQL systems', 'transactions', 'distributed databases']
  },
  {
    title: 'Graphics, Interfaces & Interactive Computing',
    description:
      'Works on graphics, visualization, interactive computing, human–computer interaction, interface systems, and digital media.',
    examples: ['interactive graphics', 'GUI systems', 'visualization', 'HCI']
  },
  {
    title: 'Security & Cryptography',
    description:
      'Public papers, standards, protocols, and historical documents on cryptography, security engineering, privacy, and secure systems.',
    examples: ['public-key cryptography', 'security protocols', 'standards', 'system security']
  },
  {
    title: 'Parallel & Distributed Systems',
    description:
      'Research on concurrency, distributed algorithms, fault tolerance, consistency, clusters, cloud infrastructure, and parallel computing.',
    examples: ['Lamport', 'consensus', 'distributed storage', 'parallel systems']
  },
  {
    title: 'Artificial Intelligence',
    description:
      'Papers, technical reports, datasets, benchmarks, model documentation, and historical material across the development of AI.',
    examples: ['McCarthy', 'expert systems', 'machine learning', 'deep learning', 'language models']
  },
  {
    title: 'Open Source & Modern Computing',
    description:
      'Source repositories, design documents, manuals, project histories, and standards from the open-source software ecosystem.',
    examples: ['GNU', 'Linux', 'Python', 'Git', 'LLVM', 'Kubernetes']
  }
]

export const computerScientists: ComputerScientist[] = [
  {
    name: 'Alan Turing',
    years: '1912–1954',
    fields: ['Computation', 'AI', 'Cryptanalysis'],
    note: 'Foundational work on computability, universal computation, machine intelligence, and wartime cryptanalysis.'
  },
  {
    name: 'John von Neumann',
    years: '1903–1957',
    fields: ['Architecture', 'Numerical Computing'],
    note: 'Major influence on stored-program computer architecture, numerical methods, and early modern computing.'
  },
  {
    name: 'Claude Shannon',
    years: '1916–2001',
    fields: ['Information Theory', 'Digital Logic'],
    note: 'Established information theory and helped connect Boolean logic to digital circuit design.'
  },
  {
    name: 'Grace Hopper',
    years: '1906–1992',
    fields: ['Compilers', 'Programming Languages'],
    note: 'Pioneer of compilers, programming language design, and machine-independent programming.'
  },
  {
    name: 'John McCarthy',
    years: '1927–2011',
    fields: ['Artificial Intelligence', 'Programming Languages'],
    note: 'Coined the term artificial intelligence and created Lisp, shaping both AI research and language design.'
  },
  {
    name: 'Edsger W. Dijkstra',
    years: '1930–2002',
    fields: ['Algorithms', 'Programming', 'Distributed Systems'],
    note: 'Influential work on algorithms, structured programming, concurrency, and rigorous software reasoning.'
  },
  {
    name: 'Donald Knuth',
    years: '1938–',
    fields: ['Algorithms', 'Analysis of Algorithms', 'Typesetting'],
    note: 'Author of The Art of Computer Programming and a central figure in rigorous algorithm analysis.'
  },
  {
    name: 'Barbara Liskov',
    years: '1939–',
    fields: ['Programming Languages', 'Distributed Systems'],
    note: 'Pioneering work on data abstraction, programming language design, distributed systems, and the Liskov substitution principle.'
  },
  {
    name: 'Dennis Ritchie',
    years: '1941–2011',
    fields: ['Operating Systems', 'Programming Languages'],
    note: 'Co-creator of UNIX and creator of the C programming language.'
  },
  {
    name: 'Ken Thompson',
    years: '1943–',
    fields: ['Operating Systems', 'Programming Languages'],
    note: 'Co-creator of UNIX and contributor to systems software, languages, and modern software infrastructure.'
  },
  {
    name: 'Leslie Lamport',
    years: '1941–',
    fields: ['Distributed Systems', 'Concurrency'],
    note: 'Foundational work on distributed systems, logical clocks, consistency, and formal reasoning.'
  },
  {
    name: 'Tim Berners-Lee',
    years: '1955–',
    fields: ['Web', 'Internet'],
    note: 'Inventor of the World Wide Web and key contributor to open web standards.'
  },
  {
    name: 'Linus Torvalds',
    years: '1969–',
    fields: ['Operating Systems', 'Open Source'],
    note: 'Creator of Linux and Git, with major influence on open-source systems engineering.'
  },
  {
    name: 'Geoffrey Hinton',
    years: '1947–',
    fields: ['Artificial Intelligence', 'Neural Networks'],
    note: 'Major contributor to neural networks, representation learning, and the modern deep-learning era.'
  },
  {
    name: 'Yann LeCun',
    years: '1960–',
    fields: ['Artificial Intelligence', 'Computer Vision'],
    note: 'Pioneering work on convolutional neural networks, representation learning, and machine learning.'
  },
  {
    name: 'Yoshua Bengio',
    years: '1964–',
    fields: ['Artificial Intelligence', 'Deep Learning'],
    note: 'Major contributions to neural networks, representation learning, generative models, and deep learning.'
  }
]

export const computerScienceHistory: HistoryEra[] = [
  {
    period: 'Before 1945',
    title: 'Foundations Before Electronic Computing',
    description:
      'Logic, mechanical calculation, formal computation, information, and the intellectual foundations that made computer science possible.',
    milestones: ['formal logic', 'mechanical calculation', 'Turing machines', 'information and switching theory']
  },
  {
    period: '1940s–1950s',
    title: 'Electronic Computers & Stored Programs',
    description:
      'Electronic digital computers moved from wartime machines and laboratory projects toward programmable general-purpose systems.',
    milestones: ['ENIAC', 'stored-program architecture', 'early programming', 'numerical computing']
  },
  {
    period: '1950s–1960s',
    title: 'Programming Languages, AI & Operating Systems',
    description:
      'Higher-level languages, compilers, early AI, time-sharing, and operating systems transformed computers into broader research and production tools.',
    milestones: ['FORTRAN', 'Lisp', 'COBOL', 'time-sharing', 'early artificial intelligence']
  },
  {
    period: '1960s–1970s',
    title: 'Theory, Databases, Networks & UNIX',
    description:
      'Computer science matured as an academic discipline while systems research produced databases, packet networks, UNIX, and new algorithmic foundations.',
    milestones: ['relational databases', 'ARPANET', 'UNIX', 'complexity theory', 'structured programming']
  },
  {
    period: '1980s–1990s',
    title: 'Personal Computing, the Internet & Open Systems',
    description:
      'Personal computers, graphical interfaces, networking, the Web, and free/open-source software broadened computing beyond specialist institutions.',
    milestones: ['PCs', 'GUIs', 'TCP/IP', 'World Wide Web', 'GNU/Linux']
  },
  {
    period: '2000s–2010s',
    title: 'Cloud, Mobile, Data & Machine Learning',
    description:
      'Large-scale distributed infrastructure, smartphones, data platforms, GPUs, and machine learning reshaped software and computing research.',
    milestones: ['cloud computing', 'smartphones', 'big data', 'GPUs', 'deep learning']
  },
  {
    period: '2020s–',
    title: 'Foundation Models, Accelerated Computing & Autonomous Systems',
    description:
      'Large models, specialized accelerators, robotics, autonomous systems, and AI-native software are changing the structure of computing again.',
    milestones: ['foundation models', 'AI accelerators', 'agents', 'robotics', 'edge AI']
  }
]

export const practiceProjects: PracticeProject[] = [
  {
    title: 'Speech-to-Text Pipeline',
    level: 'Foundation',
    description:
      'Build a local speech-recognition pipeline, measure latency and accuracy, and study the path from audio input to decoded text.',
    subjects: ['Programming', 'AI', 'Signal Processing', 'Systems'],
    outcome: 'A working local transcription tool with a small evaluation report.'
  },
  {
    title: 'Search & Retrieval Engine',
    level: 'Foundation',
    description:
      'Index a real document collection, implement ranking, measure retrieval quality, and compare lexical and embedding-based search.',
    subjects: ['Algorithms', 'Databases', 'AI', 'Information Retrieval'],
    outcome: 'A searchable document system with reproducible quality metrics.'
  },
  {
    title: 'Page-Replacement & Memory Simulator',
    level: 'Foundation',
    description:
      'Simulate virtual memory under realistic workloads and compare FIFO, LRU, clock, and workload-aware replacement strategies.',
    subjects: ['Operating Systems', 'Algorithms', 'Computer Architecture'],
    outcome: 'A simulator, charts, and a short engineering analysis.'
  },
  {
    title: 'Distributed Key-Value Store',
    level: 'Applied',
    description:
      'Build a small replicated service and explore partitioning, consistency, failure handling, observability, and recovery.',
    subjects: ['Distributed Systems', 'Networking', 'Databases', 'Software Engineering'],
    outcome: 'A multi-node prototype with failure tests and design notes.'
  },
  {
    title: 'RAG Knowledge Assistant',
    level: 'Applied',
    description:
      'Build retrieval-augmented generation over a controlled document collection and evaluate retrieval quality, citation accuracy, and failure modes.',
    subjects: ['AI', 'Databases', 'Search', 'Software Engineering'],
    outcome: 'A grounded assistant with an evaluation set and error analysis.'
  },
  {
    title: 'Autonomous-Driving Perception Simulator',
    level: 'Applied',
    description:
      'Work with recorded or simulated road scenes to detect objects, estimate lanes or free space, and measure perception quality without controlling a real vehicle.',
    subjects: ['Computer Vision', 'AI', 'Robotics', 'Parallel Computing'],
    outcome: 'A perception demo with visualized outputs and benchmark results.'
  },
  {
    title: 'Robot Navigation Simulator',
    level: 'Applied',
    description:
      'Combine mapping, localization, planning, and control in simulation so a robot can navigate a changing environment.',
    subjects: ['Robotics', 'Algorithms', 'AI', 'Control', 'Systems'],
    outcome: 'A simulated robot that completes navigation tasks with measurable success criteria.'
  },
  {
    title: 'GPU Kernel & Accelerator Lab',
    level: 'Applied',
    description:
      'Implement and profile parallel kernels, study memory hierarchy and throughput, then compare alternative optimization strategies.',
    subjects: ['Computer Architecture', 'Parallel Computing', 'Programming', 'AI Systems'],
    outcome: 'A benchmarked kernel suite with profiling evidence.'
  },
  {
    title: 'Processor Cache & Pipeline Simulator',
    level: 'Applied',
    description:
      'Model cache behavior and instruction pipelines, then test how workloads respond to architectural changes.',
    subjects: ['Computer Architecture', 'Algorithms', 'Performance Engineering'],
    outcome: 'A simulator with workload traces and design trade-off analysis.'
  },
  {
    title: 'Reusable-Rocket Landing Simulator',
    level: 'Capstone',
    description:
      'Build a software simulation of vertical landing using numerical integration, state estimation, optimization, and feedback control.',
    subjects: ['Programming', 'Numerical Methods', 'Control', 'Optimization', 'Simulation'],
    outcome: 'A reproducible landing simulation and engineering report; no physical propulsion system is required.'
  },
  {
    title: 'Autonomous Aerial Navigation Simulator',
    level: 'Capstone',
    description:
      'Use simulated sensors to perform localization, route planning, obstacle avoidance, and robust navigation for an aerial robot.',
    subjects: ['Robotics', 'AI', 'Networking', 'Control', 'Simulation'],
    outcome: 'A non-weaponized autonomous navigation simulation with test scenarios.'
  },
  {
    title: 'Open AI Systems Stack',
    level: 'Capstone',
    description:
      'Assemble model serving, retrieval, evaluation, observability, caching, and accelerated inference into a complete open AI application stack.',
    subjects: ['AI', 'Distributed Systems', 'Databases', 'Networking', 'Software Engineering'],
    outcome: 'A deployable system with benchmarks, evaluation, and architecture documentation.'
  }
]
