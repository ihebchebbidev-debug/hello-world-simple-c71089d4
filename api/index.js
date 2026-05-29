// Vercel Serverless Function
// Routes all requests to the TanStack Start server

export default async function handler(req, res) {
  try {
    // Import the server from the compiled output
    // This will be available after "npm run build"
    const { default: server } = await import('../dist/server.js');

    // Create a Fetch API Request from the Node.js request
    const url = new URL(req.url, `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`);

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body:
        req.method !== 'GET' && req.method !== 'HEAD' && req.body
          ? JSON.stringify(req.body)
          : undefined,
    });

    // Call the TanStack Start server
    const response = await server.fetch(request);

    // Send the response
    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (key !== 'content-encoding') {
        res.setHeader(key, value);
      }
    });

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
}
