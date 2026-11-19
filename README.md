# BrightFuture — Sprint 1 (base de desenvolvimento)

Projeto acadêmico de Programação Front-End. Equipe: dois estudantes, incluindo Thiago Bandeira Batista.

## Como iniciar

Abra a pasta no VS Code e execute com uma extensão de servidor local, como Live Server; alternativamente, no terminal dentro desta pasta:

```bash
python3 -m http.server 5500
```

Acesse `http://localhost:5500` no navegador. Bootstrap, Bootstrap Icons e fontes utilizam CDN e precisam de internet.

**Login fictício:** matrícula `202600123` e senha `brightfuture`. Não use credenciais reais.

## Estrutura

- `index.html`: estrutura semântica e visual aprovada da V1.2.
- `css/style.css`: estilos da interface incluindo degradê da marca.
- `js/app.js`: funcionalidades já presentes no protótipo de referência.
- `js/visual.js`: preferências e ajustes visuais do protótipo.
- `assets/logos/login.png`: logo 1, exclusiva do login.
- `assets/logos/internal.png`: logo 3, para o interior do portal.
- `assets/logos/favicon.png`: ícone do site.
- `docs/PROXIMOS_PASSOS.md`: plano didático para evolução.

## Escopo e limitações

Esta entrega é a **base de desenvolvimento da Sprint 1**, proveniente da V1.2 aprovada, modularizada em arquivos. Não representa conclusão da especificação funcional V1.0. As informações são fictícias, login e chat são demonstrativos, dados e protocolos são locais, sem autenticação real, servidor ou banco de dados. Não existem usuários/professores conectados.

O código da referência foi preservado inicialmente para minimizar regressões. Próximas sprints: extrair os dados hardcoded para JSON, dividir os módulos de JavaScript por responsabilidade, adicionar testes funcionais e implementar/validar completamente as melhorias V1.0.

## Colaboração

1. Criem um repositório privado ou público no GitHub.
2. Use `main` como base e branches de tarefa como `feat/dashboard` e `feat/disciplinas`.
3. Façam pequenas alterações, testem no navegador e revisem o código um do outro antes do merge.
4. Não coloquem dados pessoais reais nem senhas de verdade nos arquivos.
