// Vercel Serverless Function for TanStack Start
// Vercel automatically transpiles TypeScript at build time

import server from "../src/server";

export default async function handler(req: any, res: any): Promise<void> {
  try {
    // Construct the full URL
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const pathname = req.url || "/";

    const url = new URL(pathname, `${protocol}://${host}`);

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

    // Call the TanStack Start server handler
    const response = await server.fetch(request, {}, {});

    // Set response status
    res.status(response.status);

    // Forward response headers
    response.headers.forEach((value, name) => {
      const lowerName = name.toLowerCase();
      if (lowerName !== "content-encoding" && lowerName !== "transfer-encoding") {
        res.setHeader(name, value);
      }
    });

    // Send response body
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("[api/index] Error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    res.status(500).json({
      error: "Internal Server Error",
      message: errorMessage,
    });
  }
}
