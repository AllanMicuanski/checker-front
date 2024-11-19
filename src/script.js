document.getElementById("verifyButton").onclick = async () => {
  const url = document.getElementById("urlInput").value;
  const messageEl = document.getElementById("message");
  const permalinkEl = document.getElementById("permalink");
  const scriptStatusEl = document.querySelector("#results ul li:nth-child(1)");
  const gtmStatusEl = document.querySelector("#results ul li:nth-child(2)");
  const vtexStatusEl = document.querySelector("#results ul li:nth-child(3)");

  // Resetar os conteúdos das mensagens e resultados
  messageEl.textContent = "Verificando...";
  permalinkEl.innerHTML = "";
  scriptStatusEl.textContent = "Script: ";
  gtmStatusEl.textContent = "GTM: ";
  vtexStatusEl.textContent = "VTEX IO: ";

  try {
    // Fazer a requisição para o servidor
    const response = await fetch(
      `https://sz-checker.onrender.com/search?url=${encodeURIComponent(url)}`
    );
    console.log("Resposta recebida do servidor:", response);

    // Verificar se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error("Erro na resposta: " + response.statusText);
    }

    const data = await response.json();
    console.log("Dados recebidos:", data);

    messageEl.textContent = "";

    // Exibir permalink, se disponível
    if (data.permalink) {
      permalinkEl.innerHTML = `<strong>Permalink encontrado:</strong> <a href="${data.permalink}" target="_blank" rel="noopener noreferrer">${data.permalink}</a>`;
    }

    // Atualizar os status diretamente nos elementos do HTML
    scriptStatusEl.innerHTML += data.scriptStatus ? "✅" : "❌";
    gtmStatusEl.innerHTML += data.gtmStatus ? "✅" : "❌";
    vtexStatusEl.innerHTML += data.vtexIOStatus ? "✅" : "❌";
  } catch (error) {
    // Exibir mensagem de erro
    messageEl.textContent = error.message || "Ocorreu um erro.";
    console.error("Erro:", error);
  }
};
