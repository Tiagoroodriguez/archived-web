import { Router } from 'express';

const router = Router();

/*router.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Escuchamos el evento 'pedidoCreado'
  eventEmitter.on('pedidoCreado', () => {
    res.write(`data: pedidoCreado\nid: ${Date.now()}\n\n`);
  });
});*/

export default router;
