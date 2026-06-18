# Atividade Integradora - Desenvolvimento de Software

## Nome de usuário do GitHub

Preencher com seu usuário do GitHub.

## Link direto para o repositório

Preencher com o link do repositório publicado no GitHub.

## Explicação do código

O projeto Prompt Lab CI foi desenvolvido em JavaScript com Node.js 20. A aplicação possui uma interface web simples em HTML, CSS e JavaScript puro, na qual o usuário digita um prompt, envia para o backend e visualiza a resposta retornada pela API Gemini.

A organização principal do código é:

- `public/`: arquivos da interface web.
- `src/server.js`: servidor HTTP, rota de envio de prompt e rota `/api/health`.
- `src/promptService.js`: validação do prompt e coordenação do envio.
- `src/geminiClient.js`: comunicação com a API Gemini.
- `test/`: testes unitários.
- `.github/workflows/ci.yml`: pipeline de Integração Contínua.

## Explicação dos testes unitários

Os testes foram criados com o módulo nativo `node:test`.

O primeiro grupo de testes valida o envio do prompt: quando o prompt é inválido, a aplicação retorna erro e não chama a API. Também existe validação para impedir prompts acima do limite definido.

O segundo grupo valida o recebimento da resposta: quando o cliente de IA retorna uma resposta, o serviço devolve o prompt normalizado, a resposta e a data de criação.

Também há testes para garantir que o payload enviado ao Gemini seja montado corretamente, que erros retornados pela API sejam tratados de forma clara e que o endpoint `/api/health` informe o status da configuração.

## Boas práticas aplicadas

- Nomes significativos para classes, funções e arquivos.
- Separação de responsabilidades entre servidor, serviço de regra de negócio, cliente de API e interface.
- Injeção de dependência no cliente de IA, facilitando testes sem rede.
- Validação de entrada antes de chamar serviços externos.
- Variáveis sensíveis em `.env`, sem chave hardcoded no código.
- Testes automatizados isolados da API real.
- Pipeline de CI para executar os testes a cada envio ao repositório.

## Observação sobre colaborador

Adicionar o professor `rodrigo.barreto.cc@gmail.com` como colaborador do repositório no GitHub antes da entrega.
