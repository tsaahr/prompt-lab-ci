# Atividade Integradora - Desenvolvimento de Software

## Nome de usuario do GitHub

Preencher com seu usuario do GitHub.

## Link direto para o repositorio

Preencher com o link do repositorio publicado no GitHub.

## Explicacao do codigo

O projeto Prompt Lab CI foi desenvolvido em JavaScript com Node.js 20. A aplicacao possui uma interface web simples em HTML, CSS e JavaScript puro, na qual o usuario digita um prompt, envia para o backend e visualiza a resposta retornada pela API Gemini.

A organizacao principal do codigo e:

- `public/`: arquivos da interface web.
- `src/server.js`: servidor HTTP e rotas da aplicacao.
- `src/promptService.js`: validacao do prompt e coordenacao do envio.
- `src/geminiClient.js`: comunicacao com a API Gemini.
- `test/`: testes unitarios.
- `.github/workflows/ci.yml`: pipeline de Integracao Continua.

## Explicacao dos testes unitarios

Os testes foram criados com o modulo nativo `node:test`.

O primeiro teste valida o envio do prompt: quando o prompt e invalido, a aplicacao retorna erro e nao chama a API.

O segundo teste valida o recebimento da resposta: quando o cliente de IA retorna uma resposta, o servico devolve o prompt normalizado, a resposta e a data de criacao.

Ha tambem um teste auxiliar para garantir que a estrutura de resposta do Gemini seja convertida corretamente para texto.

## Boas praticas aplicadas

- Nomes significativos para classes, funcoes e arquivos.
- Separacao de responsabilidades entre servidor, servico de regra de negocio e cliente de API.
- Injecao de dependencia no cliente de IA, facilitando testes sem rede.
- Validacao de entrada antes de chamar servicos externos.
- Testes automatizados isolados da API real.
- Pipeline de CI para executar os testes a cada envio ao repositorio.

## Observacao sobre colaborador

Adicionar o professor `rodrigo.barreto.cc@gmail.com` como colaborador do repositorio no GitHub antes da entrega.
