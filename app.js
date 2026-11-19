
// BRIGHTFUTURE - JAVASCRIPT SIMPLES
// Projeto acadêmico com dados fictícios.

// 1. DADOS DO ESTUDANTE

const aluno = {
    nome: "Bianca Cristina",
    matricula: "2026001",
    senha: "123456",
    curso: "Ensino Médio"
};

// 2. DISCIPLINAS E NOTAS

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

// 3. ATIVIDADES

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

// 4. COMUNICADOS

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

// 5. MENU

const menu = [
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

// 6. FUNÇÕES AUXILIARES

function elemento(id) {
    return document.getElementById(id);
}

function ler(nome) {
    return JSON.parse(localStorage.getItem("bf_" + nome) || "[]");
}

function guardar(nome, dados) {
    localStorage.setItem("bf_" + nome, JSON.stringify(dados));
}

function dataBR(data) {
    return new Date(data + "T12:00:00").toLocaleDateString("pt-BR");
}

function nota(valor) {
    return valor === null
        ? "Não lançada"
        : valor.toFixed(1).replace(".", ",");
}

function up(me, pc) {
    if (me === null || pc === null) {
        return null;
    }
    return me + pc;
}

function media(d) {
    const nota1 = up(d.me1, d.pc1);
    const nota2 = up(d.me2, d.pc2);

    if (nota1 === null || nota2 === null) {
        return null;
    }

    return (nota1 + nota2) / 2;
}

function frequencia(d) {
    return Math.round((d.aulas - d.faltas) / d.aulas * 100);
}

function icon(nome) {
    return `<i class="bi bi-${nome}"></i>`;
}

function cabecalho(titulo, descricao) {
    return `
        <h1 class="page-title">${titulo}</h1>
        <p class="page-subtitle">${descricao}</p>
    `;
}

function cartao(titulo, corpo) {
    return `
        <section class="bf-card">
            <h3>${titulo}</h3>
            ${corpo}
        </section>
    `;
}

function linha(titulo, descricao, extra = "") {
    return `
        <div class="list-row">
            <div>
                <strong>${titulo}</strong>
                <small>${descricao}</small>
            </div>
            ${extra}
        </div>
    `;
}

function aviso(texto) {
    elemento("toastRegion").textContent = texto;

    setTimeout(function () {
        elemento("toastRegion").textContent = "";
    }, 3000);
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c];
    });
}

// 7. LOGIN

elemento("loginForm").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const matricula = elemento("matricula").value.trim();
    const senha = elemento("senha").value;

    if (matricula !== aluno.matricula || senha !== aluno.senha) {
        elemento("loginError").textContent = "Matrícula ou senha incorreta.";
        return;
    }

    elemento("loginError").textContent = "";
    elemento("loginView").classList.add("d-none");
    elemento("appView").classList.remove("d-none");

    mostrar("dashboard");
});

// 8. SAIR

elemento("logoutBtn").addEventListener("click", function () {
    elemento("appView").classList.add("d-none");
    elemento("loginView").classList.remove("d-none");
    fecharMenu();
});

// 9. NAVEGAÇÃO

elemento("menu").innerHTML = menu.map(function (item) {
    return `
        <button class="nav-link" data-pagina="${item[0]}">
            ${icon(item[2])}
            <span>${item[1]}</span>
        </button>
    `;
}).join("");

function fecharMenu() {
    elemento("sidebar").classList.remove("open");
    elemento("mobileBackdrop").classList.add("d-none");
}

elemento("menuToggle").addEventListener("click", function () {
    elemento("sidebar").classList.toggle("open");
    elemento("mobileBackdrop").classList.toggle("d-none");
});

elemento("mobileBackdrop").addEventListener("click", fecharMenu);

elemento("menu").addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-pagina]");

    if (botao) {
        mostrar(botao.dataset.pagina);
    }
});

// 10. DASHBOARD

