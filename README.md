# Prompt Lab CI

Aplicacao web simples para enviar um prompt para a API do Gemini e exibir a resposta recebida. O projeto foi criado para a Atividade Integradora de Desenvolvimento de Software, com foco em Clean Code, testes unitarios e pipeline de Integracao Continua.

## Requisitos

- Node.js 20 ou superior
- Chave da Gemini API

## Como rodar

1. Instale as dependencias do projeto:

```bash
npm install
```

2. Crie um arquivo `.env` com base no exemplo:

```bash
cp .env.example .env
```

3. Preencha a variavel `GEMINI_API_KEY` no arquivo `.env`.

4. Inicie a aplicacao:

```bash
npm start
```

5. Acesse:

```text
http://localhost:3000
```

## Testes

Execute os testes unitarios com:

```bash
npm test
```

Os testes validam:

- O envio do prompt, garantindo que prompts invalidos nao chamem a API e que o payload da Gemini seja montado corretamente.
- O recebimento da resposta, garantindo que o texto retornado pela IA seja tratado corretamente.

## Integracao Continua

O workflow `.github/workflows/ci.yml` executa `npm test` automaticamente a cada `push` ou `pull_request`.

## Documento de entrega

Use `docs/entrega-template.md` como base para montar o PDF solicitado no Moodle. Antes de exportar, preencha seu nome de usuario do GitHub e o link direto do repositorio.
