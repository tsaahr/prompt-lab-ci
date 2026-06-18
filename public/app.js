const form = document.querySelector("#prompt-form");
const promptInput = document.querySelector("#prompt");
const answerOutput = document.querySelector("#answer");
const message = document.querySelector("#message");
const submitButton = form.querySelector("button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const prompt = promptInput.value.trim();
  answerOutput.textContent = "";
  message.textContent = "Enviando prompt...";
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error ?? "Nao foi possivel obter a resposta.");
    }

    answerOutput.textContent = payload.answer;
    message.textContent = "Resposta recebida com sucesso.";
  } catch (error) {
    answerOutput.textContent = "Verifique sua chave GEMINI_API_KEY e tente novamente.";
    message.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});