function dashboard() {
    const concluidas = ler("concluidas");
    const lidos = ler("lidos");

    const pendentes = atividades.filter(function (a) {
        return !concluidas.includes(a.id);
    });

    const totalFrequencia = Math.round(
        disciplinas.reduce(function (soma, d) {
            return soma + frequencia(d);
        }, 0) / disciplinas.length
    );

    const indicadores = [
        ["Disciplinas", disciplinas.length, "book"],
        ["Atividades pendentes", pendentes.length, "list-check"],
        ["Comunicados não lidos", comunicados.length - lidos.length, "megaphone"],
        ["Frequência média", totalFrequencia + "%", "graph-up"]
    ];

    return cabecalho("Olá, Bianca!", "Bem-vinda ao seu espaço acadêmico.") + `
        <div class="hero mb-4">
            <div>
                <small>ANO LETIVO 2026</small>
                <h2>Seu aprendizado em um só lugar</h2>
                <p>Confira suas entregas e acompanhe seu progresso.</p>
            </div>
            ${icon("mortarboard")}
        </div>

        <div class="row g-3 mb-4">
            ${indicadores.map(i => `
                <div class="col-sm-6 col-xl-3">
                    <div class="bf-card d-flex justify-content-between align-items-center">
                        <div>
                            <div class="metric-label">${i[0]}</div>
                            <div class="metric-value">${i[1]}</div>
                        </div>
                        <span class="metric-icon">${icon(i[2])}</span>
                    </div>
                </div>
            `).join("")}
        </div>

        <div class="row g-3">
            <div class="col-lg-7">
                ${cartao("Próximas atividades",
                    pendentes.map(a =>
                        linha(a.titulo, a.disciplina,
                            `<span class="badge-soft">${dataBR(a.prazo)}</span>`)
                    ).join("") || "Sem atividades pendentes."
                )}
            </div>

            <div class="col-lg-5">
                ${cartao("Últimos comunicados",
                    comunicados.map(c =>
                        linha(c.titulo, c.data)
                    ).join("")
                )}
            </div>
        </div>
    `;
}

// 11. DISCIPLINAS

function telaDisciplinas() {
    return cabecalho("Minhas disciplinas", "Consulte professores e horários.") + `
        <div class="row g-3">
            ${disciplinas.map(d => `
                <div class="col-md-6">
                    ${cartao(d.nome, `
                        <p>${d.professor}</p>
                        <p><b>Dia:</b> ${d.dia}</p>
                        <p><b>Horário:</b> ${d.horario}</p>
                        <p><b>Sala:</b> ${d.sala}</p>
                    `)}
                </div>
            `).join("")}
        </div>
    `;
}

// 12. GRADE SEMANAL

function telaGrade() {
    return cabecalho("Grade semanal", "Horários demonstrativos das aulas.") +
        cartao("Horários",
            disciplinas.map(d =>
                linha(
                    d.nome,
                    d.professor,
                    `<span class="badge-soft">${d.dia} · ${d.horario}</span>`
                )
            ).join("")
        );
}

// 13. NOTAS

function telaNotas() {
    return cabecalho(
        "Minhas notas",
        "ME vale até 2,0 e prova/projeto até 8,0."
    ) + cartao("Boletim demonstrativo", `
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
                            <td>${nota(d.me1)}</td>
                            <td>${nota(d.pc1)}</td>
                            <td>${nota(up(d.me1, d.pc1))}</td>
                            <td>${nota(d.me2)}</td>
                            <td>${nota(d.pc2)}</td>
                            <td>${nota(up(d.me2, d.pc2))}</td>
                            <td><b>${nota(media(d))}</b></td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
        <p class="small text-secondary mb-0">
            Notas ausentes aparecem como "Não lançada", não como zero.
        </p>
    `);
}

// 14. FREQUÊNCIA

function telaFrequencia() {
    return cabecalho(
        "Frequência",
        "Presenças e ausências demonstrativas."
    ) + cartao("Frequência por disciplina",
        disciplinas.map(d =>
            linha(
                d.nome,
                `${d.faltas} faltas em ${d.aulas} aulas`,
                `
                <div>
                    <span class="badge-soft">${frequencia(d)}%</span>
                    <button class="btn btn-sm btn-outline-primary"
                            data-revisar="${d.id}">
                        Revisar
                    </button>
                </div>
                `
            )
        ).join("")
    );
}

// 15. REVISÃO DE FALTAS

