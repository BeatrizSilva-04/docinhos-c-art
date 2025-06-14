<?php
// Configurações de email melhoradas
$to = "beatrizpeixotosilva@gmail.com";
$subject = "Nova Encomenda - Docinhos C'Art";

// Log para debug
error_log("Formulário de encomenda acessado");

// Verificar se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Log dos dados recebidos
    error_log("Dados POST recebidos: " . print_r($_POST, true));
    
    // Verificar se campos obrigatórios existem
    $required_fields = ['nome', 'email', 'telefone', 'cidade', 'sabor', 'recheio', 'tamanho', 'formato', 'data-evento'];
    $missing_fields = [];
    
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            $missing_fields[] = $field;
        }
    }
    
    if (!empty($missing_fields)) {
        echo json_encode([
            'success' => false,
            'message' => 'Campos obrigatórios em falta: ' . implode(', ', $missing_fields)
        ]);
        exit;
    }
    
    // Sanitizar dados
    $nome = htmlspecialchars($_POST['nome']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $telefone = htmlspecialchars($_POST['telefone']);
    $cidade = htmlspecialchars($_POST['cidade']);
    $tipo = htmlspecialchars($_POST['tipo'] ?? 'Não especificado');
    $sabor = htmlspecialchars($_POST['sabor']);
    $recheio = htmlspecialchars($_POST['recheio']);
    $tamanho = htmlspecialchars($_POST['tamanho']);
    $formato = htmlspecialchars($_POST['formato']);
    $tema = htmlspecialchars($_POST['tema'] ?? 'Não especificado');
    $cores = htmlspecialchars($_POST['cores'] ?? 'Não especificado');
    $detalhes = htmlspecialchars($_POST['detalhes'] ?? 'Não especificado');
    $data_evento = htmlspecialchars($_POST['data-evento']);
    $entrega = htmlspecialchars($_POST['entrega'] ?? 'Não especificado');
    $referencia = htmlspecialchars($_POST['referencia'] ?? 'Não especificado');
    
    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Email inválido fornecido.'
        ]);
        exit;
    }
    
    // Processar extras
    $extras = 'Nenhum';
    if (isset($_POST['extras']) && is_array($_POST['extras'])) {
        $extras = implode(', ', array_map('htmlspecialchars', $_POST['extras']));
    }
    
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
            <p>Data: " . date('d/m/Y H:i:s') . "</p>
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
    
    // Headers melhorados para email HTML
    $headers = array();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/html; charset=UTF-8";
    $headers[] = "From: Docinhos C'Art <noreply@docinhoscart.pt>";
    $headers[] = "Reply-To: $email";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    
    // Log antes de enviar
    error_log("Tentando enviar email para: $to");
    error_log("Assunto: $subject");
    
    // Enviar email
    $mail_sent = mail($to, $subject, $message, implode("\r\n", $headers));
    
    if ($mail_sent) {
        error_log("Email enviado com sucesso!");
        
        // Enviar email de confirmação para o cliente
        $client_subject = "Confirmação de Encomenda - Docinhos C'Art";
        $client_message = "
        <html>
        <head>
            <title>Confirmação de Encomenda</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background-color: #e84393; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h1>Obrigada pela sua encomenda!</h1>
            </div>
            <div class='content'>
                <p>Olá $nome,</p>
                <p>Recebemos a sua encomenda de bolo e entraremos em contacto em breve para confirmar todos os detalhes.</p>
                <p>Dados da sua encomenda:</p>
                <ul>
                    <li><strong>Tipo:</strong> $tipo</li>
                    <li><strong>Sabor:</strong> $sabor</li>
                    <li><strong>Tamanho:</strong> $tamanho</li>
                    <li><strong>Data do Evento:</strong> $data_evento</li>
                </ul>
                <p>Obrigada por escolher a Docinhos C'Art!</p>
                <p>Com os melhores cumprimentos,<br>Equipa Docinhos C'Art</p>
            </div>
        </body>
        </html>
        ";
        
        $client_headers = array();
        $client_headers[] = "MIME-Version: 1.0";
        $client_headers[] = "Content-type: text/html; charset=UTF-8";
        $client_headers[] = "From: Docinhos C'Art <noreply@docinhoscart.pt>";
        
        mail($email, $client_subject, $client_message, implode("\r\n", $client_headers));
        
        echo json_encode([
            'success' => true,
            'message' => 'Encomenda enviada com sucesso! Entraremos em contacto em breve.'
        ]);
    } else {
        error_log("Erro ao enviar email!");
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
