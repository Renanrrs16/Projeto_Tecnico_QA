# Projeto de Automação QA - Playwright

## 📋 Sobre o Projeto

Este projeto implementa uma suíte completa de testes automatizados utilizando **Playwright** para validação de aplicações web através de testes **E2E (End-to-End)** e **API**. O projeto foi desenvolvido seguindo as melhores práticas de automação de testes, incluindo padrões como Page Object Model (POM) e API Object Model.

### 🎯 Aplicações Testadas
- **Frontend**: https://front.serverest.dev/
- **API**: https://serverest.dev/

## 🛠 Tecnologias e Ferramentas

- **Framework de Testes**: Playwright v1.52.0
- **Linguagem**: JavaScript (ES Modules)
- **Runtime**: Node.js (>=18)
- **Padrões de Design**: 
  - Page Object Model (POM)
  - API Object Model
- **Gerenciamento de Dependências**: npm
- **Configuração de Ambiente**: dotenv

## 📁 Estrutura do Projeto

```
projeto-tecnico-qa/
├── tests/
│   ├── e2e/                    # Testes End-to-End (Interface)
│   │   ├── login.spec.js       # Testes de autenticação via UI
│   │   ├── users.spec.js       # Testes de cadastro de usuários
│   │   └── products.spec.js    # Testes de produtos via UI
│   └── api/                    # Testes de API
│       ├── login.api.spec.js   # Testes de login via API
│       ├── users.api.spec.js   # Testes de usuários via API
│       └── products.api.spec.js # Testes de produtos via API
├── support/
│   ├── actions/                # Page Objects (POM)
│   │   ├── Login.js           # Ações de login
│   │   ├── Users.js           # Ações de usuários
│   │   └── Products.js        # Ações de produtos
│   ├── api/                   # API Objects
│   │   └── index.js           # Centralizador de chamadas API
│   ├── fixtures/              # Dados de teste
│   │   ├── users.json         # Dados de usuários
│   │   └── products.json      # Dados de produtos
│   └── index.js               # Configuração de fixtures
├── .env                       # Variáveis de ambiente
├── playwright.config.js       # Configuração do Playwright
├── package.json              # Dependências e scripts
└── README.md                 # Este arquivo
```

## 🚀 Configuração e Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes)

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd projeto-tecnico-qa
```

2. **Instale as dependências**
```bash
npm install
```

3. **Instale os navegadores do Playwright**
```bash
npm run install:browsers
```

4. **Configure as variáveis de ambiente**
Crie o arquivo `.env` na raiz do projeto:
```env
BASE_API=https://serverest.dev
BASE_URL=https://front.serverest.dev
```

## 🧪 Execução dos Testes

### Scripts Disponíveis

```bash
# Executar todos os testes
npm test

# Executar apenas testes E2E (Interface)
npm run test:e2e

# Executar apenas testes de API
npm run test:api

# Executar testes em modo visual (com navegador visível)
npm run test:headed

# Executar testes em modo debug
npm run test:debug

