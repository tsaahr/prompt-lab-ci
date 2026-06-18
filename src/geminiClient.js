const GEMINI_MODEL = "gemini-1.5-flash";

export class GeminiClient {
  constructor({ apiKey, fetchImpl = fetch } = {}) {
    this.apiKey = apiKey;
    this.fetchImpl = fetchImpl;
  }

  async generateContent(prompt) {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY nao configurada.");
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${this.apiKey}`;
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
      throw new Error(`Falha ao consultar Gemini: HTTP ${response.status}`);
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
}