function telaRevisao() {
    const protocolos = ler("protocolos");

    return cabecalho(
        "Revisão de faltas",
        "A solicitação é apenas uma demonstração."
    ) + `
        <div class="row g-3">
            <div class="col-lg-5">
                ${cartao("Nova solicitação", `
                    <form id="formRevisao">
                        <label for="disciplinaRevisao" class="form-label">
                            Disciplina
                        </label>

                        <select id="disciplinaRevisao" class="form-select mb-3">
                            ${disciplinas.map(d => `
                                <option value="${d.id}">${d.nome}</option>
                            `).join("")}
                        </select>

                        <label for="justificativa" class="form-label">
                            Justificativa
                        </label>

                        <textarea id="justificativa"
                                  class="form-control mb-3"
                                  rows="4"
                                  maxlength="600"
                                  required></textarea>

                        <button class="btn btn-primary">
                            Criar protocolo
                        </button>
                    </form>
                `)}
            </div>

            <div class="col-lg-7">
                ${cartao("Meus protocolos",
                    protocolos.map(p =>
                        linha(
                            escapar(p.numero),
                            escapar(p.disciplina),
                            `<span class="badge-soft">Pendente</span>`
                        )
                    ).join("") || "Nenhum protocolo criado."
                )}
            </div>
        </div>

        <p class="small text-secondary mt-3">
            O protocolo é salvo somente neste navegador.
            Não modifica faltas reais.
        </p>
    `;
}

// 16. ATIVIDADES

function telaAtividades() {
    const concluidas = ler("concluidas");

    return cabecalho(
        "Atividades",
        "Organize suas tarefas demonstrativas."
    ) + cartao("Minhas atividades",
        atividades.map(a =>
            linha(
                a.titulo,
                `${a.disciplina} · até ${dataBR(a.prazo)}`,
                `
                <label class="form-check d-flex gap-2 align-items-center">
                    <input class="form-check-input"
                           type="checkbox"
                           data-tarefa="${a.id}"
                           ${concluidas.includes(a.id) ? "checked" : ""}>
                    <span class="small">Concluída</span>
                </label>
                `
            )
        ).join("")
    );
}

// 17. CALENDÁRIO

function telaCalendario() {
    return cabecalho(
        "Calendário",
        "Agenda demonstrativa de atividades."
    ) + cartao("Próximas datas",
        atividades.map(a =>
            linha(
                a.titulo,
                a.disciplina,
                `<span class="badge-soft">${dataBR(a.prazo)}</span>`
            )
        ).join("")
    );
}

// 18. COMUNICADOS

function telaComunicados() {
    const lidos = ler("lidos");

    return cabecalho(
        "Comunicados",
        "Avisos acadêmicos demonstrativos."
    ) + cartao("Quadro de avisos",
        comunicados.map(c =>
            linha(
                c.titulo,
                c.descricao,
                `
                <button class="btn btn-sm btn-outline-primary"
                        data-ler="${c.id}"
                        ${lidos.includes(c.id) ? "disabled" : ""}>
                    ${lidos.includes(c.id) ? "Lido" : "Marcar como lido"}
                </button>
                `
            )
        ).join("")
    );
}

// 19. MENSAGENS

function telaMensagens() {
    const mensagens = ler("mensagens");

    return cabecalho(
        "Mensagens",
        "Conversa demonstrativa, sem envio real."
    ) + `
        <div class="row g-3">
            <div class="col-lg-6">
                ${cartao("Nova mensagem", `
                    <form id="formMensagem">
                        <label for="mensagemDisciplina" class="form-label">
                            Disciplina
                        </label>

                        <select id="mensagemDisciplina" class="form-select mb-3">
                            ${disciplinas.map(d => `
                                <option>${d.nome}</option>
                            `).join("")}
                        </select>

                        <label for="mensagemAssunto" class="form-label">
                            Assunto
                        </label>

                        <input id="mensagemAssunto"
                               class="form-control mb-3"
                               maxlength="80"
                               required>

                        <label for="mensagemTexto" class="form-label">
                            Mensagem
                        </label>

                        <textarea id="mensagemTexto"
                                  class="form-control mb-3"
                                  rows="4"
                                  maxlength="800"
                                  required></textarea>

                        <button class="btn btn-primary">
                            Salvar mensagem
                        </button>
                    </form>
                `)}
            </div>

            <div class="col-lg-6">
                ${cartao("Mensagens salvas",
                    mensagens.map(m =>
                        linha(
                            escapar(m.assunto),
                            escapar(m.disciplina),
                            `<span class="badge-soft">Local</span>`
                        )
                    ).join("") || "Nenhuma mensagem salva."
                )}
            </div>
        </div>
    `;
}

// 20. MATERIAIS

function telaMateriais() {
    return cabecalho(
        "Materiais de estudo",
        "Materiais ilustrativos, sem arquivos anexados."
    ) + cartao("Materiais",
        atividades.map(a =>
            linha(
                a.material,
                a.disciplina,
                `<span class="badge-soft">Exemplo</span>`
            )
        ).join("")
    );
}

