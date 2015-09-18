//Seleciona os formulários que serão tratados em 'processamentos'
$(document).ready(function(){
    if($('form.ajaxForm').length > 0){
        $('form.ajaxForm').submit(function() {
            var $form = $(this);
            var formData = $form.serialize();

            //Seleciona a barra de notificações que mostrará o feedback na mesma página
            var notificacoes = $("#notificacoes");

            //Opcional: feedback no botão de envio
            //$(this).find('input[type="submit"]').val('Enviado...');

            $.ajax({

                //Inicia o processo no arquivo definido no action
                type: 'POST',
                url: $form.attr('action'),
                data: formData

            }).done(function(data) {
                //Se o processo não retornar erro
                //Limpa o formulário.
                $form.find('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], textarea').val();

                //Abre a barra de notificações com mensagem de sucesso
                notificacoes.html('Sua mensagem foi enviada com sucesso!');
                notificacoes.addClass('aberto');

                //Fecha a barra de notificações depois de 5s
                setTimeout ( function () {
                    notificacoes.removeClass('aberto');
                }, 5000);
                notificacoes.html('Nenhuma notificação.');

            }).fail(function(data) {
                //Se o processo retornar erro com mensagem
                if (data.responseText !== '') {
                    //Abre a barra de notificações com a mensagem de erro
                    notificacoes.html(data.responseText);
                    notificacoes.addClass('aberto');
                    //Fecha a barra de notificações depois de 3s
                    setTimeout ( function () {
                        notificacoes.removeClass('aberto');
                    }, 3000);
                } else {
                    //Se o processo retornar erro sem mensagem
                    //Abre a barra de notificações com mensagem de erro
                    notificacoes.html("No momento, não foi possível enviar a sua mensagem.");
                    notificacoes.addClass('aberto');

                    //Fecha a barra de notificações depois de 3s
                    setTimeout ( function () {
                        notificacoes.removeClass('aberto');
                    }, 3000);
                }
            });
            return false;
        });
    }
});
