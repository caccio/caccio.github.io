---
layout: post
title: "Problemi di ottimizzazione per computer quantistici"
date: 2021-03-01 00:00:00 -0000
categories: Quantum_Computing
tags: Quantum Computing, Optimization
math: true
author: Stefano Cazzella
---
La risoluzione euristica di problemi di ottimizzazione rientra fra le prime applicazioni di modelli computazionali basati sulla meccanica quantistica per la risoluzione di problemi reali in contesti di business.

Si tratta di quei problemi in cui esistono un numero molto elevato di scelte che un'azienda può operare e un modello matematico che sia in grado di valutare numericamente quanto ciascuna combinazione di tali scelte soddisfi gli obiettivi aziendali. Il numero di combinazioni è però così elevato (infinito nel caso in cui le scelte riguardino un dominio continuo) da rendere non perseguibile in pratica la ricerca esaustiva della soluzione migliore che consisterebbe nel calcolare il valore corrispondente a ciascuna combinazione e scegliere quella cui corrisponde il valore maggiore o minore (a seconda dell'obiettivo).

In termini matematici, se $$x = x_1, \dots, x_n$$ è il vettore delle possibili scelte e $$H(x)$$ la funzione che rappresenta l'obiettivo aziendale da massimizzare o minimizzare (i due problemi sono formulabili in modo identico a meno di un cambio di segno), il problema può essere espresso come: 

$$x^{\star} = \underset{ x \in D}{\arg\min} H(x) = \underset{x \in D}{\arg\max} - H(x)$$

Diverse aziende stano sperimentando metodi risolutivi che sfruttano le **tecnologie quantistiche** per trovare una soluzione ottimale ad alcuni problemi aziendali. Il primo esempio Italiano che ha attirato la mia attenzione, circa un anno fa, è quello di [TIM](https://www.techradar.com/news/tim-uses-quantum-computing-to-optimise-4g-5g) che ha utilizzato, prima in Europa, tale approccio per l'ottimizzazione della propria rete 4G/5G; non mancano altri esempi di applicazioni reali in mercati differenti o per problemi differenti.

La prima azienda a realizzare computer quantistici dedicati alla risoluzione di questa tipologia di problemi è stata **D-Wave**, ma altre aziende stanno sviluppando soluzioni concorrenti basate spesso su una combinazione di computazione classica e quantistica.

L'euristica adottata per la risoluzione di tali problemi è detta *Quantum Annealing* e si basa su due principi cardine della meccanica quantistica: la sovrapposizione degli stati (che consente di rappresentare contemporaneamente tutte le possibili soluzioni) e il tunnel quantistico che consente di oltrepassare le barriere di potenziale alla ricerca di uno stato fondamentale a energia minima (che rappresenterà la soluzione ottimale).

Tale tecnica risolutiva si applica ad una particolare formulazione di problemi di ottimizzazione nota come **QUBO** (Quadratic Unconstrained Binary Optimization) o ad una sua variante meglio nota come modello di **Ising**. Nel primo caso le variabili del modello sono di tipo binario, mentre nel secondo queste assumono come valore 1 o -1. In entrambi i casi la funzione da minimizzare (o massimizzare) è espressa come polinomio di secondo grado $$x^{\star} = \underset{x \in \{-1,1\}^n}{\arg\min} { }  \sum_{i=1}^{n} {\sum_{j=i}^{n} {h_{i,j} x_i x_j}}$$

## Esempio di applicazione del modello di Ising ##

Un esempio scolastico di applicazione del modello di Ising è rappresentato dal problema di distribuire uniformemente una serie di container su due navi cargo in modo da equilibrarne il peso. Le variabili $$x_i \in \{-1,1\}$$ rappresentano la scelta di caricare il container i-esimo di peso $$w_i$$ sulla nave A ($$x_i = -1$$) piuttosto che sulla nave B ($$x_i = 1$$). 

La funzione da minimizzare è quella che misura la differenza (in valore assoluto) fra il peso del carico della nave A e quello della nave B che, tenendo conto dei segni assunti dalle variabili $$x_i$$, può quindi essere scritta come

$$H = \left| \sum_{i=1}^{n} {w_i x_i} \right|$$

Essa può essere formulata equivalentemente anche come

$$H = \left( \sum_{i=1}^{n} {w_i x_i} \right)^2$$ 

avendo sostituito l'operatore di valore assoluto con quello di elevazione al quadrato. Sviluppando il quadrato del polinomio di primo grado, e tenendo conto che $$w_i^2 x_i^2$$ assume lo stesso valore indipendentemente dal valore assunto da $$x_i$$ ed è quindi ininfluente ai fini della minimizzazione di $$H$$, si ottiene $$H = \sum_{i=1}^{n} {\sum_{j=i+1}^{n} 2{w_i w_j x_i x_j}}$$ che coincide esattamente con la formulazione generale vista in precedenza in cui $$h_{i,j} = 2 w_i w_j$$.

## Risoluzione con D-Wave (Simulated Annealing) ##

L'esempio delle due navi cargo così formulato può essere facilmente risolto con poche righe di Python ricorrendo alle librerie di Simulated Annealing rilasciate da D-Wave.

```python
# questo è il vettore dei pesi dei container da caricare:
w = &#91;5, 1, 9, 21, 35, 5, 3, 5, 10, 11]
N = len(w)

# questa è la funzione che calcola i coefficienti della funzione H
def getQuadraticTerms(weights) :
    model = {}
    for i in range(0,N) :
        for j in range (i+1,N) :
            model[(i, j)] = weights[i]*weights[j]
    return model

# questo è il codice per la definizione e risoluzione del problema
J = getQuadraticTerms(w)
sampler = neal.SimulatedAnnealingSampler()
sampleset = sampler.sample_ising({}, J)
print(sampleset)
```

Il risultato ottenuto consiste nella soluzione $$x^{\star}_0, \dots, x^{\star}_9$$  al problema formulato

```
   0  1  2  3  4  5  6  7  8  9  energy num_oc.
0 +1 -1 -1 +1 -1 -1 -1 +1 +1 +1 -1026.0       1
['SPIN', 1 rows, 1 samples, 10 variables]
```

seguendo la quale si ottiene un bilanciamento ottimale del carico fra le due navi:

```
Container 0 is on ship B 
Container 1 is on ship A 
Container 2 is on ship A 
Container 3 is on ship B 
Container 4 is on ship A 
Container 5 is on ship A 
Container 6 is on ship A 
Container 7 is on ship B 
Container 8 is on ship B 
Container 9 is on ship B 
A = 53, B = 52
```
