---
layout: post
title: "I costi unitari dell'intelligenza a consumo"
date: 2026-06-02
categories: Intelligenza Artificiale
tags: ai generative-ai llm pricing token
math: false
author: Stefano Cazzella
excerpt: "Una lettura dei prezzi per token dei modelli di frontiera: perche' sono difficili da confrontare, come si sono mossi OpenAI, Anthropic e Google, e perche' il costo unitario non basta a spiegare il costo complessivo dell'AI nei progetti."
---

Il prezzo dei token e' diventato una delle misure piu' immediate per parlare del costo della generative AI. E' comodo, apparentemente oggettivo, facile da mettere in una tabella: dollari per milione di token in input, dollari per milione di token in output.

Ma proprio questa apparente semplicita' rischia di essere fuorviante. Il token e' l'unita' minima della tariffazione a consumo, non l'unita' minima del valore prodotto. Due modelli possono avere prezzi simili e comportarsi in modo molto diverso; due modelli con prezzi molto diversi possono invece risultare comparabili su uno specifico workflow, se uno dei due richiede meno passaggi, meno correzioni o meno orchestrazione.

Questo post guarda ai costi unitari dell'intelligenza a consumo da una prospettiva pratica: come si confrontano i prezzi per token dei modelli di frontiera, come sono evolute le curve dei tre principali attori del mercato - OpenAI, Anthropic e Google - e perche' quelle curve non raccontano, da sole, il costo complessivo dell'AI dentro un progetto di innovazione o di sviluppo software.

## Perche' confrontare i costi dei token e' difficile

Il primo problema e' che non tutti i token sono uguali. Non in senso tecnico stretto, perche' ogni vendor usa tokenizer e vocabolari diversi, ma soprattutto in senso economico: un milione di token processati da un modello di frontiera con forti capacita' di ragionamento non equivale a un milione di token processati da un modello veloce, economico e pensato per task piu' semplici.

Ci sono almeno cinque livelli di non comparabilita'.

Il primo riguarda la capacita' del modello. Una tabella prezzi mette sullo stesso asse input e output, ma non misura qualita', robustezza, latenza, profondita' di ragionamento, abilita' di coding, multimodalita', affidabilita' nelle risposte lunghe o capacita' agentiche. Se un modello costa meno per token ma richiede piu' tentativi, il costo effettivo dell'attivita' puo' aumentare.

Il secondo riguarda il modello di prezzo. I vendor non applicano piu' solo una tariffa lineare input/output. OpenAI evidenzia sconti per batch e input in cache; Anthropic distingue input base, cache write, cache hit, batch, fast mode e data residency; Google differenzia standard, batch, flex, priority, soglie di contesto e costi di grounding. La tariffa pubblica e' quindi solo il punto di partenza.

Il terzo riguarda la finestra di contesto. Nei modelli Google, ad esempio, Gemini 2.5 Pro ha prezzi diversi sopra e sotto i 200 mila token di prompt. Questa soglia cambia il costo reale per workload basati su documenti lunghi, repository software o conversazioni persistenti.

Il quarto riguarda l'output. L'output costa quasi sempre piu' dell'input. In molte applicazioni reali - coding agent, analisi documentale, generazione di report, refactoring - il volume di output non e' un residuo marginale, ma una componente primaria della spesa.

Il quinto riguarda l'architettura dell'applicazione. Prompt lunghi, contesto ripetuto, tool calling, retrieval, web search, agenti che iterano e validano il proprio lavoro: tutti questi elementi moltiplicano token e chiamate. Il prezzo unitario e' solo una variabile della funzione di costo.

## I modelli di frontiera in successione

Per rendere il confronto leggibile, considero i prezzi pubblici per milione di token, separando input e output. La tabella non pretende di essere una classifica assoluta: e' una normalizzazione editoriale dei principali passaggi di prezzo sui modelli di frontiera o sulle famiglie piu' vicine alla frontiera rese disponibili via API.

