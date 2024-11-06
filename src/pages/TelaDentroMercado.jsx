import Navbar from "../components/Navbar"
import "./TelaDentroMercado.css"

function TelaDentroMercado() {

  return (
    <div className="tudo">
      <Navbar />
      <div className="tela-dentro-mercado">
        <div className="sideBar-dentro-mercado">
          <div className="nome-mercado-container">
            <h5>Mercado Nome</h5> {/* Exemplo, será alterado (mercado.nome)*/}
          </div>
          <div className="endereco-cnpj-container">
            <p className="sub-titulo-sideBar-mercado">Sobre</p>
            <h5>Endereço</h5>
            <p>informações sobre o endereço do mercado</p>
            <p>CEP</p> {/*digitar o cep */}
            <h5 className="titulo-outras-info">Outras informações</h5>
            <p>CNPJ</p>
            <div className="horario-container">
              <div className="dias-funcion-container">
              <p className="sub-titulo-sideBar-mercado">Horário</p>
               <p>Domingo</p>
               <p>Segunda-feira</p>
               <p>Terça-feira</p>
               <p>Quarta-feira</p>
               <p>Quinta-feira</p>
               <p>Sexta-feira</p>
               <p>Sábado</p>
              </div>
              <div className="horarios-funcion-container">
                <p>Não Abre</p>
                <p>08:00 - 22:00</p>
                <p>08:00 - 22:00</p>
                <p>08:00 - 22:00</p>
                <p>08:00 - 22:00</p>
                <p>08:00 - 22:00</p>
                <p>08:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TelaDentroMercado
