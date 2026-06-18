const MAX_PROMPT_LENGTH = 2000;

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export class PromptService {
  constructor(aiClient) {
    this.aiClient = aiClient;
  }

  validatePrompt(prompt) {
    const normalizedPrompt = String(prompt ?? "").trim();

    if (normalizedPrompt.length < 3) {
      throw new ValidationError("Informe um prompt com pelo menos 3 caracteres.");
    }

    if (normalizedPrompt.length > MAX_PROMPT_LENGTH) {
      throw new ValidationError(`Informe um prompt com no maximo ${MAX_PROMPT_LENGTH} caracteres.`);
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
