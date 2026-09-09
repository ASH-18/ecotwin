# EcoTwin-X

EcoTwin-X is a carbon intelligence platform with a Next.js web dashboard, a NestJS API, and a FastAPI AI service.

## Requirements

- Node.js 20+
- Python 3.10+
- npm

## Install

```powershell
npm install
.\.venv\Scripts\python.exe -m pip install -r apps\ai-service\requirements.txt
```

## Run

Start the services in separate terminals:

```powershell
npm run dev:web
npm run dev:api
npm run dev:ai
```

- Web dashboard: http://localhost:3000
- API: http://localhost:3001
- AI service: http://localhost:8000
