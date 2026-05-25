---
layout: post
title: "Stati di sovrapposizione: una intuizione che non sia la moneta che gira"
date: 2026-05-19
excerpt: "La metafora del \"gatto\" è utile finché non lo è più. Provo a sostituirla con qualcosa di più onesto: un vettore in uno spazio complesso, con regole di misura precise."
categories: [quantum]
tags: [qubit, sovrapposizione, misura, intuizione]
cover: true
cover_hue: 220
has_math: true
has_mermaid: false
featured: true
author: Stefano Cazzella
---

Le metafore divulgative sulla sovrapposizione — la moneta che gira, il gatto, l'elettrone che "sceglie" — sono utili a indicarne la direzione, ma fanno danni precisi quando si comincia a fare i conti. Un qubit non è "sia 0 sia 1 finché non lo guardi": è un vettore in uno spazio di Hilbert, e quello che facciamo quando "lo guardiamo" è proiettarlo lungo una base.

## Definizione, senza scuse

Lo stato di un singolo qubit si scrive come combinazione lineare a coefficienti complessi dei due stati di base computazionale:

$$\lvert\psi\rangle \;=\; \alpha\,\lvert0\rangle \;+\; \beta\,\lvert1\rangle, \qquad \alpha,\beta \in \mathbb{C}, \quad \lvert\alpha\rvert^2 + \lvert\beta\rvert^2 = 1$$

La probabilità di misurare $$\lvert0\rangle$$ è $$\lvert\alpha\rvert^2$$, quella di misurare $$\lvert1\rangle$$ è $$\lvert\beta\rvert^2$$. Il vincolo $$\lvert\alpha\rvert^2 + \lvert\beta\rvert^2 = 1$$ non è estetico: è quello che rende le probabilità sensate.

## Visualizzare: la sfera di Bloch

Un singolo qubit puro vive sulla superficie di una sfera. È una rappresentazione comoda perché trasforma la fase relativa fra i coefficienti in un punto geografico — polo nord = $$\lvert0\rangle$$, polo sud = $$\lvert1\rangle$$, equatore = sovrapposizione bilanciata.

> **Nota sulla fase globale.** La fase globale di uno stato non è mai osservabile: due stati che differiscono solo per $$e^{i\varphi}$$ sono fisicamente lo stesso stato. La fase *relativa*, invece, è ciò che rende possibile l'interferenza.

## Un piccolo circuito che produce sovrapposizione

In Qiskit costruire uno stato di sovrapposizione bilanciato sul primo qubit è un Hadamard:

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(1, 1)
qc.h(0)            # Hadamard: |0> -> (|0> + |1>)/sqrt(2)
qc.measure(0, 0)   # collassa lungo la base computazionale
```

Eseguendo il circuito molte volte si ottiene una distribuzione approssimativamente uniforme su $$\{0,1\}$$. La parola chiave è "approssimativamente": rumore del gate, decoerenza, errori di lettura.

## Da qui in poi

Nei prossimi post entriamo nello specifico: entanglement come correlazione che "non si può fattorizzare", la QFT come strumento per estrarre periodicità, e perché la correzione d'errore non è un dettaglio implementativo ma il vero collo di bottiglia tecnologico.
