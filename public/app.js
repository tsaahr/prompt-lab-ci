const form = document.querySelector("#prompt-form");
const promptInput = document.querySelector("#prompt");
const answerOutput = document.querySelector("#answer");
const message = document.querySelector("#message");
const counter = document.querySelector("#counter");
const submitButton = form.querySelector("button");
const appStatus = document.querySelector("#app-status");
const modelStatus = document.querySelector("#model-status");
const maxPromptLength = Number(promptInput.getAttribute("maxlength"));

function setMessage(text, type = "info") {
  message.textContent = text;
  message.dataset.type = type;
}

function updateCounter() {
  const length = promptInput.value.length;
  counter.textContent = `${length}/${maxPromptLength} caracteres`;
  counter.dataset.warning = String(length > maxPromptLength * 0.9);
}

async function loadApiStatus() {
  try {
    const response = await fetch("/api/health");
    const health = await response.json();

    appStatus.textContent = health.geminiConfigured ? "Pronto para testar" : "Configure a chave";
    appStatus.dataset.state = health.geminiConfigured ? "ready" : "warning";
    modelStatus.textContent = health.model ?? "Gemini API";
  } catch {
    appStatus.textContent = "API indisponível";
    appStatus.dataset.state = "error";
  }
}

promptInput.addEventListener("input", updateCounter);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const prompt = promptInput.value.trim();
  answerOutput.textContent = "";
  setMessage("Enviando prompt...");
  submitButton.disabled = true;

  try {
    if (prompt.length < 3) {
      throw new Error("Informe um prompt com pelo menos 3 caracteres.");
    }

    const response = await fetch("/api/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error ?? "Não foi possível obter a resposta.");
    }

    answerOutput.textContent = payload.answer;
    setMessage("Resposta recebida com sucesso.", "success");
  } catch (error) {
    answerOutput.textContent = error.message;
    setMessage(error.message, "error");
  } finally {
    submitButton.disabled = false;
  }
});

updateCounter();
loadApiStatus();
