// Obtém uma referência ao elemento da tabela onde os personagens serão exibidos.
const corpoTabelaPersonagens = document.getElementById('corpoTabelaPersonagens');

// Função que busca os dados da API e preenche a tabela com os usuarios.

function buscarDadosEPreencherTabela() {
    // Faz uma requisição GET para a API.
    axios.get('http://infopguaifpr.com.br:3052/listarTodosUsuarios')
        .then(response => {
            console.log(response)

            // Obtém a lista de usuários da resposta.
            const usuarios = response.data.usuarios;

            // Chama a função para preencher a tabela com os usuários.
            preencherTabela(usuarios);
        })
        .catch(error => {
            // Em caso de erro, exibe uma mensagem de erro no console.
            console.error('Error fetching character data:', error);
        });
}

// Função que preenche a tabela com os dados dos usuários.
function preencherTabela(usuarios) {
    // Para cada usuário na lista...
    usuarios.forEach(usuario => {
        // Cria uma nova linha na tabela.
        const linha = document.createElement('tr');

        // Cria células para cada dado do usuário e insere o texto.
        const idCelula = document.createElement('td');
        idCelula.textContent = usuario.id;
        linha.appendChild(idCelula);

        // Cria células para cada dado do usuário e insere o texto.
        const nomeCelula = document.createElement('td');
        nomeCelula.textContent = usuario.nome;
        linha.appendChild(nomeCelula);

        const emailCelula = document.createElement('td');
        emailCelula.textContent = usuario.email;
        linha.appendChild(emailCelula);

        const disciplinaCelula = document.createElement('td');
        disciplinaCelula.textContent = usuario.disciplina;
        linha.appendChild(disciplinaCelula);

        // Cria células para os botões de editar e excluir.
        const acoesCelula = document.createElement('td');
        const editarBotao = document.createElement('a');
        editarBotao.href = '#';
        editarBotao.className = 'btn btn-primary btn-edit';
        editarBotao.textContent = 'Editar';
        editarBotao.dataset.id = usuario.id;
        acoesCelula.appendChild(editarBotao);

        const excluirBotao = document.createElement('a');
        excluirBotao.href = '#';
        excluirBotao.className = 'btn btn-danger btn-delete';
        excluirBotao.textContent = 'Excluir';
        excluirBotao.dataset.id = usuario.id;
        acoesCelula.appendChild(excluirBotao);

        linha.appendChild(acoesCelula);

        corpoTabelaPersonagens.appendChild(linha);
    });
}


const botaoChamarAPI = document.getElementById('botaoChamarAPI');
botaoChamarAPI.addEventListener('click', () => {
    buscarDadosEPreencherTabela();

});

function deletarUsuario(idUsuario) {
    axios.delete(`http://infopguaifpr.com.br:3052/deletarUsuario/${idUsuario}`)
    .then(response => {
        console.log('Usuario excluido com sucesso')
        buscarDadosEPreencherTabela();
    }).catch(error => {
        console.error('Erro ao deletar:', error);

    });
}

document.addEventListener('click', function (event) {
    if (event.target  && event.target.classList.contains('btn-delete')) {
        const idUsuario = event.target.dataset.id;
        deletarUsuario(idUsuario);
    }
});

function cadastrarUsuario (nome, email, disciplina, senha) {
    console.log('Dados capturados para cadastro:');
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Disciplina:', disciplina);
    console.log('Senha:', senha);
    const novoUsuario = {
        nome: nome,
        email: email,
        disciplina: disciplina,
        senha: senha
    };

    axios.post('http://infopguaifpr.com.br:3052/cadastrarUsuario', novoUsuario, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(response => {
        console.log('Usuário cadastrado com sucesso:', response.data);
        $('#cadastrarUsuario').modal('hide');
        alert('Usuario cadastrado com sucesso');
        buscarDadosEPreencherTabela();
    })
    .catch(error => {
        alert('Erro ao cadastrar usuário:', error)
    });
}

document.querySelector('#btnCadastrarUsuario').addEventListener('click', function () {
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const disciplina = document.querySelector('#disciplina').value; const senha = document.querySelector('#senha').value;
    cadastrarUsuario(nome, email, disciplina, senha);
});

function getById(id) {
    axios.post(`http://infopguaifpr.com.br:3052/pegarUsuarioPeloId/${id}`)
    .then(response => {
        buscarDadosEPreencherTabela()
    })
    .catch(error => {
        alert('Erro ao recuperar usuário: ', error)
    });
}

function abrirModalEdicao(idUsuario) {
    axios.get(`http://infopguaifpr.com.br:3052/pegarUsuarioPeloId/${idUsuario}`)
        .then(response => {
            const usuario = response.data;

            document.querySelector('#editNome').value = usuario.nome;
            document.querySelector('#editEmail').value = usuario.email;
            document.querySelector('#editDisciplina').value = usuario.disciplina;
            document.querySelector('#editSenha').value = usuario.senha;

            $('#editarUsuario').modal('show');
        })
        .catch(error => {
            alert('Erro ao recuperar usuário para edição: ', error);
        });
}

document.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('btn-edit')) {
        const idUsuario = event.target.dataset.id;
        abrirModalEdicao(idUsuario);
    }
});

function atualizarUsuario(idUsuario, nome, email, disciplina, senha) {
    const dadosAtualizados = {
        nome: nome,
        email: email,
        disciplina: disciplina,
        senha: senha
    };

    axios.put(`http://infopguaifpr.com.br:3052/atualizarUsuario/${idUsuario}`, dadosAtualizados)
        .then(response => {
            console.log('Usuário atualizado com sucesso:', response.data);
            $('#editarUsuario').modal('hide');
            alert('Usuário atualizado com sucesso');
            buscarDadosEPreencherTabela();
        })
        .catch(error => {
            alert('Erro ao atualizar usuário: ', error);
        });
}

document.querySelector('#btnSalvarEdicao').addEventListener('click', function () {
    const idUsuario = document.querySelector('#editId').value;
    const nome = document.querySelector('#editNome').value;
    const email = document.querySelector('#editEmail').value;
    const disciplina = document.querySelector('#editDisciplina').value;
    const senha = document.querySelector('#editSenha').value;
    atualizarUsuario(idUsuario, nome, email, disciplina, senha);
});
