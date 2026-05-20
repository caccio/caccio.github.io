---
layout: post
title: "Un esperimento di Quantum Optimization su un problema reale: dalla challenge ROADEF/EURO 2020 a D-Wave"
date: 2023-02-25
categories: [quantum-computing]
tags: [quantum-computing, optimization, d-wave, operations-research, roadef]
math: false
author: Stefano Cazzella
permalink: /dwave-roadef-2020-optimization
excerpt: I problemi di ottimizzazione rappresentano il primo ambito in cui un approccio quantistico - di tipo inspired o basato su annealer - può offrire vantaggi concreti. Per valutare questo potenziale, ho deciso di partire da un problema reale di ottimizzazione industriale, formularlo come modello quadratico con variabili binarie e provare a risolverlo utilizzando il solver ibrido di D-Wave.
---

I problemi di ottimizzazione rappresentano il primo ambito in cui un approccio quantistico - di tipo inspired o basato su annealer - può offrire vantaggi concreti. Per valutare questo potenziale, ho deciso di partire da un problema reale di ottimizzazione industriale, formularlo come modello quadratico con variabili binarie e provare a risolverlo utilizzando il solver ibrido di D-Wave.

Il notebook completo dell'esperimento è disponibile nel repository [ROADEF2020-QIO](https://github.com/caccio/ROADEF2020-QIO). Nel notebook sono riportati sia la formulazione matematica del problema sia il codice utilizzato per costruire il modello e inviarlo al solver di D-Wave.

## L'origine del problema: la challenge ROADEF/EURO 2020

Il problema nasce dalla ROADEF/EURO Challenge 2020, una competizione dedicata a un problema di *maintenance planning optimization*: pianificare interventi di manutenzione sulla rete elettrica minimizzando il rischio operativo complessivo.

Il contesto è particolarmente interessante perché non si tratta di un problema astratto. RTE, il gestore della rete elettrica di trasmissione francese, deve pianificare interventi su componenti della rete, alcuni dei quali richiedono l'interruzione temporanea di parti dell'infrastruttura. Durante questi interventi, la rete deve continuare a garantire affidabilità e sicurezza.

Il problema consiste quindi nel trovare un piano di manutenzione che tenga conto dei rischi futuri stimati, dei vincoli sulle risorse disponibili e delle incompatibilità operative tra interventi.

## Il problema di ottimizzazione

In forma sintetica, il problema consiste nel decidere quando avviare ciascun intervento di manutenzione all'interno di un orizzonte temporale discreto.

Ogni intervento ha una durata che può dipendere dalla data di avvio, richiede determinate risorse operative e produce un certo livello di rischio in funzione dello scenario considerato. Il modello deve rispettare vincoli di capacità sulle risorse, vincoli di schedulazione e vincoli di esclusione tra interventi che non possono essere eseguiti contemporaneamente in determinati periodi.

Nel notebook ho rappresentato il problema attraverso variabili binarie del tipo `x_{i,s}`, dove la variabile vale 1 se l'intervento `i` inizia al tempo `s`, e 0 altrimenti.

L'obiettivo è minimizzare il rischio medio complessivo del piano, calcolato aggregando i rischi associati agli interventi attivi nei diversi istanti temporali e nei diversi scenari considerati. Il notebook formalizza esplicitamente anche i vincoli principali: 
- ogni intervento deve essere schedulato una e una sola volta,
- l'utilizzo delle risorse deve rimanere entro i limiti minimi e massimi previsti,
- le esclusioni operative devono essere rispettate.

Una nota tecnica: nel notebook il modello viene implementato come *Constrained Quadratic Model*, usando variabili binarie e vincoli espliciti. Dal punto di vista concettuale siamo molto vicini a una formulazione QUBO, ma con il vantaggio pratico di mantenere i vincoli separati invece di trasformarli tutti in penalità nella funzione obiettivo. L'Hybrid Solver di D-Wave è in grado di gestire direttamente questo tipo di modello, il che semplifica la formulazione e può migliorare la qualità delle soluzioni ammissibili trovate.

## La dimensione del modello

Per l'esperimento è stata utilizzata l'istanza `C_14` della challenge. La dimensione del problema è già significativa:

| Elemento | Valore |
| --- | ---: |
| Orizzonte temporale (numero discreto di periodi) | 220 |
| Interventi da pianificare | 465 |
| Tipologie di risorse considerate | 9 |
| Esclusioni operative | 620 |
| Massimo numero di scenari di rischio per periodo | 103 |
| Variabili binarie del modello | 75.871 |
| Vincoli "ogni intervento parte una volta" | 465 |
| Vincoli sulle risorse | 1.931 |
| Vincoli quadratici di esclusione | 620 |
| Totale vincoli modellati | 3.016 |

