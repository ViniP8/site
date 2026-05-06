function iniciarContador(elementoId, valorFinal, duracao, sufixo) {
  const elemento = document.getElementById(elementoId);
  if (!elemento) return; // Segurança caso o ID não exista

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

// --- Como chamar para cada caso ---

// Para os anos (28+)
iniciarContador('contador-anos', 28, 1000, '+');

// Para a área (2300m²)
iniciarContador('contador-area', 2300, 1500, 'm²');
