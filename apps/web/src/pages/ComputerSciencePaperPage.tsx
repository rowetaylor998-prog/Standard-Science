import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'

type Props = { onNavigate: (route: RoutePath) => void }
type Section = { heading: string; text: string }
type Paper = {
  title: string
  authors: string
  year: string
  abstract: string
  sections: string[]
  readingSections: Section[]
  pdf: string
}

const papers: Record<'transformer' | 'imagenet', Paper> = {
  transformer: {
    title: 'Attention Is All You Need',
    authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin',
    year: '2017',
    abstract: 'The authors introduce the Transformer, a sequence-to-sequence architecture based on attention mechanisms rather than recurrence or convolution. Experiments on machine translation report high accuracy and substantially improved parallelization.',
    sections: ['Introduction', 'Background', 'Model Architecture', 'Why Self-Attention', 'Training', 'Results', 'Conclusion'],
    readingSections: [
      {
        heading: '1. Introduction',
        text: 'Earlier sequence-transduction systems commonly used recurrent neural networks, including LSTM and gated recurrent models. Their sequential state updates limited parallelization during training. The Transformer replaces this recurrent computation with attention-based operations.'
      },
      {
        heading: '2. Background',
        text: 'Self-attention relates different positions in the same input sequence, allowing the model to use information from distant tokens without recurrence. The paper compares this approach with recurrent and convolutional sequence models.'
      },
      {
        heading: '3. Model Architecture',
        text: 'The original encoder–decoder design stacks multi-head attention, position-wise feed-forward networks, residual connections and normalization. Position encodings supply information about token order, while masked attention preserves the decoder’s autoregressive behavior.'
      }
    ],
    pdf: 'https://arxiv.org/pdf/1706.03762v1'
  },
  imagenet: {
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: 'Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton',
    year: '2012',
    abstract: 'The authors train a large convolutional neural network for ImageNet classification using GPUs, ReLU activations, data augmentation and dropout. The resulting system achieved a major improvement in the 2012 ImageNet competition.',
    sections: ['Introduction', 'The Dataset', 'The Architecture', 'Reducing Overfitting', 'Details of Learning', 'Results', 'Discussion'],
    readingSections: [
      {
        heading: '1. Introduction',
        text: 'Object recognition improves with large annotated datasets and neural networks capable of learning many visual features. The availability of GPU computation made deeper convolutional systems practically trainable at ImageNet scale.'
      },
      {
        heading: '2. The Dataset',
        text: 'The study uses the ImageNet large-scale recognition benchmark, with images assigned to one of one thousand object categories. The authors report both top-1 and top-5 classification errors.'
      },
      {
        heading: '3. The Architecture',
        text: 'The network has five convolutional layers followed by three fully connected layers. ReLU activations speed up learning, training is split across two GPUs, and regularization techniques such as dropout help limit overfitting.'
      }
    ],
    pdf: 'https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf'
  }
}

export function ComputerSciencePaperPage({ onNavigate, paperId }: Props & { paperId: 'transformer' | 'imagenet' }) {
  const paper = papers[paperId]
  return (
    <div className="cs-library-photo-background">
      <ComputerScienceSectionFrame
        title={paper.title}
        eyebrow="Computer Science Internet Archive · Original Papers"
        onNavigate={onNavigate}>
        <article className="cs-paper-reading">
          <p className="cs-paper-authors">{paper.authors} · {paper.year}</p>
          <h2>Abstract — editorial reading overview</h2>
          <p>{paper.abstract}</p>
          <p><a href={paper.pdf} target="_blank" rel="noopener noreferrer">Open complete original PDF ↗</a></p>
          <h2>HTML Reading Sample</h2>
          {paper.readingSections.map(section => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.text}</p>
            </section>
          ))}
          <h2>Original Paper — Table of Contents</h2>
          <ol>{paper.sections.map(section => <li key={section}>{section}</li>)}</ol>
          <p className="cs-paper-note">
            This is an editorial, paraphrased HTML reading sample based on the original uploaded paper,
            not a complete transcription. Mathematical equations, figures, tables, and references remain
            in the linked original PDF. Inline annotations are planned for a later iteration.
          </p>
        </article>
      </ComputerScienceSectionFrame>
    </div>
  )
}
