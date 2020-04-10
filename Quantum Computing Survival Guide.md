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

swiggity



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

###  [2.2](#QCSG)   Modeling Waves with Vectors



### [2.3](#QCSG)   Dirac Notation



### [2.4](#QCSG)   Bloch Sphere Model

pure states

mixed states

### [2.5](#QCSG)   Transforming a Qubit

Rotation around axis -> new angles

new angles -> rotations around axis(es)

### [2.6](#QCSG)   Sequential Transformations

Any transformation from one coord to another can be accomplished in 2 rotations

You only need 2 axes to rotate to any position: XZ, YZ, or XY

### [2.7](#QCSG)   Qubit Implementations

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