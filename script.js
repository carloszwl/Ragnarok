// ==========================================================================
// SELEÇÃO DE COMPONENTES E TELAS DO SISTEMA
// ==========================================================================
// Elementos que você removeu do HTML (agora protegidos para não dar erro)
const confirmar = document.getElementById("confirmar");
const btBatalhar = document.getElementById("btBatalhar");
const btReiniciar = document.getElementById("btReiniciar");
const formulario = document.getElementById("formulario");
const loading = document.getElementById("loading");
const resultado = document.getElementById("resultado");
const telaCombate = document.getElementById("telaCombate");

// ==========================================================================
// SISTEMA DE NAVEGAÇÃO / FILTROS (Humanos, Valquírias, Deuses)
// ==========================================================================
const btnHumanos = document.getElementById("btnNavHumanos");
const btnValquirias = document.getElementById("btnNavValquirias");
const btnDeuses = document.getElementById("btnNavDeuses");

const blocoHumanos = document.getElementById("bloco-humanos");
const blocoValquirias = document.getElementById("bloco-valquirias");
const blocoDeuses = document.getElementById("bloco-deuses");

function aplicarFiltro(abaAtiva, blocoVisivel) {
    // Remove o estado ativo de todos os botões
    [btnHumanos, btnValquirias, btnDeuses].forEach(btn => {
        if(btn) btn.classList.remove("ativo");
    });
    // Oculta todos os blocos de guerreiros
    [blocoHumanos, blocoValquirias, blocoDeuses].forEach(bloco => {
        if(bloco) bloco.classList.add("oculto");
    });

    // Ativa apenas o selecionado
    if(abaAtiva) abaAtiva.classList.add("ativo");
    if(blocoVisivel) blocoVisivel.classList.remove("oculto");
}

if (btnHumanos) btnHumanos.addEventListener("click", () => aplicarFiltro(btnHumanos, blocoHumanos));
if (btnValquirias) btnValquirias.addEventListener("click", () => aplicarFiltro(btnValquirias, blocoValquirias));
if (btnDeuses) btnDeuses.addEventListener("click", () => aplicarFiltro(btnDeuses, blocoDeuses));


// ==========================================================================
// BLOCO DE SEGURANÇA: Só roda o torneio se o formulário existir no HTML
// ==========================================================================
if (confirmar) {
    // Mantém sua lógica antiga salva aqui dentro por segurança
    confirmar.addEventListener("click", () => {
        const nomeGuerreiro = document.getElementById("nome")?.value;
        if (!nomeGuerreiro) return;
        if (formulario) formulario.classList.add("oculto");
        if (loading) loading.classList.remove("oculto");
        setTimeout(() => {
            if (loading) loading.classList.add("oculto");
            if (resultado) resultado.classList.remove("oculto");
        }, 3000);
    });

    if (btBatalhar) {
        btBatalhar.addEventListener("click", () => {
            if (resultado) resultado.classList.add("oculto");
            if (telaCombate) telaCombate.classList.remove("oculto");
        });
    }

    if (btReiniciar) {
        btReiniciar.addEventListener("click", () => {
            window.location.reload();
        });
    }
}


// ==========================================================================
// LÓGICA DO MODAL (ABRIR HISTÓRIA DOS GUERREIROS)
// ==========================================================================
const modal = document.getElementById("modalHistoria");
const modalNome = document.getElementById("modalNome");
const modalTexto = document.getElementById("modalTexto");
const botaoFechar = document.getElementById("fecharModal");
const cards = document.querySelectorAll(".card-galeria");

