---
layout: post
title: "Classificatori quantistici e reti neurali"
date: 2021-01-06
categories: Advanced_Analytics Quantum_Computing
tags: Advanced_Analytics Quantum_Computing Neural_Networks Variational_Classifier
math: true
author: Stefano Cazzella
excerpt: I Variational Classifier sono una delle possibili applicazioni pratiche della computazione quantistica all’ambito del machine learning. Essi hanno alcune analogie con le reti neurali sia nella struttura topologica che nelle tecniche di addestramento. Il confronto fra i due modelli può quindi essere utile per capire meglio i primi, partendo dai secondi.
---

Pur non essedo squisitamente tecnica, la lettura presuppone una conoscenza di base su tematiche di machine leraning e computazione quantistica. Potete trovare alcune informazioni introduttive ai seguenti link:

- Machine learning: [Introduction to Neural Netwokrs](https://towardsdatascience.com/simple-introduction-to-neural-networks-ac1d7c3d7a2c) illustra nel dettaglio come funziona un modello di classificazione basato su rete neurale e come possa essere addestrato con la tecnica della discesa del gradiente
- Quantum computing: [The Ultimate Beginner’s Guide to Quantum Computing and its Applications](https://towardsdatascience.com/the-ultimate-beginners-guide-to-quantum-computing-and-its-applications-5b43c8fbcd8f) fornisce una prima introduzione sulle basi teoriche e le implementazioni fisiche esistenti di computer quantistici

## Reti neurali

Le reti neurali sono una delle classi di algoritmi di machine learning più note e iconiche per l'addestramento automatico di modelli predittivi, compresi i modelli di classificazione automatica. Sono quei modelli che, dato un vettore di caratteristiche $x = (x_1, \dots, x_n)  \in \mathbf{R}^n$ che descrive un evento o un oggetto, sono in grado di assegnare tale evento/oggetto ad una classe $y \in \{0, \dots, c\}$. Ad esempio, se descriviamo lo stato di salute di un paziente attraverso i risultati numerici di una serie di analisi cliniche, diagnosticare se quel paziente sia affetto o meno da una specifica malattia è una forma di classificazione del paziente; in questo caso si tratta di una classificazione binaria essendo definite solo due classi: pazienti sani $(y = 0)$ e malati $(y = 1)$ rispetto a quella specifica malattia. Dal punto di vista matematico, un classificatore binario è una funzione del tipo:

$$y = f(x) : \mathbf{R}^n \rightarrow \{0, 1\}$$

Nella loro forma generale, le reti neurali sono costituite da un grafo (rete) di nodi (neuroni artificiali) organizzati in più strati. Ogni nodo calcola un valore a partire dalla combinazione lineare dei valori calcolati dai nodi dello strato precedente con una serie di parametri detti pesi (più una costante additiva denominata *bias*). Generalmente i modelli di classificazione basati su reti neurali hanno un primo strato con tanti nodi quante sono le caratteristiche che compongono il vettore di input $x$ e un ultimo strato con un nodo per ogni classe che valuta la probabilità di appartenenza del vettore di input $x$ a quella classe.

![ANN - Rete neurale](/images/posts/2021/ann.png)

I pesi $\omega$ e i bias $\nu$ di tutti i nodi della rete costituiscono l'insieme dei parametri del modello: al variare dei parametri, cambia anche la classe associata dalla rete ad un vettori di input. Nel caso di un **classificatore binario** è sufficiente un unico nodo per il calcolo della funzione:

$$y = \begin{cases}
1 & \text{se } f(x;\omega, \nu) \geq 0.5 \\
0 & \text{altrimenti}
\end{cases}$$

Per individuare il giusto valore da attribuire ai parametri del modello viene utilizzato un insieme di esempi $$T = \{(x^1,y^1),\dots,(x^m,y^m)\}$$ costituito da $m$ coppie $(x^j, y^j)$ che rappresentano la corrispondenza fra uno specifico vettore $x^j$ e la sua classe di appartenenza $y^j$ già nota. L'addestramento consiste nel trovare una configurazione dei parametri che minimizzi la distanza fra le previsioni della rete e gli esempi a disposizione. Tale distanza è definita da una funzione di costo o funzione di errore (loss function) e per la sua minimizzazione si utilizza una tecnica algoritmica denominata [discesa del gradiente](https://en.wikipedia.org/wiki/Gradient_descent).

Se l'addestramento avviene correttamente, la rete neurale sarà in grado di classificare correttamente (o meglio con un accettabile margine di errore) anche vettori di input (pazienti) che non fanno parte dell'insieme di esempi forniti per il suo addestramento.

## Classificatori quantistici

Esiste una tipologia di classificatori quantistici, detti **Variational Classifier**, che presenta diverse analogie con le reti neurali. La loro struttura è costituita da una serie di nodi (gate) che effettuano un'unica tipologia di calcolo parametrico a partire da quanto calcolato dai loro predecessori (come avviene per i neuroni di una rete neurale con i suoi pesi - i parametri - e le dipendenze dai neuroni dello strato precedente).

Un processore quantistico, al pari di uno classico, effettua una serie di cambi di stato dei propri registri interni seguendo la sequenza di istruzioni che gli viene fornita. Diversamente dai computer classici, i registri sono costituiti da **qubit** anziché bit: un registro composto da $n$ qubit è in grado di rappresentare un vettore di $2^n$ numeri complessi.

Il vettore di input $x \in \mathbf{R}^n$ che descrive le condizioni di salute di un paziente può quindi essere codificato in un registro di $N = \lceil \log_2(n) \rceil$ qubit; i nodi (gate) del grafo (circuito) realizzano la serie di cambiamenti di stato del registro che calcola la classe di appartenenza prevista dal modello. Diversamente da quanto accade in un computer classico, lo stato interno del registro non è direttamente accessibile, ma è possibile effettuare delle misure ripetute per poter estrarre la probabilità di appartenenza del vettore di input $x$ ad una delle due classi: $y=0$ o $y=1$.

![Variational Quantum Classifier - circuit model](/images/posts/2021/vqc-1.png)

Per la fase di **codifica** si usa la così detta *amplitude encoding*, ossia le caratteristiche del vettore vengono normalizzate e rappresentate come ampiezze dei versori della base canonica del registro $q_1 \otimes \dots \otimes q_n$ che assume lo stato:

$$\vert \psi(x) \rangle = \frac{1}{\lVert x \rVert} \sum_{i=0}^{n-1} x_{i+1} \vert i \rangle$$

La fase di **classificazione** combina le ampiezze che codificano le diverse caratteristiche utilizzando delle trasformazioni parametriche; abitualmente la scelta ricade su una qualche combinazione di operatori di rotazione $R_a(\omega)$ e gate CNOT. Ogni blocco di operatori è applicato tipicamente a due qubit alla volta (non necessariamente adiacenti), ma la ricombinazione interessa tutte le ampiezze. La disposizione dei gate $G(\omega_k)$ nel circuito e la scelta degli assi di rotazione rappresentano le caratteristiche topologiche del modello. Gli angoli di rotazione $\omega_k$ costituiscono invece l'insieme dei parametri del modello.

La **misura** del qubit $q_1$ può restituire solo due valori: 0 e 1; per calcolare la funzione di classificazione del vettore $x$ definita come

$$y = \begin{cases}
1 & \text{se } f(x;\omega,\nu) = \Pr(q_1=0\mid x,\omega) + \nu \geq 0.5 \\
0 & \text{altrimenti}
\end{cases}$$

è necessario stimare la $\Pr(q_1=0)$ reiterando la misura del qubit $q_1$ più volte, a parità di $x$ e $\omega$, e calcolando la frequenza con cui viene ottenuto il valore 0.

Come per le reti neurali, l'individuazione dei parametri ottimali viene effettuata attraverso l'algoritmo di discesa del gradiente.

![Hybrid quantum architecture for Variational Quantum Classifiers](/images/posts/2021/vqc-2.png)

L'architettura adottata per l'addestramento di un Variational Classifer è di tipo ibrido e prevede una suddivisione dei ruoli fra unità di calcolo quantistico (QPU) e classico (CPU). La componente quantistica del calcolo è realizzata dai circuiti del modello di cui sopra e viene attivata dalla CPU che fornisce sia il vettore normalizzato delle caratteristiche $x$ che i parametri del modello $\omega$ e $\nu$ da utilizzare. La QPU fornisce in output le misure rilevate al termine della computazione che vengono utilizzate dalla CPU per confrontarle con il risultato corretto $y$ fornito dall'esempio $(x, y)$ e determinare la variazione da apportare ai parametri del modello nel giro successivo. Fissata una opportuna funzione di errore che valuti la distanza fra le previsioni del modello e gli esempi forniti, l'algoritmo di discesa sul gradiente individua la correzione da apportare ai parametri per far convergere il modello verso una configurazione sub-ottimale (ottimo locale).

L'adozione di un'**architettura ibrida** come quella mostrata è oggi la soluzione di riferimento per l'applicazione di modelli di computazione quantistica in contesti reali. L'astrazione di una QPU e una CPU che interagiscono va traslata in un'architettura in cui le risorse di calcolo quantistico sono disponibili sotto forma di servizi in cloud attivati e integrati all'interno di algoritmi implementati con architetture di calcolo di tipo classico in cloud o on-premises.