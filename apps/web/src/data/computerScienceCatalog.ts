import { computerScienceSubjects } from './computerScienceArchive'
import { computerScienceLibraryWorks, type LibraryWork } from './computerScienceLibrary'

export type LibraryView = 'subjects' | 'topics' | 'resources'
export type LibraryDetailRoute = `/computer-science/library/subjects/${string}` | `/computer-science/library/topics/${string}`
export const slug = (name: string) => name.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const subjects = computerScienceSubjects.map(subject => ({ ...subject, id: slug(subject.title) }))
export const subjectRoute = (id: string): LibraryDetailRoute => `/computer-science/library/subjects/${id}`
export const topicRoute = (id: string): LibraryDetailRoute => `/computer-science/library/topics/${id}`
export function isLibraryDetailPath(path: string): path is LibraryDetailRoute {
  return /^\/computer-science\/library\/(subjects|topics)\/[^/]+$/.test(path)
}

// Each topic has a canonical identity. Multiple subjects can refer to it.
type TopicSeed = [string, string[], string, string[]?]
const seeds: TopicSeed[] = [
  ['Discrete Mathematics', ['Mathematical Foundations','Theory of Computation'], 'Sets, relations, combinatorics, graphs and discrete proofs.'],
  ['Logic & Proof', ['Mathematical Foundations','Theory of Computation'], 'Propositional and predicate logic, formal proof and inference.'],
  ['Probability & Statistics', ['Mathematical Foundations','Artificial Intelligence'], 'Probability models, statistical inference and uncertainty.'],
  ['Linear Algebra', ['Mathematical Foundations','Artificial Intelligence','Graphics & Human–Computer Interaction'], 'Vectors, matrices, transformations and numerical linear algebra.'],
  ['Automata & Formal Languages', ['Theory of Computation','Programming Languages','Compilers'], 'Automata, grammars and language recognition.'],
  ['Computability', ['Theory of Computation'], 'Computable functions, Turing machines and undecidability.'],
  ['Complexity Theory', ['Theory of Computation','Algorithms & Data Structures','Quantum Computing'], 'Time, space and computational complexity classes.', ['Complexity']],
  ['Quantum Information', ['Quantum Computing','Mathematical Foundations'], 'Quantum states, circuits and information.'],
  ['Quantum Algorithms', ['Quantum Computing','Algorithms & Data Structures'], 'Quantum algorithm design, applications and complexity.'],
  ['Quantum Error Correction', ['Quantum Computing'], 'Quantum error correction and fault-tolerant computation.', ['Fault Tolerance']],
  ['Algorithm Design & Analysis', ['Algorithms & Data Structures','Mathematical Foundations'], 'Design techniques, correctness and asymptotic analysis.'],
  ['Data Structures', ['Algorithms & Data Structures','Programming','Databases & Data Systems'], 'Arrays, trees, heaps, hash tables and related structures.'],
  ['Sorting & Searching', ['Algorithms & Data Structures'], 'Ordering, selection and search algorithms.'],
  ['Graph Algorithms', ['Algorithms & Data Structures','Networking & Internet'], 'Graph traversal, shortest paths, spanning trees and flows.'],
  ['Dynamic Programming', ['Algorithms & Data Structures'], 'Overlapping subproblems and optimal substructure.'],
  ['Greedy Algorithms', ['Algorithms & Data Structures'], 'Greedy choice and correctness arguments.'],
  ['Randomized & Approximation Algorithms', ['Algorithms & Data Structures','Theory of Computation'], 'Randomized design and approximation guarantees.'],
  ['Numerical Computing', ['Algorithms & Data Structures','Mathematical Foundations','Specialized Computing Systems'], 'Numerical methods, scientific computing and error analysis.'],
  ['Python', ['Programming','Programming Languages','Artificial Intelligence'], 'Python language, implementations and scientific programming.'],
  ['C & C++', ['Programming','Programming Languages','Operating Systems'], 'Systems programming and language design.', ['C programming','C++']],
  ['Debugging & Testing', ['Programming','Software Engineering'], 'Debugging, tests and program correctness.'],
  ['Type Systems & Semantics', ['Programming Languages','Theory of Computation'], 'Types, formal semantics and language safety.'],
  ['Language Paradigms', ['Programming Languages','Programming'], 'Functional, imperative, object-oriented and other paradigms.'],
  ['Compiler Design', ['Compilers','Programming Languages'], 'Lexing, parsing, IR, optimization and code generation.'],
  ['LLVM', ['Compilers','Programming Languages','Computer Architecture'], 'Compiler infrastructure and intermediate representations.'],
  ['CPU & Instruction Sets', ['Computer Architecture'], 'Processors, instruction sets and pipelines.'],
  ['Memory Hierarchy', ['Computer Architecture','Operating Systems'], 'Caches, memory, locality and virtual memory.'],
  ['GPU Architecture', ['Computer Architecture','Distributed & Parallel Computing'], 'GPU execution, memory and accelerator organization.'],
  ['CUDA', ['Distributed & Parallel Computing','Computer Architecture','Programming','Compilers','Artificial Intelligence'], 'GPU programming, parallel execution, memory and performance optimization.', ['GPU computing','CUDA C++']],
  ['Unix', ['Operating Systems','Programming'], 'Unix design, history, interfaces and systems programming.', ['UNIX','BSD']],
  ['Linux', ['Operating Systems','Programming','Security & Cryptography'], 'Linux kernel, GNU/Linux systems and system interfaces.', ['GNU/Linux','Linux kernel']],
  ['Processes & Scheduling', ['Operating Systems','Distributed & Parallel Computing'], 'Processes, threads, synchronization and scheduling.'],
  ['File Systems & Storage', ['Operating Systems','Databases & Data Systems'], 'File systems, storage abstractions and persistence.'],
  ['Virtualization & Containers', ['Operating Systems','Distributed & Parallel Computing','Software Engineering'], 'Virtual machines, isolation and containers.', ['Docker','Kubernetes']],
  ['TCP/IP', ['Networking & Internet','Operating Systems'], 'Internet addressing, routing and transport protocols.', ['TCP','IP','UDP']],
  ['Routing & Switching', ['Networking & Internet'], 'Packet forwarding, routing protocols and network architecture.'],
  ['Web & HTTP', ['Networking & Internet','Specialized Computing Systems','Programming'], 'Web architecture, HTTP and browser/server interaction.', ['World Wide Web','HTTP','React']],
  ['Relational Databases & SQL', ['Databases & Data Systems','Programming'], 'Relational models, SQL and query processing.', ['PostgreSQL','SQLite','SQL']],
  ['Transactions & Indexes', ['Databases & Data Systems'], 'Transactions, concurrency control, indexes and storage engines.'],
  ['Distributed Databases', ['Databases & Data Systems','Distributed & Parallel Computing'], 'Partitioning, replication and distributed query processing.'],
  ['Consensus & Replication', ['Distributed & Parallel Computing','Databases & Data Systems'], 'Consistency, consensus, replication and fault tolerance.'],
  ['Parallel Algorithms', ['Distributed & Parallel Computing','Algorithms & Data Structures'], 'Parallel algorithm design and performance.'],
  ['Cloud & Cluster Computing', ['Distributed & Parallel Computing','Networking & Internet','Software Engineering'], 'Distributed infrastructure and cluster orchestration.'],
  ['Cryptography', ['Security & Cryptography','Mathematical Foundations'], 'Encryption, signatures, hashes and cryptographic protocols.'],
  ['System & Network Security', ['Security & Cryptography','Operating Systems','Networking & Internet'], 'System protection, authentication and network security.'],
  ['Software Architecture', ['Software Engineering','Programming'], 'Software structure, requirements and maintainability.'],
  ['Version Control & DevOps', ['Software Engineering','Programming'], 'Version control, build automation and delivery.', ['Git','CI/CD']],
  ['Computer Graphics', ['Graphics & Human–Computer Interaction','Mathematical Foundations'], 'Rendering, geometry and graphical computation.'],
  ['Human–Computer Interaction', ['Graphics & Human–Computer Interaction','Software Engineering'], 'Interaction design, usability and accessibility.', ['HCI','GUI']],
  ['Machine Learning', ['Artificial Intelligence','Mathematical Foundations'], 'Learning algorithms, generalization and evaluation.'],
  ['Deep Learning', ['Artificial Intelligence','Distributed & Parallel Computing'], 'Neural networks, optimization and model training.'],
  ['Transformer', ['Artificial Intelligence'], 'Attention-based neural architectures and sequence modeling.', ['Attention','LLM','Large Language Models','NLP']],
  ['Computer Vision', ['Artificial Intelligence','Graphics & Human–Computer Interaction'], 'Visual recognition, image models and perception.', ['CNN','ImageNet']],
  ['Robotics', ['Artificial Intelligence','Specialized Computing Systems'], 'Perception, planning and control in robotic systems.'],
  ['Embedded & Real-Time Systems', ['Specialized Computing Systems','Operating Systems','Computer Architecture'], 'Embedded hardware, real-time scheduling and resource constraints.'],
  ['Mobile & Edge Computing', ['Specialized Computing Systems','Networking & Internet'], 'Mobile platforms and edge computing systems.']
]
export const topics = seeds.map(([title, subjectNames, description, aliases = []]) => ({
  id: slug(title), title, description, aliases, subjectIds: subjectNames.map(slug)
}))
export type CatalogTopic = typeof topics[number]
export type CatalogSubject = typeof subjects[number]

