import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function Handler for TanStack Start
 * 
 * This converts Vercel's request/response format to the
 * Fetch API format that TanStack Start expects.
 */

let cachedServerHandler: any = null;

/**
 * Load the TanStack Start server handler
 */
async function getServerHandler() {
  if (cachedServerHandler) {
    return cachedServerHandler;
  }

  try {
    // Import the server module that was built by Vite
    const serverModule = await import('@tanstack/react-start/server-entry').catch(
      (err) => {
        console.error('Failed to import server-entry:', err);
        throw err;
      }
    );
    
    cachedServerHandler = serverModule.default || serverModule;
    return cachedServerHandler;
  } catch (error) {
    console.error('Error loading server handler:', error);
    throw error;
  }
}

/**
 * Convert a Vercel request to a Fetch API Request
 */
function vercelRequestToFetch(req: VercelRequest): Request {
  // Build the full URL
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const url = new URL(req.url || '/', `${protocol}://${host}`);

  // Prepare request init
  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') {
      headers[key] = value;
    } else if (Array.isArray(value)) {
      headers[key] = value[0];
    }
  }

  const init: RequestInit = {
    method: req.method || 'GET',
    headers,
  };

  // Handle body
  if (req.body) {
    if (typeof req.body === 'string') {
      init.body = req.body;
    } else if (Buffer.isBuffer(req.body)) {
      init.body = req.body;
    } else {
      init.body = JSON.stringify(req.body);
      if (!headers['content-type']) {
        headers['content-type'] = 'application/json';
      }
    }
  }

  return new Request(url.toString(), init);
}

/**
 * Main Vercel serverless handler
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  try {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Get the server handler
    const serverHandler = await getServerHandler();

    // Convert Vercel request to Fetch API request
    const fetchRequest = vercelRequestToFetch(req);

    // Call the TanStack Start fetch handler
    const fetchResponse = await serverHandler.fetch(
      fetchRequest,
      {}, // env
      {}  // ctx
    );

    // Set response status
    res.status(fetchResponse.status);

    // Set response headers
    fetchResponse.headers.forEach((value: string, name: string) => {
      res.setHeader(name, value);
    });

    // Send the response body
    const buffer = await fetchResponse.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('[ERROR]', error);
    
    res.status(500);
    res.setHeader('content-type', 'application/json');
    
    const errorResponse = {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error),
    };
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error:', error);
    }
    
    res.json(errorResponse);
  }
}

