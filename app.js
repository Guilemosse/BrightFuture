
"use strict";

/* =========================================
   BRIGHTFUTURE - DADOS DEMONSTRATIVOS
========================================= */

const STORAGE_PREFIX = "brightfuture_v1_";

const estudante = {
    nome: "Ana Oliveira",
    matricula: "2026001",
    senha: "123456",
    curso: "Ensino Médio"
};

const disciplinas = [
    {
        id: "mat",
        nome: "Matemática Aplicada",
        professor: "Prof. André Lima",
        dia: "Segunda",
        horario: "08:00 - 09:40",
        sala: "204",
        aulas: 40,
        faltas: 2,
        me1: 1.8,
        pc1: 7.1,
        me2: 1.7,
        pc2: 7.5
    },
    {
        id: "por",
        nome: "Língua Portuguesa",
        professor: "Profa. Camila Rocha",
        dia: "Terça",
        horario: "09:50 - 11:30",
        sala: "102",
        aulas: 38,
        faltas: 1,
        me1: 1.9,
        pc1: 7.6,
        me2: 1.8,
        pc2: 7.9
    },
    {
        id: "his",
        nome: "História",
        professor: "Prof. Bruno Martins",
        dia: "Quarta",
        horario: "08:00 - 09:40",
        sala: "105",
        aulas: 42,
        faltas: 3,
        me1: 1.6,
        pc1: 6.8,
        me2: null,
        pc2: null
    },
    {
        id: "cie",
        nome: "Ciências",
        professor: "Profa. Elisa Souza",
        dia: "Quinta",
        horario: "10:00 - 11:40",
        sala: "Laboratório 03",
        aulas: 40,
        faltas: 0,
        me1: 2.0,
        pc1: 7.8,
        me2: 1.9,
        pc2: 7.7
    }
];

const atividades = [
    {
        id: 1,
        titulo: "Lista de exercícios",
        disciplina: "Matemática Aplicada",
        prazo: "2026-11-18",
        material: "Resumo de funções"
    },
    {
        id: 2,
        titulo: "Produção textual",
        disciplina: "Língua Portuguesa",
        prazo: "2026-11-20",
        material: "Roteiro de redação"
    },
    {
        id: 3,
        titulo: "Seminário sobre Brasil Colônia",
        disciplina: "História",
        prazo: "2026-11-24",
        material: "Guia de pesquisa"
    },
    {
        id: 4,
        titulo: "Avaliação de ecossistemas",
        disciplina: "Ciências",
        prazo: "2026-11-27",
        material: "Revisão de ecossistemas"
    }
];

const comunicados = [
    {
        id: 1,
        titulo: "Semana de avaliações",
        descricao: "Confira as datas das avaliações.",
        data: "16/11/2026"
    },
    {
        id: 2,
        titulo: "Atualização da grade",
        descricao: "Consulte os horários das disciplinas.",
        data: "14/11/2026"
    },
    {
        id: 3,
        titulo: "Materiais de apoio",
        descricao: "Novos materiais demonstrativos disponíveis.",
        data: "12/11/2026"
    }
];

/* =========================================
   MENU DE NAVEGAÇÃO
========================================= */

const menuItems = [
    ["dashboard", "Painel inicial", "grid-1x2"],
    ["disciplinas", "Disciplinas", "book"],
    ["grade", "Grade semanal", "clock"],
    ["notas", "Notas", "bar-chart"],
    ["frequencia", "Frequência", "check2-square"],
    ["revisao", "Revisão de faltas", "file-earmark-text"],
    ["atividades", "Atividades", "list-check"],
    ["calendario", "Calendário", "calendar3"],
    ["comunicados", "Comunicados", "megaphone"],
    ["mensagens", "Mensagens", "chat-left-text"],
    ["materiais", "Materiais", "folder2-open"],
    ["perfil", "Perfil", "person-circle"]
];

let paginaAtual = "dashboard";

/* =========================================
   FUNÇÕES UTILITÁRIAS
========================================= */

function salvar(chave, valor) {
    localStorage.setItem(
        STORAGE_PREFIX + chave,
        JSON.stringify(valor)
    );
}

