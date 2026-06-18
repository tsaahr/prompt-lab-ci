const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export class GeminiClient {
  constructor({ apiKey, model = DEFAULT_GEMINI_MODEL, fetchImpl = fetch } = {}) {
    this.apiKey = apiKey;
    this.model = model.replace(/^models\//, "");
    this.fetchImpl = fetchImpl;
  }

  async generateContent(prompt) {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY nao configurada.");
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
    const response = await this.fetchImpl(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(await this.parseError(response));
    }

    const data = await response.json();
    return this.parseText(data);
  }

  parseText(data) {
    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const text = parts.map((part) => part.text).filter(Boolean).join("\n").trim();

    if (!text) {
      throw new Error("A resposta do Gemini veio vazia.");
    }

    return text;
  }

  async parseError(response) {
    try {
      const data = await response.json();
      const message = data?.error?.message;

      if (message) {
        return `Falha ao consultar Gemini: ${message}`;
      }
    } catch {
      // Mantem a mensagem generica quando a API nao retorna JSON.
    }

    return `Falha ao consultar Gemini: HTTP ${response.status}`;
  }
}
