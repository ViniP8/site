function iniciarContador(elementoId, valorFinal, duracao, sufixo) {
  const elemento = document.getElementById(elementoId);
  if (!elemento) return;

  // Criamos o observador
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Se o elemento estiver visível na tela
      if (entry.isIntersecting) {
        executarAnimacao(elemento, valorFinal, duracao, sufixo);
        observer.unobserve(elemento); // Para de observar após rodar uma vez
      }
    });
  }, { threshold: 0.5 }); // 0.5 significa que dispara quando 50% do elemento aparecer

  observer.observe(elemento);
}

// Função auxiliar que contém a lógica do setInterval que você já criou
function executarAnimacao(elemento, valorFinal, duracao, sufixo) {
  let valorAtual = 0;
  const incremento = valorFinal / (duracao / 16);
  
  const timer = setInterval(() => {
    valorAtual += incremento;
    
    if (valorAtual >= valorFinal) {
      elemento.innerText = valorFinal.toLocaleString() + sufixo;
      clearInterval(timer);
    } else {
      elemento.innerText = Math.floor(valorAtual).toLocaleString() + sufixo;
    }
  }, 16);
}

// A chamada continua a mesma:
iniciarContador('contador-anos', 28, 1000, '+');
iniciarContador('contador-area', 2300, 1500, 'm²');
iniciarContador('contador-experiencia', 50, 1500, ' anos');
