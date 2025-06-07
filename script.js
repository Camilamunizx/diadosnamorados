document.addEventListener('DOMContentLoaded', (event) => {
    AOS.init(); // Inicializa o AOS para as animações

    // Elementos HTML
    const countdownElement = document.getElementById('countdown');
    const finalMessageElement = document.getElementById('finalMessage');
    const countdownContainer = document.getElementById('countdown-container');
    const mainContent = document.querySelector('main'); // Seleciona a seção principal
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const backgroundMusic = document.getElementById('background-music');
    const revealMessageBtn = document.getElementById('revealMessageBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');

    // Data alvo: 12 de Junho de 2025 (Mês é base 0, então Junho é 5)
    const targetDate = new Date('2025-06-12T00:00:00'); // Meia-noite do dia 12

    // --- Lógica para Contagem Regressiva e Exibição de Conteúdo ---
    function updateCountdown() {
        const now = new Date();
        const distance = targetDate - now;

        if (distance < 0) {
            // Se a data alvo já passou
            countdownContainer.style.display = 'none'; // Esconde o container do countdown
            finalMessageElement.style.display = 'block'; // Mostra a mensagem final do countdown
            finalMessageElement.textContent = "FELIZ DIA DOS NAMORADOS, MEU AMOR! SURPRESA!"; // Mensagem que aparece no dia
            mainContent.style.display = 'block'; // Mostra todo o conteúdo principal (fotos, etc.)
            confetti({ // Joga confetes quando a data chega!
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            // Opcional: Inicia a música automaticamente quando o dia chega
            if (backgroundMusic) {
                backgroundMusic.play().catch(e => console.log("Erro ao tentar tocar música automaticamente:", e));
                musicToggleBtn.textContent = 'Pausar Música';
                musicToggleBtn.style.display = 'block';
            }
            return; // Termina a função aqui para não continuar o countdown
        }

        // Se ainda não chegou o dia
        mainContent.style.display = 'none'; // Garante que o conteúdo principal esteja escondido
        countdownContainer.style.display = 'block'; // Mostra o container do countdown

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `Faltam ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Chama a função de contagem regressiva a cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);
    // Chama a função uma vez para garantir o estado inicial correto
    updateCountdown();

    // --- Lógica do Carrossel (mantida do seu código original) ---
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

    if (prevBtn && nextBtn) { // Garante que os botões existem
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide === 0) ? carouselSlides.length - 1 : currentSlide - 1;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide === carouselSlides.length - 1) ? 0 : currentSlide + 1;
            showSlide(currentSlide);
        });
    }
    showSlide(currentSlide); // Mostra o slide inicial

    // --- Lógica do Botão de Música (mantida do seu código original) ---
    if (musicToggleBtn && backgroundMusic) { // Garante que os elementos existem
        musicToggleBtn.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggleBtn.textContent = 'Pausar Música';
            } else {
                backgroundMusic.pause();
                musicToggleBtn.textContent = 'Reproduzir Música';
            }
        });
    }

    // --- Lógica do Botão de Mensagem Oculta (mantida do seu código original) ---
    if (revealMessageBtn && hiddenMessage) { // Garante que os elementos existem
        revealMessageBtn.addEventListener('click', () => {
            if (hiddenMessage.style.display === 'none' || hiddenMessage.style.display === '') {
                hiddenMessage.style.display = 'block';
                revealMessageBtn.textContent = 'Esconder Mensagem';
            } else {
                hiddenMessage.style.display = 'none';
                revealMessageBtn.textContent = 'Clique para descobrir minha mensagem!';
            }
        });
        hiddenMessage.style.display = 'none'; // Garante que esteja escondida ao carregar
    }
});