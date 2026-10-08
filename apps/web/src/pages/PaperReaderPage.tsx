import type { RoutePath } from '../App'

type PaperKey = 'transformer' | 'alexnet'
type Props = { onNavigate: (route: RoutePath) => void; paper: PaperKey }

const papers = {
  transformer: {
    title: 'Attention Is All You Need',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin',
    citation: 'arXiv:1706.03762v1 · 12 June 2017',
    pdf: 'https://arxiv.org/pdf/1706.03762v1',
    summary: 'The authors propose the Transformer: a sequence-to-sequence architecture using attention mechanisms in place of recurrent and convolutional layers. Their machine-translation experiments show high quality with improved training parallelism.',
    sections: [
      { heading: '1. Introduction', text: 'Earlier sequence-transduction models relied primarily on recurrent neural networks, including LSTM and gated recurrent architectures. Sequential computation made training difficult to parallelize. The paper presents attention as an alternative for relating distant positions within sequences.' },
      { heading: '2. Background', text: 'The model aims to reduce sequential operations and shorten paths between different sequence positions. Self-attention computes representations by relating positions within the same sequence.' },
      { heading: '3. Model Architecture', text: 'The original design follows an encoder–decoder structure with stacked attention and position-wise feed-forward layers. Its key building blocks include scaled dot-product attention, multi-head attention, and positional encoding.' }
    ],
    keywords: ['Transformer', 'Self-attention', 'Multi-head attention', 'Encoder–decoder']
  },
  alexnet: {
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: 'Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton',
    citation: 'Advances in Neural Information Processing Systems · 2012',
    pdf: 'https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf',
    summary: 'The authors train a deep convolutional neural network for classifying images from the ImageNet dataset. Their system combines learned convolutional features with efficient GPU computation and techniques for reducing overfitting.',
    sections: [
      { heading: '1. Introduction', text: 'Image recognition benefits from larger datasets and models with greater learning capacity. Convolutional neural networks are suitable for image data because of local structure and shared parameters, while GPUs make larger-scale training practical.' },
      { heading: '2. The Dataset', text: 'The paper describes ImageNet and the ImageNet Large Scale Visual Recognition Challenge, including the thousand-category classification task.' },
      { heading: '3. The Architecture', text: 'AlexNet has five convolutional layers and three fully connected layers. The paper discusses ReLU nonlinearities, training across two GPUs, response normalization, overlapping pooling, and techniques such as dropout.' }
    ],
    keywords: ['AlexNet', 'Convolutional networks', 'ImageNet', 'GPU training']
  }
}

export function PaperReaderPage({ onNavigate, paper }: Props) {
  const item = papers[paper]
  return (
    <div className="paper-reader">
      <button className="reader-back" type="button" onClick={() => onNavigate('/library')}>← Back to Library</button>
      <article className="paper-sheet">
        <header className="paper-heading">
          <p className="paper-overline">STANDARD SCIENCE / ORIGINAL RESEARCH</p>
          <h1>{item.title}</h1>
          <p className="paper-authors">{item.authors}</p>
          <p className="paper-citation">{item.citation}</p>
        </header>
        <aside className="paper-source-bar">
          <span>HTML READING SAMPLE · NOT THE COMPLETE PAPER</span>
          <a href={item.pdf} target="_blank" rel="noopener noreferrer">Open full original PDF ↗</a>
        </aside>
        <section className="paper-body">
          <h2>Abstract — Reading Guide</h2>
          <p>{item.summary}</p>
          {item.sections.map(section => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <div className="paper-keywords"><strong>Keywords:</strong> {item.keywords.join(' · ')}</div>
          <p className="paper-editorial-note">Editorial notice: this is a short, paraphrased HTML reading sample prepared from the uploaded original paper. It is not a verbatim or complete HTML transcription. Figures, equations, tables, citations, and the complete text remain in the linked original PDF. Annotations will be added in a future iteration.</p>
        </section>
      </article>
    </div>
  )
}
