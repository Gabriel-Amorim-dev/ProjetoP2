$(document).ready(function () {

  $("#form-login-cliente").on("submit", function (e) {
      e.preventDefault();

      var email = $("#cliente-email").val();
      var senha = $("#cliente-senha").val();

      var obj = {
          email: email,
          senha: senha
      };

      // Chama a função presente no api.js
      var loginValido = validarCliente(objLoginSenha);

      if (loginValido) {
          window.location.href = "cliente-area.html";
      } else {
          $("#erro-cliente")
            .text("E-mail ou senha incorretos. Tente novamente.")
            .fadeIn();
      }
  });

});