Questi numeri sono importanti perché mostrano che non si tratta di un esempio giocattolo. Il modello contiene decine di migliaia di variabili binarie e migliaia di vincoli, inclusi vincoli quadratici.

## Il benchmark classico

La challenge ROADEF/EURO 2020 fornisce metriche di valutaione della qualità dei risultati e tutte le migliori soluzioni fornite dai team partecipanti che ho potuto utilizzare come benchmark classici per i risultati prodotti con D-Wave. Per l'istanza `C14`, il miglior valore ottenuto come rischio medio `Objective (mean risk)` nella configurazione a 15 minuti è pari a `23.203`.

Questo riferimento è utile non tanto per dichiarare una superiorità generale del metodo quantum-hybrid rispetto ai migliori approcci classici, quanto per avere un termine di confronto concreto. La parte interessante è verificare se una formulazione compatibile con un solver ibrido possa produrre una soluzione ammissibile e competitiva su un problema reale, già studiato dalla comunità di Operations Research.

## L'utilizzo del solver ibrido di D-Wave

Per la risoluzione è stato utilizzato il Leap Hybrid CQM Solver di D-Wave, attraverso `LeapHybridCQMSampler`. I solver ibridi di D-Wave combinano metodi classici e QPU di tipo annealer, con l'obiettivo di affrontare problemi applicativi formulati come modelli quadratici o non lineari.

Nel notebook il tempo minimo stimato dal sampler era di circa 58,9 secondi, ma per l'esperimento è stato usato un limite di 500 secondi. Il solver ha prodotto 131 campioni, di cui 10 ammissibili, cioè soluzioni che rispettano i vincoli del modello.

## Il risultato ottenuto

Il risultato più interessante è che il solver ha prodotto una soluzione ammissibile, senza violazioni dei vincoli, e con un valore di rischio medio pari a `23.055` verificato con gli script di valutazione forniti con la challenge.

I valori ottenuti in tempi comparabili sono vicini al benchmark classico (appena migliorativi), il che indica che l'approccio quantum-hybrid può produrre soluzioni competitive.

È importante essere prudenti nell'interpretazione. Non sto sostenendo che il Quantum Computing abbia "battuto" in senso generale gli algoritmi classici della challenge. Per fare questa affermazione servirebbe una campagna sperimentale più ampia, con tutte le istanze,  gli stessi limiti computazionali e una valutazione rigorosa della ripetibilità.

Però il risultato resta interessante: una formulazione binaria e quadratica risolta con un solver ibrido D-Wave è riuscita a produrre una soluzione corretta e competitiva su un problema industriale reale.

## Perché questo esperimento è interessante

A mio avviso, il valore principale dell'esperimento non è nel singolo numero finale, ma nel percorso.

Partire da un problema reale significa confrontarsi con vincoli, dati e dimensioni che assomigliano ai problemi che incontriamo nelle aziende. La formulazione del modello obbliga a tradurre il dominio applicativo, fatto di manutenzione, risorse, rischi e incompatibilità, in una struttura matematica eseguibile. L'utilizzo di D-Wave permette poi di sperimentare un approccio quantum-hybrid non su un caso artificiale, ma su una challenge pubblica e verificabile.

Questo tipo di lavoro è utile per costruire una vera *Quantum Readiness*. Non basta conoscere gli algoritmi quantistici in astratto. Serve capire quali problemi aziendali possono essere formulati in modo adatto, quali compromessi modellistici sono necessari, quali solver sono già utilizzabili oggi e come confrontare i risultati con benchmark classici solidi.

## Conclusione

L'esperimento sulla challenge ROADEF/EURO 2020 mostra che è possibile prendere un problema reale di pianificazione della manutenzione, formularlo come modello quadratico con variabili binarie e risolverlo con un solver quantum-hybrid come quello di D-Wave.

Il risultato ottenuto è incoraggiante: una soluzione ammissibile, senza violazioni dei vincoli, e con un valore della funzione obiettivo competitivo rispetto al benchmark classico disponibile per l'istanza analizzata.

Per me il punto non è presentare il Quantum Computing come una tecnologia già pronta a sostituire gli approcci classici di Operations Research. Il punto è diverso: iniziare oggi a sperimentare, su problemi reali, con modelli seri e benchmark misurabili. È questo il modo più concreto per capire dove le tecnologie quantum-hybrid possono portare valore nei prossimi anni.
