document.addEventListener("DOMContentLoaded", function () {

    var email = localStorage.getItem("admin_email");
    var senha = localStorage.getItem("admin_senha");

    // Se não estiver logado como admin → mantenha escondido
    if (!email || !senha) {
        return;
    }

    // Validação final pela API
    var valido = validarAdmin({ email: email, senha: senha });

    if (valido === true) {
        document.getElementById("menu-mensagens").style.display = "block";
    }
});