// A bibliographic record is stored once; these links are metadata, not copies.
const workTopics: Record<string, string[]> = {
  'clrs-introduction-to-algorithms-4e': ['Algorithm Design & Analysis','Data Structures','Sorting & Searching','Graph Algorithms','Dynamic Programming','Greedy Algorithms','Randomized & Approximation Algorithms'],
  'nvidia-cuda-cpp-best-practices': ['CUDA','GPU Architecture','Parallel Algorithms'],
  'vaswani-2017-attention-is-all-you-need': ['Transformer','Deep Learning','Machine Learning'],
  'krizhevsky-2012-imagenet-classification': ['Computer Vision','Deep Learning','Machine Learning'],
  'dalzell-2025-quantum-algorithms': ['Quantum Algorithms','Quantum Information','Complexity Theory','Quantum Error Correction'],
  'linux-kernel-source': ['Linux'],
  'llvm-source': ['LLVM','Compiler Design'],
  'tcp-rfc-9293': ['TCP/IP']
}
const additionalWorks: LibraryWork[] = [
  { id:'linux-kernel-source', title:'Linux Kernel Source Code', authors:['Linux kernel contributors'], kind:'Source code', collection:'UNIX, Operating Systems & Systems Software', subjects:['Operating Systems'], openMode:'external', url:'https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/', source:'kernel.org' },
  { id:'llvm-source', title:'LLVM Project Source Code', authors:['LLVM contributors'], kind:'Source code', collection:'Programming Languages & Compilers', subjects:['Compilers','Programming Languages'], openMode:'external', url:'https://github.com/llvm/llvm-project', source:'LLVM Project' },
  { id:'tcp-rfc-9293', title:'RFC 9293 — Transmission Control Protocol (TCP)', authors:['W. Eddy (editor)'], year:2022, kind:'Standard', collection:'Networks & the Internet', subjects:['Networking & Internet'], openMode:'external', url:'https://www.rfc-editor.org/rfc/rfc9293', source:'RFC Editor' }
]
export const resources = [...computerScienceLibraryWorks, ...additionalWorks]
export const resourceKinds = [...new Set(resources.map(work => work.kind))].sort()
export const topicsForWork = (work: LibraryWork) => topics.filter(topic => (workTopics[work.id] ?? []).map(slug).includes(topic.id))
export const subjectsForWork = (work: LibraryWork) => subjects.filter(subject => work.subjects.includes(subject.title) || topicsForWork(work).some(topic => topic.subjectIds.includes(subject.id)))
export const worksForTopic = (id: string) => resources.filter(work => topicsForWork(work).some(topic => topic.id === id))
export const worksForSubject = (id: string) => resources.filter(work => subjectsForWork(work).some(subject => subject.id === id))
export const matches = (query: string, fields: (string | number | undefined)[]) => query.toLowerCase().trim().split(/\s+/).every(term => fields.join(' ').toLowerCase().includes(term))
export const matchesTopic = (query: string, topic: CatalogTopic) => matches(query,[topic.title,topic.description,...topic.aliases,...subjects.filter(s=>topic.subjectIds.includes(s.id)).map(s=>s.title)])
export const matchesWork = (query: string, work: LibraryWork) => matches(query,[work.title,...work.authors,work.year,work.kind,work.collection,work.note,work.source,...work.subjects,...topicsForWork(work).flatMap(t=>[t.title,...t.aliases]),...subjectsForWork(work).map(s=>s.title)])
