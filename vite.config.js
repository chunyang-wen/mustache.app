import { defineConfig } from 'vite';

export default defineConfig({
  base: '/mustache.app/',
  plugins: [
    {
      name: 'add-trailing-slash-dev',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/mustache.app?')) {
            res.statusCode = 301;
            res.setHeader('Location', req.url.replace('/mustache.app?', '/mustache.app/?'));
            res.end();
            return;
          }

          if (req.url === '/mustache.app') {
            res.statusCode = 301;
            res.setHeader('Location', '/mustache.app/');
            res.end();
            return;
          }
          next();
        });
      }
    }
  ]
});
