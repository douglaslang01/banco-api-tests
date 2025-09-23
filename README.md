# banco-api-tests

Este projeto realiza testes automatizados na API REST do [banco-api](https://github.com/douglaslang01/banco-api), garantindo que suas funcionalidades estejam funcionando corretamente e contribuindo para a qualidade do sistema.

## 🧪 Tecnologias utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **Mocha** — Framework de testes
- **Chai** — Biblioteca de asserções
- **Supertest** — Requisições HTTP para testes
- **Mochawesome** — Geração de relatórios em HTML
- **dotenv** — Gerenciamento de variáveis de ambiente

## 📁 Estrutura de pastas
```
banco-api-tests/ 
├── test/                 # Testes organizados por funcionalidades 
│   ├── login.test.js 
│   └── transferencias.test.js 
├── mochawesome-report/   # Relatório HTML gerado automaticamente 
├── .env                  # Configuração da variável BASE_URL 
├── .gitignore 
├── package.json 
└── README.md
```

## Formato do arquivo `.env`

Antes de rodar os testes, crie um arquivo chamado .env na raiz do projeto com o seguinte conteúdo:

```
BASE_URL=http://localhost:3000
```

Substitua `http://localhost:3000` pela URL onde a API **banco-api** está rodando.

## 🚀 Comandos para execução

Instale as dependências:

```bash
npm install
```
Execute todos os testes:
```bash
npm test
```

💡 Dica
Para executar os testes e abrir o relatório HTML automaticamente, adicione o seguinte script no `package.json`:

```Json
"scripts": {
  "test:report": "npm test && open mochawesome-report/mochawesome.html"
}
```

No Windows, substitua `open` por `start`.

## 📚 Dependencias utilizadas e suas documentações

- [Mocha](https://mochajs.org/) - Framework de execução de testes
- [Chai](https://github.com/ladjs/supertest) - Biblioteca para chamadas HTTP
- [Supertest](https://www.chaijs.com/) - Biblioteca de asserções
- [Mochawesome](https://github.com/adamgruber/mochawesome) - Geração de relatórios em HTML
- [dotenv](https://github.com/motdotla/dotenv) - Gerenciamento de variáveis de ambiente



