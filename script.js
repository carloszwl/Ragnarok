// ==========================================================================
// SELEÇÃO DE COMPONENTES E TELAS DO SISTEMA
// ==========================================================================
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
    [btnHumanos, btnValquirias, btnDeuses].forEach(btn => {
        if(btn) btn.classList.remove("ativo");
    });
    [blocoHumanos, blocoValquirias, blocoDeuses].forEach(bloco => {
        if(bloco) bloco.classList.add("oculto");
    });

    if(abaAtiva) abaAtiva.classList.add("ativo");
    if(blocoVisivel) blocoVisivel.classList.remove("oculto");
}

if (btnHumanos) btnHumanos.addEventListener("click", () => aplicarFiltro(btnHumanos, blocoHumanos));
if (btnValquirias) btnValquirias.addEventListener("click", () => aplicarFiltro(btnValquirias, blocoValquirias));
if (btnDeuses) btnDeuses.addEventListener("click", () => aplicarFiltro(btnDeuses, blocoDeuses));

// ==========================================================================
// SISTEMA DO MODAL DE HISTÓRIA DOS GUERREIROS
// ==========================================================================

// 1. "Banco de dados" com as histórias/curiosidades de cada personagem
const historiasGuerreiros = {
    "Adão": "O Pai da Humanidade e o arquivo vivo do primeiro homem criado. Possui um amor incondicional por seus filhos (toda a humanidade), o que o levou a lutar contra Zeus até o seu último suspiro, morrendo de pé mesmo após perder a visão. Sua habilidade 'Olhos do Senhor' permitia copiar qualquer golpe divino.",
    "Lu Bu": "Conhecido como o General Voador, foi o guerreiro mais forte da história da China. No Ragnarok, enfrentou o Deus do Trovão, Thor, em um choque de força bruta incomparável. Seu Volundr com a valquíria Randgriz deu vida à alabarda Sky Piercer, capaz de quebrar defesas divinas.",
    "Kojiro Sasaki": "Famoso como o 'Maior Perdedor da História', pois nunca venceu uma batalha importante em vida, mas continuava evoluindo através de simulações mentais mesmo após a morte. Foi o primeiro humano a derrotar um deus no torneio (Poseidon), usando o estilo de duas espadas.",
    "Jack, o Estripador": "O assassino mais infame da Era Vitoriana, representando a pura malícia da humanidade. Ele usou o cenário de Londres e suas luvas de Volundr (que transformam qualquer objeto tocado em arma divina) para criar uma teia de mentiras e táticas furtivas que derrotaram Hércules.",
    "Raiden Tameemon": "O lutador de sumô incomparável com a musculatura mais poderosa da história. Passou a vida selando sua própria força para não destruir o próprio corpo. Com o Volundr da valquíria Thrud, ele pôde finalmente lutar com 100% do seu poder destrutivo contra Shiva.",
    "Buddha": "O Iluminado que alcançou a sabedoria suprema. Embora devesse lutar pelos Deuses, sua forte filosofia de individualismo e liberdade fez com que ele traísse o reino divino para lutar ao lado da humanidade na 6ª rodada, usando seu poder de ver o futuro da alma.",
    "Qin Shi Huang": "O Primeiro Imperador que unificou a China. Um líder imponente que enxerga o fluxo de energia (Ki) das pessoas e sente a dor física dos outros devido a uma condição rara. Ele enfrentou Hades em uma batalha real de monarcas, quebrando a lança do submundo.",
    "Nikola Tesla": "O único guerreiro que não utiliza força física ou artes marciais, mas sim a ciência pura. Vestindo o Super Traje Automaton β alimentado pela valquíria Gôndul, Tesla transformou a Arena de Valhalla em um laboratório de alta velocidade, gravidade zero e teletransporte.",
    "Leônidas": "O lendário Rei de Esparta que liderou os 300 guerreiros nas Termópilas. Movido por um orgulho imenso e um rancor histórico contra Apollo, ele entrou na arena fumando seu charuto e portando um escudo metamórfico que mudava de forma para desferir ataques brutais.",
    "Okita Souji": "O capitão prodígio da primeira divisão do Shinsengumi. Um espadachim genial com um desejo ardente de lutar até o fim. No torneio, levou seu coração ao limite absoluto para alcançar velocidades que superaram até as técnicas do Deus da Tormenta, Susanoo.",
    "Simo Häyhä": "O maior franco-atirador militar do mundo, apelidado de 'A Morte Branca'. Conhecido por lutar sob temperaturas congelantes usando apenas a mira de ferro de seu rifle. No torneio, usou sua camuflagem perfeita e audição cirúrgica para caçar Loki na neve.",
    "Sakata Kintoki": "Uma lenda folclórica japonesa dotada de força monstruosa e um coração puro. No mangá, em vez de focar apenas na sua luta, ele é enviado por Buddha para investigar os mistérios e segredos ocultos nos bastidores das profundezas do submundo (Helheim).",
    
    // Deuses
    "Thor": "O Deus do Trovão e o guerreiro mais forte do panteão nórdico. Carrega o massivo martelo Mjolnir e as manoplas Járngreipr. Ele encontrou em Lu Bu o primeiro rival digno de sobreviver aos seus ataques e despertar o poder vivo de sua arma.",
    "Zeus": "O Rei do Cosmos e o presidente do Conselho dos Deuses. Um idoso excêntrico que esconde um poder físico colossal. Ele lutou contra Adão usando apenas seus punhos nus, desferindo socos que superam o tempo e ativando a forma de desgaste 'Adamas'.",
    "Poseidon": "O Tirano dos Mares e o deus mais temido da mitologia grega por sua frieza absoluta. Considera os humanos (e até outros deuses) como seres inferiores que não merecem sequer seu olhar. Desferiu ataques em alta velocidade com seu tridente até ser fatiado por Kojiro.",
    "Hércules": "O Deus da Fortitude, que nasceu humano e ascendeu à divindade após beber o sangue de Zeus. Apesar de lutar do lado dos deuses devido ao seu dever, ele amava profundamente a humanidade e prometeu salvá-los caso vencesse o terrível Jack, o Estripador.",
    "Shiva": "O Deus Supremo da Destruição na mitologia hindu e líder de bilhões de divindades. Possui quatro braços e uma energia contagiante. Ativou sua Dança Oculta Incendiária (Tandava Karma) para acelerar seus batimentos e queimar seus próprios limites contra Raiden.",
    "Zerofuku": "O Deus da Fortuna que absorveu todo o infortúnio e tristeza dos humanos para tentar fazê-los felizes, mas acabou corrompido pela inveja e pelo rancor ao ver que a humanidade encontrou a paz através dos ensinamentos de Buddha.",
    "Hajun": "O Rei Demônio do Sexto Céu, uma criatura lendária de pura maldade que renasceu destruindo o corpo do jovem Zerofuku. Ele possui uma modificação corporal absurda, transformando seus próprios braços em brocas e espadas brutas que bloquearam a visão de Buddha.",
    "Hades": "O respeitado Rei do Submundo e irmão mais velho de Zeus e Poseidon. Ele entrou no Ragnarok na 7ª rodada não por ódio aos humanos, mas por puro amor fraternal, buscando vingar a morte de Poseidon usando seu bidente fundido e seu próprio sangue real.",
    "Beelzebub": "O sombrio Senhor das Moscas, um deus amaldiçoado que carrega uma terrível escuridão interna e o desejo de ser destruído. Cientista do Helheim, ele manipula ondas de alta frequência vibratória usando o Cajado de Apomyius para criar ataques e defesas perfeitas.",
    "Apollo": "O Deus do Sol, que preza pela beleza, autoaperfeiçoamento e expectativas dos outros. Ele provou a Leônidas que seu brilho não era apenas arrogância, mas sim o resultado de um esforço constante, usando seus fios de luz e o letal Arco de Artemis.",
    "Susanoo-no-Mikoto": "O Deus da Tormenta e o criador da esgrima no Japão. Ele passou milênios observando e aprendendo todos os estilos de espada criados pelos humanos da Terra. Construiu a arena baseada em Kyoto para realizar o duelo dos seus sonhos contra Okita.",
    "Loki": "O Deus da Trapaça nórdico, sempre flutuando ao redor com um sorriso sarcástico e analisando o torneio com malícia. Capaz de criar portais espaciais, correntes mágicas e ilusões perfeitas para enganar a percepção dos seus oponentes.",
    "Odin": "O Pai de Todos do panteão nórdico, uma figura extremamente silenciosa, sombria e opressora que carrega dois corvos em seus ombros. Ele emana uma aura constante de morte e decomposição biológica, escondendo planos antigos para o universo."
};

