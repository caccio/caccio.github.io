---
name: jekyll-serve
description: 'Avvia il blog Jekyll in locale per testare le modifiche. Usa quando vuoi avviare il server di sviluppo, testare il blog localmente, fare preview del blog, lanciare jekyll, servire il sito in locale, bundle exec jekyll serve.'
argument-hint: 'Opzionale: porta o opzioni aggiuntive'
---

# Jekyll - Avvio Server Locale

## Procedura

1. **Attiva l'environment conda** `jekyll`:

```bash
conda activate jekyll
```

2. **Avvia il server Jekyll** con live reload e force polling (necessario su WSL con filesystem NTFS):

```bash
bundle exec jekyll serve --host 0.0.0.0 --livereload --force-polling
```

Il blog sarà disponibile su `http://localhost:4000`.

## Note

- Il flag `--livereload` ricarica automaticamente il browser ad ogni modifica.
- Il flag `--host 0.0.0.0` espone il server su tutte le interfacce di rete (utile per accesso da altri dispositivi in LAN o da container/VM).
- Il flag `--force-polling` è necessario quando Jekyll gira in WSL ma i file sono sul filesystem Windows (`/mnt/c/...`): il watcher nativo (`inotify`) non rileva le modifiche su NTFS, il polling periodico invece sì.
- Per fermare il server: `Ctrl+C` nel terminale.
- Se la porta 4000 è occupata, usa `--port 4001` (o altra porta libera).
