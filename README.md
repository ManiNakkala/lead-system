
# Lead Generation System

## Requirements
- Node.js and npm
- React for frontend
- n8n for automation

## How to Run

### 1. Start Backend
```bash
cd backend
npm install
npm start
```

### 2. Start Frontend
```bash
cd frontend
npm install
npm start
```

### 3. Setup n8n Workflow
- Add Webhook Node (POST /webhook)
- Add Email Node (SendGrid or SMTP)
- Use {{$json.name}}, {{$json.email}}, etc.
- Activate the workflow
- Replace webhook URL in backend/index.js with your actual n8n URL
