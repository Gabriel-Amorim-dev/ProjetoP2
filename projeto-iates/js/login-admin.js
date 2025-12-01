$(document).ready(function () {
    
    // BLOCO RESTAURADO: Verifica se já está logado no localStorage
    var email = localStorage.getItem("admin_email");
    var senha = localStorage.getItem("admin_senha");

    $("#form-login").on("submit", function (e) {
        e.preventDefault();

        var email = $("#login-email").val();
        var senha = $("#login-senha").val();
        var objLoginSenha = { email: email, senha: senha };

        // Verifica o admin
        if (objLoginSenha.email === adminCorreto.email &&
            objLoginSenha.senha === adminCorreto.senha) {

            // Salva as credenciais
            
            localStorage.setItem("admin_email", objLoginSenha.email);
            localStorage.setItem("admin_senha", objLoginSenha.senha);

            // Redireciona para mensagens.html
            window.location.href = "mensagens.html";
            return;
        }
        else {
            // exibe mensagem de erro
            $("#erro-login")
                .text("E-mail ou Senha inválidos")
                .show();
        }
    });
}); 