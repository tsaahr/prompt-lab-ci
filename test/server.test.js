import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createServer } from "../src/server.js";

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, () => {
      const address = server.address();
      resolve(`http://127.0.0.1:${address.port}`);
    });
  });
}

describe("server", () => {
  it("informa o status da configuracao da API", async () => {
    const server = createServer();
    const baseUrl = await listen(server);

    try {
      const response = await fetch(`${baseUrl}/api/health`);
      const payload = await response.json();

      assert.equal(response.status, 200);
      assert.equal(payload.status, "ok");
      assert.equal(typeof payload.geminiConfigured, "boolean");
      assert.equal(typeof payload.model, "string");
    } finally {
      server.close();
    }
  });
});
