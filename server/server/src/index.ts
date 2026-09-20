import { createServer } from "http";
import path from "path";
import fs from "fs";
import express from "express";
import app from "./app";
import { logger } from "./logger";
import { registerInstagramRoutes } from "./routes/instagram";

const port = Number(process.env["PORT"] ?? "3000");

const httpServer = createServer(app);

registerInstagramRoutes(httpServer, app).then(() => {
  const frontendDist = path.join(__dirname, "..", "..", "dist", "public");
  if (fs.existsSync(frontendDist)) {
    const sendIndex = (_req: express.Request, res: express.Response) => {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(path.join(frontendDist, "index.html"));
    };
    // The entry HTML contains hashed bundle names and must never be served from
    // a stale 304 response across an Electron update.
    app.get("/", sendIndex);
    app.use(express.static(frontendDist, {
      setHeaders: (res, filePath) => {
        if (path.basename(filePath) === "index.html") {
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    }));
    app.use((_req, res) => {
      sendIndex(_req, res);
    });
    logger.info({ frontendDist }, "Serving frontend static files");
  } else {
    logger.warn({ frontendDist }, "Frontend dist not found — run npm run build:client");
  }

  httpServer.listen(port, () => {
    logger.info({ port }, `Danny's Bot running at http://localhost:${port}`);
  });
}).catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
