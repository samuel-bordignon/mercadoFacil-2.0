import React from 'react';
import './PopUpWelcome.css';

const PopUpWelcome = ({ closeWelcome }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-welcome">
        {/* Seção Azul */}
        <div className="popup-left">
          <h2>Bem-vindo(a)</h2>
          <p>O ponto de partida para o sucesso do seu negócio!</p>
          <img src="logo.png" alt="Mercado Fácil" className="popup-logo" />
        </div>
        {/* Seção Branca */}
        <div className="popup-right">
          <h3>Seu negócio, nosso suporte</h3>
          <p>
            É com grande satisfação que recebemos você em nossa equipe do Mercado Fácil.
          </p>
          <p>
            Nosso compromisso é oferecer o suporte necessário para impulsionar o seu negócio, 
            simplificando processos e ampliando suas oportunidades.
          </p>
          <p>
            <strong>Defina os dias e horários de funcionamento do seu mercado.</strong>
          </p>
          <p>
            Escolha os dias e horários em que seu mercado estará aberto. Essas informações 
            são importantes para atender melhor seus clientes e concluir a configuração.
          </p>
          <button className="popup-button" onClick={closeWelcome}>
            Vamos definir os horários
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpWelcome;