function carregar(chave, padrao = []) {
    try {
        const valor = localStorage.getItem(
            STORAGE_PREFIX + chave
        );

        return valor === null
            ? padrao
            : JSON.parse(valor);
    } catch {
        return padrao;
    }
}

function protegerHTML(valor) {
    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function icone(nome) {
    return `<i class="bi bi-${nome}" aria-hidden="true"></i>`;
}

function tituloPagina(titulo, descricao) {
    return `
        <h1 class="page-title">${titulo}</h1>
        <p class="page-subtitle">${descricao}</p>
    `;
}

function card(titulo, conteudo) {
    return `
        <section class="bf-card">
            <h3>${titulo}</h3>
            ${conteudo}
        </section>
    `;
}

function linha(titulo, descricao, complemento = "") {
    return `
        <div class="list-row">
            <div>
                <strong>${titulo}</strong>
                <small>${descricao}</small>
            </div>
            ${complemento}
        </div>
    `;
}

function formatarData(data) {
    return new Date(data + "T12:00:00")
        .toLocaleDateString("pt-BR");
}

function formatarNota(nota) {
    return nota === null
        ? "Não lançada"
        : nota.toFixed(1).replace(".", ",");
}

function calcularUP(me, pc) {
    if (me === null || pc === null) {
        return null;
    }

    return me + pc;
}

function calcularMedia(disciplina) {
    const up1 = calcularUP(
        disciplina.me1,
        disciplina.pc1
    );

    const up2 = calcularUP(
        disciplina.me2,
        disciplina.pc2
    );

    if (up1 === null || up2 === null) {
        return null;
    }

    return (up1 + up2) / 2;
}

function calcularFrequencia(disciplina) {
    const presencas =
        disciplina.aulas - disciplina.faltas;

    return Math.round(
        (presencas / disciplina.aulas) * 100
    );
}

function notificar(mensagem) {
    const elemento = document.createElement("div");

    elemento.className = "toast-note";
    elemento.textContent = mensagem;

    document
        .getElementById("toastRegion")
        .appendChild(elemento);

    setTimeout(() => elemento.remove(), 4000);
}

function atividadesConcluidas() {
    return carregar("concluidas", []);
}

function atividadeConcluida(id) {
    return atividadesConcluidas().includes(id);
}

/* =========================================
   LOGIN E SESSÃO
========================================= */

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const matricula = document
        .getElementById("matricula")
        .value.trim();

    const senha = document
        .getElementById("senha")
        .value;

    if (
        matricula === estudante.matricula &&
        senha === estudante.senha
    ) {
        salvar("sessao", true);
        abrirAplicacao();
    } else {
        document.getElementById("loginError")
            .textContent = "Matrícula ou senha demonstrativa incorreta.";
    }
});

function abrirAplicacao() {
    document
        .getElementById("loginView")
        .classList.add("d-none");

    document
        .getElementById("appView")
        .classList.remove("d-none");

    navegar("dashboard");
}

document
    .getElementById("logoutBtn")
    .addEventListener("click", function () {
        localStorage.removeItem(
            STORAGE_PREFIX + "sessao"
        );

        document
            .getElementById("appView")
            .classList.add("d-none");

        document
            .getElementById("loginView")
            .classList.remove("d-none");

        fecharMenu();
    });

/* =========================================
   NAVEGAÇÃO
========================================= */

function criarMenu() {
    const menu = document.getElementById("menu");

    menu.innerHTML = menuItems.map(function (item) {
        return `
            <button
                class="nav-link"
                data-page="${item[0]}"
                type="button"
            >
                ${icone(item[2])}
                <span>${item[1]}</span>
            </button>
        `;
    }).join("");
}

function navegar(pagina) {
    if (!telas[pagina]) {
        pagina = "dashboard";
    }

    paginaAtual = pagina;

    document.getElementById("content").innerHTML =
        telas[pagina]();

    const item = menuItems.find(
        item => item[0] === pagina
    );

    document.getElementById("breadcrumb")
        .textContent = item[1];

    document.querySelectorAll("[data-page]")
        .forEach(function (botao) {
            const ativo = botao.dataset.page === pagina;

            botao.classList.toggle("active", ativo);

            if (ativo) {
                botao.setAttribute("aria-current", "page");
            } else {
                botao.removeAttribute("aria-current");
            }
        });

    fecharMenu();
    window.scrollTo(0, 0);
}

