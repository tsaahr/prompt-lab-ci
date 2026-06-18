export function loadConfig(env = process.env) {
  return {
    geminiApiKey: env.GEMINI_API_KEY ?? "",
    port: Number(env.PORT ?? 3000)
  };
}