// 2. Mapeamento dos elementos do HTML
const modal = document.getElementById("modalHistoria");
const modalNome = document.getElementById("modalNome");
const modalTexto = document.getElementById("modalTexto");
const btnFecharModal = document.getElementById("fecharModal");
// ALTERE PARA ISSO: pega apenas os cards que estão dentro do bloco dos humanos
const cardsGuerreiros = document.querySelectorAll("#bloco-humanos .card-galeria");

// 3. Função para abrir o modal com o conteúdo correto
cardsGuerreiros.forEach(card => {
    card.addEventListener("click", () => {
        // Pega o nome do guerreiro direto do <h3> de dentro do card clicado
        const nomeGuerreiro = card.querySelector("h3").innerText.trim();
        
        // Busca o texto correspondente no nosso banco de dados
        const historia = historiasGuerreiros[nomeGuerreiro] || "A história deste grande guerreiro está sendo psicografada pelos deuses...";
        
        // Altera o conteúdo do modal
        modalNome.innerText = nomeGuerreiro;
        modalTexto.innerText = historia;
        
        // Remove a classe 'oculto' para fazer o modal aparecer na tela
        modal.classList.remove("oculto");
    });
});

// 4. Função para fechar o modal ao clicar no 'X'
btnFecharModal.addEventListener("click", () => {
    modal.classList.add("oculto");
});

