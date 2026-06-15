const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZHKdwyqfp0112Sb5qfxl7_RTk9p4pvPt6kHU2wIHX3pK9nVHZDXoht2RdpYeW0Grs/exec";

const feedbackForm = document.getElementById("feedbackForm");
const statusForm = document.getElementById("status-form");

function preencherCamposAutomaticos() {
  const paginaOrigem = document.getElementById("pagina_origem");
  const userAgent = document.getElementById("user_agent");

  if (paginaOrigem) {
    paginaOrigem.value = window.location.href;
  }

  if (userAgent) {
    userAgent.value = navigator.userAgent;
  }
}

if (feedbackForm) {
  preencherCamposAutomaticos();

  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();
    preencherCamposAutomaticos();

    const botaoEnviar = feedbackForm.querySelector('button[type="submit"]');
    const dadosFormulario = new FormData(feedbackForm);

    if (dadosFormulario.get("website")) {
      statusForm.innerText = "Não foi possível enviar o feedback.";
      return;
    }

    statusForm.innerText = "Enviando feedback...";

    if (botaoEnviar) {
      botaoEnviar.disabled = true;
    }

    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(dadosFormulario)
    })
      .then(function () {
        statusForm.innerText = "Feedback enviado com sucesso. Obrigado pela contribuição!";
        feedbackForm.reset();
        preencherCamposAutomaticos();
      })
      .catch(function () {
        statusForm.innerText = "Não foi possível enviar agora. Verifique sua conexão e tente novamente.";
      })
      .finally(function () {
        if (botaoEnviar) {
          botaoEnviar.disabled = false;
        }
      });
  });
}
