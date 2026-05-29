// Vercel Serverless Function for TanStack Start
// Robust handler with proper error logging

let serverHandler: any = null;

async function getServerHandler() {
  if (serverHandler) return serverHandler;

  try {
    console.log("[handler] Loading server from ../src/server");
    const { default: server } = await import("../src/server");
    
    if (!server) {
      throw new Error("Server default export is undefined");
    }
    
    if (typeof server.fetch !== "function") {
      throw new Error("Server does not have a fetch method");
    }
    
    serverHandler = server;
    console.log("[handler] Server loaded successfully");
    return serverHandler;
  } catch (error) {
    console.error("[handler] Failed to load server:", error);
    throw error;
  }
}

export default async function handler(req: any, res: any): Promise<void> {
  try {
    console.log(`[handler] ${req.method} ${req.url}`);
    
    // Get server handler
    const server = await getServerHandler();

    // Construct the full URL
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const pathname = req.url || "/";

    const url = new URL(pathname, `${protocol}://${host}`);
    console.log("[handler] Constructed URL:", url.toString());

    // Create a Fetch API Request from Vercel's Node.js request
    const request = new Request(url.toString(), {
      method: req.method || "GET",
      headers: req.headers as HeadersInit,
      body:
        req.method !== "GET" && req.method !== "HEAD" && req.body
          ? typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body)
          : undefined,
    });

    console.log("[handler] Calling server.fetch()");
    
    // Call the TanStack Start server handler
    const response = await server.fetch(request, {}, {});

    console.log("[handler] Got response with status:", response.status);

    // Set response status
    res.status(response.status);

    // Forward response headers
    response.headers.forEach((value: string, name: string) => {
      const lowerName = name.toLowerCase();
      if (lowerName !== "content-encoding" && lowerName !== "transfer-encoding") {
        res.setHeader(name, value);
      }
    });

    // Send response body
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
    
    console.log("[handler] Response sent successfully");
  } catch (error) {
    console.error("[handler] Error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "";

    console.error("[handler] Stack:", errorStack);

    res.status(500).json({
      error: "Internal Server Error",
      message: errorMessage,
      details: process.env.NODE_ENV === "development" ? errorStack : undefined,
    });
  }
}