document.getElementById("menu")
    .addEventListener("click", function (evento) {
        const botao = evento.target.closest("[data-page]");

        if (botao) {
            navegar(botao.dataset.page);
        }
    });

function fecharMenu() {
    document.getElementById("sidebar")
        .classList.remove("open");

    document.getElementById("mobileBackdrop")
        .classList.add("d-none");
}

document.getElementById("menuToggle")
    .addEventListener("click", function () {
        document.getElementById("sidebar")
            .classList.toggle("open");

        document.getElementById("mobileBackdrop")
            .classList.toggle("d-none");
    });

document.getElementById("mobileBackdrop")
    .addEventListener("click", fecharMenu);

/* =========================================
   DASHBOARD
========================================= */

function telaDashboard() {
    const pendentes = atividades.filter(
        atividade => !atividadeConcluida(atividade.id)
    );

    const lidos = carregar("comunicadosLidos", []);

    const naoLidos = comunicados.filter(
        comunicado => !lidos.includes(comunicado.id)
    );

    const frequenciaMedia = Math.round(
        disciplinas.reduce(
            (total, disciplina) =>
                total + calcularFrequencia(disciplina),
            0
        ) / disciplinas.length
    );

    const indicadores = [
        ["Disciplinas", disciplinas.length, "book"],
        ["Atividades pendentes", pendentes.length, "list-check"],
        ["Comunicados não lidos", naoLidos.length, "megaphone"],
        ["Frequência média", frequenciaMedia + "%", "graph-up"]
    ];

    return `
        ${tituloPagina(
            "Olá, Ana!",
            "Bem-vinda ao seu espaço acadêmico."
        )}

        <div class="hero mb-4">
            <div>
                <span class="small text-white-50">
                    ANO LETIVO 2026
                </span>

                <h2>Seu aprendizado em um só lugar</h2>

                <p>
                    Confira suas entregas e acompanhe seu progresso.
                </p>
            </div>

            ${icone("mortarboard")}
        </div>

        <div class="row g-3 mb-4">
            ${indicadores.map(indicador => `
                <div class="col-sm-6 col-xl-3">
                    <div class="bf-card d-flex align-items-center justify-content-between">
                        <div>
                            <div class="metric-label">
                                ${indicador[0]}
                            </div>

                            <div class="metric-value">
                                ${indicador[1]}
                            </div>
                        </div>

                        <span class="metric-icon">
                            ${icone(indicador[2])}
                        </span>
                    </div>
                </div>
            `).join("")}
        </div>

        <div class="row g-3">
            <div class="col-lg-7">
                ${card(
                    "Próximas atividades",
                    pendentes.map(atividade =>
                        linha(
                            atividade.titulo,
                            atividade.disciplina,
                            `<span class="badge-soft">
                                ${formatarData(atividade.prazo)}
                            </span>`
                        )
                    ).join("") || "<p>Nenhuma atividade pendente.</p>"
                )}
            </div>

            <div class="col-lg-5">
                ${card(
                    "Últimos comunicados",
                    comunicados.map(comunicado =>
                        linha(
                            comunicado.titulo,
                            comunicado.data
                        )
                    ).join("")
                )}
            </div>
        </div>
    `;
}

/* =========================================
   DISCIPLINAS E GRADE
========================================= */

function telaDisciplinas() {
    return `
        ${tituloPagina(
            "Minhas disciplinas",
            "Consulte professores e horários."
        )}

        <div class="row g-3">
            ${disciplinas.map(disciplina => `
                <div class="col-md-6">
                    ${card(
                        disciplina.nome,
                        `
                            <p>${disciplina.professor}</p>
                            <p>
                                <strong>Dia:</strong>
                                ${disciplina.dia}
                            </p>
                            <p>
                                <strong>Horário:</strong>
                                ${disciplina.horario}
                            </p>
                            <p>
                                <strong>Sala:</strong>
                                ${disciplina.sala}
                            </p>
                        `
                    )}
                </div>
            `).join("")}
        </div>
    `;
}

