export class PromptService {
  constructor(aiClient) {
    this.aiClient = aiClient;
  }

  validatePrompt(prompt) {
    const normalizedPrompt = String(prompt ?? "").trim();

    if (normalizedPrompt.length < 3) {
      throw new Error("Informe um prompt com pelo menos 3 caracteres.");
    }

    return normalizedPrompt;
  }

  async sendPrompt(prompt) {
    const normalizedPrompt = this.validatePrompt(prompt);
    const answer = await this.aiClient.generateContent(normalizedPrompt);

    return {
      prompt: normalizedPrompt,
      answer,
      createdAt: new Date().toISOString()
    };
  }
}
