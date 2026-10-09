export type LibraryWorkKind =
  | 'Book'
  | 'Paper'
  | 'Technical guide'
  | 'Standard'
  | 'Manual'
  | 'Lecture notes'
  | 'Dataset'

export type LibraryOpenMode = 'external' | 'static-html' | 'route'

export type LibraryWork = {
  id: string
  title: string
  authors: string[]
  year?: number
  kind: LibraryWorkKind
  collection: string
  subjects: string[]
  openMode: LibraryOpenMode
  url: string
  pdf?: string
  pdfLabel?: string
  source?: string
  license?: string
  note?: string
}

export const computerScienceLibraryWorks: LibraryWork[] = [
  {
    id: 'clrs-introduction-to-algorithms-4e',
    title: 'Introduction to Algorithms, Fourth Edition',
    authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
    year: 2022,
    kind: 'Book',
    collection: 'Algorithms & Theory',
    subjects: ['Algorithms & Data Structures'],
    openMode: 'external',
    url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
    source: 'MIT Press',
    note: 'Fourth edition · official publisher page.'
  },
  {
    id: 'nvidia-cuda-cpp-best-practices',
    title: 'CUDA C++ Best Practices Guide',
    authors: ['NVIDIA'],
    kind: 'Technical guide',
    collection: 'Parallel & Distributed Systems',
    subjects: ['Parallel & Distributed Computing', 'Computer Architecture'],
    openMode: 'external',
    url: 'https://docs.nvidia.com/cuda/pdf/CUDA_C_Best_Practices_Guide.pdf',
    pdf: 'https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/index.html',
    pdfLabel: 'Official HTML documentation ↗',
    source: 'NVIDIA',
    note: 'Official NVIDIA documentation.'
  },
  {
    id: 'vaswani-2017-attention-is-all-you-need',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani et al.'],
    year: 2017,
    kind: 'Paper',
    collection: 'Artificial Intelligence',
    subjects: ['Artificial Intelligence', 'Machine Learning'],
    openMode: 'static-html',
    url: '/papers/attention-is-all-you-need.html',
    pdf: 'https://arxiv.org/pdf/1706.03762v1',
    pdfLabel: 'Original PDF ↗',
    source: 'arXiv',
    note: 'MIA-style HTML transcription with formulas, tables, references, and local annotations.'
  },
  {
    id: 'krizhevsky-2012-imagenet-classification',
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: ['Alex Krizhevsky', 'Ilya Sutskever', 'Geoffrey E. Hinton'],
    year: 2012,
    kind: 'Paper',
    collection: 'Artificial Intelligence',
    subjects: ['Artificial Intelligence', 'Computer Vision'],
    openMode: 'route',
    url: '/computer-science/library/imagenet-classification',
    pdf: 'https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf',
    pdfLabel: 'Original PDF ↗',
    source: 'NeurIPS',
    note: 'HTML reading page plus the original NeurIPS PDF.'
  },
  {
    id: 'dalzell-2025-quantum-algorithms',
    title: 'Quantum Algorithms: A Survey of Applications and End-to-end Complexities',
    authors: ['Alexander M. Dalzell', 'Sam McArdle', 'Mario Berta', 'Przemysław Bienias', 'Chi-Fang Chen', 'András Gilyén', 'Connor T. Hann', 'Michael J. Kastoryano', 'Emil T. Khabiboulline', 'Aleksander Kubica', 'Grant Salton', 'Samson Wang', 'Fernando G. S. L. Brandão'],
    year: 2025,
    kind: 'Book',
    collection: 'Quantum Computing',
    subjects: ['Quantum Computing', 'Quantum Algorithms', 'Complexity', 'Fault Tolerance'],
    openMode: 'route',
    url: '/computer-science/library/quantum-algorithms',
    pdf: 'https://doi.org/10.1017/9781009639651',
    pdfLabel: 'Official open-access edition / DOI ↗',
    source: 'Cambridge University Press & Assessment',
    license: 'CC BY-NC-ND 4.0',
    note: 'HTML reading sample covers the preface and opening application material; the complete official open-access edition is available through the DOI.'
  }
]
