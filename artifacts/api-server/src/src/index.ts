import { createServer } from "http";
import path from "path";
import fs from "fs";
import express from "express";
import app from "./app";
import { logger } from "./lib/logger";
import { registerInstagramRoutes } from "./routes/instagram";

const port = Number(process.env["PORT"] ?? "3000");

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env["PORT"]}"`);
}

const httpServer = createServer(app);

registerInstagramRoutes(httpServer, app).then(() => {
  const frontendDist = process.env.FRONTEND_DIST_PATH ||
    path.join(process.cwd(), "artifacts", "dannys-bot", "dist", "public");
  if (fs.existsSync(frontendDist)) {
    const sendIndex = (_req: express.Request, res: express.Response) => {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(path.join(frontendDist, "index.html"));
    };
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
  }

  const host = process.env["HOST"] ?? "0.0.0.0";
  httpServer.listen(port, host, () => {
    logger.info({ port, host }, "Server listening");
  });
}).catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
