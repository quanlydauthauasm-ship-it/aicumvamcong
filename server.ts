import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Basic JSON parsing
app.use(express.json());

// Health check endpoints for Cloud Run deployment & container probes
app.get('/_health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve compiled static assets from dist
const distPath = path.resolve(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1h',
    index: 'index.html',
  }));

  // Fallback to index.html for Single Page Application client routing
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req: Request, res: Response) => {
    res.status(200).send('Application build in progress. Please ensure "npm run build" has completed.');
  });
}

const server = app.listen(PORT, HOST, () => {
  console.log(`[Production Server] Listening on http://${HOST}:${PORT}`);
});

// Graceful termination for Cloud Run container lifecycle
const handleShutdown = (signal: string) => {
  console.log(`[Production Server] Received ${signal}, closing server...`);
  server.close(() => {
    console.log('[Production Server] HTTP server closed gracefully.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('[Production Server] Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
