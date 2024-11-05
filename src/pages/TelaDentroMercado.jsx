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
          </div>
        </div>
      </div>

    </div>
  )
}

export default TelaDentroMercado
