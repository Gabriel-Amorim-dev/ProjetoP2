$(document).ready(function() {
  $('#btn-submit').on('click', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // 1. Coletar os dados do formulário
    var mensagem = {
      nome: $('#nome').val(),
      email: $('#email').val(),
      // Nota: o nome do campo da API é 'mensagem', então usamos o ID 'msg'
      mensagem: $('#msg').val()
    };

    // Validação simples
    if (!mensagem.nome || !mensagem.email || !mensagem.mensagem) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Desabilita o botão para evitar cliques duplicados
    $('#btn-submit').prop('disabled', true).text('Enviando...');

    // 2. Chamar a função da API para inserir
    inserirMensagem(mensagem)
      .done(function(response) {
        alert('Mensagem enviada com sucesso!');
        // 3. Redirecionar ou limpar o formulário
        $('#contactForm')[0].reset(); // Limpa os campos
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Erro ao enviar:", textStatus, errorThrown);
        alert('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
      })
      .always(function() {
        $('#btn-submit').prop('disabled', false).text('Enviar');
      });
  });
});