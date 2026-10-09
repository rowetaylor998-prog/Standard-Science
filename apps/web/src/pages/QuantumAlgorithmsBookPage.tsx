import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'

type Props = { onNavigate: (route: RoutePath) => void }

const toc = [
  'Preface',
  'Part I — Areas of Application',
  '1. Condensed matter physics',
  '1.1 Fermi–Hubbard model',
  '1.2 Spin models',
  '2. Quantum chemistry',
  '3. Nuclear and particle physics',
  '4. Combinatorial optimization',
  '5. Continuous optimization',
  '6. Cryptanalysis',
  '7. Solving differential equations',
  '8. Finance',
  '9. Machine learning with classical data',
  'Part II — Quantum Algorithmic Primitives',
  'Part III — Fault-Tolerant Quantum Computing'
]

const sections = [
  {
    heading: 'Preface — Why end-to-end quantum algorithms matter',
    text:
      'The survey begins by placing quantum algorithms in the historical line from quantum mechanics, information theory, and computer science to modern quantum information. It emphasizes Shor’s 1994 factoring algorithm as the decisive demonstration that a quantum computer could in principle accelerate an important real-world task, not merely an artificial oracle problem.'
  },
  {
    heading: 'The book’s central lens: full computational cost',
    text:
      'The authors argue that a useful quantum speedup must be evaluated end to end. Circuit cost alone is not enough: classical preprocessing and postprocessing, data access, oracle construction, state preparation, fault-tolerant overhead, error correction, and comparison with the best classical method all matter. The survey therefore focuses on concrete application problems and the resource costs of the complete computational workflow.'
  },
  {
    heading: 'How to use the survey',
    text:
      'The book is deliberately modular rather than strictly linear. Application chapters and algorithmic-primitives chapters are designed to be read independently, while the appendix supplies background on quantum systems, bra-ket notation, circuits, big-O notation, and complexity theory.'
  },
  {
    heading: 'Part I — Areas of application',
    text:
      'The first major part organizes proposed quantum advantages by application area. It covers condensed-matter physics, chemistry, nuclear and particle physics, combinatorial and continuous optimization, cryptanalysis, differential equations, finance, and machine learning with classical data.'
  },
  {
    heading: 'Condensed-matter physics',
    text:
      'The opening application chapter studies computational models of materials and many-body systems. The authors highlight difficult classical problems involving magnetism, phase transitions, superconductivity, frustrated systems, and dynamics, and explain why digital quantum simulation may provide an advantage for selected Hamiltonians.'
  },
  {
    heading: 'Fermi–Hubbard model: the end-to-end problem',
    text:
      'The Fermi–Hubbard model is presented as a prominent early candidate for quantum advantage. The practical task is not simply to evolve a Hamiltonian: it includes preparing relevant states, estimating energies or other observables, mapping fermions to qubits, and resolving physically meaningful regions of the phase diagram.'
  },
  {
    heading: 'State preparation, simulation, and measurement',
    text:
      'The survey separates the workflow into access to the Hamiltonian, state preparation, time evolution, and measurement. It compares approaches including Trotter formulas, qubitization, quantum signal processing, quantum phase estimation, eigenstate filtering, and methods for estimating many observables.'
  },
  {
    heading: 'Resource estimates and caveats',
    text:
      'A recurring theme is that asymptotic speedup is not the same as practical advantage. Ground-state preparation may itself be hard; overlap with the desired eigenstate matters; error targets can dominate cost; and large numbers of repeated measurements may be required. The authors therefore compare logical-qubit and gate estimates while stressing the assumptions behind them.'
  },
  {
    heading: 'Spin models — the next application family',
    text:
      'The opening pages then move to spin systems, which can encode many scientific and industrial problems and map naturally to qubits. Their local structure can make some simulations cheaper than chemistry or cryptanalysis, while still providing a rich test bed for fault-tolerant quantum algorithms and analog simulation.'
  }
]

export function QuantumAlgorithmsBookPage({ onNavigate }: Props) {
  return (
    <div className="cs-library-photo-background">
      <ComputerScienceSectionFrame
        title="Quantum Algorithms"
        eyebrow="Computer Science Internet Archive · Quantum Computing"
        onNavigate={onNavigate}>
        <article className="cs-paper-reading cs-book-reading">
          <p className="cs-paper-authors">
            Alexander M. Dalzell · Sam McArdle · et al. · 2025
          </p>

          <h2>A Survey of Applications and End-to-end Complexities</h2>
          <p>
            Cambridge University Press & Assessment · DOI 10.1017/9781009639651
          </p>
          <p>
            <a href="https://doi.org/10.1017/9781009639651" target="_blank" rel="noopener noreferrer">
              Open the complete official open-access edition ↗
            </a>
          </p>
          <p className="cs-paper-note">
            The official online edition is licensed CC BY-NC-ND 4.0. This Standard Science page is an
            editorial, paraphrased HTML reading sample covering roughly the preface and the opening
            application material (about PDF pages 11–31), not a replacement for the complete book.
          </p>

          <h2>HTML Reading Sample</h2>
          {sections.map(section => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.text}</p>
            </section>
          ))}

          <h2>Book Structure</h2>
          <ol>
            {toc.map(item => <li key={item}>{item}</li>)}
          </ol>

          <p className="cs-paper-note">
            This first-pass HTML sample intentionally prioritizes readable structure over full transcription.
            Equations, tables, detailed resource estimates, references, and the complete 435-page text remain
            in the official edition linked above.
          </p>
        </article>
      </ComputerScienceSectionFrame>
    </div>
  )
}
