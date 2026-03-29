# bradesco-demo-ui

Demo (Vercel): https://bradesco-demo-ui.vercel.app/

## PT-BR

### Visao geral
Aplicacao web em React + Vite que simula a home de um banco digital inspirado no Bradesco. O projeto tem foco em experiencia moderna, performance, acessibilidade e renderizacao orientada a conteudo (JSON local ou API remota).

### Objetivos do projeto
- Exibir uma landing page bancaria completa, modular e responsiva.
- Consumir conteudo dinamico com fallback automatico para JSON local.
- Demonstrar componentes reutilizaveis, animacoes suaves e boas praticas de UX.
- Incluir recursos de acessibilidade nativos na interface.

### Stack e bibliotecas
- React 19
- Vite 8
- Framer Motion (animacoes)
- Lucide React (icones)
- React Icons (icones de redes sociais)
- ESLint 9 + jsx-a11y + react-hooks + react-refresh
- @axe-core/react (dependencia instalada para analises de acessibilidade em ambiente React)

### Funcionalidades implementadas
- Top bar com acesso a conta (agencia/conta), checkbox de lembranca e acao de ajuda.
- Painel de acessibilidade com:
	- ajuste de fonte (A- / A+),
	- alto contraste,
	- reset de preferencias.
- Navegacao desktop e menu mobile com drawer animado.
- Hero carousel com autoplay, controles manuais e indicadores.
- Secao de acoes rapidas com icones contextuais.
- Secao de produtos e servicos.
- Secao de contas por segmento (PF/PJ).
- Secao de facilidades com carousel secundario e cards em destaque.
- Secoes de conteudo adicionais:
	- estatisticas,
	- depoimentos,
	- beneficios,
	- CTA principal,
	- tabela comparativa de perfis,
	- FAQ com acordeao,
	- seguranca,
	- blog,
	- parceiros,
	- linha do tempo institucional.
- Rodape com redes sociais, links institucionais e informacoes legais.
- Botao flutuante da BIA com animacao.

### Acessibilidade e UX
- Link de salto para o conteudo principal (skip link).
- Uso consistente de `aria-label`, `aria-expanded`, `aria-controls`, `aria-live`, `role` e `aria-pressed`.
- Estados de foco visiveis para elementos interativos.
- Respeito a `prefers-reduced-motion` nas animacoes.
- Bloqueio de scroll do body quando menu mobile esta aberto.

### Arquitetura e estrutura de pastas
```text
.
|-- eslint.config.js
|-- index.html
|-- package.json
|-- README.md
|-- vite.config.js
|-- public/
`-- src/
		|-- App.css
		|-- App.jsx
		|-- index.css
		|-- main.jsx
		|-- assets/
		|   `-- bradesco-logo-oficial-2018-2.png
		|-- data/
		|   `-- homeData.json
		`-- services/
				`-- contentService.js
