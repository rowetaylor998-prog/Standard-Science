import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'

type Props = { onNavigate: (route: RoutePath) => void }
type Paper = { title: string; authors: string; year: string; abstract: string; sections: string[]; pdf: string }
const papers: Record<string, Paper> = {
  transformer: {
    title: 'Attention Is All You Need', authors: 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin', year: '2017',
    abstract: 'The authors introduce the Transformer, a sequence-to-sequence architecture based on attention mechanisms rather than recurrence or convolution. The paper reports strong machine translation results and improved parallelization.',
    sections: ['Introduction', 'Background', 'Model Architecture', 'Why Self-Attention', 'Training', 'Results', 'Conclusion'],
    pdf: 'https://arxiv.org/pdf/1706.03762'
  },
  imagenet: {
    title: 'ImageNet Classification with Deep Convolutional Neural Networks', authors: 'Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton', year: '2012',
    abstract: 'The paper describes a large convolutional neural network for ImageNet classification, trained using GPUs, ReLU nonlinearities, data augmentation, and dropout.',
    sections: ['Introduction', 'The Dataset', 'The Architecture', 'Reducing Overfitting', 'Details of Learning', 'Results', 'Discussion'],
    pdf: 'https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf'
  }
}

export function ComputerSciencePaperPage({ onNavigate, paperId }: Props & { paperId: 'transformer' | 'imagenet' }) {
  const paper = papers[paperId]
  return (
    <div className="cs-library-photo-background">
      <ComputerScienceSectionFrame title={paper.title} eyebrow="Computer Science Internet Archive · Papers" onNavigate={onNavigate}>
        <article className="cs-paper-reading">
          <p className="cs-paper-authors">{paper.authors} · {paper.year}</p>
          <h2>Abstract</h2>
          <p>{paper.abstract}</p>
          <p><a href={paper.pdf} target="_blank" rel="noopener noreferrer">Read complete original paper (PDF) ↗</a></p>
          <h2>Contents</h2>
          <ol>{paper.sections.map(section => <li key={section}>{section}</li>)}</ol>
          <p className="cs-paper-note">This is an HTML bibliographic reading page, not a complete transcription. Consult the original PDF for full text, equations, figures, and references.</p>
        </article>
      </ComputerScienceSectionFrame>
    </div>
  )
}
