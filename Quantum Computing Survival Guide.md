# QCSG

<h3>The Quantum Computing Survival Guide</h3>

##### Written by Zack Schieberl

[toc]

## Preface

This document is meant to be a modern equivalent to a textbook for quantum computing. Modern equivalent - don't textbooks still exist in today's world? Yes, but it is our belief that the current format of paper textbooks do not translate well to the new generation's style of learning. 

* This document has links to other parts of itself for ease of access as well as links to outside resources. This format is better suited for reading on a computer than using a glossary or series of appendices. 
* This document uses applets to produce animations and interactive figures. The PDF version does not support these applets, so static images are used as a replacement. Use the web version to interact with the figures.
* Every question has an answer. With the advent of online answer services, creating a list of exercises for the reader is synonymous with providing homework questions for teachers to use. This does nothing but discriminate against those who cannot afford the paid answer services. Instructors who decide to use this textbook in the setting of a classroom will need to create their own homework, or at least modify the existing questions we provide. 
* This document is free. It will always be free. All future versions of this document will be free. Nearly all textbooks are pirated, scanned, and uploaded to the internet. Why not provide an encouraging environment for students rather than making them feel like criminals for learning?
* We accept corrections, suggestions, and new ideas from _anyone_. Simply post a new issue on the public [GitHub repository](https://github.com/zackatoo/QuantumComputingSG) for this textbook using the proper format. Having a public GitHub also allows any reader to view all past versions of the document and the authors of those changes.
* This document is covered by the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license, meaning the material may be redistributed, copied, or modified freely, by anyone, so long as proper attribution is given. The code associated with this document is covered by the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), meaning the code may be redistributed, used in private or public projects, or modified freely, by anyone, so long as proper attribution is given. The code can not be patented except by the original author.
* We expect this document to eventually be adapted into a video lecture series, free and available to everyone, of course. 

#### Quantum? What's that?

_Quantum mechanics_ are the laws which govern _quantum physics_, the study of very small particles such as atoms, electrons, and photons. No previous knowledge of quantum mechanics or quantum physics is assumed or required to understand this document. However we do make some assumptions about the reader's knowledge of mathematics and computer science:

* Precalculus: Complex Numbers, Trigonometry, Polar Coordinates, Radians
* Linear Algebra: Vectors, Matrices, Matrix Multiplication, 3 Dimensional Math
* Discrete Mathematics: Boolean Algebra, Turing Machines, Complexity Classes
* Computer Science: Introductory Programming, Data Structures, Algorithms, Computer Organization
  * These topics are especially important: Arrays, Big-Oh Notation, Bitwise Manipulation

Some amount of review for these topics is provided, but we are assuming readers will already have been introduced. We expect this document will be completely understandable to a Computer Science undergraduate by the end of their second year. 

#### Outline of the Document

The first chapter is a simple introduction to the history of quantum computing and why it is & will be useful. This chapter is not required, but can be useful for providing a bridge to the real world. The next three chapters form the foundations of quantum computing. After the chapter on entanglement, the document opens up, allowing instructors to focus on a particular subfield if they so choose.

<img src="resources\img\Preface_chap_dep.svg" width="700px"/>

<center><i>Figure 0.1.1 The Chapter Dependency Graph</i></center>



## Chapter 1:   Why Quantum Computing?

The entire document is used to describe what quantum computing is, but I think it is important to understand why quantum computers are important. What is their history and what can they do for society? 

### [1.1](#QCSG)   The New Age of Computing

Gordon Moore made an observation that the number of transistors in an integrated circuit doubles every 2 years, known as _Moore's Law_. There are only two ways to increase the number of transistors: make them smaller, or make the chip larger. So far we have continued to choose the first option, finding new methods to make the transistors smaller and smaller each year to follow this pattern. However, scientists can't continue to make them smaller forever. After all, we are bounded by the limits of physics of our universe. The size of transistors can't breach the atomic barrier, becoming smaller than atoms. It is unclear when our computers will begin to diverge from Moore's Law.

Luckily, the end of Moore's Law does not mean the end of improvement for computers. There are certainly other methods to give computers more memory, make them faster, and improve power consumption. Once such method is the use of specialized hardware. Rather than doing every single operation on the _Central Processing Unit (CPU)_, computers can delegate specific tasks to other hardware which are designed to be efficient at one job. One common example is the _Graphics Processing Unit (GPU)_, which is a separate device used to handle massively parallel programs. The architecture and style of programming for GPUs is different for GPUs than CPUs. There are some problems that run incredibly fast on a GPU, however some problems actually run slower. 

Every algorithm has a _time complexity_, a formula describing how long the algorithm takes to run based off the size of the input. If we built new hardware which could significantly lower the time complexity for certain problems, it would signal a new age for computers. Introducing _quantum computers_: computers which run off of different principals than classical computers, derived from the laws of quantum mechanics. 

<center><i>Do scientists just put the word 'quantum' in front of everything?</i></center>

To answer your question: pretty much. Formally, the word _quantum_, and its plural _quanta_, can be used to describe any discrete chunk of something. In science, especially physics and chemistry, quantum is used to describe the study of very small particles: atoms, electrons, quarks, photons, etc. A quantum computer is any machine which uses a series of transformations, based off of quantum physics, to manipulate data into a desired result. These quantum computers are significantly different from classical computers. The methods of storing, transforming, and reading quantum data is unintuitive from a classical computer's perspective.

