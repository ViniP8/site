async function loadGallery() {
    const container = document.getElementById('marquee-dynamic');
    let index = 1;
    let errorsInARow = 0;
    const maxErrors = 2; 
    const foundImages = [];

    // Tenta carregar as imagens sequencialmente
    while (errorsInARow < maxErrors) {
        const imgName = `Galeria/A${index}`;
        const extensions = ['.jpeg'];
        let loaded = false;

        for (const ext of extensions) {
            const success = await new Promise((resolve) => {
                const img = new Image();
                img.src = `${imgName}${ext}`;
                img.onload = () => {
                    foundImages.push(`${imgName}${ext}`);
                    resolve(true);
                };
                img.onerror = () => resolve(false);
            });

            if (success) {
                loaded = true;
                break;
            }
        }

        if (loaded) {
            errorsInARow = 0;
        } else {
            errorsInARow++;
        }
        index++;
    }

    if (foundImages.length > 0) {
        // Renderiza a primeira vez
        renderItems(foundImages, container);
        // Duplica para o efeito infinito
        renderItems(foundImages, container);
        
        // Ajusta a velocidade baseada na quantidade de fotos (ex: 3s por foto)
        const duration = Math.max(foundImages.length * 3.5, 15); 
        container.style.animationDuration = `${duration}s`;
    }
}

function renderItems(images, container) {
    images.forEach(src => {
        const div = document.createElement('div');
        div.className = 'marquee-item';
        div.innerHTML = `<img src="${src}" class="marquee-img" alt="Atendimento" loading="lazy">`;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', loadGallery);
