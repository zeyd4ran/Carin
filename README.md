# Carin

Carin is a full-stack student career-path prototype. The web app collects a small profile, sends it to the API, and receives a recommendation snapshot with career matches, skill gaps, a learning roadmap, projects, and interview prep.

## Run in VS Code on Windows

Open the repository in VS Code with PowerShell as the integrated terminal:

```powershell
npm install
.\scripts\Start-Carin.ps1
```

For a first-time setup that installs packages first:

```powershell
.\scripts\Start-Carin.ps1 -Install
```

The Windows helper runs the API in explicit `memory` mode, so a local PostgreSQL connection is not required. This is intended for development and resets when the API process stops. In VS Code, the same setup is available from **Run and Debug** as **Carin full stack**, or from **Terminal → Run Task → Carin: Start full stack**.

## Run with the persistent database

The API uses PostgreSQL when `CARIN_STORAGE` is not set to `memory`. Set `DATABASE_URL` in the PowerShell session, then start the API and web in separate terminals:

```powershell
$env:CARIN_STORAGE = "database"
$env:PORT = "5000"
npm run dev --workspace=@workspace/api-server
```

```powershell
$env:PORT = "5173"
$env:BASE_PATH = "/"
$env:LOCAL_API_PROXY = "1"
$env:API_PORT = "5000"
npm run dev --workspace=@workspace/carin
```

## API surface

- `POST /api/career/profiles` creates a profile and recommendation snapshot.
- `GET /api/career/profiles/:profileId` reloads a saved path.
- `PATCH /api/career/profiles/:profileId/progress` saves completed interview items and saved projects.
- `GET /api/healthz` confirms the API is running.

The recommendation generator is currently deterministic and server-side. It can be replaced with an LLM service later without changing the frontend response shape.