// 21. PERFIL

function telaPerfil() {
    return cabecalho(
        "Meu perfil",
        "Dados demonstrativos."
    ) + `
        <div class="row g-3">
            <div class="col-lg-6">
                ${cartao("Dados do estudante", `
                    <p><b>Nome:</b> ${aluno.nome}</p>
                    <p><b>Matrícula:</b> ${aluno.matricula}</p>
                    <p><b>Curso:</b> ${aluno.curso}</p>
                `)}
            </div>

            <div class="col-lg-6">
                ${cartao("Preferências", `
                    <label for="tema" class="form-label">
                        Aparência
                    </label>

                    <select id="tema" class="form-select">
                        <option value="claro">Padrão claro</option>
                        <option value="contraste"
                            ${localStorage.getItem("bf_tema") === "contraste" ? "selected" : ""}>
                            Alto contraste
                        </option>
                    </select>
                `)}
            </div>
        </div>
    `;
}

// 22. ASSOCIA CADA PÁGINA À SUA FUNÇÃO

const paginas = {
    dashboard: dashboard,
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

// 23. MOSTRA A PÁGINA ESCOLHIDA

function mostrar(pagina) {
    elemento("content").innerHTML = paginas[pagina]();

    elemento("breadcrumb").textContent =
        menu.find(item => item[0] === pagina)[1];

    document.querySelectorAll("[data-pagina]").forEach(function (botao) {
        botao.classList.toggle(
            "active",
            botao.dataset.pagina === pagina
        );
    });

    fecharMenu();
    window.scrollTo(0, 0);
}

// 24. BOTÕES DE REVISÃO E COMUNICADOS

elemento("content").addEventListener("click", function (evento) {
    const revisar = evento.target.closest("[data-revisar]");
    const lerComunicado = evento.target.closest("[data-ler]");

    if (revisar) {
        mostrar("revisao");

        elemento("disciplinaRevisao").value =
            revisar.dataset.revisar;
    }

    if (lerComunicado) {
        const lidos = ler("lidos");

        lidos.push(Number(lerComunicado.dataset.ler));

        guardar("lidos", [...new Set(lidos)]);
        mostrar("comunicados");
    }
});

// 25. ATIVIDADES E TEMA

elemento("content").addEventListener("change", function (evento) {

    if (evento.target.matches("[data-tarefa]")) {
        const id = Number(evento.target.dataset.tarefa);

        const concluidas = ler("concluidas").filter(function (item) {
            return item !== id;
        });

        if (evento.target.checked) {
            concluidas.push(id);
        }

        guardar("concluidas", concluidas);
        mostrar("atividades");
    }

    if (evento.target.id === "tema") {
        const contraste = evento.target.value === "contraste";

        document.body.classList.toggle(
            "high-contrast",
            contraste
        );

        localStorage.setItem("bf_tema", evento.target.value);
    }
});

// 26. FORMULÁRIOS

elemento("content").addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Solicitação de revisão de faltas
    if (evento.target.id === "formRevisao") {
        const id = elemento("disciplinaRevisao").value;
        const justificativa = elemento("justificativa").value.trim();

        if (!justificativa) {
            return;
        }

        const nome = disciplinas.find(function (d) {
            return d.id === id;
        }).nome;

        const protocolos = ler("protocolos");

        protocolos.unshift({
            numero: "BF-" + Date.now(),
            disciplina: nome,
            justificativa: justificativa
        });

        guardar("protocolos", protocolos);
        mostrar("revisao");

        aviso("Protocolo demonstrativo registrado.");
    }

    // Mensagem demonstrativa
    if (evento.target.id === "formMensagem") {
        const assunto = elemento("mensagemAssunto").value.trim();
        const texto = elemento("mensagemTexto").value.trim();

        if (!assunto || !texto) {
            return;
        }

        const mensagens = ler("mensagens");

        mensagens.unshift({
            disciplina: elemento("mensagemDisciplina").value,
            assunto: assunto,
            texto: texto
        });

        guardar("mensagens", mensagens);
        mostrar("mensagens");

        aviso("Mensagem salva neste navegador.");
    }
});

// 27. APLICA A PREFERÊNCIA SALVA

document.body.classList.toggle(
    "high-contrast",
    localStorage.getItem("bf_tema") === "contraste"
);
