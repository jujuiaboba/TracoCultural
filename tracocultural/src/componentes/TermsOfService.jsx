import React from 'react'
import StarfieldBackground from './StarfieldBackground'
import './LegalPages.css'

const TermsOfService = ({ onBack }) => {
  return (
    <div className="legal-page">
      <StarfieldBackground />
      
      <div className="legal-content">
        <button className="back-btn" onClick={onBack}>
          <i className="bi bi-arrow-left"></i>
          Voltar
        </button>
        
        <div className="legal-card">
          <h1>Termos de Uso</h1>
          <p className="last-updated">Última atualização: 06 de outubro de 2025</p>
          
          <p>Ao utilizar a plataforma TraçoCultural, você concorda com os seguintes Termos de Uso. Leia atentamente antes de se cadastrar ou navegar no site.</p>
          
          <h2>1. Aceitação dos Termos</h2>
          <p>Ao criar uma conta ou usar a plataforma, você declara que leu, entendeu e aceita estes Termos. Caso não concorde, não utilize o serviço.</p>
          
          <h2>2. Cadastro de Usuário</h2>
          <p>Para acessar as funcionalidades, é necessário criar uma conta com informações verdadeiras e manter seus dados atualizados. Você é responsável por manter sua senha em segurança e por todas as atividades realizadas em sua conta.</p>
          
          <h2>3. Uso da Plataforma</h2>
          <p>Você se compromete a:</p>
          <ul>
            <li>Utilizar o TraçoCultural de forma ética e legal;</li>
            <li>Não publicar conteúdos ofensivos, discriminatórios ou que violem direitos de terceiros;</li>
            <li>Não usar a plataforma para fins comerciais não autorizados.</li>
          </ul>
          <p>Reservamo-nos o direito de remover conteúdos ou contas que violem estes Termos.</p>
          
          <h2>4. Conteúdos e Direitos</h2>
          <p>Os eventos e informações exibidos são de responsabilidade dos organizadores. A TraçoCultural não se responsabiliza por mudanças de data, cancelamentos ou informações incorretas fornecidas por terceiros.</p>
          <p>Os conteúdos publicados pelos usuários (como comentários) permanecem de responsabilidade dos próprios autores.</p>
          
          <h2>5. Propriedade Intelectual</h2>
          <p>Todos os elementos visuais, marcas, logotipos e funcionalidades da plataforma pertencem à TraçoCultural e são protegidos por leis de direitos autorais e propriedade intelectual. É proibido copiar, reproduzir ou redistribuir sem autorização.</p>
          
          <h2>6. Limitação de Responsabilidade</h2>
          <p>A TraçoCultural atua como intermediária na divulgação de eventos culturais. Não garantimos disponibilidade ou qualidade dos eventos e não nos responsabilizamos por danos diretos ou indiretos resultantes do uso da plataforma.</p>
          
          <h2>7. Encerramento de Conta</h2>
          <p>Você pode encerrar sua conta a qualquer momento nas configurações. Podemos suspender ou excluir contas que violem os Termos ou causem prejuízos à plataforma ou a terceiros.</p>
          
          <h2>8. Alterações nos Termos</h2>
          <p>Podemos alterar estes Termos a qualquer momento. Caso ocorram mudanças significativas, notificaremos os usuários com antecedência.</p>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService