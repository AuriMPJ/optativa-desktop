async function gerarPiadaReacao() {
  try {
      const responsePiada = await axios.get('https://v2.jokeapi.dev/joke/Any?lang=pt');
      const piada = responsePiada.data.setup + ' ' + responsePiada.data.delivery;
      
      const responseImagem = await axios.get('https://api.thecatapi.com/v1/images/search');
      const imagemUrl = responseImagem.data[0].url;

      return { piada, imagemUrl };
  } catch (error) {
      console.error(error);
      return { piada: "Falha ao buscar piada.", imagemUrl: "Falha ao buscar reação." };
  }
}