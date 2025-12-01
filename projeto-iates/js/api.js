var adminCorreto = {
    email: "admin@gmail.com",
    senha: "admin123"
}
var userCorreto = {
    email: "user@gmail.com",
    senha: "user123"
}
/* ================================
      BUSCAR MENSAGENS
================================ */
function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function(){
        return retorno;
    });

    consulta.done(function(data) {
        retorno = data;
    });

    return retorno;
}

/* ================================
      INSERIR MENSAGEM
================================ */
function inserirMensagem(mensagem) {

    var mensagem = {
        nome: mensagem.nome,
        email: mensagem.email,
        mensagem: mensagem.mensagem
    };
    // Processamento dos dados do formulário

    $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(mensagem),
        dataType: 'json',
        async: false,
        contentType: 'application/json'
    });
}

/* ================================
      VALIDAR ADMINISTRADOR
================================ */
function validarAdmin(objLoginSenha) {

    var retorno = false;

    var validacao = $.ajax({
        url: 'https://app-p2-js-c88e9128234a.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function () {
        return retorno;
    });

    validacao.done(function (data) {
        retorno = data;
    });

    return retorno;
}

