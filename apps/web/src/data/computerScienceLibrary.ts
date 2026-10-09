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
    subjects: ['Algorithms & Data Structures'],
    openMode: 'external',
    url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
    source: 'MIT Press',
    note: 'Fourth edition.'
  },
  {
    id: 'nvidia-cuda-cpp-best-practices',
    title: 'CUDA C++ Best Practices Guide',
    authors: ['NVIDIA'],
    kind: 'Technical guide',
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
    subjects: ['Artificial Intelligence', 'Machine Learning'],
    openMode: 'static-html',
    url: '/papers/attention-is-all-you-need.html',
    pdf: 'https://arxiv.org/pdf/1706.03762v1',
    pdfLabel: 'Original PDF ↗',
    source: 'arXiv',
    note: 'Complete MIA-style HTML transcription with formulas, tables, references, and local annotations.'
  },
  {
    id: 'krizhevsky-2012-imagenet-classification',
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: ['Alex Krizhevsky', 'Ilya Sutskever', 'Geoffrey E. Hinton'],
    year: 2012,
    kind: 'Paper',
    subjects: ['Artificial Intelligence', 'Computer Vision'],
    openMode: 'route',
    url: '/computer-science/library/imagenet-classification',
    pdf: 'https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf',
    pdfLabel: 'Original PDF ↗',
    source: 'NeurIPS',
    note: 'HTML reading page plus the original NeurIPS PDF.'
  }
]
