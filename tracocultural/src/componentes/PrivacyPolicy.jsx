import React from 'react'
import StarfieldBackground from './StarfieldBackground'
import './LegalPages.css'

const PrivacyPolicy = ({ onBack }) => {
  return (
    <div className="legal-page">
      <StarfieldBackground />
      
      <div className="legal-content">
        <button className="back-btn" onClick={onBack}>
          <i className="bi bi-arrow-left"></i>
          Voltar
        </button>
        
        <div className="legal-card">
          <h1>Política de Privacidade</h1>
          <p className="last-updated">Última atualização: 06 de outubro de 2025</p>
          
          <p>A sua privacidade é muito importante para nós. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações ao utilizar a plataforma TraçoCultural.</p>
          
          <h2>1. Informações que Coletamos</h2>
          <ul>
            <li><strong>Informações de cadastro:</strong> nome, e-mail, senha e localização, fornecidos no momento do registro.</li>
            <li><strong>Informações de uso:</strong> eventos favoritos, avaliações, comentários e interações dentro da plataforma.</li>
            <li><strong>Dados técnicos:</strong> endereço IP, tipo de navegador, dispositivo e dados de acesso (para melhorar a experiência e segurança).</li>
          </ul>
          
          <h2>2. Como Usamos as Informações</h2>
          <p>Utilizamos seus dados para:</p>
          <ul>
            <li>Gerenciar sua conta e fornecer acesso às funcionalidades do site;</li>
            <li>Personalizar sua experiência (ex.: sugestões de eventos);</li>
            <li>Enviar notificações e comunicações relacionadas à plataforma (quando autorizado);</li>
            <li>Melhorar nossos serviços e segurança da plataforma.</li>
          </ul>
          
          <h2>3. Compartilhamento de Dados</h2>
          <p>Não vendemos ou alugamos seus dados pessoais. Podemos compartilhar informações apenas quando:</p>
          <ul>
            <li>For necessário para o funcionamento do serviço (ex.: provedores de hospedagem);</li>
            <li>Houver obrigação legal ou solicitação de autoridades;</li>
            <li>Você der consentimento explícito.</li>
          </ul>
          
          <h2>4. Segurança</h2>
          <p>Adotamos medidas de segurança técnicas e administrativas para proteger suas informações contra acessos não autorizados, perda ou alteração. No entanto, nenhum sistema é 100% seguro, então recomendamos que mantenha sua senha em sigilo.</p>
          
          <h2>5. Seus Direitos</h2>
          <p>Você pode, a qualquer momento:</p>
          <ul>
            <li>Acessar, corrigir ou excluir seus dados pessoais;</li>
            <li>Solicitar o cancelamento de comunicações;</li>
            <li>Excluir sua conta definitivamente.</li>
          </ul>
          
          <h2>6. Alterações nesta Política</h2>
          <p>Podemos atualizar esta Política periodicamente. Notificaremos os usuários em caso de mudanças significativas.</p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy