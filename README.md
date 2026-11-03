# Web2Risk agency one page website solution example

## Quick start

- Optional: copy *.env.example* to *.env* to change the email addresses used by the contact form
- Run the following command:

```bash
docker compose up --build -d
```
- Go to http://localhost:9000 to see the website
- Go to http://localhost:8025 to see the emails sent by the contact form (Mailpit: no email is really sent)
- Run the following command to shutdown properly containers
```bash
docker compose down
```

Without Docker, the pages can be opened with any local server (e.g. Live Server), but the contact form needs PHP.

## Send real emails (optional)

By default, emails are caught by Mailpit. To send them through a real SMTP server:

- Copy *.msmtprc.example* to *.msmtprc* and fill in your SMTP server and account
- Copy *docker-compose.override.yaml.example* to *docker-compose.override.yaml*
- In *.env*, set `CONTACT_TO` to your real inbox and `CONTACT_FROM` to the address of the SMTP account
- Run `docker compose up -d` again

To go back to Mailpit, remove *docker-compose.override.yaml* and run `docker compose up -d` again. The three files are ignored by git: never commit them, they contain your credentials.

## Code sample

**Application files to consider regarding the application project are:**
- index.html
- mail.php
- assets/js/scripts.js
- assets/css/ (one stylesheet per component)
- BACKLOG.md (starter tickets for the agency)

**Particular attention points:**
- A clear semanticaly exact and minimalist HTML structure, with just what's needed.
- As a good practice, JS script are embedded at the bottom of the document.
- Usage of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to exchange some *application/json* with the PHP script.
- JS events handler are attached via [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) vanilla function when the [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) event is fired.
- Usage of [event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) to cancel the native behavior of the submit button.
- The CSS sheet is implementing a [reset CSS](https://meyerweb.com/eric/tools/css/reset/) before to start.
- Usage of the [CSS Grid Layout API](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) to display some elements.
  
**To go further with this integration:**
- Improve the design quality
- Use [picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) tag to manage image medias
- Use [PHPMailer](https://github.com/PHPMailer/PHPMailer) to send emails
- Minify JS / CSS files
- ...

## Formatage du code (Biome)

### Ce qui a été mis en place

Le projet utilise [Biome](https://biomejs.dev/) comme **formateur et linter** unique (pas besoin de Prettier ni d'ESLint). Trois éléments travaillent ensemble :

- *biome.json* : la configuration partagée, versionnée dans le dépôt. Tout le monde applique les mêmes règles.
- *.vscode/* : la configuration de l'éditeur. VS Code propose d'installer l'extension Biome et formate le fichier à chaque sauvegarde.
- *.github/workflows/ci.yml* : la vérification automatique (GitHub Actions). Elle s'exécute sur chaque pull request vers `main` et lance `biome ci .`. Si le code n'est pas conforme, la vérification échoue et la PR ne peut pas être fusionnée.

### Comment ça fonctionne

1. **En local** : à la sauvegarde (Ctrl+S), VS Code reformate le fichier, applique les corrections de lint sûres et trie les imports.
2. **Avant de pousser** : on peut tout vérifier à la main (voir les commandes ci-dessous).
3. **Sur GitHub** : la CI relance la même vérification, sans rien modifier. C'est elle qui fait foi : un code non conforme ne passe pas.

### Mise en route

- Ouvrir le projet dans VS Code et accepter d'installer l'extension recommandée **Biome** (`biomejs.biome`).
- Aucune autre installation n'est nécessaire : les commandes utilisent `npx`.

### Commandes utiles

```bash
npx @biomejs/biome check .          # vérifie le formatage et le lint (ne modifie rien)
npx @biomejs/biome check --write .  # corrige automatiquement ce qui peut l'être
npx @biomejs/biome ci .             # exactement ce que fait la CI
```

Si Biome signale des erreurs qu'il ne sait pas corriger seul, elles s'affichent dans le terminal : il faut les corriger à la main.

### Règles de formatage à respecter

| Règle | Valeur |
|-------|--------|
| Indentation | **tabulations** (largeur d'affichage : 4) |
| Longueur de ligne maximale | **100 caractères** |
| Guillemets en JavaScript | **doubles** (`"texte"`) |
| Points-virgules en JavaScript | **toujours** |
| Imports | triés automatiquement |
| Règles de lint | jeu `recommended` de Biome |

Ces règles sont appliquées automatiquement : il n'est pas nécessaire de les retenir, il suffit de sauvegarder avec VS Code ou de lancer `check --write`.

### Bonnes pratiques

- **Ne pas désactiver ou contourner** la CI : une PR qui échoue à la vérification Biome ne se fusionne pas.
- **Ne pas modifier *biome.json* sans en parler** à l'équipe : un changement de règle reformate potentiellement tout le projet.
- Lancer `check --write .` **avant chaque `git push`** pour éviter un échec en CI.
- Éviter de mélanger reformatage et nouvelle fonctionnalité dans la même PR : un changement de style massif va dans une PR dédiée (`style: ...`).

## Links

- [Docker](https://www.docker.com/)
- [Use containers for PHP development](https://docs.docker.com/guides/php/develop/)
- [Mailpit](https://mailpit.axllent.org/)