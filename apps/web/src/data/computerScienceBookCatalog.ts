/**
 * Standard Science — original 200-book research map.
 * Source: RET_Connected_Computer_Science_200_Books.xlsx (Connected 200).
 * A reading catalog, NOT a statement that each title's PDF has been uploaded.
 * Original book numbers, titles, authors, priority and layer retained.
 * Do not commit copyrighted PDF files or unauthorized download links.
 */
export type ComputerScienceCatalogBook = {
  id: number
  layer: string
  title: string
  authors: string
  domain: string
  priority: string
  note: string
}

export const computerScienceBookCatalog: ComputerScienceCatalogBook[] = [
  {
    "id": 6,
    "layer": "A · Math & Algorithms",
    "title": "Introduction to Algorithms",
    "authors": "Thomas H. Cormen; Charles E. Leiserson; Ronald L. Rivest; Clifford Stein",
    "domain": "Algorithms",
    "priority": "A",
    "note": "算法底座。"
  },
  {
    "id": 7,
    "layer": "A · Math & Algorithms",
    "title": "The Algorithm Design Manual",
    "authors": "Steven S. Skiena",
    "domain": "Algorithms",
    "priority": "A",
    "note": "更偏真实问题中的算法选择。"
  },
  {
    "id": 104,
    "layer": "A · Math & Algorithms",
    "title": "The Elements of Statistical Learning",
    "authors": "Trevor Hastie; Robert Tibshirani; Jerome Friedman",
    "domain": "AI / Statistical Learning",
    "priority": "◎",
    "note": "统计学习经典；理解模型而不是只会调用。"
  },
  {
    "id": 105,
    "layer": "A · Math & Algorithms",
    "title": "An Introduction to Statistical Learning: with Applications in Python",
    "authors": "Gareth James; Daniela Witten; Trevor Hastie; Robert Tibshirani; Jonathan Taylor",
    "domain": "AI / Statistical Learning",
    "priority": "◎",
    "note": "快速建立统计 ML 全局。"
  },
  {
    "id": 107,
    "layer": "A · Math & Algorithms",
    "title": "Understanding Machine Learning: From Theory to Algorithms",
    "authors": "Shai Shalev-Shwartz; Shai Ben-David",
    "domain": "AI / Learning Theory",
    "priority": "◎",
    "note": "PAC、generalization、SGD、SVM、kernel、learning theory。"
  },
  {
    "id": 108,
    "layer": "A · Math & Algorithms",
    "title": "Foundations of Machine Learning",
    "authors": "Mehryar Mohri; Afshin Rostamizadeh; Ameet Talwalkar",
    "domain": "AI / Learning Theory",
    "priority": "◎",
    "note": "学习理论第二根支柱。"
  },
  {
    "id": 109,
    "layer": "A · Math & Algorithms",
    "title": "Mathematics for Machine Learning",
    "authors": "Marc Peter Deisenroth; A. Aldo Faisal; Cheng Soon Ong",
    "domain": "AI / Math",
    "priority": "◎",
    "note": "只学 ML 真正需要的线代、微积分、概率、优化。"
  },
  {
    "id": 113,
    "layer": "A · Math & Algorithms",
    "title": "Information Theory, Inference, and Learning Algorithms",
    "authors": "David J. C. MacKay",
    "domain": "AI / Information Theory",
    "priority": "◎",
    "note": "信息论、编码、Bayes、神经网络统一到一个框架。"
  },
  {
    "id": 8,
    "layer": "A · Math & Algorithms",
    "title": "Algorithms",
    "authors": "Robert Sedgewick; Kevin Wayne",
    "domain": "Algorithms",
    "priority": "B",
    "note": "数据结构和算法工程补充。"
  },
  {
    "id": 111,
    "layer": "A · Math & Algorithms",
    "title": "Bayesian Data Analysis",
    "authors": "Andrew Gelman et al.",
    "domain": "AI / Bayesian Statistics",
    "priority": "○",
    "note": "贝叶斯建模和不确定性分析。"
  },
  {
    "id": 115,
    "layer": "A · Math & Algorithms",
    "title": "Causal Inference: What If",
    "authors": "Miguel A. Hernán; James M. Robins",
    "domain": "AI / Causal Inference",
    "priority": "○",
    "note": "从相关性进入因果。"
  },
  {
    "id": 116,
    "layer": "A · Math & Algorithms",
    "title": "Causal Inference: The Mixtape",
    "authors": "Scott Cunningham",
    "domain": "AI / Causal Inference",
    "priority": "○",
    "note": "直观建立 causal toolbox。"
  },
  {
    "id": 1,
    "layer": "B · Programming & Compilers",
    "title": "The C Programming Language",
    "authors": "Brian W. Kernighan; Dennis M. Ritchie",
    "domain": "C / 底层编程",
    "priority": "A",
    "note": "C 的最小核心；嵌入式、驱动、系统软件的共同语言。"
  },
  {
    "id": 2,
    "layer": "B · Programming & Compilers",
    "title": "C Programming: A Modern Approach",
    "authors": "K. N. King",
    "domain": "C / 底层编程",
    "priority": "A",
    "note": "把 C 真正学扎实，而不只是会语法。"
  },
  {
    "id": 3,
    "layer": "B · Programming & Compilers",
    "title": "C++ Primer",
    "authors": "Stanley B. Lippman; Josée Lajoie; Barbara E. Moo",
    "domain": "C++",
    "priority": "A",
    "note": "大型工程、感知与任务软件的重要语言基础。"
  },
  {
    "id": 149,
    "layer": "B · Programming & Compilers",
    "title": "Modern Compiler Implementation in C",
    "authors": "Andrew W. Appel",
    "domain": "Systems / Compiler",
    "priority": "◎",
    "note": "parser → IR → code generation。"
  },
  {
    "id": 150,
    "layer": "B · Programming & Compilers",
    "title": "Advanced Compiler Design and Implementation",
    "authors": "Steven S. Muchnick",
    "domain": "Systems / Compiler",
    "priority": "◎",
    "note": "compiler optimization，和芯片/GPU性能直接相连。"
  },
  {
    "id": 151,
    "layer": "B · Programming & Compilers",
    "title": "Linkers and Loaders",
    "authors": "John R. Levine",
    "domain": "Systems / Toolchain",
    "priority": "◎",
    "note": "程序如何从目标文件真正成为 executable。"
  },
  {
    "id": 4,
    "layer": "B · Programming & Compilers",
    "title": "Effective Modern C++",
    "authors": "Scott Meyers",
    "domain": "C++",
    "priority": "B",
    "note": "现代 C++ 工程实践，重点关注内存、生命周期、并发。"
  },
  {
    "id": 9,
    "layer": "B · Programming & Compilers",
    "title": "Compilers: Principles, Techniques, and Tools",
    "authors": "Alfred V. Aho; Monica S. Lam; Ravi Sethi; Jeffrey D. Ullman",
    "domain": "Compiler",
    "priority": "B",
    "note": "理解高级语言如何变成机器执行。"
  },
  {
    "id": 10,
    "layer": "B · Programming & Compilers",
    "title": "Engineering a Compiler",
    "authors": "Keith D. Cooper; Linda Torczon",
    "domain": "Compiler",
    "priority": "B",
    "note": "更工程化地理解 compiler / optimization。"
  },
  {
    "id": 148,
    "layer": "B · Programming & Compilers",
    "title": "Crafting Interpreters",
    "authors": "Robert Nystrom",
    "domain": "Systems / Language Runtime",
    "priority": "○",
    "note": "自己做 interpreter，是理解 language/runtime 的高效方式。"
  },
  {
    "id": 152,
    "layer": "B · Programming & Compilers",
    "title": "The Garbage Collection Handbook",
    "authors": "Richard Jones; Antony Hosking; Eliot Moss",
    "domain": "Systems / Runtime",
    "priority": "○",
    "note": "runtime memory management。"
  },
  {
    "id": 85,
    "layer": "C · Electronics & Logic",
    "title": "The Art of Electronics",
    "authors": "Paul Horowitz; Winfield Hill",
    "domain": "Electronics",
    "priority": "A+",
    "note": "电子系统母书。"
  },
  {
    "id": 23,
    "layer": "C · Electronics & Logic",
    "title": "Digital Design and Computer Architecture: RISC-V Edition",
    "authors": "Sarah L. Harris; David Money Harris",
    "domain": "Digital Design / RISC-V",
    "priority": "A",
    "note": "数字逻辑 → CPU → ISA。"
  },
  {
    "id": 25,
    "layer": "C · Electronics & Logic",
    "title": "CMOS VLSI Design",
    "authors": "Neil H. E. Weste; David Money Harris",
    "domain": "VLSI / Chip",
    "priority": "A",
    "note": "从体系结构继续向芯片电路深入。"
  },
  {
    "id": 27,
    "layer": "C · Electronics & Logic",
    "title": "FPGA Prototyping by Verilog Examples",
    "authors": "Pong P. Chu",
    "domain": "FPGA / HDL",
    "priority": "A",
    "note": "用 FPGA 把数字逻辑真正做出来。"
  },
  {
    "id": 28,
    "layer": "C · Electronics & Logic",
    "title": "Verilog HDL",
    "authors": "Samir Palnitkar",
    "domain": "FPGA / HDL",
    "priority": "A",
    "note": "HDL / RTL 基础。"
  },
  {
    "id": 87,
    "layer": "C · Electronics & Logic",
    "title": "High-Speed Digital Design",
    "authors": "Howard Johnson; Martin Graham",
    "domain": "High-Speed Digital",
    "priority": "A",
    "note": "高速数字系统、信号完整性。"
  },
  {
    "id": 89,
    "layer": "C · Electronics & Logic",
    "title": "Microwave Engineering",
    "authors": "David M. Pozar",
    "domain": "RF / Microwave",
    "priority": "A",
    "note": "RF、微波、雷达、通信基础。"
  },
  {
    "id": 90,
    "layer": "C · Electronics & Logic",
    "title": "Antenna Theory: Analysis and Design",
    "authors": "Constantine A. Balanis",
    "domain": "Antennas",
    "priority": "A",
    "note": "天线与电磁传播。"
  },
  {
    "id": 24,
    "layer": "C · Electronics & Logic",
    "title": "The RISC-V Reader",
    "authors": "David Patterson; Andrew Waterman",
    "domain": "RISC-V / ISA",
    "priority": "B",
    "note": "快速建立 RISC-V ISA 图景。"
  },
  {
    "id": 26,
    "layer": "C · Electronics & Logic",
    "title": "Digital Integrated Circuits",
    "authors": "Jan M. Rabaey; Anantha Chandrakasan; Borivoje Nikolić",
    "domain": "VLSI / Chip",
    "priority": "B",
    "note": "数字 IC 的性能、功耗、时序。"
  },
  {
    "id": 86,
    "layer": "C · Electronics & Logic",
    "title": "Microelectronic Circuits",
    "authors": "Adel S. Sedra; Kenneth C. Smith",
    "domain": "Electronics",
    "priority": "B",
    "note": "模拟/数字电子学基础。"
  },
  {
    "id": 88,
    "layer": "C · Electronics & Logic",
    "title": "Introduction to Hardware Security and Trust",
    "authors": "Mohammad Tehranipoor; Cliff Wang",
    "domain": "Hardware Security",
    "priority": "B",
    "note": "芯片/硬件安全。"
  },
  {
    "id": 5,
    "layer": "D · Architecture & Memory",
    "title": "Computer Systems: A Programmer’s Perspective",
    "authors": "Randal E. Bryant; David R. O’Hallaron",
    "domain": "Computer Systems",
    "priority": "A+",
    "note": "程序—汇编—CPU—内存—OS 串成一条线。"
  },
  {
    "id": 21,
    "layer": "D · Architecture & Memory",
    "title": "Computer Architecture: A Quantitative Approach",
    "authors": "John L. Hennessy; David A. Patterson",
    "domain": "Computer Architecture",
    "priority": "A+",
    "note": "芯片/计算体系结构核心母书。"
  },
  {
    "id": 22,
    "layer": "D · Architecture & Memory",
    "title": "Computer Organization and Design: RISC-V Edition",
    "authors": "David A. Patterson; John L. Hennessy",
    "domain": "RISC-V / Architecture",
    "priority": "A+",
    "note": "从 RISC-V 理解 ISA 到 CPU。"
  },
  {
    "id": 170,
    "layer": "D · Architecture & Memory",
    "title": "Efficient Processing of Deep Neural Networks",
    "authors": "Vivienne Sze; Yu-Hsin Chen; Tien-Ju Yang; Joel S. Emer",
    "domain": "Architecture / AI Accelerator",
    "priority": "◎+",
    "note": "AI + 芯片交叉核心：workload、dataflow、memory、accelerator、energy efficiency。"
  },
  {
    "id": 156,
    "layer": "D · Architecture & Memory",
    "title": "Structured Computer Organization",
    "authors": "Andrew S. Tanenbaum; Todd Austin",
    "domain": "Architecture / Computer Organization",
    "priority": "◎",
    "note": "从数字逻辑一路走到 ISA / OS interface。"
  },
  {
    "id": 158,
    "layer": "D · Architecture & Memory",
    "title": "Modern Processor Design: Fundamentals of Superscalar Processors",
    "authors": "John Paul Shen; Mikko H. Lipasti",
    "domain": "Architecture / CPU",
    "priority": "◎",
    "note": "pipeline、OOO、branch prediction、superscalar。"
  },
  {
    "id": 159,
    "layer": "D · Architecture & Memory",
    "title": "Parallel Computer Architecture: A Hardware/Software Approach",
    "authors": "David Culler; Jaswinder Pal Singh; Anoop Gupta",
    "domain": "Architecture / Parallel",
    "priority": "◎",
    "note": "shared memory、coherence、interconnect、parallel architecture。"
  },
  {
    "id": 160,
    "layer": "D · Architecture & Memory",
    "title": "Memory Systems: Cache, DRAM, Disk",
    "authors": "Bruce Jacob; Spencer Ng; David Wang",
    "domain": "Architecture / Memory",
    "priority": "◎",
    "note": "性能瓶颈经常不是算力，而是 memory hierarchy。"
  },
  {
    "id": 162,
    "layer": "D · Architecture & Memory",
    "title": "Principles of Computer System Design",
    "authors": "Jerome H. Saltzer; M. Frans Kaashoek",
    "domain": "Architecture / System Design",
    "priority": "◎",
    "note": "abstraction、naming、concurrency、fault tolerance、security。"
  },
  {
    "id": 169,
    "layer": "D · Architecture & Memory",
    "title": "The Datacenter as a Computer",
    "authors": "Luiz André Barroso; Jimmy Clidaras; Urs Hölzle",
    "domain": "Architecture / Datacenter",
    "priority": "◎",
    "note": "把整个数据中心看成计算机。"
  },
  {
    "id": 157,
    "layer": "D · Architecture & Memory",
    "title": "Inside the Machine",
    "authors": "Jon Stokes",
    "domain": "Architecture / CPU",
    "priority": "○",
    "note": "CPU architecture 的直观解释。"
  },
  {
    "id": 161,
    "layer": "D · Architecture & Memory",
    "title": "On-Chip Networks",
    "authors": "Natalie Enright Jerger; Li-Shiuan Peh",
    "domain": "Architecture / NoC",
    "priority": "○",
    "note": "NoC；对多核和 AI accelerator 很重要。"
  },
  {
    "id": 13,
    "layer": "E · Operating Systems & Linux",
    "title": "The Linux Programming Interface",
    "authors": "Michael Kerrisk",
    "domain": "Linux / System Programming",
    "priority": "A+",
    "note": "Linux 系统调用与用户空间系统编程核心母书。"
  },
  {
    "id": 11,
    "layer": "E · Operating Systems & Linux",
    "title": "Operating Systems: Three Easy Pieces",
    "authors": "Remzi H. Arpaci-Dusseau; Andrea C. Arpaci-Dusseau",
    "domain": "Operating Systems",
    "priority": "A",
    "note": "process / virtual memory / concurrency / storage。"
  },
  {
    "id": 12,
    "layer": "E · Operating Systems & Linux",
    "title": "Modern Operating Systems",
    "authors": "Andrew S. Tanenbaum; Herbert Bos",
    "domain": "Operating Systems",
    "priority": "A",
    "note": "操作系统完整地图。"
  },
  {
    "id": 14,
    "layer": "E · Operating Systems & Linux",
    "title": "Advanced Programming in the UNIX Environment",
    "authors": "W. Richard Stevens; Stephen A. Rago",
    "domain": "Linux / System Programming",
    "priority": "A",
    "note": "Unix/Linux 系统编程母书。"
  },
  {
    "id": 15,
    "layer": "E · Operating Systems & Linux",
    "title": "Linux Kernel Development",
    "authors": "Robert Love",
    "domain": "Linux Kernel",
    "priority": "A",
    "note": "从 user space 进入 kernel。"
  },
  {
    "id": 17,
    "layer": "E · Operating Systems & Linux",
    "title": "Embedded Linux Primer",
    "authors": "Christopher Hallinan",
    "domain": "Embedded Linux",
    "priority": "A",
    "note": "把 Linux 真正放进硬件平台。"
  },
  {
    "id": 136,
    "layer": "E · Operating Systems & Linux",
    "title": "Systems Performance",
    "authors": "Brendan Gregg",
    "domain": "Systems / Performance",
    "priority": "◎",
    "note": "CPU、memory、disk、network、profiling；Linux 性能工程。"
  },
  {
    "id": 137,
    "layer": "E · Operating Systems & Linux",
    "title": "BPF Performance Tools",
    "authors": "Brendan Gregg",
    "domain": "Systems / Observability",
    "priority": "◎",
    "note": "eBPF tracing，把 Linux 变成可观察系统。"
  },
  {
    "id": 138,
    "layer": "E · Operating Systems & Linux",
    "title": "Linux System Programming",
    "authors": "Robert Love",
    "domain": "Systems / Linux",
    "priority": "◎",
    "note": "syscall、file、process、memory、I/O。"
  },
  {
    "id": 139,
    "layer": "E · Operating Systems & Linux",
    "title": "Professional Linux Kernel Architecture",
    "authors": "Wolfgang Mauerer",
    "domain": "Systems / Linux Kernel",
    "priority": "◎",
    "note": "Kernel 深层结构。"
  },
  {
    "id": 141,
    "layer": "E · Operating Systems & Linux",
    "title": "Mastering Embedded Linux Programming",
    "authors": "Frank Vasquez; Chris Simmonds",
    "domain": "Systems / Embedded Linux",
    "priority": "◎",
    "note": "cross compilation、boot、rootfs、device tree、system integration。"
  },
  {
    "id": 144,
    "layer": "E · Operating Systems & Linux",
    "title": "Operating Systems: Principles and Practice",
    "authors": "Thomas Anderson; Michael Dahlin",
    "domain": "Systems / OS",
    "priority": "◎",
    "note": "和 OSTEP/Modern OS 形成互补。"
  },
  {
    "id": 16,
    "layer": "E · Operating Systems & Linux",
    "title": "Understanding the Linux Kernel",
    "authors": "Daniel P. Bovet; Marco Cesati",
    "domain": "Linux Kernel",
    "priority": "B",
    "note": "版本较旧，但内核结构思想仍有价值。"
  },
  {
    "id": 140,
    "layer": "E · Operating Systems & Linux",
    "title": "Linux Device Drivers",
    "authors": "Jonathan Corbet; Alessandro Rubini; Greg Kroah-Hartman",
    "domain": "Systems / Drivers",
    "priority": "○",
    "note": "API 已老，但 driver/kernel/device 模型值得理解。"
  },
  {
    "id": 142,
    "layer": "E · Operating Systems & Linux",
    "title": "Embedded Linux Development Using Yocto Project",
    "authors": "Otavio Salvador; Daiane Angolini",
    "domain": "Systems / Embedded Linux",
    "priority": "○",
    "note": "构建可重复的嵌入式 Linux 镜像。"
  },
  {
    "id": 143,
    "layer": "E · Operating Systems & Linux",
    "title": "The Design and Implementation of the FreeBSD Operating System",
    "authors": "Marshall Kirk McKusick et al.",
    "domain": "Systems / OS",
    "priority": "○",
    "note": "换一个 Unix kernel 看 OS，加深结构理解。"
  },
  {
    "id": 153,
    "layer": "E · Operating Systems & Linux",
    "title": "The Linux Command Line",
    "authors": "William Shotts",
    "domain": "Systems / Linux",
    "priority": "○",
    "note": "Linux 环境工具总览；适合快读查阅。"
  },
  {
    "id": 154,
    "layer": "E · Operating Systems & Linux",
    "title": "UNIX and Linux System Administration Handbook",
    "authors": "Evi Nemeth et al.",
    "domain": "Systems / Administration",
    "priority": "○",
    "note": "系统运维、网络、storage、services。"
  },
  {
    "id": 155,
    "layer": "E · Operating Systems & Linux",
    "title": "The Art of UNIX Programming",
    "authors": "Eric S. Raymond",
    "domain": "Systems / UNIX Design",
    "priority": "○",
    "note": "composition、text streams、small tools 的 Unix 软件设计哲学。"
  },
  {
    "id": 29,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "Programming Massively Parallel Processors",
    "authors": "David B. Kirk; Wen-mei W. Hwu; Izzat El Hajj",
    "domain": "CUDA / GPU",
    "priority": "A+",
    "note": "CUDA/GPU 主教材之一：thread / warp / block / memory hierarchy。"
  },
  {
    "id": 30,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "CUDA by Example",
    "authors": "Jason Sanders; Edward Kandrot",
    "domain": "CUDA / GPU",
    "priority": "A",
    "note": "配合前一本真正写 CUDA。"
  },
  {
    "id": 145,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "The Art of Multiprocessor Programming",
    "authors": "Maurice Herlihy; Nir Shavit",
    "domain": "Systems / Concurrency",
    "priority": "◎",
    "note": "lock、atomic、concurrent data structures。"
  },
  {
    "id": 146,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "C++ Concurrency in Action",
    "authors": "Anthony Williams",
    "domain": "Systems / Concurrency",
    "priority": "◎",
    "note": "多线程、memory model、atomic。"
  },
  {
    "id": 147,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "Is Parallel Programming Hard, And, If So, What Can You Do About It?",
    "authors": "Paul E. McKenney",
    "domain": "Systems / Parallel Programming",
    "priority": "◎",
    "note": "真正理解现代并发系统。"
  },
  {
    "id": 164,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "CUDA Programming: A Developer’s Guide to Parallel Computing with GPUs",
    "authors": "Shane Cook",
    "domain": "Architecture / GPU",
    "priority": "◎",
    "note": "CUDA 工程化补充。"
  },
  {
    "id": 166,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "Using OpenMP",
    "authors": "Barbara Chapman; Gabriele Jost; Ruud van der Pas",
    "domain": "HPC / OpenMP",
    "priority": "◎",
    "note": "CPU shared-memory parallelism。"
  },
  {
    "id": 167,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "Using MPI",
    "authors": "William Gropp; Ewing Lusk; Anthony Skjellum",
    "domain": "HPC / MPI",
    "priority": "◎",
    "note": "多节点 HPC / distributed-memory computation。"
  },
  {
    "id": 168,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "Introduction to High Performance Computing for Scientists and Engineers",
    "authors": "Georg Hager; Gerhard Wellein",
    "domain": "HPC",
    "priority": "◎",
    "note": "cache、vectorization、OpenMP、MPI、performance。"
  },
  {
    "id": 20,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "Programming with POSIX Threads",
    "authors": "David R. Butenhof",
    "domain": "Concurrency",
    "priority": "B",
    "note": "并发、同步和多线程基础。"
  },
  {
    "id": 165,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "Parallel Programming with OpenACC",
    "authors": "Sunita Chandrasekaran; Guido Juckeland",
    "domain": "Architecture / Accelerator",
    "priority": "○",
    "note": "认识 directive-based accelerator programming。"
  },
  {
    "id": 163,
    "layer": "F · Concurrency, GPU & HPC",
    "title": "CUDA Fortran for Scientists and Engineers",
    "authors": "Greg Ruetsch; Massimiliano Fatica",
    "domain": "Architecture / GPU",
    "priority": "△",
    "note": "不主学 Fortran；重点看同一 GPU execution model 的另一语言表达。"
  },
  {
    "id": 32,
    "layer": "G · Networking & Communications",
    "title": "TCP/IP Illustrated, Volume 1",
    "authors": "W. Richard Stevens",
    "domain": "Networking",
    "priority": "A+",
    "note": "TCP/IP 真正的底层行为。"
  },
  {
    "id": 31,
    "layer": "G · Networking & Communications",
    "title": "Computer Networking: A Top-Down Approach",
    "authors": "James F. Kurose; Keith W. Ross",
    "domain": "Networking",
    "priority": "A",
    "note": "网络基本体系。"
  },
  {
    "id": 33,
    "layer": "G · Networking & Communications",
    "title": "UNIX Network Programming, Volume 1",
    "authors": "W. Richard Stevens",
    "domain": "Networking / System Programming",
    "priority": "A",
    "note": "socket、I/O、网络系统编程。"
  },
  {
    "id": 79,
    "layer": "G · Networking & Communications",
    "title": "Digital Communications",
    "authors": "John G. Proakis; Masoud Salehi",
    "domain": "Communications",
    "priority": "A",
    "note": "数字通信。"
  },
  {
    "id": 80,
    "layer": "G · Networking & Communications",
    "title": "Fundamentals of Wireless Communication",
    "authors": "David Tse; Pramod Viswanath",
    "domain": "Wireless Communications",
    "priority": "A",
    "note": "无线通信理论。"
  },
  {
    "id": 173,
    "layer": "G · Networking & Communications",
    "title": "Practical Packet Analysis",
    "authors": "Chris Sanders",
    "domain": "Network / Packet Analysis",
    "priority": "◎",
    "note": "Wireshark、packet、TCP/IP troubleshooting。"
  },
  {
    "id": 177,
    "layer": "G · Networking & Communications",
    "title": "Routing TCP/IP, Volume I",
    "authors": "Jeff Doyle",
    "domain": "Network / Routing",
    "priority": "◎",
    "note": "routing 深入。"
  },
  {
    "id": 34,
    "layer": "G · Networking & Communications",
    "title": "Computer Networks",
    "authors": "Andrew S. Tanenbaum; David J. Wetherall",
    "domain": "Networking",
    "priority": "B",
    "note": "体系化补齐网络。"
  },
  {
    "id": 174,
    "layer": "G · Networking & Communications",
    "title": "Network Warrior",
    "authors": "Gary A. Donahue",
    "domain": "Network / Engineering",
    "priority": "○",
    "note": "switching / routing 的工程世界。"
  },
  {
    "id": 175,
    "layer": "G · Networking & Communications",
    "title": "High Performance Browser Networking",
    "authors": "Ilya Grigorik",
    "domain": "Network / Web Performance",
    "priority": "○",
    "note": "TCP、TLS、HTTP、WebSocket 的性能层。"
  },
  {
    "id": 176,
    "layer": "G · Networking & Communications",
    "title": "BGP in the Data Center",
    "authors": "Dinesh G. Dutt",
    "domain": "Network / Routing",
    "priority": "○",
    "note": "数据中心网络路由。"
  },
  {
    "id": 37,
    "layer": "H · Databases & Distributed",
    "title": "Designing Data-Intensive Applications",
    "authors": "Martin Kleppmann",
    "domain": "Data / Distributed Systems",
    "priority": "A+",
    "note": "真实系统的数据链、日志、状态、复制、流处理。"
  },
  {
    "id": 182,
    "layer": "H · Databases & Distributed",
    "title": "Introduction to Reliable and Secure Distributed Programming",
    "authors": "Christian Cachin; Rachid Guerraoui; Luís Rodrigues",
    "domain": "Distributed / Secure Systems",
    "priority": "◎+",
    "note": "failure、Byzantine behavior、consensus、安全分布式计算。"
  },
  {
    "id": 35,
    "layer": "H · Databases & Distributed",
    "title": "Distributed Systems",
    "authors": "Andrew S. Tanenbaum; Maarten van Steen",
    "domain": "Distributed Systems",
    "priority": "A",
    "note": "多节点任务系统基础。"
  },
  {
    "id": 36,
    "layer": "H · Databases & Distributed",
    "title": "Distributed Algorithms",
    "authors": "Nancy A. Lynch",
    "domain": "Distributed Systems",
    "priority": "A",
    "note": "共识、同步、消息、故障。"
  },
  {
    "id": 184,
    "layer": "H · Databases & Distributed",
    "title": "Distributed Systems: Concepts and Design",
    "authors": "George Coulouris et al.",
    "domain": "Distributed Systems",
    "priority": "◎",
    "note": "分布式系统另一套经典体系。"
  },
  {
    "id": 186,
    "layer": "H · Databases & Distributed",
    "title": "Readings in Database Systems (Red Book)",
    "authors": "Peter Bailis; Joseph M. Hellerstein; Michael Stonebraker (eds.)",
    "domain": "Data / Database",
    "priority": "◎",
    "note": "数据库经典论文路线图，适合广读。"
  },
  {
    "id": 187,
    "layer": "H · Databases & Distributed",
    "title": "Transaction Processing: Concepts and Techniques",
    "authors": "Jim Gray; Andreas Reuter",
    "domain": "Data / Transactions",
    "priority": "◎",
    "note": "transaction、recovery、concurrency、distributed transaction。"
  },
  {
    "id": 188,
    "layer": "H · Databases & Distributed",
    "title": "Database Management Systems",
    "authors": "Raghu Ramakrishnan; Johannes Gehrke",
    "domain": "Data / Database",
    "priority": "◎",
    "note": "数据库内部原理经典教材。"
  },
  {
    "id": 190,
    "layer": "H · Databases & Distributed",
    "title": "Fundamentals of Data Engineering",
    "authors": "Joe Reis; Matt Housley",
    "domain": "Data / Engineering",
    "priority": "◎",
    "note": "data ingestion、storage、processing、orchestration。"
  },
  {
    "id": 191,
    "layer": "H · Databases & Distributed",
    "title": "Designing Event-Driven Systems",
    "authors": "Ben Stopford",
    "domain": "Data / Event-Driven Systems",
    "priority": "◎",
    "note": "event stream、state、distributed architecture。"
  },
  {
    "id": 38,
    "layer": "H · Databases & Distributed",
    "title": "Database System Concepts",
    "authors": "Abraham Silberschatz; Henry F. Korth; S. Sudarshan",
    "domain": "Database",
    "priority": "B",
    "note": "关系模型、事务、并发、存储。"
  },
  {
    "id": 39,
    "layer": "H · Databases & Distributed",
    "title": "Database Internals",
    "authors": "Alex Petrov",
    "domain": "Database Internals",
    "priority": "B",
    "note": "B-tree、LSM、存储引擎。"
  },
  {
    "id": 40,
    "layer": "H · Databases & Distributed",
    "title": "Streaming Systems",
    "authors": "Tyler Akidau; Slava Chernyak; Reuven Lax",
    "domain": "Streaming / Data",
    "priority": "B",
    "note": "连续传感器/遥测数据处理。"
  },
  {
    "id": 183,
    "layer": "H · Databases & Distributed",
    "title": "Designing Distributed Systems",
    "authors": "Brendan Burns",
    "domain": "Distributed Systems",
    "priority": "○",
    "note": "常见 distributed-system patterns。"
  },
  {
    "id": 185,
    "layer": "H · Databases & Distributed",
    "title": "Kubernetes: Up & Running",
    "authors": "Kelsey Hightower; Brendan Burns; Joe Beda",
    "domain": "Distributed / Deployment",
    "priority": "○",
    "note": "理解现代 distributed deployment；K8s 本身不是目标。"
  },
  {
    "id": 189,
    "layer": "H · Databases & Distributed",
    "title": "Data Management at Scale",
    "authors": "Piethein Strengholt",
    "domain": "Data / Architecture",
    "priority": "○",
    "note": "大规模数据 architecture。"
  },
  {
    "id": 192,
    "layer": "H · Databases & Distributed",
    "title": "Kafka: The Definitive Guide",
    "authors": "Neha Narkhede; Gwen Shapira; Todd Palino",
    "domain": "Data / Streaming",
    "priority": "○",
    "note": "重点理解 durable log / stream processing。"
  },
  {
    "id": 41,
    "layer": "I · Security & Reliability",
    "title": "Security Engineering",
    "authors": "Ross Anderson",
    "domain": "Security",
    "priority": "A+",
    "note": "安全领域母书。"
  },
  {
    "id": 199,
    "layer": "I · Security & Reliability",
    "title": "Specifying Systems: The TLA+ Language and Tools for Hardware and Software Engineers",
    "authors": "Leslie Lamport",
    "domain": "Formal Methods",
    "priority": "◎+",
    "note": "并发/分布式/高可靠系统的 specification 和 verification。"
  },
  {
    "id": 42,
    "layer": "I · Security & Reliability",
    "title": "Computer Security: Principles and Practice",
    "authors": "William Stallings; Lawrie Brown",
    "domain": "Security",
    "priority": "A",
    "note": "OS / network / application security 全图。"
  },
  {
    "id": 43,
    "layer": "I · Security & Reliability",
    "title": "Cryptography Engineering",
    "authors": "Niels Ferguson; Bruce Schneier; Tadayoshi Kohno",
    "domain": "Cryptography",
    "priority": "A",
    "note": "密码学如何进入真实系统。"
  },
  {
    "id": 45,
    "layer": "I · Security & Reliability",
    "title": "Secure Coding in C and C++",
    "authors": "Robert C. Seacord",
    "domain": "Secure Programming",
    "priority": "A",
    "note": "C/C++ 系统安全。"
  },
  {
    "id": 46,
    "layer": "I · Security & Reliability",
    "title": "Threat Modeling: Designing for Security",
    "authors": "Adam Shostack",
    "domain": "Security Architecture",
    "priority": "A",
    "note": "在设计阶段识别 attack surface。"
  },
  {
    "id": 47,
    "layer": "I · Security & Reliability",
    "title": "Engineering a Safer World",
    "authors": "Nancy Leveson",
    "domain": "Safety / Systems",
    "priority": "A",
    "note": "安全关键复杂系统的重要思想。"
  },
  {
    "id": 49,
    "layer": "I · Security & Reliability",
    "title": "Fault-Tolerant Systems",
    "authors": "Israel Koren; C. Mani Krishna",
    "domain": "Fault Tolerance",
    "priority": "A",
    "note": "冗余、故障检测、恢复、容错。"
  },
  {
    "id": 171,
    "layer": "I · Security & Reliability",
    "title": "Network Security: Private Communication in a Public World",
    "authors": "Charlie Kaufman; Radia Perlman; Mike Speciner",
    "domain": "Network / Security",
    "priority": "◎",
    "note": "网络安全体系和协议设计。"
  },
  {
    "id": 178,
    "layer": "I · Security & Reliability",
    "title": "Zero Trust Networks",
    "authors": "Evan Gilman; Doug Barth",
    "domain": "Network / Security",
    "priority": "◎",
    "note": "身份、policy、segmentation、least privilege。"
  },
  {
    "id": 179,
    "layer": "I · Security & Reliability",
    "title": "Practical Binary Analysis",
    "authors": "Dennis Andriesse",
    "domain": "Security / Binary Analysis",
    "priority": "◎",
    "note": "executable、ELF、disassembly、binary instrumentation；compiler/OS/security 交叉。"
  },
  {
    "id": 181,
    "layer": "I · Security & Reliability",
    "title": "The Tangled Web",
    "authors": "Michal Zalewski",
    "domain": "Security / Web Architecture",
    "priority": "◎",
    "note": "Browser/Web security architecture，长期价值高。"
  },
  {
    "id": 196,
    "layer": "I · Security & Reliability",
    "title": "Model Checking",
    "authors": "Edmund M. Clarke; Orna Grumberg; Doron A. Peled",
    "domain": "Formal Methods",
    "priority": "◎",
    "note": "高可靠系统：系统性验证状态空间。"
  },
  {
    "id": 197,
    "layer": "I · Security & Reliability",
    "title": "Software Abstractions: Logic, Language, and Analysis",
    "authors": "Daniel Jackson",
    "domain": "Formal Methods",
    "priority": "◎",
    "note": "Alloy、formal modeling；设计前找逻辑错误。"
  },
  {
    "id": 198,
    "layer": "I · Security & Reliability",
    "title": "Introduction to Software Testing",
    "authors": "Paul Ammann; Jeff Offutt",
    "domain": "Software Testing",
    "priority": "◎",
    "note": "coverage、mutation、model-based testing。"
  },
  {
    "id": 200,
    "layer": "I · Security & Reliability",
    "title": "Practical TLA+",
    "authors": "Hillel Wayne",
    "domain": "Formal Methods",
    "priority": "◎",
    "note": "把 TLA+ 从形式语言变成工程工具。"
  },
  {
    "id": 44,
    "layer": "I · Security & Reliability",
    "title": "Serious Cryptography",
    "authors": "Jean-Philippe Aumasson",
    "domain": "Cryptography",
    "priority": "B",
    "note": "现代密码学工程。"
  },
  {
    "id": 48,
    "layer": "I · Security & Reliability",
    "title": "Safeware",
    "authors": "Nancy Leveson",
    "domain": "Safety / Systems",
    "priority": "B",
    "note": "软件、硬件和系统失效如何演变成事故。"
  },
  {
    "id": 50,
    "layer": "I · Security & Reliability",
    "title": "Site Reliability Engineering",
    "authors": "Betsy Beyer et al. (Google)",
    "domain": "Reliability / Operations",
    "priority": "B",
    "note": "大型计算基础设施可靠性。"
  },
  {
    "id": 172,
    "layer": "I · Security & Reliability",
    "title": "Network Security Assessment",
    "authors": "Chris McNab",
    "domain": "Network / Security",
    "priority": "○",
    "note": "从防御/审计角度理解网络暴露面。"
  },
  {
    "id": 180,
    "layer": "I · Security & Reliability",
    "title": "The Web Application Hacker’s Handbook",
    "authors": "Dafydd Stuttard; Marcus Pinto",
    "domain": "Security / Web",
    "priority": "○",
    "note": "理解 Web attack surface、漏洞类别和防御。"
  },
  {
    "id": 51,
    "layer": "J · AI Foundations & Models",
    "title": "Artificial Intelligence: A Modern Approach",
    "authors": "Stuart Russell; Peter Norvig",
    "domain": "AI Foundations",
    "priority": "A+",
    "note": "AI 全地图。"
  },
  {
    "id": 52,
    "layer": "J · AI Foundations & Models",
    "title": "Pattern Recognition and Machine Learning",
    "authors": "Christopher M. Bishop",
    "domain": "Machine Learning",
    "priority": "A+",
    "note": "概率机器学习基础。"
  },
  {
    "id": 53,
    "layer": "J · AI Foundations & Models",
    "title": "Deep Learning",
    "authors": "Ian Goodfellow; Yoshua Bengio; Aaron Courville",
    "domain": "Deep Learning",
    "priority": "A+",
    "note": "DL 母书。"
  },
  {
    "id": 54,
    "layer": "J · AI Foundations & Models",
    "title": "Probabilistic Machine Learning: An Introduction",
    "authors": "Kevin P. Murphy",
    "domain": "Machine Learning",
    "priority": "A+",
    "note": "现代概率机器学习。"
  },
  {
    "id": 55,
    "layer": "J · AI Foundations & Models",
    "title": "Reinforcement Learning: An Introduction",
    "authors": "Richard S. Sutton; Andrew G. Barto",
    "domain": "Reinforcement Learning",
    "priority": "A+",
    "note": "sequential decision making。"
  },
  {
    "id": 56,
    "layer": "J · AI Foundations & Models",
    "title": "Computer Vision: Algorithms and Applications",
    "authors": "Richard Szeliski",
    "domain": "Computer Vision",
    "priority": "A+",
    "note": "视觉感知。"
  },
  {
    "id": 101,
    "layer": "J · AI Foundations & Models",
    "title": "Understanding Deep Learning",
    "authors": "Simon J. D. Prince",
    "domain": "AI / Deep Learning",
    "priority": "◎",
    "note": "新一代 DL 母书；理论密度高，覆盖现代模型。"
  },
  {
    "id": 102,
    "layer": "J · AI Foundations & Models",
    "title": "Dive into Deep Learning",
    "authors": "Aston Zhang; Zachary C. Lipton; Mu Li; Alexander J. Smola",
    "domain": "AI / Deep Learning",
    "priority": "◎",
    "note": "数学 + 代码并行推进，把 DL 理论真正落实。"
  },
  {
    "id": 106,
    "layer": "J · AI Foundations & Models",
    "title": "Machine Learning: A Probabilistic Perspective",
    "authors": "Kevin P. Murphy",
    "domain": "AI / Probabilistic ML",
    "priority": "◎",
    "note": "全面的概率机器学习经典。"
  },
  {
    "id": 110,
    "layer": "J · AI Foundations & Models",
    "title": "Bayesian Reasoning and Machine Learning",
    "authors": "David Barber",
    "domain": "AI / Bayesian ML",
    "priority": "◎",
    "note": "Bayesian inference / latent variables / graphical models。"
  },
  {
    "id": 114,
    "layer": "J · AI Foundations & Models",
    "title": "Probabilistic Graphical Models: Principles and Techniques",
    "authors": "Daphne Koller; Nir Friedman",
    "domain": "AI / Graphical Models",
    "priority": "◎",
    "note": "Bayesian networks、Markov models、inference。"
  },
  {
    "id": 117,
    "layer": "J · AI Foundations & Models",
    "title": "Reinforcement Learning and Optimal Control",
    "authors": "Dimitri P. Bertsekas",
    "domain": "AI / Reinforcement Learning",
    "priority": "◎",
    "note": "RL 与 dynamic programming / optimal control 的连接。"
  },
  {
    "id": 118,
    "layer": "J · AI Foundations & Models",
    "title": "Algorithms for Reinforcement Learning",
    "authors": "Csaba Szepesvári",
    "domain": "AI / Reinforcement Learning",
    "priority": "◎",
    "note": "精炼的 RL 理论。"
  },
  {
    "id": 121,
    "layer": "J · AI Foundations & Models",
    "title": "Speech and Language Processing",
    "authors": "Daniel Jurafsky; James H. Martin",
    "domain": "AI / NLP",
    "priority": "◎",
    "note": "NLP / speech / transformers 的大地图。"
  },
  {
    "id": 125,
    "layer": "J · AI Foundations & Models",
    "title": "Graph Representation Learning",
    "authors": "William L. Hamilton",
    "domain": "AI / Graph ML",
    "priority": "◎",
    "note": "图神经网络、图表示；适合网络关系和复杂实体数据。"
  },
  {
    "id": 127,
    "layer": "J · AI Foundations & Models",
    "title": "Computer Vision: Models, Learning, and Inference",
    "authors": "Simon J. D. Prince",
    "domain": "AI / Computer Vision",
    "priority": "◎",
    "note": "重点是 vision 的数学模型，而不只是工具调用。"
  },
  {
    "id": 103,
    "layer": "J · AI Foundations & Models",
    "title": "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow",
    "authors": "Aurélien Géron",
    "domain": "AI / ML Engineering",
    "priority": "○",
    "note": "AI 工程实践地图；重点吸收 pipeline、训练、部署思想。"
  },
  {
    "id": 112,
    "layer": "J · AI Foundations & Models",
    "title": "Gaussian Processes for Machine Learning",
    "authors": "Carl Edward Rasmussen; Christopher K. I. Williams",
    "domain": "AI / Gaussian Processes",
    "priority": "○",
    "note": "小数据、不确定性估计和函数学习。"
  },
  {
    "id": 119,
    "layer": "J · AI Foundations & Models",
    "title": "Deep Reinforcement Learning Hands-On",
    "authors": "Maxim Lapan",
    "domain": "AI / Reinforcement Learning",
    "priority": "○",
    "note": "用代码理解现代 DRL；具体框架部分可快扫。"
  },
  {
    "id": 120,
    "layer": "J · AI Foundations & Models",
    "title": "Foundations of Deep Reinforcement Learning",
    "authors": "Laura Graesser; Wah Loon Keng",
    "domain": "AI / Reinforcement Learning",
    "priority": "○",
    "note": "DRL 算法结构和工程实现。"
  },
  {
    "id": 122,
    "layer": "J · AI Foundations & Models",
    "title": "Foundations of Statistical Natural Language Processing",
    "authors": "Christopher D. Manning; Hinrich Schütze",
    "domain": "AI / NLP",
    "priority": "○",
    "note": "统计 NLP 的基本思想。"
  },
  {
    "id": 123,
    "layer": "J · AI Foundations & Models",
    "title": "Neural Network Methods for Natural Language Processing",
    "authors": "Yoav Goldberg",
    "domain": "AI / NLP",
    "priority": "○",
    "note": "神经 NLP 的简洁理论桥梁。"
  },
  {
    "id": 124,
    "layer": "J · AI Foundations & Models",
    "title": "Natural Language Processing with Transformers",
    "authors": "Lewis Tunstall; Leandro von Werra; Thomas Wolf",
    "domain": "AI / NLP",
    "priority": "○",
    "note": "Transformer 工程体系；库 API 快速扫。"
  },
  {
    "id": 126,
    "layer": "J · AI Foundations & Models",
    "title": "Deep Learning for Vision Systems",
    "authors": "Mohamed Elgendy",
    "domain": "AI / Computer Vision",
    "priority": "○",
    "note": "CNN / detection / vision 工程。"
  },
  {
    "id": 128,
    "layer": "J · AI Foundations & Models",
    "title": "Pattern Classification",
    "authors": "Richard O. Duda; Peter E. Hart; David G. Stork",
    "domain": "AI / Pattern Recognition",
    "priority": "○",
    "note": "经典 pattern recognition；建立现代 ML 历史地基。"
  },
  {
    "id": 129,
    "layer": "K · AI Engineering & MLOps",
    "title": "Designing Machine Learning Systems",
    "authors": "Chip Huyen",
    "domain": "AI / ML Systems",
    "priority": "◎",
    "note": "数据、训练、deployment、drift、monitoring、reliability。"
  },
  {
    "id": 130,
    "layer": "K · AI Engineering & MLOps",
    "title": "Machine Learning Design Patterns",
    "authors": "Valliappa Lakshmanan; Sara Robinson; Michael Munn",
    "domain": "AI / ML Systems",
    "priority": "◎",
    "note": "数据表示、训练、serving、reproducibility、drift 等常见 ML 系统问题。"
  },
  {
    "id": 131,
    "layer": "K · AI Engineering & MLOps",
    "title": "Reliable Machine Learning",
    "authors": "Cathy Chen; Niall Richard Murphy; Kranti Parisa; D. Sculley; Todd Underwood",
    "domain": "AI / ML Reliability",
    "priority": "◎",
    "note": "重点是生产系统如何可靠，而不是只看 benchmark。"
  },
  {
    "id": 134,
    "layer": "K · AI Engineering & MLOps",
    "title": "AI Engineering: Building Applications with Foundation Models",
    "authors": "Chip Huyen",
    "domain": "AI / Foundation Models",
    "priority": "◎",
    "note": "Foundation model、evaluation、AI application architecture。"
  },
  {
    "id": 135,
    "layer": "K · AI Engineering & MLOps",
    "title": "Adversarial Machine Learning",
    "authors": "Anthony D. Joseph; Blaine Nelson; Benjamin I. P. Rubinstein; J. D. Tygar",
    "domain": "AI / Adversarial ML",
    "priority": "◎",
    "note": "理解恶意输入、模型攻击和对抗环境中的脆弱性；以防御角度读。"
  },
  {
    "id": 132,
    "layer": "K · AI Engineering & MLOps",
    "title": "Machine Learning Engineering",
    "authors": "Andriy Burkov",
    "domain": "AI / ML Engineering",
    "priority": "○",
    "note": "从实验模型走向完整 ML 工程。"
  },
  {
    "id": 133,
    "layer": "K · AI Engineering & MLOps",
    "title": "Practical MLOps",
    "authors": "Noah Gift; Alfredo Deza",
    "domain": "AI / MLOps",
    "priority": "○",
    "note": "CI/CD、model lifecycle、automation。"
  },
  {
    "id": 18,
    "layer": "L · Embedded & Real Time",
    "title": "Real-Time Systems",
    "authors": "Jane W. S. Liu",
    "domain": "Real-Time Systems",
    "priority": "A",
    "note": "正确还不够，必须按时正确。"
  },
  {
    "id": 19,
    "layer": "L · Embedded & Real Time",
    "title": "Real-Time Concepts for Embedded Systems",
    "authors": "Qing Li; Caroline Yao",
    "domain": "Real-Time Systems",
    "priority": "A",
    "note": "RTOS、调度、IPC、实时嵌入式。"
  },
  {
    "id": 81,
    "layer": "L · Embedded & Real Time",
    "title": "Making Embedded Systems",
    "authors": "Elecia White",
    "domain": "Embedded Systems",
    "priority": "A",
    "note": "嵌入式工程思维。"
  },
  {
    "id": 82,
    "layer": "L · Embedded & Real Time",
    "title": "Embedded Systems Architecture",
    "authors": "Tammy Noergaard",
    "domain": "Embedded Systems",
    "priority": "A",
    "note": "整个 embedded stack。"
  },
  {
    "id": 83,
    "layer": "L · Embedded & Real Time",
    "title": "Embedded Systems: Introduction to ARM Cortex-M Microcontrollers",
    "authors": "Jonathan W. Valvano",
    "domain": "Embedded / MCU",
    "priority": "A",
    "note": "MCU、外设、中断、实时控制。"
  },
  {
    "id": 84,
    "layer": "L · Embedded & Real Time",
    "title": "Designing Embedded Hardware",
    "authors": "John Catsoulis",
    "domain": "Embedded Hardware",
    "priority": "B",
    "note": "软件工程师理解硬件接口。"
  },
  {
    "id": 58,
    "layer": "M · Signals, Control & Estimation",
    "title": "State Estimation for Robotics",
    "authors": "Timothy D. Barfoot",
    "domain": "State Estimation",
    "priority": "A+",
    "note": "传感器数据如何变成系统状态估计。"
  },
  {
    "id": 61,
    "layer": "M · Signals, Control & Estimation",
    "title": "Modern Robotics: Mechanics, Planning, and Control",
    "authors": "Kevin M. Lynch; Frank C. Park",
    "domain": "Robotics",
    "priority": "A+",
    "note": "机器人学核心母书。"
  },
  {
    "id": 64,
    "layer": "M · Signals, Control & Estimation",
    "title": "Feedback Systems",
    "authors": "Karl J. Åström; Richard M. Murray",
    "domain": "Control",
    "priority": "A+",
    "note": "控制理论和现代系统连接。"
  },
  {
    "id": 69,
    "layer": "M · Signals, Control & Estimation",
    "title": "Principles of GNSS, Inertial, and Multisensor Integrated Navigation Systems",
    "authors": "Paul D. Groves",
    "domain": "Navigation / Sensor Fusion",
    "priority": "A+",
    "note": "导航、IMU、多传感器融合。"
  },
  {
    "id": 71,
    "layer": "M · Signals, Control & Estimation",
    "title": "Signals and Systems",
    "authors": "Alan V. Oppenheim; Alan S. Willsky; S. Hamid Nawab",
    "domain": "Signals",
    "priority": "A+",
    "note": "雷达、通信、控制、传感的共同数学语言。"
  },
  {
    "id": 76,
    "layer": "M · Signals, Control & Estimation",
    "title": "Introduction to Radar Systems",
    "authors": "Merrill I. Skolnik",
    "domain": "Radar",
    "priority": "A+",
    "note": "雷达基本体系。"
  },
  {
    "id": 59,
    "layer": "M · Signals, Control & Estimation",
    "title": "Probabilistic Robotics",
    "authors": "Sebastian Thrun; Wolfram Burgard; Dieter Fox",
    "domain": "Probabilistic Systems",
    "priority": "A",
    "note": "localization / mapping / uncertainty。"
  },
  {
    "id": 60,
    "layer": "M · Signals, Control & Estimation",
    "title": "Planning Algorithms",
    "authors": "Steven M. LaValle",
    "domain": "Planning",
    "priority": "A",
    "note": "path / motion / planning 理论。"
  },
  {
    "id": 62,
    "layer": "M · Signals, Control & Estimation",
    "title": "Robotics: Modelling, Planning and Control",
    "authors": "Bruno Siciliano et al.",
    "domain": "Robotics",
    "priority": "A",
    "note": "运动学、动力学和控制。"
  },
  {
    "id": 63,
    "layer": "M · Signals, Control & Estimation",
    "title": "Introduction to Autonomous Mobile Robots",
    "authors": "Roland Siegwart; Illah Nourbakhsh; Davide Scaramuzza",
    "domain": "Autonomous Systems",
    "priority": "A",
    "note": "自主移动系统。"
  },
  {
    "id": 65,
    "layer": "M · Signals, Control & Estimation",
    "title": "Modern Control Engineering",
    "authors": "Katsuhiko Ogata",
    "domain": "Control",
    "priority": "A",
    "note": "自动控制核心。"
  },
  {
    "id": 66,
    "layer": "M · Signals, Control & Estimation",
    "title": "Nonlinear Systems",
    "authors": "Hassan K. Khalil",
    "domain": "Control",
    "priority": "A",
    "note": "真实平台大量问题不是线性的。"
  },
  {
    "id": 67,
    "layer": "M · Signals, Control & Estimation",
    "title": "Optimal State Estimation",
    "authors": "Dan Simon",
    "domain": "State Estimation",
    "priority": "A",
    "note": "Kalman filter 等状态估计。"
  },
  {
    "id": 70,
    "layer": "M · Signals, Control & Estimation",
    "title": "Strapdown Inertial Navigation Technology",
    "authors": "David Titterton; John Weston",
    "domain": "Navigation",
    "priority": "A",
    "note": "惯性导航深入。"
  },
  {
    "id": 72,
    "layer": "M · Signals, Control & Estimation",
    "title": "Discrete-Time Signal Processing",
    "authors": "Alan V. Oppenheim; Ronald W. Schafer",
    "domain": "Signal Processing",
    "priority": "A",
    "note": "数字信号处理基础。"
  },
  {
    "id": 73,
    "layer": "M · Signals, Control & Estimation",
    "title": "Digital Signal Processing",
    "authors": "John G. Proakis; Dimitris G. Manolakis",
    "domain": "Signal Processing",
    "priority": "A",
    "note": "DSP 系统补充。"
  },
  {
    "id": 74,
    "layer": "M · Signals, Control & Estimation",
    "title": "Fundamentals of Statistical Signal Processing, Vol. I: Estimation Theory",
    "authors": "Steven M. Kay",
    "domain": "Statistical Signal Processing",
    "priority": "A",
    "note": "估计理论。"
  },
  {
    "id": 75,
    "layer": "M · Signals, Control & Estimation",
    "title": "Fundamentals of Statistical Signal Processing, Vol. II: Detection Theory",
    "authors": "Steven M. Kay",
    "domain": "Statistical Signal Processing",
    "priority": "A",
    "note": "检测理论。"
  },
  {
    "id": 77,
    "layer": "M · Signals, Control & Estimation",
    "title": "Principles of Modern Radar: Basic Principles",
    "authors": "Mark A. Richards et al.",
    "domain": "Radar",
    "priority": "A",
    "note": "现代雷达理论。"
  },
  {
    "id": 57,
    "layer": "M · Signals, Control & Estimation",
    "title": "Multiple View Geometry in Computer Vision",
    "authors": "Richard Hartley; Andrew Zisserman",
    "domain": "Computer Vision / Geometry",
    "priority": "B",
    "note": "多视角几何、相机、3D。"
  },
  {
    "id": 68,
    "layer": "M · Signals, Control & Estimation",
    "title": "Optimal Control and Estimation",
    "authors": "Robert F. Stengel",
    "domain": "Control / Estimation",
    "priority": "B",
    "note": "最优控制与状态估计。"
  },
  {
    "id": 78,
    "layer": "M · Signals, Control & Estimation",
    "title": "Radar Systems Analysis and Design Using MATLAB",
    "authors": "Bassem R. Mahafza",
    "domain": "Radar / Simulation",
    "priority": "B",
    "note": "用计算/仿真连接雷达理论。"
  },
  {
    "id": 91,
    "layer": "N · Aerospace & Space Apps",
    "title": "Fundamentals of Aerodynamics",
    "authors": "John D. Anderson Jr.",
    "domain": "Aerospace / Aerodynamics",
    "priority": "A",
    "note": "飞行器空气动力基础。"
  },
  {
    "id": 92,
    "layer": "N · Aerospace & Space Apps",
    "title": "Flight Dynamics Principles",
    "authors": "Michael V. Cook",
    "domain": "Aerospace / Flight Dynamics",
    "priority": "A",
    "note": "飞行动力学与稳定性。"
  },
  {
    "id": 93,
    "layer": "N · Aerospace & Space Apps",
    "title": "Aircraft Control and Simulation",
    "authors": "Brian L. Stevens; Frank L. Lewis; Eric N. Johnson",
    "domain": "Aerospace / Control",
    "priority": "A",
    "note": "飞行控制、动力学、仿真。"
  },
  {
    "id": 95,
    "layer": "N · Aerospace & Space Apps",
    "title": "Avionics Navigation Systems",
    "authors": "Myron Kayton; Walter R. Fried",
    "domain": "Avionics / Navigation",
    "priority": "A",
    "note": "航电与导航。"
  },
  {
    "id": 96,
    "layer": "N · Aerospace & Space Apps",
    "title": "Rocket Propulsion Elements",
    "authors": "George P. Sutton; Oscar Biblarz",
    "domain": "Aerospace / Propulsion",
    "priority": "A",
    "note": "航天推进基础物理和工程。"
  },
  {
    "id": 97,
    "layer": "N · Aerospace & Space Apps",
    "title": "Orbital Mechanics for Engineering Students",
    "authors": "Howard D. Curtis",
    "domain": "Space / Orbital Mechanics",
    "priority": "A",
    "note": "轨道力学。"
  },
  {
    "id": 98,
    "layer": "N · Aerospace & Space Apps",
    "title": "Spacecraft Dynamics and Control",
    "authors": "Anton H. J. de Ruiter; Christopher Damaren; James R. Forbes",
    "domain": "Space / Control",
    "priority": "A",
    "note": "航天器姿态、动力学、控制。"
  },
  {
    "id": 99,
    "layer": "N · Aerospace & Space Apps",
    "title": "Fundamentals of Astrodynamics",
    "authors": "Roger R. Bate; Donald D. Mueller; Jerry E. White",
    "domain": "Space / Astrodynamics",
    "priority": "A",
    "note": "航天动力学经典。"
  },
  {
    "id": 94,
    "layer": "N · Aerospace & Space Apps",
    "title": "Aircraft Systems: Mechanical, Electrical, and Avionics Subsystems Integration",
    "authors": "Ian Moir; Allan Seabridge",
    "domain": "Avionics / Systems",
    "priority": "B",
    "note": "现代飞机作为 system-of-systems。"
  },
  {
    "id": 100,
    "layer": "N · Aerospace & Space Apps",
    "title": "Space Mission Analysis and Design",
    "authors": "James R. Wertz; Wiley J. Larson",
    "domain": "Space Systems",
    "priority": "B",
    "note": "把推进、轨道、通信、载荷、电源、任务设计组合为完整空间系统。"
  },
  {
    "id": 193,
    "layer": "O · Software Architecture",
    "title": "Fundamentals of Software Architecture",
    "authors": "Mark Richards; Neal Ford",
    "domain": "Software Architecture",
    "priority": "◎",
    "note": "架构 trade-off、modularity、distributed architecture。"
  },
  {
    "id": 194,
    "layer": "O · Software Architecture",
    "title": "Software Architecture: The Hard Parts",
    "authors": "Neal Ford; Mark Richards; Pramod Sadalage; Zhamak Dehghani",
    "domain": "Software Architecture",
    "priority": "◎",
    "note": "分布、consistency、coupling、data ownership 等困难决策。"
  },
  {
    "id": 195,
    "layer": "O · Software Architecture",
    "title": "Software Engineering at Google",
    "authors": "Titus Winters; Tom Manshreck; Hyrum Wright",
    "domain": "Software Engineering",
    "priority": "◎",
    "note": "大规模代码库、testing、dependency、build、review、长期维护。"
  }
]
