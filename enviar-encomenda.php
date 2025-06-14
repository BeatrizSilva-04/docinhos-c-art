<?php
// Configurações de email
$to = "beatrizpeixotosilva@gmail.com"; // Seu email
$subject = "Nova Encomenda - Docinhos C'Art";

// Verificar se o formulário foi enviado
if ($_POST) {
    // Sanitizar dados
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $cidade = htmlspecialchars($_POST['cidade']);
    $tipo = htmlspecialchars($_POST['tipo']);
    $sabor = htmlspecialchars($_POST['sabor']);
    $recheio = htmlspecialchars($_POST['recheio']);
    $tamanho = htmlspecialchars($_POST['tamanho']);
    $formato = htmlspecialchars($_POST['formato']);
    $tema = htmlspecialchars($_POST['tema']);
    $cores = htmlspecialchars($_POST['cores']);
    $detalhes = htmlspecialchars($_POST['detalhes']);
    $data_evento = htmlspecialchars($_POST['data-evento']);
    $entrega = htmlspecialchars($_POST['entrega']);
    $referencia = htmlspecialchars($_POST['referencia']);
    
    // Processar extras
    $extras = isset($_POST['extras']) ? implode(', ', $_POST['extras']) : 'Nenhum';
    
    // Criar o corpo do email
    $message = "
    <html>
    <head>
        <title>Nova Encomenda - Docinhos C'Art</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #e84393; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .section { margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; }
            .section h3 { color: #e84393; margin-top: 0; }
            .info-row { margin-bottom: 10px; }
            .label { font-weight: bold; color: #555; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h1>Nova Encomenda Recebida</h1>
        </div>
        
        <div class='content'>
            <div class='section'>
                <h3>Informações do Cliente</h3>
                <div class='info-row'><span class='label'>Nome:</span> $nome</div>
                <div class='info-row'><span class='label'>Email:</span> $email</div>
                <div class='info-row'><span class='label'>Telefone:</span> $telefone</div>
                <div class='info-row'><span class='label'>Cidade:</span> $cidade</div>
            </div>
            
            <div class='section'>
                <h3>Detalhes do Bolo</h3>
                <div class='info-row'><span class='label'>Tipo:</span> $tipo</div>
                <div class='info-row'><span class='label'>Sabor:</span> $sabor</div>
                <div class='info-row'><span class='label'>Recheio:</span> $recheio</div>
                <div class='info-row'><span class='label'>Tamanho:</span> $tamanho</div>
                <div class='info-row'><span class='label'>Formato:</span> $formato</div>
                <div class='info-row'><span class='label'>Tema/Estilo:</span> $tema</div>
                <div class='info-row'><span class='label'>Cores:</span> $cores</div>
                <div class='info-row'><span class='label'>Extras:</span> $extras</div>
            </div>
            
            <div class='section'>
                <h3>Detalhes Adicionais</h3>
                <div class='info-row'><span class='label'>Descrição:</span><br>$detalhes</div>
            </div>
            
            <div class='section'>
                <h3>Entrega</h3>
                <div class='info-row'><span class='label'>Data do Evento:</span> $data_evento</div>
                <div class='info-row'><span class='label'>Método de Entrega:</span> $entrega</div>
            </div>
            
            <div class='section'>
                <h3>Referência</h3>
                <div class='info-row'><span class='label'>Referência:</span> $referencia</div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Headers para email HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    
    // Enviar email
    if (mail($to, $subject, $message, $headers)) {
        // Email enviado com sucesso
        echo json_encode([
            'success' => true,
            'message' => 'Encomenda enviada com sucesso! Entraremos em contacto em breve.'
        ]);
    } else {
        // Erro ao enviar email
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao enviar encomenda. Tente novamente ou contacte-nos diretamente.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido.'
    ]);
}
?>
