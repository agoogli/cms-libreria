# Payload Blank Template

This template comes configured with the bare minimum to get started on anything you need.

## Quick start

This template can be deployed directly from our Cloud hosting and it will setup MongoDB and cloud S3 object storage for media.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

```
podman volume create cms_pgdata

podman run -d \
  --name cms-postgres \
  -e POSTGRES_DB=cms_db \
  -e POSTGRES_USER=cms \
  -e POSTGRES_PASSWORD=cms \
  -v cms_pgdata:/var/lib/postgresql/data:Z \
  -p 5432:5432 \
  --restart unless-stopped \
  docker.io/library/postgres:17
  
.env:  
postgresql://cms:cms@localhost:5432/cms_db
```

### ENV

```
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x0000000000000000000000000000000AA
```

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `MONGODB_URL` from your Cloud project to your `.env` if you want to use S3 storage and the MongoDB database that was created for you.

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URL` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URL` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/3.x/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).

## Deploy

Ecco la guida dettagliata con l'elenco dei pacchetti, i file da trasferire e i comandi per completare il deploy sulla tua macchina virtuale Arch Linux, assicurando che i container rimangano attivi anche dopo che ti sarai disconnesso da SSH.

1. Pacchetti da installare sulla VM Arch Linux
Accedi alla tua VM Arch Linux e installa i pacchetti necessari utilizzando il gestore pacchetti pacman.

Esegui il seguente comando come root (o tramite sudo):

bash


sudo pacman -Syu podman podman-compose
podman: Il motore di containerizzazione (alternativa a Docker).
podman-compose: Lo strumento per orchestrare i servizi definiti nel file YAML (alternativa a Docker Compose).
2. File da inviare al server
Sulla macchina server devi copiare esclusivamente questi due file all'interno di una cartella a tua scelta (ad esempio ~/cms-libreria/):

podman-compose.yml: Il file con la definizione dei servizi (db e app).
.env: Il file con le credenziali reali compilate. Per crearlo sul server:
Copia il file .env.example locale sul server nominandolo .env.
Modifica i valori inserendo le password reali e sicure.
Esempio di trasferimento dei file tramite scp dal tuo PC locale al server:

bash


### Crea la cartella sul server
ssh utente@ip-del-server "mkdir -p ~/cms-libreria"
### Invia i file
scp podman-compose.yml utente@ip-del-server:~/cms-libreria/
scp .env.example utente@ip-del-server:~/cms-libreria/.env
3. Comandi di Up e persistenza al Logout (Linger)
Poiché Podman esegue i container in modalità rootless (senza privilegi di root, per maggiore sicurezza), per impostazione predefinita di systemd su Arch Linux, tutti i processi dell'utente (inclusi i container di Podman) vengono arrestati non appena la sessione SSH viene chiusa.

Per evitare questo comportamento e lasciare i container attivi in background dopo il logout, segui questi passaggi sul server:

A. Abilitare il "Linger" per l'utente (Fondamentale)
Esegui questo comando sul server per indicare a systemd di mantenere attiva la sessione del tuo utente anche dopo la disconnessione:

bash


loginctl enable-linger $USER
(Puoi verificare lo stato con loginctl user-status $USER)

B. Avviare i container in background
Entra nella cartella dove hai copiato i file e avvia i container in modalità "detached" (background) tramite il flag -d:

bash


cd ~/cms-libreria
podman-compose up -d
C. Comandi utili per la gestione
Visualizzare i log: podman-compose logs -f
Controllare lo stato dei container: podman ps -a
Arrestare i container: podman-compose down

### Caricamento anagrafica editori in ambiente produzione

```
podman cp editori.csv cms-libreria-app:/app/editori.csv
```

```
podman exec -it cms-libreria-app npx tsx src/scripts/import-editori.ts /app/editori.csv
```

### Backup dump database

```
podman exec -t cms-libreria-db pg_dump -U cms -d cms_db | gzip > backup_cms_db_$(date +%Y%m%d_%H%M%S).sql.gz
```

### Ripristino database (emergenza)

```
gunzip -c backup_cms_db_YYYYMMDD_HHMMSS.sql.gz | podman exec -i cms-libreria-db psql -U cms -d cms_db
```