# Visualizar relatório dos testes
npm run report
```

## 📊 Cenários de Teste Implementados

### 🖥 Testes E2E (Interface do Usuário)

#### 🔐 Login (`tests/e2e/login.spec.js`)
- ✅ Login com credenciais válidas
- ❌ Erro com credenciais inválidas  
- 🚪 Logout com sucesso

#### 👥 Cadastro de Usuários (`tests/e2e/users.spec.js`)
- ✅ Cadastro de usuário comum
- ❌ Erro ao cadastrar com email existente
- 👑 Cadastro de usuário administrador

#### 🛍 Produtos (`tests/e2e/products.spec.js`)
- ➕ Cadastro de produto com dados válidos
- 💰 Cadastro de produto com preço elevado
- ❌ Validação de campos obrigatórios

### 🔌 Testes de API

#### 🔐 Login API (`tests/api/login.api.spec.js`)
- ✅ Autenticação com credenciais válidas
- ❌ Erro com credenciais inválidas
- 📝 Validação de campos obrigatórios

#### 👥 Usuários API (`tests/api/users.api.spec.js`)
- ➕ Criação de usuário
- 📋 Listagem de todos os usuários
- 🔍 Busca de usuário por ID
- 🗑 Exclusão de usuário (cleanup)

#### 🛍 Produtos API (`tests/api/products.api.spec.js`)
- ➕ Criação de produto (com autenticação)
- 📋 Listagem de todos os produtos
- 🔍 Busca de produto por ID
- 🗑 Exclusão de produto (cleanup)

## 🏗 Arquitetura e Padrões

### Page Object Model (POM)
O projeto utiliza o padrão POM para organizar as ações da interface:

- **Login.js**: Encapsula ações de login/logout
- **Users.js**: Gerencia ações de cadastro de usuários
- **Products.js**: Controla ações relacionadas a produtos

### API Object Model
Centralização das chamadas de API em uma classe única:
- **index.js**: Contém todos os métodos para interação com a API
- Gerenciamento automático de tokens de autenticação
- Tratamento consistente de erros

### Fixtures e Dados de Teste
- **users.json**: Dados estruturados para testes de usuários
- **products.json**: Dados para testes de produtos
- Geração automática de dados únicos para evitar conflitos

## ✨ Funcionalidades Especiais

### 🔐 Gerenciamento de Autenticação
- Autenticação automática para testes de API
- Reutilização de tokens entre testes
- Validação de token antes de operações autenticadas

### 🧹 Cleanup Automático
- Limpeza automática de dados criados durante os testes
- Garantia de isolamento entre testes
- Prevenção de acúmulo de dados de teste

### 🔄 Dados Dinâmicos
- Geração de emails únicos usando timestamp
- Nomes de produtos únicos para evitar duplicatas
- Dados de teste isolados por execução

## 📈 Relatórios e Monitoramento

### Tipos de Relatório
- **HTML Report**: Relatório visual interativo
- **Screenshots**: Capturadas apenas em falhas
- **Vídeos**: Gravados apenas em falhas
- **Trace**: Habilitado na primeira tentativa de retry

### Configurações de Timeout
- **Timeout Global**: 60 segundos
- **Action Timeout**: 10 segundos  
- **Navigation Timeout**: 30 segundos

## 🔧 Configurações Avançadas

### Navegadores Suportados
- ✅ Chromium (ativo)
- 🔄 Firefox (comentado)
- 🔄 WebKit/Safari (comentado)

### Execução Paralela
- Testes executam em paralelo por padrão
- Configuração diferenciada para CI/CD
- Workers otimizados por ambiente

### Retry Strategy
- 2 tentativas em ambiente CI
- 0 tentativas em desenvolvimento local
- Trace capturado na primeira tentativa

## 🚀 CI/CD e Integração

### Configurações para CI
```javascript
// playwright.config.js
forbidOnly: !!process.env.CI,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 1 : undefined,
```

### Variables de Ambiente Necessárias
```env
BASE_API=https://serverest.dev
BASE_URL=https://front.serverest.dev
CI=true # Para ambiente de CI/CD
```

## 🤝 Boas Práticas Implementadas

- ✅ **Isolamento de testes**: Cada teste é independente
- ✅ **Reutilização de código**: Page Objects e API Objects
- ✅ **Dados de teste organizados**: Fixtures estruturadas
- ✅ **Tratamento de erros**: Logging e debugging detalhados
- ✅ **Cleanup automático**: Limpeza de dados após testes
- ✅ **Assertions claras**: Validações específicas e objetivas
- ✅ **Estrutura modular**: Separação clara de responsabilidades

## 🔍 Debugging e Troubleshooting

### Logs de Debug
O projeto inclui logs detalhados para facilitar o debugging:
```javascript
console.log('Token set successfully:', this.token ? 'Token exists' : 'Token is undefined');
```

### Modo Debug
```bash
npm run test:debug
```

### Análise de Falhas
- Screenshots automáticas em falhas
- Vídeos das sessões problemáticas
- Traces detalhados das ações

## 📝 Próximos Passos

### Melhorias Sugeridas
- [ ] Implementar testes de performance
- [ ] Adicionar testes de acessibilidade
- [ ] Integrar com ferramentas de CI/CD
- [ ] Implementar parallel execution otimizado
- [ ] Adicionar testes de regressão visual

### Expansão de Cobertura
- [ ] Testes de carrinho de compras completos
- [ ] Validações de segurança de API
- [ ] Testes de diferentes navegadores
- [ ] Testes mobile responsivos



