import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GeminiClient } from "../src/geminiClient.js";
import { PromptService } from "../src/promptService.js";

describe("PromptService", () => {
  it("valida o envio antes de consultar a API", async () => {
    let called = false;
    const service = new PromptService({
      async generateContent() {
        called = true;
        return "nao deve ser chamado";
      }
    });

    await assert.rejects(() => service.sendPrompt("  "), /pelo menos 3 caracteres/);
    assert.equal(called, false);
  });

  it("bloqueia prompts acima do limite permitido", async () => {
    const service = new PromptService({
      async generateContent() {
        return "nao deve ser chamado";
      }
    });

    await assert.rejects(() => service.sendPrompt("a".repeat(2001)), /no maximo 2000 caracteres/);
  });

  it("valida o recebimento e retorna a resposta da IA", async () => {
    const service = new PromptService({
      async generateContent(prompt) {
        assert.equal(prompt, "Explique integracao continua");
        return "Integracao continua executa verificacoes automaticamente.";
      }
    });

    const result = await service.sendPrompt("  Explique integracao continua  ");

    assert.equal(result.prompt, "Explique integracao continua");
    assert.equal(result.answer, "Integracao continua executa verificacoes automaticamente.");
    assert.match(result.createdAt, /^\d{4}-\d{2}-\d{2}T/);
  });
});

describe("GeminiClient", () => {
  it("monta o payload de envio esperado pela API Gemini", async () => {
    const requests = [];
    const client = new GeminiClient({
      apiKey: "fake-key",
      async fetchImpl(url, options) {
        requests.push({ url, options });
        return {
          ok: true,
          async json() {
            return {
              candidates: [
                {
                  content: {
                    parts: [{ text: "Resposta simulada." }]
                  }
                }
              ]
            };
          }
        };
      }
    });

    const answer = await client.generateContent("Explique CI");

    assert.equal(answer, "Resposta simulada.");
    assert.equal(requests.length, 1);
    assert.match(requests[0].url, /models\/gemini-2\.5-flash:generateContent\?key=fake-key$/);
    assert.equal(requests[0].options.method, "POST");
    assert.equal(requests[0].options.headers["Content-Type"], "application/json");
    assert.deepEqual(JSON.parse(requests[0].options.body), {
      contents: [
        {
          parts: [{ text: "Explique CI" }]
        }
      ]
    });
  });

  it("extrai texto da estrutura de resposta do Gemini", () => {
    const client = new GeminiClient({ apiKey: "fake-key" });

    const text = client.parseText({
      candidates: [
        {
          content: {
            parts: [{ text: "Primeira parte." }, { text: "Segunda parte." }]
          }
        }
      ]
    });

    assert.equal(text, "Primeira parte.\nSegunda parte.");
  });

  it("extrai mensagem de erro retornada pela API Gemini", async () => {
    const client = new GeminiClient({ apiKey: "fake-key" });

    const message = await client.parseError({
      status: 404,
      async json() {
        return {
          error: {
            message: "models/gemini-antigo is not found"
          }
        };
      }
    });

    assert.equal(message, "Falha ao consultar Gemini: models/gemini-antigo is not found");
  });
});