function telaGrade() {
    return `
        ${tituloPagina(
            "Grade semanal",
            "Horários demonstrativos das aulas."
        )}

        ${card(
            "Horários",
            disciplinas.map(disciplina =>
                linha(
                    disciplina.nome,
                    disciplina.professor,
                    `<span class="badge-soft">
                        ${disciplina.dia} -
                        ${disciplina.horario}
                    </span>`
                )
            ).join("")
        )}
    `;
}

/* =========================================
   NOTAS
========================================= */

function telaNotas() {
    return `
        ${tituloPagina(
            "Minhas notas",
            "Consulte as avaliações UP1 e UP2."
        )}

        ${card(
            "Boletim demonstrativo",
            `
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Disciplina</th>
                                <th>ME1</th>
                                <th>PC1</th>
                                <th>UP1</th>
                                <th>ME2</th>
                                <th>PC2</th>
                                <th>UP2</th>
                                <th>Média</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${disciplinas.map(d => `
                                <tr>
                                    <td>${d.nome}</td>
                                    <td>${formatarNota(d.me1)}</td>
                                    <td>${formatarNota(d.pc1)}</td>
                                    <td>${formatarNota(calcularUP(d.me1, d.pc1))}</td>
                                    <td>${formatarNota(d.me2)}</td>
                                    <td>${formatarNota(d.pc2)}</td>
                                    <td>${formatarNota(calcularUP(d.me2, d.pc2))}</td>
                                    <td>${formatarNota(calcularMedia(d))}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>

                <p class="small text-secondary">
                    ME: até 2 pontos. PC: até 8 pontos.
                    Média = (UP1 + UP2) / 2.
                </p>
            `
        )}
    `;
}

/* =========================================
   FREQUÊNCIA E REVISÃO
========================================= */

function telaFrequencia() {
    return `
        ${tituloPagina(
            "Frequência",
            "Acompanhe suas presenças e faltas."
        )}

        ${card(
            "Frequência por disciplina",
            disciplinas.map(d =>
                linha(
                    d.nome,
                    `${d.faltas} faltas em ${d.aulas} aulas`,
                    `
                        <span class="badge-soft badge-ok">
                            ${calcularFrequencia(d)}%
                        </span>

                        <button
                            class="btn btn-sm btn-outline-primary"
                            data-action="revisar"
                            data-id="${d.id}"
                        >
                            Revisar
                        </button>
                    `
                )
            ).join("")
        )}
    `;
}

function telaRevisao() {
    const protocolos = carregar("protocolos", []);

    return `
        ${tituloPagina(
            "Revisão de faltas",
            "Solicitações fictícias, sem alteração de presença."
        )}

        <div class="row g-3">
            <div class="col-lg-6">
                ${card(
                    "Nova solicitação",
                    `
                        <form id="formRevisao">

                            <label class="form-label">
                                Disciplina
                            </label>

                            <select
                                id="disciplinaRevisao"
                                class="form-select mb-3"
                            >
                                ${disciplinas.map(d => `
                                    <option value="${d.id}">
                                        ${d.nome}
                                    </option>
                                `).join("")}
                            </select>

                            <label class="form-label">
                                Justificativa
                            </label>

                            <textarea
                                id="justificativa"
                                class="form-control mb-3"
                                rows="4"
                                maxlength="500"
                                required
                            ></textarea>

                            <button class="btn btn-primary">
                                Gerar protocolo
                            </button>

                        </form>
                    `
                )}
            </div>

            <div class="col-lg-6">
                ${card(
                    "Protocolos registrados",
                    protocolos.map(p =>
                        linha(
                            protegerHTML(p.numero),
                            protegerHTML(p.disciplina),
                            '<span class="badge-soft badge-warn">Pendente</span>'
                        )
                    ).join("") || "<p>Nenhum protocolo registrado.</p>"
                )}
            </div>
        </div>
    `;
}

/* =========================================
   ATIVIDADES E CALENDÁRIO
========================================= */

function telaAtividades() {
    return `
        ${tituloPagina(
            "Atividades",
            "Gerencie suas tarefas demonstrativas."
        )}

        ${card(
            "Minhas atividades",
            atividades.map(atividade =>
                linha(
                    atividade.titulo,
                    `${atividade.disciplina} - ${formatarData(atividade.prazo)}`,
                    `
                        <label class="d-flex align-items-center gap-2">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                data-tarefa="${atividade.id}"
                                ${atividadeConcluida(atividade.id) ? "checked" : ""}
                            >

                            <span class="small">
                                ${atividadeConcluida(atividade.id)
                                    ? "Concluída"
                                    : "Concluir"}
                            </span>
                        </label>
                    `
                )
            ).join("")
        )}
    `;
}

function telaCalendario() {
    return `
        ${tituloPagina(
            "Calendário",
            "Próximas datas acadêmicas."
        )}

        ${card(
            "Agenda acadêmica",
            atividades.map(a =>
                linha(
                    a.titulo,
                    a.disciplina,
                    `<span class="badge-soft">
                        ${formatarData(a.prazo)}
                    </span>`
                )
            ).join("")
        )}
    `;
}

/* =========================================
   COMUNICADOS
========================================= */

function telaComunicados() {
    const lidos = carregar("comunicadosLidos", []);

    return `
        ${tituloPagina(
            "Comunicados",
            "Avisos acadêmicos demonstrativos."
        )}

        ${card(
            "Quadro de avisos",
            comunicados.map(c =>
                linha(
                    c.titulo,
                    c.descricao,
                    `
                        <button
                            class="btn btn-sm btn-outline-primary"
                            data-action="ler"
                            data-id="${c.id}"
                            ${lidos.includes(c.id) ? "disabled" : ""}
                        >
                            ${lidos.includes(c.id) ? "Lido" : "Marcar como lido"}
                        </button>
                    `
                )
            ).join("")
        )}
    `;
}

/* =========================================
   MENSAGENS
========================================= */

function telaMensagens() {
    const mensagens = carregar("mensagens", []);

    return `
        ${tituloPagina(
            "Mensagens",
            "Simulação de comunicação acadêmica."
        )}

        <div class="row g-3">
            <div class="col-lg-6">
                ${card(
                    "Nova mensagem",
                    `
                        <form id="formMensagem">

                            <label class="form-label">
                                Disciplina
                            </label>

                            <select
                                id="mensagemDisciplina"
                                class="form-select mb-3"
                            >
                                ${disciplinas.map(d => `
                                    <option>${d.nome}</option>
                                `).join("")}
                            </select>

                            <label class="form-label">
                                Assunto
                            </label>

                            <input
                                id="mensagemAssunto"
                                class="form-control mb-3"
                                maxlength="80"
                                required
                            >

                            <label class="form-label">
                                Mensagem
                            </label>

                            <textarea
                                id="mensagemTexto"
                                class="form-control mb-3"
                                rows="4"
                                maxlength="800"
                                required
                            ></textarea>

                            <button class="btn btn-primary">
                                Salvar mensagem
                            </button>

                        </form>
                    `
                )}
            </div>

            <div class="col-lg-6">
                ${card(
                    "Mensagens salvas",
                    mensagens.map(m =>
                        linha(
                            protegerHTML(m.assunto),
                            protegerHTML(m.disciplina),
                            '<span class="badge-soft">Local</span>'
                        )
                    ).join("") || "<p>Nenhuma mensagem salva.</p>"
                )}
            </div>
        </div>
    `;
}

/* =========================================
   MATERIAIS
========================================= */

function telaMateriais() {
    return `
        ${tituloPagina(
            "Materiais de estudo",
            "Materiais ilustrativos vinculados às atividades."
        )}

        ${card(
            "Materiais disponíveis",
            atividades.map(a =>
                linha(
                    a.material,
                    a.disciplina,
                    '<span class="badge-soft">Demonstrativo</span>'
                )
            ).join("")
        )}
    `;
}

/* =========================================
   PERFIL
========================================= */

function telaPerfil() {
    return `
        ${tituloPagina(
            "Meu perfil",
            "Dados e preferências demonstrativas."
        )}

        <div class="row g-3">
            <div class="col-lg-6">
                ${card(
                    "Dados do estudante",
                    `
                        <p><strong>Nome:</strong> ${estudante.nome}</p>
                        <p><strong>Matrícula:</strong> ${estudante.matricula}</p>
                        <p><strong>Curso:</strong> ${estudante.curso}</p>
                    `
                )}
            </div>

            <div class="col-lg-6">
                ${card(
                    "Preferências",
                    `
                        <label for="tema" class="form-label">
                            Aparência
                        </label>

                        <select id="tema" class="form-select">
                            <option value="claro">Padrão claro</option>
                            <option value="contraste">Alto contraste</option>
                        </select>
                    `
                )}
            </div>
        </div>
    `;
}

/* =========================================
   REGISTRO DAS TELAS
========================================= */

const telas = {
    dashboard: telaDashboard,
    disciplinas: telaDisciplinas,
    grade: telaGrade,
    notas: telaNotas,
    frequencia: telaFrequencia,
    revisao: telaRevisao,
    atividades: telaAtividades,
    calendario: telaCalendario,
    comunicados: telaComunicados,
    mensagens: telaMensagens,
    materiais: telaMateriais,
    perfil: telaPerfil
};

/* =========================================
   EVENTOS DOS MÓDULOS
========================================= */

const conteudo = document.getElementById("content");

conteudo.addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-action]");

    if (!botao) {
        return;
    }

    const acao = botao.dataset.action;
    const id = botao.dataset.id;

    if (acao === "revisar") {
        navegar("revisao");

        document.getElementById("disciplinaRevisao")
            .value = id;
    }

    if (acao === "ler") {
        const lidos = carregar("comunicadosLidos", []);
        const numero = Number(id);

        if (!lidos.includes(numero)) {
            lidos.push(numero);
        }

        salvar("comunicadosLidos", lidos);
        navegar("comunicados");
    }
});

conteudo.addEventListener("change", function (evento) {
    const campo = evento.target;

    if (campo.matches("[data-tarefa]")) {
        const id = Number(campo.dataset.tarefa);

        let concluidas = atividadesConcluidas();

        concluidas = concluidas.filter(
            tarefa => tarefa !== id
        );

        if (campo.checked) {
            concluidas.push(id);
        }

        salvar("concluidas", concluidas);
        navegar("atividades");
    }

    if (campo.id === "tema") {
        const contraste = campo.value === "contraste";

        document.body.classList.toggle(
            "high-contrast",
            contraste
        );

        salvar("tema", campo.value);
    }
});

conteudo.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (evento.target.id === "formRevisao") {
        const id = document
            .getElementById("disciplinaRevisao")
            .value;

        const justificativa = document
            .getElementById("justificativa")
            .value.trim();

        if (!justificativa) {
            return;
        }

        const disciplina = disciplinas.find(
            d => d.id === id
        );

        const protocolos = carregar("protocolos", []);

        protocolos.unshift({
            numero: "BF-" + Date.now(),
            disciplina: disciplina.nome,
            justificativa: justificativa,
            status: "Pendente"
        });

        salvar("protocolos", protocolos);
        navegar("revisao");

        notificar("Protocolo fictício registrado.");
    }

    if (evento.target.id === "formMensagem") {
        const disciplina = document
            .getElementById("mensagemDisciplina")
            .value;

        const assunto = document
            .getElementById("mensagemAssunto")
            .value.trim();

        const texto = document
            .getElementById("mensagemTexto")
            .value.trim();

        if (!assunto || !texto) {
            return;
        }

        const mensagens = carregar("mensagens", []);

        mensagens.unshift({
            disciplina: disciplina,
            assunto: assunto,
            texto: texto
        });

        salvar("mensagens", mensagens);
        navegar("mensagens");

        notificar("Mensagem salva localmente.");
    }
});

/* =========================================
   INICIALIZAÇÃO
========================================= */

criarMenu();

if (carregar("tema", "claro") === "contraste") {
    document.body.classList.add("high-contrast");
}

if (carregar("sessao", false)) {
    abrirAplicacao();
}