// 5. Fechar o modal se o usuário clicar em qualquer lugar fora da caixinha preta
window.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        modal.classList.add("oculto");
    }
});

// ==========================================================================
// CONTROLE DO MENU LATERAL (SIDEBAR)
// ==========================================================================
const btnMenu = document.querySelector(".menu-btn");
const sidebar = document.getElementById("sidebar");
const btnFecharSidebar = document.getElementById("btnFecharSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

if (btnMenu && sidebar && sidebarOverlay) {
    btnMenu.addEventListener("click", () => {
        sidebar.classList.add("aberto");
        sidebarOverlay.classList.add("visivel");
    });

    const fecharMenuLateral = () => {
        sidebar.classList.remove("aberto");
        sidebarOverlay.classList.remove("visivel");
    };

    if (btnFecharSidebar) btnFecharSidebar.addEventListener("click", fecharMenuLateral);
    sidebarOverlay.addEventListener("click", fecharMenuLateral);
}

// ==========================================================================
// ROLAGEM SUAVE AO CLICAR NOS FILTROS
// ==========================================================================
const botoesFiltroNav = document.querySelectorAll(".btn-nav");
const alvoScroll = document.getElementById("menuNavegacao");

if (alvoScroll) {
    botoesFiltroNav.forEach(btn => {
        btn.addEventListener("click", () => {
            alvoScroll.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
        });
    });
}
// ==========================================================================
// CONTADOR REGRESSIVO DO PRÓXIMO CAPÍTULO
// ==========================================================================

// Definimos a data e hora certinha do lançamento (Ano-Mês-Dia Hora:Minuto:Segundo)
// Formato padrão: "Mês Dia, Ano Hora:Minuto:Segundo"
const dataLancamento = new Date("Jun 25, 2026 00:00:00").getTime();

// Criamos o intervalo que roda a cada 1 segundo (1000 milissegundos)
const atualizarContador = setInterval(function() {

    // Pega a data e hora exata do momento atual
    const agora = new Date().getTime();
    
    // Calcula a distância/diferença entre o lançamento e o momento atual
    const diferenca = dataLancamento - agora;
    
    // Cálculos matemáticos para converter milissegundos em Dias, Horas, Minutos e Segundos
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    
    // Coloca os valores calculados dentro das tags do HTML
    // O ".padStart(2, '0')" serve para deixar bonito: se for 9 segundos, vira "09"
    document.getElementById("dias").innerText = String(dias).padStart(2, '0');
    document.getElementById("horas").innerText = String(horas).padStart(2, '0');
    document.getElementById("minutos").innerText = String(minutos).padStart(2, '0');
    document.getElementById("segundos").innerText = String(segundos).padStart(2, '0');
    
    // Se o tempo acabar, o contador para e mostra uma mensagem épica
    if (diferenca < 0) {
        clearInterval(atualizarContador);
        document.querySelector(".painel-contador").innerHTML = "⚡ O CAPÍTULO FOI LANÇADO! OS DEUSES ESTÃO TRÊMULOS! ⚡";
    }

}, 1000);