Researchers have shown that some problems such as integer factoring and searching unsorted data can be implemented more efficiently on a quantum computer than a classical one. Using a _Quantum Processing Unit (QPU)_, a CPU could send it specific jobs which are solved much faster on a quantum computer. There are many issues plaguing current quantum computers which make them difficult to offer to the general public, but the future of quantum computing looks very bright and there is still much to be discovered. 

<img src="resources\img\1.1_device_arch.png" width="500px"/>

<center><i>Figure 1.1.1 A Possible Future Computer Architecture</i></center>

This figure shows a potential architecture of future computers. The central processing unit would act as the manager for the computer, running a majority of the operating system and delegating specific tasks to the devices suited for them. 

Another possible architecture of future computers follows the trend of _cloud computing_ in which users send tasks to a quantum computing cluster over the internet. The result of the computation would be sent back to the user when the program finishes. If our society begins to focus more on subscription services, this may end up becoming a more popular alternative to owning your own quantum computer.

### [1.2](#QCSG)   A Brief History of Quantum Computing

The birth of quantum computing can be attributed to a man named Richard Feynman. Famous for a plethora of accomplishments in physics during the twentieth century, one of his biggest was the discovery of quantum electrodynamics. He was interested in simulating many different particles to verify his theory, but found that classical computing did not have the ability to effectively produce the results he was looking for. So, in the early 1980s, he proposed the idea of a quantum computer. Unfortunately, there was not a high demand for this type of computation and constructing a quantum computer is immensely difficult. For the next few decades, the field of quantum computing progressed slowly. 

Then, in 1994, Peter Shor shocked the world with his quantum algorithm to factor integers in polynomial time. This not only revealed there was some use in quantum computing, but that there were probably many other useful quantum algorithms yet to be invented. Not too long after came Grover's algorithm along with other quantum search algorithms. By the late 1990s, the theoretical field of quantum computing was alive with activity.

#### The Field(s) of Quantum

The field of quantum computing has foundations in quantum physics, but ultimately, they have separated. New students looking to study quantum computing don't need previous knowledge from quantum physics similar to how classical computer scientists don't need knowledge from electrical engineering. 

<img src="resources\img\1.1_venn.png" width="500px"/>

<center><i>Figure 1.2.1 The Two Parallel Fields</i></center>

Quantum information science is a parallel field of study to quantum computing, and the material often overlaps. Both fields are very new, less than half a century old, and have yet to be thoroughly defined. It is difficult to say if these fields are separate from one another or if these are both subsections of the same field. Typically, quantum information science covers the theory behind combining quantum mechanics with Turing machines, pioneered by Paul Benioff in the early 1980s. Quantum computing covers the implementation of a quantum computer and how it interacts with a classical computer. Both fields cover qubits, quantum circuits, entanglement, and teleportation which are discussed in this document. At this moment, it is unclear if the overlap between the fields is so large that they will be joined or if they will diverge. Only the time will tell.

#### Learning Approaches to Quantum Computing

Typically, there are three approaches to learning about quantum computing. These depend on which field the student is coming from. With classical computers, the fields in order of increasing abstractness are: electrical engineering, computer engineering, computer science, and mathematics. Electrical engineers deal with the physical implementations of computers, mathematicians deal with the proofs of logic, and the computer engineers & scientists fill in the gaps.

<img src="resources\img\1.2_fields.png" width="500px"/>

<center><i>Figure 1.2.2 The Parent Fields</i></center>

Quantum computing also has a similar structure of parent fields. The physical implementations involving working with quantum particles are done by physicists, the proofs for computation are handled by mathematicians, and the computer scientists bridge that gap. This document will primarily be focused on the computer scientist's perspective, although we will be exploring a little bit into the other sides. In the future we expect numerous subfields to appear, dealing with various aspects of quantum computing.

#### Historic Quantum Computers

Many different types of quantum computers have been designed over the past few decades. A few of the important milestones for the development of physical implementations are listed here:

* 1995 - [First realization of a quantum logic gate](https://tf.nist.gov/general/pdf/140.pdf)
* 1998 - [First implementation of Grover's Algorithm on a 2 qubit computer](https://pdfs.semanticscholar.org/6c05/5053f4f1605fdc0bd474c7a350dcd01f627d.pdf)
* 2001 - [First implementation of Shor's Algorithm factoring 15](http://cryptome.org/shor-nature.pdf)
* 2006 - [First demonstration of teleportation](https://web.archive.org/web/20070207105035/http://www.york.ac.uk/admin/presspr/pressreleases/kirkclone.htm)
* 2011 - [First commercially available quantum annealer (D-Wave One)](https://web.archive.org/web/20110515083848/http://physicsworld.com/cws/article/news/45960)
* 2016 - [First quantum computer available on the cloud (IBM)](https://arxiv.org/abs/1605.05709)
* 2019 - [First instance of a claim to quantum supremacy (Google)](https://ai.googleblog.com/2019/10/quantum-supremacy-using-programmable.html)

### [1.3](#QCSG)   Modern Applications of Quantum Computers

cool stuff

### [1.4](#QCSG)   Future Applications of Quantum Computers

super cool stuff



## [Chapter 2:](#QCSG)   Qubits & Superposition

The smallest possible unit of data in a classical computer is a _bit_. It stands for binary digit. A single bit can either be zero or one. The term 'bit' is often used interchangeably with _boolean_, whose value is either true or false. Every piece of data which can be stored in a computer's memory is a sequence of these bits. Qubits are the smallest possible unit of data in a quantum computer and they have more properties than ordinary bits.

### [2.1](#QCSG)   Quantum Particles

Although this document is focused towards computer scientists, it is important to learn about the nature of quantum particles to understand where qubits come from. This explanation will only scrape the surface of the wonderful world of quantum physics, but it will suffice for the purposes of this document.

Quantum particles have close ties to _waves_, a mathematical function which can be described by four attributes: the amplitude, frequency, and horizonal & vertical shifts. A wave function has the following form:
$$
F(x)=A\sin(B(x+C))+D
$$


<iframe height='500' scrolling='no' title='Sine Wave Applet' src='resources\applets\sin_wave\index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; user-select:none;'>Sine Wave Applet</iframe>

<center><i><a href="resources/applets/sin_wave/index.html" target="_blank">Applet 2.1.1</a> The Sine Wave</i></center>

This figure shown above is called an _applet_. It is an interactable program embedded inside the document which allows readers to change values to view the topic in depth. For this applet, you can click and drag on the green sliders which change the 4 values to see their impact on the wave.

Several famous experiments, such as the double slit experiment, have shown that light and matter can have properties of both particles and waves. This is known as _wave/particle duality_. When an electron is released from a source, it acts as a wave which propagates through space until contacting a surface. Once the electron collides with a surface, it is only observable in one location. 

<img src="resources\img\2.1_electron.png" width="650px"/>

<center><i>Figure 2.1.2 - Electron Colliding with a Wall in a Random Location</i></center>

The location where it will be observable is random and cannot be determined ahead of time. However, the likelihood of the electron appearing in a specific location can be calculated using a probability function.  

<img src="resources\img\2.1_prob_wave.svg" width="550px"/>

<center><i>Figure 2.1.3 - A Probability Function</i></center>

The function shown above contains information on how likely the electron is to be observed at a specified location. In this graph, the X axis is the location and the Y axis is how likely it is to appear at that location. The electron is very likely to appear somewhere in the middle and it is very unlikely to appear near the edges. In the bottom left corner of this graph, when $x=0$ it shows that $y=0$ as well. This means the electron can __never__ appear at location 0. The same logic applies at the bottom right corner.

The wave equation is a model for how waves move through space. It is a function of two variables, location and time: $F(x, t)$. At the moment the electron is observed, time is no longer a variable and is held constant since it does not change. In quantum computing, how the wave moves is not a concern of ours, so we do not use time as a variable. 

The rest of this document is dedicated towards explaining the rules governing qubits and their interactions, this is the only section which makes an attempt at showing where the rules are derived from. An inquiring mind may ask "why do qubits follow these rules specifically?" and the only answer is because they follow from the laws of quantum mechanics.

###  [2.2](#QCSG)   Modeling Waves with Vectors

The fundamental unit of information in classical computers are bits. They can either be on or off. There are only two possible states. Figure 2.1.2 shows a probability function which is continuous, there are an infinite number of locations, each with their own probability of being observed at said location. To make these probability functions palatable to computer scientists, the probability functions need to be transformed into binary.

There are already many decades worth of development in computer science which is in binary. Having two states allows quantum computer scientists to create algorithms, build architectures, and store data based on classical computers without factoring in a change of radix. Another reason for dividing the continuous function into two sections is because it makes many physical implementations of qubits easier.

To extend our example from the previous section, we can convert to binary by drawing a line across our wall and seeing if the electron is observed above or below the line. The electron has a probability $p$ of being above the line where $p$ is $0\leq p\leq1$. There is also a probability of $q = 1-p$ that the electron is below the line where $q$ is also $0\leq q\leq1$. 

<img src="resources\img\2.2_electron_prob.png" width="650px"/>

<center><i>Figure 2.2.1 - Electron Colliding with a Discretely Sectioned Wall</i></center>

What we have just described is known as a _probabilistic bit_, or _pbit_. A pbit is a bit which has a certain probability or being off, which we have denoted above as $p$. It also has a certain probability of being on, which we have denoted above as $q$. As both these values are probabilities, they are constrained to $p+q=1$. The concept of a pbit is not exclusive to quantum, they also are used in binary classifiers from machine learning, random number generators, etc.

Our goal is to convert a wave equation like the sine function into a pbit. One of the first things a precalculus course teaches is the relationship between trigonometric functions and circles. Taking a look at the unit circle, we can see the X and Y coordinates of the circle with radius 1 are the outputs of the cosine and sine functions.

<iframe height='500' scrolling='no' title='Unit Circle Applet' src='resources\applets\unit_circle\index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; user-select:none;'>Unit Circle Applet</iframe>

<center><i><a href="resources/applets/unit_circle/index.html" target="_blank">Applet 2.2.2</a> The Unit Circle</i></center>

A _vector_ is a mathematical object which has both magnitude and direction. We have a vector here whose magnitude is $1$ and direction is determined by the variable $\theta$, the angle from the positive X axis to the vector. $\theta$ is called a _polar coordinate_ which is the input to the trigonometric functions that produce the cartesian coordinates $x$ and $y$. The vector $\mathbf{v}$ is described as:
$$
\mathbf{v}=\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}cos\ \theta \\ sin\ \theta\end{bmatrix}
$$
This can be used to fit our description of a pbit by remembering the Pythagorean trigonometric identity:
$$
\begin{aligned}
x^2+y^2&=1 \\
cos^2\theta+sin^2\theta &= 1 \\
p + q &= 1
\end{aligned}
$$
From this we can see our probabilistic bit relate to the quantum wave functions as:
$$
p = cos^2\theta \\
q = sin^2\theta
$$
Since $p$ and $q$ are always positive, we can apply the constraint $0\leq\theta\leq\frac{\pi}{2}$. 

There are two unit vectors which are special enough to be named: $\hat{i}$ and $\hat{j}$. These vectors are both of length $1$ and are orthogonal to each other.
$$
\hat{i} = \begin{bmatrix}1\\0\end{bmatrix} \\
\hat{j} = \begin{bmatrix}0\\1\end{bmatrix}
$$
These _basis vectors_ represent our X and Y axes since $\hat{i}$ is directly along the X axis and $\hat{j}$ is directly along the Y axis. The vector $\mathbf{v}$ can be rewritten using vector addition:
$$
\mathbf{v} = \begin{bmatrix}\sqrt p \\ \sqrt q\end{bmatrix}
= \sqrt p\begin{bmatrix}1\\0\end{bmatrix}+\sqrt q\begin{bmatrix}0\\1\end{bmatrix}
= \sqrt p\hat{i}+\sqrt q\hat{j}
$$
After viewing this relationship, we see:

* $\hat{i}$ conceptually represents the off state, or 0, or the electron being observed above the line on the wall
* $\hat{j}$ conceptually represents the on state, or 1, or the electron being observed below the line on the wall
* $p$ and $q$ still represent the probabilities of those states occurring
* $\mathbf{v}$ represents the entire state of the pbit, or the electron & wall system 

This model of a pbit is not a completely new innovation, it is simply a transformation from the quantum wave equation which is easier to digest for computer scientists. 

However, our transformation is not complete. We have translated the probabilistic nature of quantum particles but there is still another feature of those particles which we have not translated: phase. Without including phase, we cannot say our model acts as a true quantum bit, also known as qubit.

Before extending our vector based model to the true qubit model, a new style of notation needs to be introduced. The notation of quantum physicists: the Dirac notation.

### [2.3](#QCSG)   Dirac Notation

Paul Dirac invented a notation system for discussing quantum mechanics and it has been adopted into quantum computing. The notation is called "bra-ket" since it uses the angle brackets $\langle\rangle$. Truly the peak of twentieth century physics humor. 

#### Ket Notation

Any vector can be expressed by placing it inside a vertical line  |  and right angle bracket  $\rangle$ . By placing it inside, $|\mathbf{v}\rangle$, we pronounce it "ket-v". This object conceptually represents a quantum state, however it is still mathematically equivalent to a vector. Specifically, a quantum state is a member of a _complex Hilbert space_, but thinking of them as vectors is acceptable in quantum computing. 

Since a ket represents a quantum state, we can put our own quantum states inside the ket like:|above-line$\rangle$ and |below-line$\rangle$ to represent the electron being observed above or below the line on the wall. Some more examples of kets are:

* |spin-up$\rangle$ and |spin-down$\rangle$ to represent the spin of a photon
* |ground$\rangle$ and |excited$\rangle$ to represent how close an electron is to its nucleus
* |/$\rangle$ and |\\$\rangle$ to represent diagonal and anti-diagonal polarization of light
* |clockwise$\rangle$ and |counterclockwise$\rangle$ to represent direction of current flow in a circuit

However by far the most common kets used in this document and in the quantum computing community are $|0 \rangle$ and $|1\rangle$. We can abstract away the physics used for the quantum state and focus on the value. Similar to how computer scientists don't care if their bit is representing a magnetic field in their hard drive or amplitude of current in a wire, they just care about the value. $|0\rangle$ and $|1\rangle$ can be any two orthogonal basis states in quantum mechanics. 

The quantum state representing an entire system is denoted by the special Greek letter $\psi$, written "Psi", and pronounced "Sai". Using all of this information, we can rewrite our pbit model using Dirac notation:
$$
\begin{aligned}
Vector\ Notation&\quad\mathbf{v} = \sqrt p\hat{i} + \sqrt q\hat{j} \\
Dirac\ Notation&\quad|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
\end{aligned}
$$
Even though we have not extended the pbit to the full qubit model, the above equation still holds for qubits. This equation is called **The General Form of the Qubit** and is one of the most important concepts in all of quantum computing. 

It is important to understand that all of the symbols in the Dirac notation are the same mathematical objects. $|0\rangle$ and $|1\rangle$ are the exact same unit vectors previously represented by $\hat{i}$ and $\hat{j}$. $\alpha$ and $\beta$ are still scalars which determine the probabilities when squared.

Using our new form of notation, let's reason about the process of projecting an electron at a wall.  If the electron is detected above the line, then we know $|\psi\rangle=|0\rangle$. This is the same as saying "the state of the electron is the state of being above the line". On the other hand, if the electron is detected below the line, we know $|\psi\rangle=|1\rangle$. This is the same as saying "the state of the electron is the state of being below the line". 

However, what do we call the state before the electron contacts the wall? The electron is still a wave moving through space. We do not know if the electron will be observed above or below the line since it is random, but we know the likelihood of those events occurring: $|\psi\rangle=\alpha|0\rangle+\beta|1\rangle$. Until the electron makes contact with the wall, it is reasonable to say "the state of the electron is both the state of being above and below the line". In other words, the electron's state is a combination of the two outcome states. When a quantum state can only be described as a combination of two or more basis states, we say the quantum state is in _superposition_. 

#### Superposition

Superposition is one of those words which people think is more magical than it really is. Flipping a coin can be described with superposition too. When the coin is in the air, before it lands, the state can be modeled as: $|coin\rangle = {}^1{\mskip -5mu/\mskip -3mu}_\sqrt2|heads\rangle + {}^1{\mskip -5mu/\mskip -3mu}_\sqrt2|tails\rangle$. When this coin is twirling around in the air, you have no idea which side it will land on. At this moment in time, it is reasonable to say the coin is a combination of heads and tails. The coin is in superposition. To a human, the outcome of a coin flip is a random event. The only difference between the coin and the electron is if you have a good enough computer, it could simulate the physics of the coin toss and determine the outcome before the coin landed whereas the outcome of the electron cannot be determined before it lands. 

When the electron collides with the wall, it is observed. The moment the electron is observed, the state goes from being in superposition to a basis state. This process is called _collapsing_ and is instantaneous. The probabilities $\alpha^2$ and $\beta^2$ and destroyed and only the state $|0\rangle$ or $|1\rangle$ is left. Colliding with a wall is not the only way to collapse a quantum state. Making any sort of measurement or observation on the system will cause the superposition to be destroyed and the system will choose one of the basis states to collapse to using the assigned probabilities. 

Erwin Schrödinger is a famous physicist who was instrumental in developing the quantum wave equation. He also created a hypothetical scenario to help explain the concept of superposition: _Schrödinger's Cat_. This thought experiment describes putting a cat inside a soundproof box with a bomb which has a 50% chance to explode after 1 minute passes. After a minute passes, there are two possible outcomes of the experiment:

* The bomb explodes, and the cat is dead
* The bomb does not explode, and the cat is alive

However, to see if the cat is alive or not, the box must be opened. Let's begin the experiment. Put the cat inside the box, close it, and wait a minute. After the minute passes, what is the state of the cat? Is it alive or dead? We don't know. Nobody does, until the box is opened and the state is observed. Before the box is opened, we can say the state of the cat is in superposition. The cat is a combination of dead and alive at the same time. We can also model the state of the cat as: $|cat\rangle = {}^1{\mskip -5mu/\mskip -3mu}_\sqrt2|alive\rangle+{}^1{\mskip -5mu/\mskip -3mu}_\sqrt2|dead\rangle$. 

It is important to note that no cats were harmed in this theoretical scenario.

#### Bra Notation

The ket notation is used to describe column vectors; there is also a partner notation to describe row vectors: bra. The vector placed between a left angle bracket $\langle$  and a vertical line | is pronounced "bra-v": $\langle\bold{v}|$ . The bra is just the transpose of ket.
$$
\langle\bold{v}| = |\bold{v}\rangle^\top
$$
Now that we have defined our mathematical notation for vectors, we can describe common operations seen in linear algebra.

The notation for matrix-vector multiplication is identical to the standard notation:
$$
BA|\bold{v}\rangle \\
|BA\bold{v}\rangle
$$
Matrices can be inside or outside of the ket, but the order is right-to-left. $A$ is applied first followed by $B$. 

Dot products, also called _inner products_, between two vectors can be described by a combined bra-ket notation:
$$
\langle\bold{u}|\bold{v}\rangle=\bold{u}^\top\bold{v}=\bold{u}\cdot\bold{v}
$$
In Dirac notation, this is called the "overlap" between $\bold{u}$ and $\bold{v}$ since the dot product is related to how far one vector can project onto another. A vector will always overlap completely with itself, so $\langle\psi|\psi\rangle=1$. Any two vectors which are mutually orthogonal will have no overlap, so $\langle0|1\rangle = 0$.

_Outer products_, which are not commonly used in this document, can still be described in Dirac notation:
$$
|\bold{u}\rangle\langle\bold{v}|=\bold{uv}^\top
$$
This product will produce an $m\times n$ matrix when $\bold{u}$ is an $m\times1$ vector and $\bold{v}$ is an $n\times1$ vector.

The _Hermitian transpose_, or _conjugate transpose_, is an operation performed on a vector or matrix. This combines a transpose with taking the complex conjugate of each entry. This document will use the notation $A^\dagger$, although $A^H$ is also commonly used.

### [2.4](#QCSG)   Bloch Sphere Model

Now that we have a proper system of notation to discuss quantum states, we will extend our model of a pbit to the full model of a quantum bit, also called a _qubit_. Quantum particles have the ability to randomly collapse to a basis state, but they also have another key attribute called _phase_. 

Phase is another variable we need to account for in the model for the qubit, which means we will change the system of coordinates we have been using up until now.

#### Spherical Coordinates

_Polar coordinates_ is a system of coordinates in 2 dimensions which uses a distance from the origin and an angle to describe every possible point: $(r, \theta)$. Our pbit model used polar coordinates but restricted $r$ to always be equal to $1$. To introduce phase, we need to add another variable to our model and add another dimension. 

_Spherical coordinates_ is a system of coordinates in 3 dimensions which uses a distance from the origin, an angle from the positive Z axis, and an angle from the positive X axis to describe every possible point: $(r,\theta,\phi)$. In this model, $\theta$ is the angle from the positive Z axis and is called the _inclination angle_. $\phi$ is the angle from the positive X axis and is called the _azimuth angle_. 

This notation may differ from a multivariable calculus class, where $\theta$ & $\phi$'s roles are switched and $r$ is denoted $\rho$. We will be using the notation commonly used in physics and defined by the [ISO standard](https://www.iso.org/standard/64973.html). 

<iframe height='500' scrolling='no' title='Bloch Sphere Applet' src='resources\applets\bloch_sphere\index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; user-select:none;'>Bloch Sphere Applet</iframe>



<center><i><a href="resources/applets/bloch_sphere/index.html" target="_blank">Applet 2.4.1</a> The Bloch Sphere</i></center>

This above applet allows the changing the values of $\theta$ & $\phi$ and moving the 3D sphere around by clicking and dragging. 

The **Bloch Sphere**, named after Felix Bloch, is the full model of the qubit. It uses spherical coordinates to describe every possible state a quantum particle can occupy. A _pure state_ is any quantum state which lies on the surface of the unit sphere with radius $1$. A quantum state could also be a _mixed state_ which has radius less than $1$, but will not be discussed here. Here are some facts about our new Bloch Sphere model:

* The green point indicates the current quantum state, $|\psi\rangle$.
* The $|0\rangle$ and $|1\rangle$ states are vertical and orthogonal to each other.
* The inclination angle, $\theta$, has the bounds: $0\leq\theta\leq\pi$
* The azimuth angle, $\phi$, has the bounds: $0\leq\phi<2\pi$

The fact that $|0\rangle$ and $|1\rangle$ are orthogonal to each other may be surprising and perhaps confusing. They certainly do not seem to be perpendicular, in fact they look parallel! Let us look at a static image of the Bloch sphere:

<img src="resources\img\bloch_sphere.png" width="300px"/>

<center><i>Figure 2.4.2 - The Static Bloch Sphere</i></center>

A quantum state with radius 1 on the positive Z axis is $|0\rangle$ and one on the negative Z axis is $|1\rangle$. The reason why our orthogonal basis states are allowed to exist on the same axis is because the Bloch sphere technically exists inside _Hilbert space_ instead of the typical _Euclidean space_ we are used to. Don't sweat the details too much since Hilbert space is just a generalization of Euclidean space.

The basis coefficients $\alpha$ and $\beta$ can now be defined in terms of the inclination and azimuth angles:
$$
|\psi\rangle=\alpha|0\rangle+\beta|1\rangle=cos(\frac{\theta}{2})|0\rangle+e^{i\phi}sin(\frac{\theta}{2})|1\rangle
$$
When describing qubits, $\alpha$ and $\beta$ are complex numbers. Since they are complex, we need to make a minor adjustment to the formula describing the probability of collapse:
$$
P(|0\rangle) = |\alpha|^2 \\
P(|1\rangle) = |\beta|^2 \\
|\beta|^2 = 1 - |\alpha|^2
$$
The absolute value is necessary since we are now dealing with complex numbers. Not using it would mean some values of $\alpha$ and $\beta$ would yield negative probabilities, which are not allowed.

The basis coefficients can also be described in Dirac notation with overlap:
$$
\alpha=\langle0|\psi\rangle \\
\beta = \langle1|\psi\rangle
$$

#### Let's Talk Phase

Any description of phase would be incomplete without talking about _global phase_. Technically, the phase we have been working with in this section is formally defined as _relative phase_. When defining the basis coefficients $\alpha$ and $\beta$, we specifically stated that they are both complex numbers. However, looking at their definitions, $\alpha$ appears completely real. This is because the actual definition of the basis coefficients is:
$$
|\psi\rangle=e^{ia}(e^{ib}cos(\frac{\theta}{2})|0\rangle+e^{ic}sin(\frac{\theta}{2})|1\rangle)
$$
 In this definition, $a$ is the global phase. The interesting fact about global phase is that physicists have concluded global phase does not have any impact on the qubit. Not even indirectly. We can arbitrarily set $a=-b$ so the complex part of $\alpha$ cancels out and leaves us with just a real part. Continuing this example, $\phi=c-b$  which is the relative phase. In this document, phase is always talking about relative phase. Global phase will always be explicitly labelled. 

Phase can be somewhat unintuitive at first glance. Why would we introduce (relative) phase to our model which does not directly affect the probability? The variable which represents phase, $\phi$, only appears in the $e^{i\phi}$ term in $\beta$. Furthermore, when determining the probability, $|e^{i\phi}|^2$ will always equal $1$ for any value of $\phi$. It seems that $\theta$ is the only variable which can influence the probability of collapse. However, phase can indirectly influence the probability of a qubit through the transformations described in the next section.

### [2.5](#QCSG)   Transforming a Qubit

Using qubits as data is only useful if we can edit their state. We used the Bloch sphere to geometrically describe the state of a single qubit, however we can't edit the angles $\theta$ and $\phi$ directly. There are three transformations which can change the qubit: rotating around the X, Y, or Z axis. 

There are many different systems of notation used for describing rotations of the Bloch sphere. The one we will use is exponentiation: $X^\Delta$.  This says rotate counterclockwise around the X axis by $\pi\Delta$ radians. The $\Delta$ describes how many half-revolutions to rotate. If $\Delta$ is negative then rotate clockwise instead. Replace X with Y or Z to rotate around another axis.
$$
X^0=0=0^\circ \\
X^{0.25}=\frac{\pi}{4}=45^\circ \\
X^{0.5} = \frac{\pi}{2}=90^\circ \\
X^{1} = \pi=180^\circ \\
X^{2} = 2\pi=360^\circ 
$$
Just like any angle, $\Delta$ is a cyclic number. For any number $n$ there exists a $0\leq\Delta\leq2$ which performs the same rotation.
$$
\Delta=\left|\frac{n}{2}\right|
$$
It is also common to replace $X^{0.5}$ with $\sqrt{X}$. Do not change $X^{-0.7}$ into $\frac{1}{X^{0.7}}$.

{rotation applet}



Rotation around axis -> new angles

new angles -> rotations around axis(es)

state space, accessible state space, complete state space

Clifford Groups/Modern Algebra

"destroying" a qubit/quantum state - phase collapse vs probability collapse

### [2.6](#QCSG)   Sequential Transformations

Any transformation from one coord to another can be accomplished in 2 rotations

You only need 2 axes to rotate to any position: XZ, YZ, or XY

You can also swap the order XZ -> ZX by editing the rotations

### [2.7](#QCSG)   Beam Splitter

half mirror, mach zehnder interferometer for quantum optics



### [2.8](#QCSG)   Qubit Implementations

superconductors

ion trap

photon

more about this in quantum architecture



## Chapter 3:   Quantum Circuits

yum

### 3.1   Definition of a Gate

boolean function

classical gates

matrix

reversible

universal set of gates

### 3.2   Quantum Programming

Qiskit, Cirq, Qsharp

Simulators vs quantum assembly

### 3.3   Pauli Gates

single qubit rotations

their matrices

half a bit flip (both x and y)

Solovay–Kitaev Theorem says you can produce a rotation gate R(theta) for any theta with precision epsilon using log(1/epsilon) gates to create arbitrary superposition. Kinda like floating point rotations

creating a Y gate from a probability 

### 3.4   Named Gates

Hadamard, S, T

Hadamard can either be ZY.5 or Y.5X

### 3.5   Quantum Registers

Significant Bits, tensors (ket version) , distributing states

Summations

### 3.6   CNOT Gate

Interact with multiple qubits

CNOT(1,2) = HxH CNOT(2,1) HxH

Swap = 3 cnots

### 3.7   Controlled-U Gate

Any controlled gate!

CZ gate and it's applications

Controlled anything into pauli + CNOT

### 3.8   Reversible Computing

Toffoli, Fredkin, Peres

Universal set of reversible computing

Proving a quantum computer can simulate a classical computer in P time

Arbitrary num controlled U gate

## Chapter 4:   Entanglement

swoosh

### 4.1   The Tensor Product

distributing vectors and distributing kets

### 4.2   Superposition of Quantum Registers

Summations n stuff

### 4.3   Generating Entanglement

mixed states, r<1

undistributable

EPR pair

information instantly

due to entanglement, 2 quantum computers with 50 qubits is FAR less powerful than 1 computer with 100 qubits

### 4.4   Bell States

Hadamard then CNOT

4 bell states

translate the bell states into each other

read 1 then know the other instantly (Maximally Entangled)

​	but not always! (Partially Entangled)

### 4.5   Case Study: Google's Quantum Supremacy

In late 2019, Google announced they had achieved _quantum supremacy_ on their 53 qubit quantum processor named Sycamore, published in [Nature](https://www.nature.com/articles/s41586-019-1666-5). Quantum supremacy is the term for when a quantum program can beat a classical program at a task. What kind of task? It doesn't matter. There is no official benchmark, so the task can be any type of algorithm or can simply have a useless objective. As long as the QPU is significantly faster than a classical computer at **any** objective, quantum supremacy is declared.

What task did Google use to have their quantum computer compete in? Simulating a quantum computer. Sycamore is a quantum computer, so the simulation is just running a quantum circuit. So as long as the quantum computer can run faster than a classical computer can simulate it, the quantum computer wins. This may appear rather silly since there isn't really any objective to the computation, but that is actually why it is clever. If there was an objective to compute then there would be alternative methods for a classical programmer or patterns to exploit to make the classical program faster. 

Specifically, Google called this task _random circuit sampling_. Every quantum circuit creates a probability distribution, so the objective was to find the probability distribution of a randomly generated circuit. A random circuit does not have any patterns for a classical programmer to use for time or memory exploitations. However, not all quantum circuits take the same amount of time to simulate. The hardest circuits for a classical simulator are random and all the qubits are highly entangled (but not maximally entangled)! 

There are limitations on the quantum computer as well. The Sycamore processor is noisy, every gate applied causes small errors to build up and can lead to the wrong answers if too many gates are applied. So the ideal circuit should have the following properties:

- No observable patterns
- Highly entangled
- Small depth

To create circuits that have all three properties, the Google quantum team used a pseudorandom generator which uses a seed to create circuits in this format:

<img src="resources\img\4.5_circuit.png" width="800px" />



<center><i>Figure 4.5.1 - Pseudorandom Circuit Architecture</i></center>

The circuit is divided into _m_ cycles in which every cycle has 1 single qubit gate applied per qubit followed a double qubit gate. The single qubit gates are chosen pseudorandomly and can be $\sqrt{X}$, $\sqrt{Y}$, or $\sqrt{W}$. Two gates of the same axis cannot be chosen sequentially. The $\sqrt{W}$ gate is a rotation of $\frac{\pi}{2}$ radians around the axis $(X+Y)/\sqrt2$. Similar to the Hadamard axis, this axis is formed by the line $X=Y$ when $Z=0$. The double qubit gates are chosen from a set sequence: repeat $ABCDCDAB$. The chosen letter represents the gate being applied to every pair of neighbor qubits connected by a colored coupler. 

<iframe height='500' scrolling='no' title='Sycamore Coupler Applet' src='resources\applets\sycamore_couplers\index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; user-select:none;'>Sycanmore Couplet Applet</iframe>

<center><i><a href="resources/applets/sycamore_couplers/index.html" target="_blank">Applet 4.5.2</a> Sycamore's QPU Architecture</i></center>

To understand the double qubit gates better, we can look at Sycamore's qubit layout. In figure 4.5.2, the gray crosses represent qubits and the colored boxes are couplers which connect the qubits together. The outlined cross on the top row is a qubit which does not work which is why this QPU is only 53 qubits instead of the original 54. When a double qubit gate is chosen from the set, for example $A$, all of the green couplers activate at the same time. So the double qubit layer in the circuit does not just refer to one pair of qubits; it refers to all pairs of qubits joined by a green coupler. Not every qubit is affected by the $A$ gate however, since the bottom row does not have any green couplers connecting to them.

#### Quantum vs. Classical

Every quantum circuit essentially creates a probability distribution, but the way a quantum computer finds this distribution is different than a classical computer. A quantum computer approximates the distribution by running the circuit many times and recording the result of each measurement. After taking a large number of samples, the sampled distribution is roughly equal to the real distribution. Google's team sampled their largest circuit 30 million times, taking around 100 minutes.

Google's team used a Schrödinger/Feynman hybrid algorithm to simulate a 43 qubit circuit on a classical computer. The Schrödinger algorithm stores all $2^n$ coefficients in memory and the Feynman algorithm calculates each coefficient independently which only requires a polynomial amount of memory, but requires exponentially more time proportional to the depth of the circuit. 

In their paper, the team made the claim that using this hybrid algorithm to simulate the largest 53 qubit circuit would take 10,000 years on the world's best supercomputers, thus proving quantum supremacy. This time estimate was created by assuming the memory was constrained to Random Access Memory (RAM). Other experts did not agree with this assumption.

#### IBM's Rebuttal

The quantum computing team at IBM [responded](https://www.ibm.com/blogs/research/2019/10/on-quantum-supremacy/) to Google's claim to quantum supremacy by using a pure Schrödinger algorithm. They showed that it was possible to rotate the memory for the quantum state out to disk, only keeping the active parts in RAM. Every coefficient is 8 bytes since they are complex numbers, stored as two single precision floating point numbers. The quantum state is $8\times2^{53}$ = 64 petabytes. That size is certainly large, but not unachievable by modern computers. IBM's team used a host of performance enhancing techniques to perform the simulation in 2.5 days. 

By definition, Google's team still technically proved quantum supremacy since the quantum computer ran faster than the classical simulation (100 minutes < 2.5 days), even if it wasn't by their predicted margin of 10,000 years. However, due to the exponential nature of simulating quantum computers, a 100 qubit quantum state would take $8\times2^{100}\approx$ 9,000,000,000,000,000 (9 quadrillion) petabytes to store. This amount of memory is simply unachievable by modern or near future computers. Even if a 53 qubit processor strikes controversy over if it deserves quantum supremacy or not, 100 qubit processors will be developed in the near future and the outcome will be clear.

One incredibly important point brought up in IBM's response is the entire concept of quantum "supremacy". The nature of quantum  processors are to be devices which coordinate with classical computers, not compete against them. The notion of claiming quantum supremacy is no less ridiculous than claiming "GPU supremacy" because a GPU was shown to be faster at one specific task. The term quantum supremacy was blown out of proportion by the media and broadly misunderstood by the general public. 

## Chapter 5:   Quantum Networks

it cool

### 5.1   No-Cloning Theorem

Heisenberg uncertainty principal

Cloning via recomputing

### 5.2   Teleportation

not like the movies

moving a qubit state over a long distance

distributing quantum pairs ahead of time

destroys sending qubit (measures)

decoherence

### 5.3   Superdense Coding

teleportation in reverse

2 bits for the price of 1 (kinda)

can't use Huffman encoding in quantum, so we gotta think of new encoding schemes

### 5.4   Pseudo Clones

Work arounds and cloning with a chance

## Chapter 6:   Quantum Cryptography

BB84 and other quantum key distributions

Quantum cryptography vs post-quantum cryptography

## Chapter 7:   Quantum Error Correction

Up to this point we have been assuming we have 'perfect' qubits

decoherence and fidelity

probability correction

phase correction

physical qubits vs logical qubits

## Chapter 8:   Quantum Computer Architecture

superconducting qubits (Google, IBM, Rigetti, Intel)

​	dilution refrigeration (~10mK), low vibration, magnetic shielding

​	current flow

​	Josephson junction

ion trap (IonQ)

​	lasers - slow but stable

​	qubit storage (quantum RAM), quantum hard drives don't really exist yet

Quantum annealers (D-WAVE)

​	different qubits than the gate model. Low degrees of freedom comparatively 

Quantum walks on graphs

​	wacky

## Chapter 9:   Quantum Compilers

phase normal form

#of cnots in circuit > (n-1)!

parallelization & race conditions

## Chapter 10:   Simulating Quantum Computers

classically!

matrix form

simulation in linear memory - each final amplitude separate. Depends on $2^d$ where d is depth 

algorithm form: bitwise CNOT & bitwise X&Y&Z

​	cubeOffset instead of cubeDepth

​	phase != 0 instead of == 1

qiskit universal gate form

deferred form partitioning

simulating classical computers on quantum computers - Maybe already covered in chap 3

Schrödinger & Feynman path integrals / algorithms

## Chapter 11:   Quantum Algorithms

General format of a quantum algorithm: classical preprocessing, quantum circuit, classical postprocessing

General goal of a quantum algorithm: Minimize probability of 'wrong' answers & maximize probability of 'right' answers

QFT, Shors, Grovers, Deutsch-Jozsa Problem, Simons Problem, etc.

<img src="resources\img\1.2_comp_class.png" width="400px"/>

<center><i>Figure 1.2.1 Common Complexity Classes</i></center>

The study of _computational complexity classes_ is from the theory side of computer science which describes how long a computer program takes to solve a certain problem based off the size of the input. 

BQP complexity class

https://www.cs.virginia.edu/~robins/The_Limits_of_Quantum_Computers.pdf

## Chapter 12:   Quantum Artificial Intelligence

I know very little right now

## Chapter 13:   Chemical Simulation

I know **nothing** right now, but it seems supa cool