if (modal && modalNome && modalTexto) {
    cards.forEach(card => {
        card.style.cursor = "pointer";
        
        card.addEventListener("click", () => {
            const nome = card.querySelector("h3") ? card.querySelector("h3").innerText : "Guerreiro";
            const subtitulo = card.querySelector(".subtitulo-deus") ? card.querySelector(".subtitulo-deus").innerHTML : "";
            const descricao = card.querySelector(".desc-deus") ? card.querySelector(".desc-deus").innerHTML : "";

            // Customização dinâmica das bordas do modal baseado no tipo de card
            const modalContent = document.querySelector(".modal-content");
            if (modalContent) {
                modalContent.classList.remove("borda-deus", "borda-humano", "borda-valquiria");
                if (card.classList.contains("deus")) modalContent.classList.add("borda-deus");
                if (card.classList.contains("humano")) modalContent.classList.add("borda-humano");
                if (card.classList.contains("valquiria")) modalContent.classList.add("borda-valquiria");
            }

            modalNome.innerText = nome;
            modalTexto.innerHTML = `
                <p style="color: #e50914; font-weight: bold; margin-bottom: 15px; font-size: 1.1em; text-transform: uppercase; letter-spacing: 1px;">
                    ${subtitulo}
                </p>
                <div style="line-height: 1.6; color: #eee; font-size: 15px; text-align: left;">
                    ${descricao}
                </div>
            `;

            modal.style.display = "flex";
        });
    });

    const fecharOModal = () => { modal.style.display = "none"; };

    if (botaoFechar) botaoFechar.addEventListener("click", fecharOModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) fecharOModal(); });
}

// ==========================================================================
// CONTROLE DO MENU LATERAL (SIDEBAR)
// ==========================================================================
const btnMenu = document.querySelector(".menu-btn");
const sidebar = document.getElementById("sidebar");
const btnFecharSidebar = document.getElementById("btnFecharSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

if (btnMenu && sidebar && sidebarOverlay) {
    // Abrir o menu
    btnMenu.addEventListener("click", () => {
        sidebar.classList.add("aberto");
        sidebarOverlay.classList.add("visivel");
    });

    // Função para fechar o menu
    const fecharMenuLateral = () => {
        sidebar.classList.remove("aberto");
        sidebarOverlay.classList.remove("visivel");
    };

    // Fechar no botão X
    if (btnFecharSidebar) btnFecharSidebar.addEventListener("click", fecharMenuLateral);
    
    // Fechar ao clicar na parte escura de fora
    sidebarOverlay.addEventListener("click", fecharMenuLateral);
}

// ==========================================================================
// INTERRUPTOR DE MODOS (DEUS vs HUMANO) - CORREÇÃO DE ALVO DO SCROLL
// ==========================================================================
const btnModoHumano = document.getElementById("btnModoHumano");
const btnModoDeus = document.getElementById("btnModoDeus");
const btnModoReset = document.getElementById("btnModoReset");
const bodyElement = document.body;
const todosBotoesModo = document.querySelectorAll(".btn-modo");

// MUDANÇA REAL AQUI: Mirando na div de navegação dos filtros para empurrar a tela pra baixo
const alvoScroll = document.querySelector(".menu-navegacao");

function limparClassesDeModo() {
    bodyElement.classList.remove("body-humanos", "body-deuses", "body-neutro");
    todosBotoesModo.forEach(btn => btn.classList.remove("ativo"));
}

function rolarParaOsGuerreiros() {
    if (alvoScroll) {
        alvoScroll.scrollIntoView({ 
            behavior: "smooth", // Deslize suave de transição
            block: "start"      // Cola o topo dos filtros no topo da tela
        });
    }
}

if (btnModoHumano && btnModoDeus && btnModoReset) {
    // Ativar Modo Humano e descer a tela
    btnModoHumano.addEventListener("click", () => {
        limparClassesDeModo();
        bodyElement.classList.add("body-humanos");
        btnModoHumano.classList.add("ativo");
        rolarParaOsGuerreiros(); 
    });

    // Ativar Modo Deus e descer a tela
    btnModoDeus.addEventListener("click", () => {
        limparClassesDeModo();
        bodyElement.classList.add("body-deuses");
        btnModoDeus.classList.add("ativo");
        rolarParaOsGuerreiros(); 
    });

    // Resetar para a Arena Neutra
    btnModoReset.addEventListener("click", () => {
        limparClassesDeModo();
        bodyElement.classList.add("body-neutro");
        btnModoReset.classList.add("ativo");
        rolarParaOsGuerreiros(); 
    });
}