```

### Fluxo de dados
O app usa um servico central para buscar conteudo da home:

1. Se `VITE_CONTENT_API_URL` estiver definida, o app tenta buscar dados remotos.
2. Se a API retornar erro, payload invalido ou estiver indisponivel, o app usa `src/data/homeData.json`.
3. Se o payload remoto vier no formato `{ home: {...} }`, o servico extrai automaticamente `home`.

Esse comportamento garante resiliencia para demos e desenvolvimento local.

### Como executar localmente
Pre-requisitos:
- Node.js 20+ (recomendado)
- npm 10+ (ou equivalente)

Passos:

```bash
npm install
npm run dev
```

Aplicacao local padrao: http://localhost:5173

### Scripts disponiveis
- `npm run dev`: inicia ambiente de desenvolvimento com HMR.
- `npm run build`: gera build de producao em `dist`.
- `npm run preview`: sobe servidor local para testar o build.
- `npm run lint`: executa analise de lint no projeto.

### Variaveis de ambiente
Crie um arquivo `.env` (ou `.env.local`) na raiz para apontar API de conteudo:

```env
VITE_CONTENT_API_URL=https://sua-api.com/home
```

Se nao for definida, o app usa os dados locais automaticamente.

### Deploy
Deploy publicado em Vercel:
- https://bradesco-demo-ui.vercel.app/

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

### Escopo de conteudo atual (JSON)
`homeData.json` inclui blocos para:
- topBar, brand, nav, topMenus
- heroSlides, quickActions
- services, segments, facilities
- contacts, stats, testimonials
- benefits, maincta, comparison
- faq, security, blog, partners, timeline
- footerSocial, footerInlineLinks, footerLinks, legal

### Observacoes
- Projeto com conteudo demonstrativo para fins de UI/UX e prototipacao.
- Nao implementa autenticacao real, transacoes bancarias reais ou backend proprietario.

---

## EN

### Overview
This is a React + Vite web application that simulates a digital banking homepage inspired by Bradesco. It focuses on modern UX, responsiveness, accessibility, and content-driven rendering (local JSON or remote API).

### Project goals
- Deliver a complete, modular, responsive banking landing page.
- Support dynamic content loading with automatic local fallback.
- Showcase reusable components, smooth motion, and UX best practices.
- Include built-in accessibility controls.

### Tech stack
- React 19
- Vite 8
- Framer Motion (animations)
- Lucide React (icons)
- React Icons (social icons)
- ESLint 9 + jsx-a11y + react-hooks + react-refresh
- @axe-core/react (installed dependency for React accessibility auditing)

### Implemented features
- Top utility bar with account access inputs, remember option, and help action.
- Accessibility panel with:
	- font scaling (A- / A+),
	- high contrast mode,
	- reset action.
- Desktop navigation and animated mobile drawer menu.
- Hero carousel with autoplay, manual controls, and slide dots.
- Quick action cards with contextual icons.
- Products and services section.
- PF/PJ account segment section.
- Facilities section with secondary carousel and featured cards.
- Additional content sections:
	- stats,
	- testimonials,
	- benefits,
	- main CTA,
	- comparison table,
	- FAQ accordion,
	- security,
	- blog,
	- partners,
	- institutional timeline.
- Footer with social links, institutional links, and legal information.
- Floating BIA button with animation.

### Accessibility and UX
- Skip link to main content.
- Consistent use of `aria-label`, `aria-expanded`, `aria-controls`, `aria-live`, `role`, and `aria-pressed`.
- Visible focus states for interactive elements.
- Motion behavior respects `prefers-reduced-motion`.
- Body scroll lock when the mobile drawer is open.

### Architecture and folder structure
```text
.
|-- eslint.config.js
|-- index.html
|-- package.json
|-- README.md
|-- vite.config.js
|-- public/
`-- src/
		|-- App.css
		|-- App.jsx
		|-- index.css
		|-- main.jsx
		|-- assets/
		|   `-- bradesco-logo-oficial-2018-2.png
		|-- data/
		|   `-- homeData.json
		`-- services/
				`-- contentService.js
```

### Data flow
The app uses a central service to resolve homepage content:

1. If `VITE_CONTENT_API_URL` is set, the app tries a remote request.
2. If the API fails, returns an invalid payload, or is unavailable, it falls back to `src/data/homeData.json`.
3. If the API payload is shaped like `{ home: {...} }`, the service automatically extracts `home`.

This strategy keeps the demo resilient and easy to run locally.

### Running locally
Requirements:
- Node.js 20+ (recommended)
- npm 10+ (or equivalent)

Steps:

```bash
npm install
npm run dev
```

Default local URL: http://localhost:5173

### Available scripts
- `npm run dev`: starts development server with HMR.
- `npm run build`: creates production bundle in `dist`.
- `npm run preview`: serves production build locally.
- `npm run lint`: runs lint checks.

### Environment variables
Create a `.env` (or `.env.local`) file in the project root to use a remote content API:

```env
VITE_CONTENT_API_URL=https://your-api.com/home
```

If omitted, local JSON data is used automatically.

### Deployment
Live demo on Vercel:
- https://bradesco-demo-ui.vercel.app/

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

### Current JSON content scope
`homeData.json` currently contains:
- topBar, brand, nav, topMenus
- heroSlides, quickActions
- services, segments, facilities
- contacts, stats, testimonials
- benefits, maincta, comparison
- faq, security, blog, partners, timeline
- footerSocial, footerInlineLinks, footerLinks, legal

### Notes
- This project uses demo content for UI/UX and prototyping purposes.
- It does not include real authentication, real financial transactions, or a proprietary backend.