| Vendor | Modello / famiglia | Periodo indicativo | Input, $/1M token | Output, $/1M token | Nota di lettura |
| --- | --- | ---: | ---: | ---: | --- |
| OpenAI | GPT-4 8K | 2023 | 30 | 60 | Primo riferimento di massa per il prezzo API dei modelli frontier generalisti. |
| OpenAI | GPT-4 Turbo | 2023 | 10 | 30 | Forte riduzione del prezzo per token rispetto a GPT-4. |
| OpenAI | GPT-4o | 2024 | 5 | 15 | Ulteriore riduzione, con posizionamento multimodale. |
| OpenAI | GPT-5.4 | 2026 | 2,5 | 15 | Modello frontier piu' economico nella pagina prezzi corrente. |
| OpenAI | GPT-5.5 | 2026 | 5 | 30 | Modello piu' avanzato, con prezzo unitario piu' alto di GPT-5.4. |
| Anthropic | Claude 3 Opus | 2024 | 15 | 75 | Prezzo premium della linea Opus. |
| Anthropic | Claude Opus 4 / 4.1 | 2025 | 15 | 75 | Continuita' del prezzo premium sulle prime versioni Opus 4. |
| Anthropic | Claude Opus 4.5-4.8 | 2025-2026 | 5 | 25 | Riduzione significativa del prezzo Opus mantenendo la fascia frontier. |
| Anthropic | Claude Sonnet 4.x | 2025-2026 | 3 | 15 | Linea intermedia, spesso rilevante come frontiera economica per coding e agenti. |
| Google | Gemini 1.5 Pro | 2024 | 7 | 21 | Prezzo iniziale elevato, legato anche al valore della lunga finestra di contesto. |
| Google | Gemini 2.5 Pro | 2025-2026 | 1,25 / 2,5 | 10 / 15 | Prezzo differenziato sopra e sotto i 200k token di prompt. |
| Google | Gemini 3.1 Pro Preview | 2026 | 2 / 4 | 12 / 18 | Prezzo corrente standard, anch'esso differenziato per lunghezza del contesto. |

Questa tabella mostra una dinamica interessante: le curve non scendono tutte nello stesso modo e non sempre il modello piu' nuovo costa meno del precedente.

## Tre curve diverse

La curva di OpenAI e' quella che, nella fase GPT-4 -> GPT-4 Turbo -> GPT-4o, rende piu' evidente la compressione del costo unitario. Il prezzo input passa da 30 dollari per milione di token a 10, poi a 5. L'output passa da 60 a 30, poi a 15. La traiettoria e' coerente con una strategia di industrializzazione: portare capacita' sempre piu' forti dentro un costo d'uso piu' accessibile. La pagina prezzi corrente, pero', introduce una nuova articolazione: GPT-5.4 costa meno di GPT-5.5, e quindi la frontiera non e' piu' un punto unico ma una fascia di modelli con diversi compromessi tra capacita' e costo.

La curva di Anthropic e' diversa. Claude 3 Opus e le prime versioni Opus 4 mantengono una tariffa premium: 15 dollari per milione di token in input e 75 in output. La discontinuita' arriva con le versioni Opus 4.5 e successive, dove il prezzo scende a 5 e 25. E' un taglio importante, ma non una commoditizzazione lineare: Anthropic conserva una forte separazione tra Opus, Sonnet e Haiku. Il fatto che Sonnet rimanga a 3 e 15 rende evidente una strategia di prezzo per famiglia: Opus come punta, Sonnet come equilibrio tra qualita' e costo, Haiku come scala.

La curva di Google e' ancora diversa, perche' il prezzo e' intrecciato alla finestra di contesto e al tipo di servizio. Gemini 1.5 Pro era costoso, ma portava sul mercato una promessa forte: contesti molto lunghi. Gemini 2.5 Pro riduce il costo sotto i 200k token, ma mantiene una tariffa piu' alta oltre quella soglia. Gemini 3.1 Pro Preview risale rispetto alla fascia piu' economica di 2.5 Pro, ma resta organizzato su soglie di contesto. In altre parole, Google tende a far pagare non solo la generazione, ma anche l'uso intensivo della memoria contestuale.

## Perche' le curve divergono

Le differenze tra le curve di prezzo possono essere spiegate da piu' cause, che si sommano.

La prima e' il costo industriale dell'inferenza. Servire un modello non significa solo avere GPU disponibili: significa garantire latenza, throughput, affidabilita', routing, sicurezza, monitoraggio, capacity planning e ridondanza. Quando la domanda cresce piu' velocemente della capacita' di offerta, il prezzo puo' restare alto anche se il costo tecnico per token tende a scendere.

La seconda e' il posizionamento competitivo. OpenAI sembra usare piu' esplicitamente una scala di modelli frontier e quasi-frontier per differenziare prezzo e prestazioni. Anthropic mantiene una tassonomia molto leggibile - Opus, Sonnet, Haiku - che aiuta il cliente a scegliere ma conserva differenze marcate tra famiglie. Google incorpora nella tariffazione alcune caratteristiche infrastrutturali, in particolare contesto, grounding e modalita' di servizio.

La terza e' la disponibilita' di capacita' proprietaria. Chi controlla stack, accordi cloud, acceleratori, data center o canali enterprise puo' scegliere se trasferire efficienza al cliente sotto forma di prezzi piu' bassi o trattenerla per finanziare ulteriore scala. In un mercato ancora in investimento pesante, non c'e' una ragione per aspettarsi che ogni miglioramento tecnico si traduca subito in una riduzione del listino.

La quarta e' il valore percepito della frontiera. Un modello che consente a un agente di coding di risolvere un bug in meno iterazioni puo' giustificare un prezzo per token piu' alto. Il punto, per chi compra, non e' solo quanto costa il token: e' quanto costa arrivare a un risultato accettabile.

La quinta e' la crescente complessita' del prezzo. Batch, cache, priority, flex, fast mode, data residency, grounding e contesto lungo sono leve che permettono ai vendor di discriminare tra usi diversi. Questo rende il listino piu' efficiente per il vendor, ma meno immediato per chi deve stimare il budget di un progetto.

## Domanda piu' veloce dell'offerta

Il tema piu' delicato per il futuro e' l'equilibrio tra domanda e capacita' di offerta. In teoria, il costo unitario dell'inferenza dovrebbe scendere con l'efficienza dei modelli, l'ottimizzazione dei kernel, hardware piu' performante, quantizzazione, routing verso modelli piu' piccoli e caching. In pratica, pero', la domanda cresce perche' l'AI non viene usata solo per sostituire una query precedente: abilita nuovi usi, nuovi agenti, nuove iterazioni e nuove aspettative.

Questo significa che il prezzo per token puo' scendere mentre la spesa complessiva sale. E' un fenomeno familiare in tecnologia: quando unita' di calcolo, storage o banda diventano meno costose, spesso aumenta il volume consumato. Con la generative AI il meccanismo e' ancora piu' forte, perche' ogni miglioramento di capacita' apre workflow prima non economici o non affidabili.

Nei progetti di innovazione questo produce un rischio specifico: stimare la spesa partendo da un caso d'uso statico, quando in realta' l'adozione tende a espandersi. Un copilota interno diventa un agente. Un agente diventa una catena di agenti. Una generazione singola diventa un ciclo di pianificazione, esecuzione, verifica e correzione. La domanda interna cresce proprio quando il costo unitario sembra rendere tutto piu' accessibile.

## Il token non e' il costo del progetto

La conclusione piu' importante e' che i costi unitari dei token sono necessari, ma non sufficienti.

Sono necessari perche' danno una base di misura. Senza prezzo per token e' impossibile costruire benchmark economici, simulare scenari di consumo, confrontare vendor o stimare il costo marginale di un'applicazione.

Non sono sufficienti perche' il costo reale della generative AI dipende anche da altri fattori: numero di chiamate, lunghezza del contesto, rapporto input/output, cache hit rate, qualita' del modello, tasso di errore, necessita' di retry, orchestrazione agentica, tool use, retrieval, valutazione automatica, supervisione umana, compliance, osservabilita' e integrazione nel ciclo di sviluppo.

Questo e' particolarmente evidente nella scrittura di codice. Il modello piu' economico per token puo' produrre soluzioni piu' verbose, richiedere piu' correzioni o generare piu' debito tecnico. Il modello piu' costoso puo' ridurre iterazioni e tempo umano. Oppure puo' semplicemente incoraggiare workflow piu' ambiziosi, aumentando il consumo totale. Senza misurare l'intero ciclo, il confronto resta incompleto.

## Conclusione

Il costo unitario dell'intelligenza a consumo sta diventando piu' articolato, non solo piu' basso. Le curve di OpenAI, Anthropic e Google mostrano che la competizione spinge verso maggiore efficienza, ma anche verso una segmentazione piu' fine: modelli di punta, modelli intermedi, modalita' batch, cache, priorita', contesto lungo e servizi accessori.

Per chi costruisce prodotti o sperimenta innovazione, la domanda giusta non e': quale modello costa meno per milione di token? La domanda piu' utile e': quale combinazione di modello, architettura e processo produce il risultato desiderato al costo complessivo piu' prevedibile?

In un prossimo post conviene quindi spostare l'attenzione dal prezzo unitario al costo totale: come stimare il trend dei costi complessivi dell'AI considerando volumi, architettura applicativa, agenti, qualita' dell'output, intervento umano e governance economica del consumo.

## Fonti e note

- OpenAI API Pricing, consultata il 2 giugno 2026: <https://openai.com/api/pricing/>
- OpenAI, "GPT-4", con prezzi API GPT-4 8K e 32K: <https://openai.com/index/gpt-4-research/>
- Anthropic, Claude API Pricing, consultata il 2 giugno 2026: <https://platform.claude.com/docs/en/about-claude/pricing>
- Google AI for Developers, Gemini API Pricing, consultata il 2 giugno 2026: <https://ai.google.dev/gemini-api/docs/pricing>
- Per i passaggi storici non piu' presenti nei listini correnti, la tabella usa i punti prezzo pubblicati o ripresi nelle pagine ufficiali e in cronache di lancio disponibili al momento della stesura. Il confronto e' normalizzato in dollari per milione di token e non include sconti enterprise negoziati.
