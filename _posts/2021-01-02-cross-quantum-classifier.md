---
layout: post
title: "Cross Quantum Classifier"
date: 2021-02-01
categories: Quantum_Computing Software
tags: Q# QISKIT Variational_Classifier
math: false
author: Stefano Cazzella
excerpt: E’ disponibile il repository Git con la mia versione di un Quantum Variational Classifier che può essere eseguito con diversi simulatori e su physical quantum processors disponibili in cloud come servizi computazionali.
---
Ho reso pubblico il repository Git con la mia versione di un Quantum Variational Classifier che può essere eseguito con diversi simulatori e su physical quantum processors disponibili in cloud come servizi computazionali.

Riporto di seguito la descrizione del progetto presente nel Readme file del repository raggiungibile al seguente link: [caccio/CrossQuantumClassifier](https://github.com/caccio/CrossQuantumClassifier)


> ## Variational Quantum Classifier
> 
> This project implements a Variational Quantum Classifier inspired by the ["circuit-centric quantum classifier"](https://arxiv.org/abs/1804.00633) paper and other related works.
>
> The circuit model is a network of 2-qubit rotation blocks that can be arranged in different configurations; any block has two settings: the rotation axis and the rotation angle. The set of rotation angles of the network represents the vector of the model parameters.
>
> The training algorithm relies on the classical gradient descent optimization method (with momentum and a simple learning rate annealing schedule) to fit the vector of the model parameters to the training dataset. Both the classification function and the partial derivatives of the loss function for the gradient descent are calculated by quantum circuits.
>
> ## Cross-platform implementations of quantum circuits
>
> All quantum circuits have been implemented using three different computation engines:
>
> 1. **BLAS** - a numeric simulation of quantum circuits based on basic linear algebra primitives (essentially matrix multiplications and tensor products) implemented in the *numpy* python package.
> 2. **QDK** - the **Microsoft Quantum Development Kit** that provides either a local quantum simulator and the possibility to run quantum circuits on different physical quantum computers available as-a-service in Azure.
> 3. **QISKIT** - the **IBM Quantum Development Kit** that includes local quantum simulators and the native interface for the **IBM Q Experience** - an online platform that gives users public access to a set of IBM's quantum processors via the Cloud.
>
> This makes it easier to compare results accuracy and performances obtained by the usage of different versions of quantum simulators or physical quantum computers available as-a-service from different providers.