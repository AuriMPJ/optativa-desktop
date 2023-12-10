function iniciarJogo() {
  const quantiaAposta = document.getElementById("quantia").value;

  if (quantiaAposta <= 0) {
    alert("Por favor, digite uma quantia maior que zero.");
    return;
  }

  window.location.href = `index.html?aposta=${quantiaAposta}`;
}
