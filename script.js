document.addEventListener('DOMContentLoaded', (event) => {

    // --- Elementos HTML para a Contagem Regressiva e Mensagem Final ---
    const countdownDisplay = document.getElementById('countdown'); // Onde a contagem regressiva é exibida
    const finalMessageDisplay = document.getElementById('finalMessage'); // Onde a mensagem final aparece
    const initialMessage = document.querySelector('.initial-message'); // A mensagem inicial abaixo do título

    // --- Controle da Música de Fundo (selecionado no início para ser acessível) ---
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('musicToggleBtn'); // Seleciona o botão da música

    // --- Configuração da Data Alvo para o Dia dos Namorados 2025 ---
    // Define a data alvo: 12 de Junho de 2025, às 00:00:00 (meia-noite)
    // Para TESTAR a transição, você pode mudar para uma data e hora alguns minutos no futuro:
    // Exemplo: new Date('June 7, 2025 15:15:00').getTime(); (se agora são 15:10)
    // Para o uso final, mantenha a data do Dia dos Namorados:
    const targetDate = new Date('June 12, 2025 00:00:00').getTime();

    // --- Função para Atualizar a Contagem Regressiva ---
    const updateCountdown = setInterval(function() {
        const now = new Date().getTime(); // Pega a data e hora atual
        const distance = targetDate - now; // Calcula a diferença em milissegundos

        // Calcula dias, horas, minutos e segundos restantes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance > 0) {
            // Se a data alvo ainda não chegou (contagem regressiva ativa):
            countdownDisplay.innerHTML = `⏳ Pare de ser ansioso e aguarde! ${days}d ${hours}h ${minutes}m ${seconds}s`;
            countdownDisplay.style.display = 'block'; // Garante que a contagem regressiva está visível
            finalMessageDisplay.style.display = 'none'; // Esconde a mensagem final
            initialMessage.style.display = 'none'; // Esconde a mensagem inicial por enquanto

            // Garante que o botão de música esteja escondido durante a contagem regressiva
            if (musicToggleButton) {
                musicToggleButton.style.display = 'none';
            }

        } else {
            // Se a data alvo chegou ou já passou (Dia dos Namorados!):
            clearInterval(updateCountdown); // Para de atualizar a contagem regressiva
            countdownDisplay.style.display = 'none'; // Esconde o contador
            finalMessageDisplay.innerHTML = `✨ Um Presente Especial para o Melhor Namorado do MUNDO ✨`; // Sua frase personalizada!
            finalMessageDisplay.style.display = 'block'; // Mostra a mensagem final
            initialMessage.style.display = 'block'; // Mostra a mensagem inicial abaixo do título

            // Mostra o botão de música SOMENTE quando o Dia D chega
            if (musicToggleButton) {
                musicToggleButton.style.display = 'block';
            }

            // Opcional: Ativar confetes (explosão) quando a data chega
            if (typeof confetti === 'function') { // Verifica se a função confetti existe
                confetti({
                    particleCount: 150, // Quantidade de partículas
                    spread: 120, // Espalhamento
                    origin: { y: 0.6 } // Origem das partículas (meio da tela, um pouco abaixo do topo)
                });
            }
        }
    }, 1000); // A função é executada a cada 1000 milissegundos (1 segundo)

    // --- Inicializa a biblioteca AOS (Animate On Scroll) ---
    AOS.init({
        duration: 1000, // Duração padrão da animação em milissegundos
        once: true // As animações só acontecem uma vez por elemento
    });

    // --- Efeito de Corações Saltitantes Contínuos ---
    function startContinuousHeartConfetti() {
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        (function frame() {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: 200,
                    origin: {
                        x: Math.random(),
                        y: Math.random() * 0.7 + 0.2
                    },
                    colors: ['#FFC0CB', '#FF69B4', '#E74C3C', '#FFFFFF'],
                    shapes: ['heart'],
                    gravity: randomInRange(0.4, 0.6),
                    scalar: randomInRange(0.8, 1.2),
                    drift: randomInRange(-0.1, 0.1)
                });
            }
            requestAnimationFrame(frame);
        }());
    }

    // Chama a função para iniciar os corações assim que a página carregar
    if (typeof confetti === 'function') {
        startContinuousHeartConfetti();
    }


    // --- Lógica do Carrossel de Fotos ---
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;

    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);

    // --- Lógica da Mensagem Oculta (Caixa de Mensagem Surpresa) ---
    const revealMessageBtn = document.getElementById('revealMessageBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');

    revealMessageBtn.addEventListener('click', () => {
        if (hiddenMessage.style.display === 'none' || hiddenMessage.style.display === '') {
            hiddenMessage.style.display = 'block';
            revealMessageBtn.textContent = 'Esconder Mensagem';
        } else {
            hiddenMessage.style.display = 'none';
            revealMessageBtn.textContent = 'Clique para descobrir minha mensagem!';
        }
    });

    // Garante que a mensagem oculta esteja escondida ao carregar a página
    hiddenMessage.style.display = 'none';

    // --- Lógica de reprodução da música (Este bloco foi movido para o final do DOMContentLoaded) ---
    // Garante que o event listener do botão de música só é adicionado depois que o DOM está pronto
    if (musicToggleButton && backgroundMusic) {
        musicToggleButton.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggleButton.textContent = 'Pausar Música';
            } else {
                backgroundMusic.pause();
                musicToggleButton.textContent = 'Reproduzir Música';
            }
        });
    }

}); // Fim do DOMContentLoaded