import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadConfig } from "./config.js";
import { loadEnvFile } from "./env.js";
import { GeminiClient } from "./geminiClient.js";
import { PromptService } from "./promptService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");
loadEnvFile();
const config = loadConfig();
const promptService = new PromptService(
  new GeminiClient({
    apiKey: config.geminiApiKey,
    model: config.geminiModel
  })
);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": contentTypes[".json"] });
  response.end(JSON.stringify(payload));
}

async function serveStatic(request, response) {
  const routePath = request.url === "/" ? "/index.html" : request.url;
  const safePath = path.normalize(routePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, safePath);
  const extension = path.extname(filePath);
  const content = await readFile(filePath);

  response.writeHead(200, { "Content-Type": contentTypes[extension] ?? "text/plain; charset=utf-8" });
  response.end(content);
}

export function createServer() {
  return http.createServer(async (request, response) => {
    try {
      if (request.method === "POST" && request.url === "/api/prompts") {
        const body = await readJsonBody(request);
        const result = await promptService.sendPrompt(body.prompt);
        sendJson(response, 200, result);
        return;
      }

      if (request.method === "GET") {
        await serveStatic(request, response);
        return;
      }

      sendJson(response, 404, { error: "Rota nao encontrada." });
    } catch (error) {
      const statusCode = error instanceof SyntaxError ? 400 : 500;
      sendJson(response, statusCode, { error: error.message });
    }
  });
}

if (process.argv[1] === __filename) {
  createServer().listen(config.port, () => {
    console.log(`Prompt Lab CI rodando em http://localhost:${config.port}`);
  });
}
