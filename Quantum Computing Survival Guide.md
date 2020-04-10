# QCSG

<h3>The Quantum Computing Survival Guide</h3>

##### Written by Zack Schieberl

[toc]



## Chapter 1:   Why Quantum Computing?

This entire document is used to describe what quantum computing is, but I think it is important to understand why quantum computers are important. What is their history and what can they do for society? 

### 1.1   History of Quantum Computers

idk what it is lol

### 1.2   The New Age of Computing

Comparing classical computers to quantum. Moore's Law

### 1.3   Modern Applications of Quantum Computers

cool stuff

### 1.4   Future Applications of Quantum Computers

super cool stuff



## [Chapter 2:](#QCSG)   Qubits & Superposition

The smallest possible unit of data in a classical computer is a _bit_. It stands for binary digit. A single bit can either be zero or one. The term 'bit' is often used interchangeably with _boolean_, whose value is either true or false. Every piece of data which can be stored in a computer's memory is a sequence of these bits. Qubits are the smallest possible unit of data in a quantum computer and they have more properties than ordinary bits.

### [2.1](#QCSG)   Quantum Particles

Although this document is focused towards computer scientists, it is important to learn about the nature of quantum particles to understand where qubits come from. This explanation will only scape the surface of the wonderful world of quantum particles, but it will suffice for the purposes of this document.

Before discussing quantum particles, let's talk waves. A _wave_ is any mathematical function which continues to repeat itself forever. Think about the waves at the beach, how they go up and down as far as you can see. The distance until the wave starts to repeat itself is called the wave's _period_.

<img src="resources\2.1_wave.svg" width="550px"/>

<center><i>Figure 2.1.1 The Sine Wave</i></center>

Several famous experiments, such as the double slit experiment, have shown that light and matter can have properties of particles and waves. This is known as _wave/particle duality_. When an electron is released from a source, it acts as a wave which propagates through space until contacting a surface. Once the electron collides with a surface, it is only observable in one location. The location where it will be observable is random and cannot be determined ahead of time. However, the likelihood of the electron appearing in a specific location can be calculated using a probability function.  

<img src="resources\2.1_prob_wave.svg" width="550px"/>

<center><i>Figure 2.1.2 - A Probability Function</i></center>

This function shown above contains information on how likely the electron is to be observed at a specified location. In this graph, the X axis is the location and the Y axis is how likely it is to appear at that location. The electron is very likely to appear somewhere in the middle and it is very unlikely to appear near the edges. In the bottom left corner of this graph, when $x=0$ it shows that $y=0$ as well. This means the electron can __never__ appear at location 0. The same logic applies at the bottom right corner.

The wave equation is a model for how waves move through space. It is a function of two variables, location and time: $F(x, t)$. At the moment the electron is observed, time is no longer a variable and is held constant since it does not change. In quantum computing, how the wave moves is not a concern of ours, so we do not use time as a variable. 

This section is self contained, the information presented here isn't used in the following chapters. It is included to provide a foundation for where qubits come from. The rest of this document is dedicated towards explaining the rules governing qubits and their interactions, this is the only section which makes an attempt at showing where the rules are derived from. An inquiring mind may ask "why do qubits follow these rules specifically?" and the only answer is because they follow the laws of quantum mechanics.

###  [2.2](#QCSG)   Modeling Waves with Vectors

The fundamental unit of information in classical computers are bits. They can either be on or off. There are only two possible states. Figure 2.1.2 shows a probability function which is continuous, there are an infinite number of locations, each with their own probability of being observed at said location. To make these probability functions palatable to computer scientists, the functions need to be transformed into binary.

To extend our example from the previous section, it would be like if we drew a line across our wall to see if the electron is observed above or below the line. The electron has a probability $\alpha$ of being above the line where $\alpha$ is $0\leq\alpha\leq1$. Then there is a probability of $\beta = 1-\alpha$ that the electron is below the line where $\beta$ is also $0\leq\beta\leq1$. 

What we have just described is known as a _probabilistic bit_, or _pbit_. A pbit is a bit which has a certain probability or being off, which we have denoted above as $\alpha$. It also has a certain probability of being on, which we have denoted above as $\beta$. As both these values are probabilities, they are constrained to $\alpha+\beta=1$. The concept of a pbit is not exclusive to quantum, they also are used in binary classifiers from machine learning, random number generators, etc.

Our goal is to convert a wave equation like the sine function into a pbit. One of the first things a precalculus course teaches is the relationship between trigonometric functions and circles. Taking a look at the unit circle, we can see the X and Y coordinates of the circle with radius 1 are the outputs of the cosine and sine function.

<img src="resources\2.1_unit_circle.svg" width="400px"/>

