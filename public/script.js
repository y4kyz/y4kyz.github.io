// 🎶 Controle da música
const audio = document.getElementById('audio');
const btnAudio = document.getElementById('playPause');

let tocando = false;

btnAudio.addEventListener('click', () => {
    if (!tocando) {
        audio.play();
        btnAudio.innerText = '🔇 Pausar Música';
        tocando = true;
    } else {
        audio.pause();
        btnAudio.innerText = '🔊 Tocar Música';
        tocando = false;
    }
});

// ⏰ Contador de tempo juntos
const contador = document.getElementById('contador');

if (contador) {
    const dataInicio = new Date(2024, 11, 15); // mês começa em 0 (11 = dezembro)
    const hoje = new Date();
    const diff = hoje - dataInicio;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

    contador.innerText = `${dias} dias juntos 💜`;
}


function gerarResumo() {
    const data = document.getElementById("data").value;
    const agua = document.getElementById("agua").value;
    const aguaStatus = document.getElementById("aguaStatus").value;
    const exercicio = document.getElementById("exercicio").value;
    const exercicioStatus = document.getElementById("exercicioStatus").value;
    const resultado = document.getElementById("resultado").value;
  
    const cafe = {hora: cafeHora.value, status: cafeStatus.value, desc: cafeDescricao.value};
    const almoco = {hora: almocoHora.value, status: almocoStatus.value, desc: almocoDescricao.value};
    const jantar = {hora: jantarHora.value, status: jantarStatus.value, desc: jantarDescricao.value};
    const lanche = {hora: lancheHora.value, status: lancheStatus.value, desc: lancheDescricao.value};
  
    const deslizeStatus = document.getElementById("deslizeStatus").value;
    const deslizeTexto = document.getElementById("deslizeTexto").value;
  
    const humor = document.getElementById("humor").value;
    const comentario = document.getElementById("comentario").value;
    const objetivo = document.getElementById("objetivo").value;
  
    const resumo = `
  📆 DATA: ${data}
  Check-in diário de saúde e progresso! 💪🧠
  
  🧃 HIDRATAÇÃO
  💧 ${agua ? `Bebi ${agua} de água` : "Não tomei água hoje"}: ${aguaStatus}
  
  🏃‍♂️ EXERCÍCIOS (20–30min)
  ${exercicio || "Não fiz nenhum exercício hoje"} ${exercicioStatus}
  
  Resultado: ${resultado} ${exercicioStatus}
  
  🍽️ ALIMENTAÇÃO DO DIA
  Café da manhã (⏰${cafe.hora}) ${cafe.status} — (${cafe.desc})
  Almoço (⏰${almoco.hora}) ${almoco.status} — (${almoco.desc})
  Jantar (⏰${jantar.hora}) ${jantar.status} — (${jantar.desc})
  Lanche (⏰${lanche.hora}) ${lanche.status} — (${lanche.desc})
  
  🔎 FUGI DA DIETA?  
  (${deslizeStatus}) ${deslizeStatus === "✅" ? "Tive algum deslize" : "Não tive deslize"}
  
  ${deslizeTexto}
  
  🧠 HUMOR / EMOÇÕES
  Hoje me senti: ${humor}
  
  📣 COMENTÁRIO DO DIA:
  ${comentario}
  
  🎯 OBJETIVO DA SEMANA:
  ${objetivo}
  `;
  
    document.getElementById("resumo").innerText = resumo;
  }
  