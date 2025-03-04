// ... existing code ...
// Add caching headers to static assets
app.use('/static', express.static('public', {
    maxAge: '1y',
    etag: true,
    lastModified: true
}));
// ... existing code ...

// Implement server-side rendering
app.get('*', (req, res) => {
    const context = {};
    const appHtml = renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    // Inject initial state data
    const initialData = JSON.stringify(fetchInitialData());

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Optimized Website</title>
        <link rel="stylesheet" href="/css/critical.css">
        <script>window.__INITIAL_DATA__ = ${initialData};</script>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/js/main.js" defer></script>
      </body>
    </html>
  `;

    res.send(html);
});

// Replace standard HTTP server with HTTP/2
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
    key: fs.readFileSync('path/to/private-key.pem'),
    cert: fs.readFileSync('path/to/certificate.pem')
});

server.on('stream', (stream, headers) => {
    // Handle requests
    // ...
});

server.listen(3000);