A _vector_ is a mathematical object which has both magnitude and direction. We have a vector here whose magnitude is $1$ and direction is determined by the variable $\theta$, the angle from the positive X axis to the vector. $\theta$ is called a _polar coordinate_ which is the input to the trigonometric functions that produce the cartesian coordinates $x$ and $y$. The vector $\mathbf{v}$ is described as:
$$
\mathbf{v}=\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}cos\ \theta \\ sin\ \theta\end{bmatrix}
$$
This can be used to fit our description of a pbit by remembering the Pythagorean trigonometric identity:
$$
\begin{aligned}
x^2+y^2&=1 \\
cos^2\theta+sin^2\theta &= 1 \\
\alpha + \beta &= 1
\end{aligned}
$$
From this we can see our probabilistic bit relate to the quantum wave functions as:
$$
\alpha = cos^2\theta \\
\beta = sin^2\theta
$$
Since $\alpha$ and $\beta$ are always positive, we can apply the constraint $0\leq\theta\leq\frac{\pi}{2}$. 

There are two unit vectors which are special enough to be named: $\hat{i}$ and $\hat{j}$. These vectors are both of length $1$ and are orthogonal to each other.
$$
\hat{i} = \begin{bmatrix}1\\0\end{bmatrix} \\
\hat{j} = \begin{bmatrix}0\\1\end{bmatrix}
$$
These _basis vectors_ represent our X and Y axes since $\hat{i}$ is directly along the X axis and $\hat{j}$ is directly along the Y axis. The vector $\mathbf{v}$ can be rewritten using vector addition:
$$
\mathbf{v} = \begin{bmatrix}\alpha \\ \beta\end{bmatrix}
= \alpha\begin{bmatrix}1\\0\end{bmatrix}+\beta\begin{bmatrix}0\\1\end{bmatrix}
= \alpha\hat{i}+\beta\hat{j}
$$
After viewing this relationship, we see:

* $\hat{i}$ conceptually represents the off state, or 0, or the electron being observed above the line on the wall
* $\hat{j}$ conceptually represents the on state, or 1, or the electron being observed below the line on the wall
* $\alpha$ and $\beta$ still represent the probabilities of those states occurring
* $\mathbf{v}$ represents the entire state of the pbit, or electron & wall system 

This model of a pbit is not a completely new innovation, it is simply a transformation from the quantum wave equation which is easier to digest for computer scientists. 

However, our transformation is not complete. We have translated the probabilistic nature of quantum particles but there is still another feature of those particles which we have not translated: phase. Without including phase, we cannot say our model acts as a true quantum bit, also known as qubit.

Before extending our vector based model to the true qubit model, a new style of notation needs to be introduced. The notation of quantum physicists: the Dirac notation.

### [2.3](#QCSG)   Dirac Notation

dirac + inner & outer products + overlap

### [2.4](#QCSG)   Bloch Sphere Model

pure states

mixed states

### [2.5](#QCSG)   Transforming a Qubit

Rotation around axis -> new angles

new angles -> rotations around axis(es)

### [2.6](#QCSG)   Sequential Transformations

Any transformation from one coord to another can be accomplished in 2 rotations

You only need 2 axes to rotate to any position: XZ, YZ, or XY

### [2.7](#QCSG)   Beam Splitter

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

### 3.2   Pauli Gates

single qubit rotations

their matrices

half a bit flip (both x and y)

### 3.3   Named Gates

Hadamard, S, T

### 3.4   Quantum Registers

### 3.5   CNOT Gate

Interact with multiple qubits

Swap = 3 cnots

### 3.6   Controlled-U Gate

Any controlled gate!



## Chapter 4:   Entanglement

swoosh

### 4.1   The Tensor Product

distributing vectors and distributing kets

### 4.2   Superposition of Quantum Registers



### 4.3   Generating Entanglement

undistributable

EPR pair

information instantly

### 4.4   Bell States

hadamard -> CNOT

4 bell states

read 1 then know the other instantly



## Chapter 5:   Quantum Networks

it cool

### 5.1   No-Cloning Theorem

Heisenberg uncertainty principal

### 5.2   Teleportation

not like the movies

moving a qubit state over a long distance

distributing quantum pairs ahead of time

decoherence

### 5.3   Superdense Coding

teleportation in reverse

2 bits for the price of 1



## Chapter 6:   Quantum Cryptography



## Chapter 7:   Quantum Error Correction



## Chapter 8:   Quantum Algorithms

QFT, Shors, Grovers, Dueshs Jogns Problem, Simons? Problem, 

## Chapter 9:   Quantum Computer Architecture



## Chapter 10:   Quantum Compilers

phase normal form

## Chapter 11:   Simulating Quantum Computers

classically!

matrix form

algorithm form: bitwise CNOT & bitwise X&Y&Z

qiskit universal gate form

## Chapter 12:   Quantum Artificial Intelligence



## Chapter 13:   Chemical Simulation