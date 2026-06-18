# Prompt Lab CI

![CI](https://github.com/tsaahr/prompt-lab-ci/actions/workflows/ci.yml/badge.svg)

Aplicação web simples para enviar um prompt para a API do Gemini e exibir a resposta recebida. O projeto foi criado para a Atividade Integradora de Desenvolvimento de Software, com foco em Clean Code, testes unitários e pipeline de Integração Contínua.

## Requisitos

- Node.js 20 ou superior
- Chave da Gemini API

## Como rodar

1. Instale as dependências do projeto:

```bash
npm install
```

2. Crie um arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

3. Preencha a variável `GEMINI_API_KEY` no arquivo `.env`.
   A variável `GEMINI_MODEL` pode ficar como `gemini-2.5-flash`, que é o modelo padrão do projeto.

4. Inicie a aplicação:

```bash
npm start
```

5. Acesse:

```text
http://localhost:3000
```

## Testes

Execute os testes unitários com:

```bash
npm test
```

Os testes validam:

- O envio do prompt, garantindo que prompts inválidos não chamem a API e que o payload da Gemini seja montado corretamente.
- O recebimento da resposta, garantindo que o texto retornado pela IA seja tratado corretamente.

## Estrutura

```text
src/
  config.js          # leitura das configurações
  env.js             # carregamento do arquivo .env
  geminiClient.js    # integração com a API Gemini
  promptService.js   # lógica de validação, envio e recebimento
  server.js          # servidor HTTP e rotas
public/
  index.html         # interface da aplicação
  app.js             # chamada da interface para o backend
  styles.css         # estilos da tela
test/
  promptService.test.js # testes de envio e recebimento
```

## Integração Contínua

O workflow `.github/workflows/ci.yml` executa `npm test` automaticamente a cada `push` ou `pull_request`.

## Documento de entrega

Use `docs/entrega-template.md` como base para montar o PDF solicitado no Moodle. Antes de exportar, preencha seu nome de usuário do GitHub e o link direto do repositório.
