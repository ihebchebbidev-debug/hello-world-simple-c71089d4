/**
 * Vercel Serverless Function - TanStack Start SSR Handler
 * 
 * This function receives all HTTP requests and routes them through
 * the TanStack Start server for Server-Side Rendering.
 * 
 * It imports the server entry directly from node_modules, avoiding
 * dependency on the build output.
 */

let cachedServer = null;

async function loadServer() {
  if (cachedServer) return cachedServer;

  try {
    console.log("[ssr] Loading TanStack Start server entry...");
    
    // Import the server entry from installed packages
    // TanStack Start provides a server entry point for SSR
    const serverModule = await import("@tanstack/react-start/server-entry");
    
    cachedServer = serverModule.default || serverModule;
    
    if (!cachedServer || typeof cachedServer.fetch !== "function") {
      console.error("[ssr] Invalid server module structure");
      throw new Error("Invalid TanStack server entry point");
    }
    
    console.log("[ssr] Server loaded successfully");
    return cachedServer;
  } catch (error) {
    console.error("[ssr] Fatal error loading server:", error);
    throw error;
  }
}

/**
 * Main request handler for Vercel
 */
export default async function handler(req, res) {
  const startTime = Date.now();
  
  try {
    console.log(`[ssr] [${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    // Load server
    const server = await loadServer();

    // Build the full request URL
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = new URL(req.url || "/", `${protocol}://${host}`);

    console.log("[ssr] URL:", url.toString());

    // Create Fetch API request
    const request = new Request(url.toString(), {
      method: req.method || "GET",
      headers: req.headers,
      body:
        req.method !== "GET" && req.method !== "HEAD" && req.body
          ? typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body)
          : undefined,
    });

    // Call server
    console.log("[ssr] Calling server.fetch()");
    const response = await server.fetch(request, {}, {});

    console.log("[ssr] Got response:", response.status);

    // Set response status and headers
    res.status(response.status);
    
    response.headers.forEach((value, name) => {
      const lower = name.toLowerCase();
      if (lower !== "content-encoding" && lower !== "transfer-encoding") {
        res.setHeader(name, value);
      }
    });

    // Send body
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));

    const duration = Date.now() - startTime;
    console.log(`[ssr] ✓ ${req.method} ${req.url} ${response.status} (${duration}ms)`);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[ssr] ✗ ${req.method} ${req.url} (${duration}ms):`, error);

    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : "";

    // Send error response
    res.status(500).json({
      error: "Internal Server Error",
      message: message,
      path: req.url,
      method: req.method,
      ...(process.env.NODE_ENV === "development" && { stack }),
    });
  }
}
