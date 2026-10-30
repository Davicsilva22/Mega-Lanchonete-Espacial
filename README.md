# 🚀 Mega Lanchonete Espacial

Projeto demonstrativo de uma lanchonete online, com catálogo de produtos, carrinho/pedidos e API própria em Node.js.

## Tecnologias

- HTML, CSS e JavaScript
- Node.js (módulos nativos, sem dependências externas)
- API HTTP em JSON

## Executar localmente

É necessário ter Node.js 18 ou superior instalado.

```bash
npm start
```

Depois, acesse: http://localhost:3000

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/produtos` | Retorna o catálogo de produtos |
| POST | `/api/pedidos` | Recebe os IDs dos produtos e calcula o total no servidor |
| GET | `/api/pedidos` | Lista os pedidos recebidos durante a execução atual |

Exemplo de corpo para `POST /api/pedidos`:

```json
{
  "itens": [1, 2, 9]
}
```

## Observações importantes

- Este projeto é uma demonstração. Não realiza cobrança ou pagamento real.
- Os pedidos são mantidos apenas na memória do servidor e são apagados quando ele reinicia.
- Perfil e preferências visuais são armazenados no `localStorage` do navegador de cada visitante.
- Para uso real, será necessário adicionar banco de dados persistente, validações e medidas adicionais de segurança.

## Publicação

O servidor utiliza a variável de ambiente `PORT` e escuta em `0.0.0.0`, configuração adequada para plataformas de hospedagem como Render.
