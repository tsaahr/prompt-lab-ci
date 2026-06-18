export function loadConfig(env = process.env) {
  return {
    geminiApiKey: env.GEMINI_API_KEY ?? "",
    geminiModel: env.GEMINI_MODEL ?? "gemini-2.5-flash",
    port: Number(env.PORT ?? 3000)
  };
}
