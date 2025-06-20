import { initializeApp } from "firebase/app"; // Para inicializar o app principal
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Para Autenticação
import { getDatabase, ref, push, set, onValue } from "firebase/database"; // Para Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyBUWKkJYwQgQDgld2AHynBKgEP6LYRb1Kg",
  authDomain: "nosso-cantinho-luziaguilherme.firebaseapp.com",
  databaseURL: "https://nosso-cantinho-luziaguilherme-default-rtdb.firebaseio.com",
  projectId: "nosso-cantinho-luziaguilherme",
  storageBucket: "nosso-cantinho-luziaguilherme.firebasestorage.app", // Corrigido para firebasestorage.app
  messagingSenderId: "817995076575",
  appId: "1:817995076575:web:5942e6da9cf9e1d5c0aa6a",
  // measurementId: "G-MMJR9E838Q" // Opcional se não estiver usando Analytics nesse script
};

// 3. Inicializar o Firebase e obter referências para os serviços
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Referência para o Authentication usando o app inicializado
const database = getDatabase(app); // Referência para o Realtime Database usando o app inicializado

// 🎶 Controle da música (SEU CÓDIGO ORIGINAL) - Pode manter aqui
const audio = document.getElementById('audio');
const btnAudio = document.getElementById('playPause');

let tocando = false;

if (btnAudio) { // Adicionado verificação para garantir que o elemento existe
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
}


// ⏰ Contador de tempo juntos (SEU CÓDIGO ORIGINAL) - Pode manter aqui
const contador = document.getElementById('contador');

if (contador) { // Adicionado verificação
    const dataInicio = new Date(2024, 11, 15); // mês começa em 0 (11 = dezembro)
    const hoje = new Date();
    const diff = hoje.getTime() - dataInicio.getTime(); // Use getTime() para diferença em ms

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

    contador.innerText = `${dias} dias juntos 💜`;
}

// Funções para o "resumo" - Pode manter aqui, mas a parte de SALVAR no DB virá depois
function gerarResumo() {
    // ... (seu código de coletar dados dos inputs) ...
    const resumo = `...`; // Seu resumo gerado

    document.getElementById("resumo").innerText = resumo;
    // --- PRÓXIMO PASSO: CHAMAR A FUNÇÃO DE SALVAR NO DB AQUI! ---
}
// --- ADICIONAR EVENT LISTENER PARA CHAMAR gerarResumo() QUANDO PREENCHER O FORM ---


// 4. Funções de Autenticação usando o SDK Modular
function cadastrarUsuario(email, password) {
    createUserWithEmailAndPassword(auth, email, password) // Usando a referência 'auth' e a função modular
      .then((userCredential) => {
        // Usuário cadastrado e logado com sucesso!
        const user = userCredential.user;
        console.log("Usuário cadastrado e logado:", user);
        // Redirecionar ou mostrar sucesso
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erro no cadastro:", errorCode, errorMessage);
        // Mostrar erro na interface
      });
  }

  function fazerLogin(email, password) {
    signInWithEmailAndPassword(auth, email, password) // Usando a referência 'auth' e a função modular
      .then((userCredential) => {
        // Usuário logado com sucesso!
        const user = userCredential.user;
        console.log("Usuário logado:", user);
        // O onAuthStateChanged vai detectar isso e atualizar a UI
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erro no login:", errorCode, errorMessage);
        // Mostrar erro na interface
      });
  }

function fazerLogout() {
  signOut(auth).then(() => { // Usando a referência 'auth' e a função modular
    // Logout bem sucedido!
    console.log("Usuário fez logout.");
    // O onAuthStateChanged vai detectar isso e atualizar a UI
  }).catch((error) => {
    console.error("Erro no logout:", error);
  });
}


// 5. Listener de estado de autenticação (SEU CÓDIGO ORIGINAL, adaptado para modular)
// Referências aos botões e conteúdo (garanta que existem no HTML)
// const signInBtn = document.getElementById('signInBtn');  comentei essa prr pq nn to usando//
const signOutBtn = document.getElementById('signOutBtn'); // Já existia
const contentDiv = document.getElementById('content'); // Já existia
const loginDiv = document.getElementById('login-area'); // A div que criamos no HTML

// Adicionar referências para os novos elementos de login no HTML
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');
// const registerButton = document.getElementById('registerButton'); // Se você adicionar um botão de cadastro


// --- ADICIONANDO EVENT LISTENERS ---

// Listener para o botão de LOGIN
if (loginButton && emailInput && passwordInput) { // Verifica se os elementos existem no HTML
  loginButton.addEventListener('click', () => {
    const email = emailInput.value; // Pega o valor do campo de email
    const password = passwordInput.value; // Pega o valor do campo de senha
    fazerLogin(email, password); // Chama a função de login com os valores digitados
  });
}

// Listener para o botão de LOGOUT (você já tinha essa referência, só garante o listener)
if (signOutBtn) { // Verifica se o botão existe
  signOutBtn.addEventListener('click', () => {
    fazerLogout(); // Chama a função de logout
  });
}

// Opcional: Listener para um botão de CADASTRO, se adicionar um no HTML
// if (registerButton && emailInput && passwordInput) {
//   registerButton.addEventListener('click', () => {
//     const email = emailInput.value;
//     const password = passwordInput.value;
//     cadastrarUsuario(email, password); // Chama a função de cadastro
//   });
// }


// Listener de estado de autenticação: mostra/esconde elementos baseado no login (SEU CÓDIGO ORIGINAL)
onAuthStateChanged(auth, (user) => { // Usando a referência 'auth' e a função modular
  if (user) {
    // Usuário logado
    console.log("Estado de autenticação mudou: Usuário logado", user.email, user.uid);

    // Esconde a área de login e mostra o botão de sair
    if (loginDiv) loginDiv.style.display = 'none';
    if (signOutBtn) signOutBtn.style.display = 'block';

    // --- VERIFICAÇÃO EXTRA PARA "APENAS NÓS" ---
    const allowedUIDs = ['0huu4SggJOOif5AfSYXMEV2PCc83', 'UID_DA_NAMORADA']; // **Substitua por seus UIDs reais!**

    if (allowedUIDs.includes(user.uid)) {
      console.log("Usuário AUTORIZADO!");
      // Mostra o conteúdo principal do cantinho
      if (contentDiv) contentDiv.style.display = 'block';

      // *** IMPORTANTE ***
      // Chame aqui as funções para carregar dados do Realtime Database
      // e configurar os listeners (por exemplo, mostrar mensagens, etc.),
      // pois AGORA o usuário está logado E autorizado.
      // Ex: carregarMensagens(); carregarResumosDiarios(user.uid); // Passe o UID se precisar filtrar por usuário
    } else {
      console.log("Usuário NÃO AUTORIZADO. Saindo...");
      // Esconde o conteúdo e força o logout
      if (contentDiv) contentDiv.style.display = 'none';
      signOut(auth); // Desloga o usuário não autorizado
    }
  } else {
    // Usuário deslogado
    console.log("Estado de autenticação mudou: Usuário deslogado");

    // Mostra a área de login e esconde o botão de sair e o conteúdo
    if (loginDiv) loginDiv.style.display = 'block';
    if (signOutBtn) signOutBtn.style.display = 'none';
    if (contentDiv) contentDiv.style.display = 'none';

    // Pare de ouvir dados do Realtime Database aqui, se estiver ouvindo
    // Ex: pararDeOuvirMensagens(); pararDeOuvirResumosDiarios();
  }
});

