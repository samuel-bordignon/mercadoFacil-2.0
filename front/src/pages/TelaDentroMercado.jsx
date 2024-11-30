import Navbar from "../components/Navbar"
import "./TelaDentroMercado.css"
import "../components/PopUpInfoProduto.css"


import { GlobalContext } from '../contexts/GlobalContext'
import React, { useContext, useState, useEffect } from 'react'
import { div } from "framer-motion/client"


function TelaDentroMercado() {
  const { getLocalStorage, getDataById, getDataByForeignKey } = useContext(GlobalContext)
  const [mercadoAtual, setMercadoAtual] = useState([])
  const [enderecosMercadoAtual, setEnderecosMercadoAtual] = useState([])
  const [produtos, setProdutos] = useState([])
  const [icon, setIcon] = useState('Mais')
  const idGerente = getLocalStorage('id_gerente')


  useEffect(() => {
    const fetchMercado = async () => {
      try {
        const mercadoAtual = await getDataByForeignKey('mercados', 'fk_id_gerente', idGerente);
        setMercadoAtual(...mercadoAtual);
      } catch (error) {
        console.error('Erro ao buscar mercado:', error);
      }
    };


    fetchMercado();
  }, [idGerente]);


  useEffect(() => {
    const fetchProdutosEEnderecos = async () => {
      if (mercadoAtual.length > 0) {
        try {
          const [enderecosMercados, produtos] = await Promise.all([
            getDataByForeignKey('enderecomercados', 'fk_id_mercado', mercadoAtual[0].id_mercado),
            getDataByForeignKey('produtos', 'fk_id_mercado', mercadoAtual[0].id_mercado),
          ]);


          setEnderecoMercadoAtual(...enderecosMercados);
          setProdutos(produtos);


          console.log('Produtos:', produtos);
          console.log('Endereços:', enderecosMercados);
          console.log('Endereços:', enderecosMercados[0]);
          console.log('Endereços:', enderecosMercados);
          console.log('Mercado:', mercadoAtual);
        } catch (error) {
          console.error('Erro ao buscar dados dependentes:', error);
        }
      }
    };


    fetchProdutosEEnderecos();
  }, [mercadoAtual]); // Depende de mercadoAtual




  const [popUpAtivo, setPopUpAtivo] = useState(false) // Estado para controlar a exibição do pop-up


  const AlteraIcon = () => { }


  return (
    <div className="tudo">
      <Navbar />
      <div className="tela-dentro-mercado">
        <div className="sideBar-dentro-mercado">
          <div className="cabecalio-mercado-container">
            <div className="logo-container-mercado">
              <img className="logo-mercado" src={`${mercadoAtual.logo}`} alt="" />
            </div>
            <div className="nome-mercado-container">
              <h5>{mercadoAtual.nome}</h5>


            </div>
          </div>
          <div className="endereco-cnpj-container">
            <p className="sub-titulo-verde">Sobre</p>
            <h5>{enderecosMercadoAtual.logradouro}</h5>
            <p>{enderecosMercadoAtual.cep}</p>
            <h5 className="titulo-outras-info">Outras informações</h5>
            <p>CNPJ: {mercadoAtual[0].cnpj}</p>
          </div>
          <div className="horario-container">
            <div className="dias-funcion-container">
              <p className="sub-titulo-verde">Horário</p>
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
          <div className="contato-container">
            <p className="sub-titulo-verde">Contato</p>
            {/* <p>+{mercadoAtual.telefone}</p>
            <p>{mercadoAtual.email}</p> */}
          </div>
        </div>


        <div className="todos-produtos-container">
          <div className="topico-produtos">
            <h4>Confeitaria</h4>
            <p className="sub-titulo-verde">Ver todos</p>
          </div>
          <div className="sessao-produtos-container">


            {produtos.map((produto, index) => (
              <div className="card-produto" onClick={() => setPopUpAtivo(!popUpAtivo)}>
                <div className="espaco-colocar-img">
                  <img className="imagem-produto" src={`/uploads_images/${produto.imagem_file_path}`} alt="" />
                  <button className="botaoAdd" onClick={AlteraIcon}>
                    {icon === 'Mais' ? (
                      <img className="iconsvgMais" src="IconMais.svg" alt="" />
                    ) : (
                      <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                    )}
                  </button>
                </div>
                <p className="preco-produto">R${produto.preco}</p>
                <p className="descricao-produto">{produto.nome}</p>
              </div>
            ))}
            {popUpAtivo && (
              <div className="popUp-overlay">
                <div className="popUp-infoProd-container">


                  <div className="espaco-img-prod-container">
                    <div className="fundo-img">
                      <img src="acucar.png" alt="" />
                    </div>
                  </div>
                  <div className="infos-produto-container">
                    <div className="parte-superior">
                      <button className="bttn-fecha-PopUp" onClick={() => setPopUpAtivo(false)}>
                        <img src="CloseIcon.svg" alt="" />
                      </button>
                      <h1 className="categoria-info-produto">Padaria</h1>
                      <h1 className="nome-info-produto">Açúcar Refinado</h1>
                      <p className="descricao-info-produto">Açúcar refinado da Marca União pacote de 1 kilo</p>
                    </div>
                    <div className="parte-inferior">
                      <p className="preco-info-produto">R$00,00</p>
                      <hr />
                      <button>Adicionar à Lista</button>
                    </div>
                  </div>


                </div>
              </div>
            )}
          </div>
        </div>


        {/* segunda sessão */}
        <div className="topico-produtos">
          <h4>Almoço</h4>
          <p className="sub-titulo-verde">Ver todos</p>
        </div>




        <div className="sessao-produtos-container">
          <div className="card-produto" >
            <div className="espaco-colocar-img">
              <img className="imagem-produto" src="skol.png" alt="" />
              <button className="botaoAdd" onClick={AlteraIcon}>
                {icon === 'Mais' ? (
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                ) : (
                  <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                )}
              </button>
            </div>
            <p className="preco-produto">R$ 00,00</p>
            <p className="descricao-produto">Fardo de cerveja Skoll 12 latinhas de 269 mlkilo</p>
            {popUpAtivo && (
              <div className="popUp-overlay">
                <div className="popUp-infoProd-container">


                  <div className="espaco-img-prod-container">
                    <div className="fundo-img">
                      <img src="acucar.png" alt="" />
                    </div>
                  </div>
                  <div className="infos-produto-container">
                    <div className="parte-superior">
                      <button className="bttn-fecha-PopUp" onClick={() => setPopUpAtivo(false)}>
                        <img src="CloseIcon.svg" alt="" />
                      </button>
                      <h1 className="categoria-info-produto">Padaria</h1>
                      <h1 className="nome-info-produto">Açúcar Refinado</h1>
                      <p className="descricao-info-produto">Açúcar refinado da Marca União pacote de 1 kilo</p>
                    </div>
                    <div className="parte-inferior">
                      <p className="preco-info-produto">R$00,00</p>
                      <hr />
                      <button>Adicionar à Lista</button>
                    </div>
                  </div>


                </div>
              </div>
            )}
          </div>
          <div className="card-produto" >
            <div className="espaco-colocar-img">
              <img className="imagem-produto" src="arroz.png" alt="" />
              <button className="botaoAdd" onClick={AlteraIcon}>
                {icon === 'Mais' ? (
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                ) : (
                  <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                )}
              </button>
            </div>
            <p className="preco-produto">R$ 00,00</p>
            <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            {popUpAtivo && (
              <div className="popUp-overlay">
                <div className="popUp-infoProd-container">


                  <div className="espaco-img-prod-container">
                    <div className="fundo-img">
                      <img src="acucar.png" alt="" />
                    </div>
                  </div>
                  <div className="infos-produto-container">
                    <div className="parte-superior">
                      <button className="bttn-fecha-PopUp" onClick={() => setPopUpAtivo(false)}>
                        <img src="CloseIcon.svg" alt="" />
                      </button>
                      <h1 className="categoria-info-produto">Padaria</h1>
                      <h1 className="nome-info-produto">Açúcar Refinado</h1>
                      <p className="descricao-info-produto">Açúcar refinado da Marca União pacote de 1 kilo</p>
                    </div>
                    <div className="parte-inferior">
                      <p className="preco-info-produto">R$00,00</p>
                      <hr />
                      <button>Adicionar à Lista</button>
                    </div>
                  </div>


                </div>
              </div>
            )}
          </div>
          <div className="card-produto" >
            <div className="espaco-colocar-img">
              <img className="imagem-produto" src="arroz.png" alt="" />
              <button className="botaoAdd" onClick={AlteraIcon}>
                {icon === 'Mais' ? (
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                ) : (
                  <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                )}
              </button>
            </div>
            <p className="preco-produto">R$ 00,00</p>
            <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            {popUpAtivo && (
              <div className="popUp-overlay">
                <div className="popUp-infoProd-container">


                  <div className="espaco-img-prod-container">
                    <div className="fundo-img">
                      <img src="acucar.png" alt="" />
                    </div>
                  </div>
                  <div className="infos-produto-container">
                    <div className="parte-superior">
                      <button className="bttn-fecha-PopUp" onClick={() => setPopUpAtivo(false)}>
                        <img src="CloseIcon.svg" alt="" />
                      </button>
                      <h1 className="categoria-info-produto">Padaria</h1>
                      <h1 className="nome-info-produto">Açúcar Refinado</h1>
                      <p className="descricao-info-produto">Açúcar refinado da Marca União pacote de 1 kilo</p>
                    </div>
                    <div className="parte-inferior">
                      <p className="preco-info-produto">R$00,00</p>
                      <hr />
                      <button>Adicionar à Lista</button>
                    </div>
                  </div>


                </div>
              </div>
            )}
          </div>
          <div className="card-produto" >
            <div className="espaco-colocar-img">
              <img className="imagem-produto" src="arroz.png" alt="" />
              <button className="botaoAdd" onClick={AlteraIcon}>
                {icon === 'Mais' ? (
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                ) : (
                  <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                )}
              </button>
            </div>
            <p className="preco-produto">R$ 00,00</p>
            <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            {popUpAtivo && (
              <div className="popUp-overlay">
                <div className="popUp-infoProd-container">


                  <div className="espaco-img-prod-container">
                    <div className="fundo-img">
                      <img src="acucar.png" alt="" />
                    </div>
                  </div>
                  <div className="infos-produto-container">
                    <div className="parte-superior">
                      <button className="bttn-fecha-PopUp" onClick={() => setPopUpAtivo(false)}>
                        <img src="CloseIcon.svg" alt="" />
                      </button>
                      <h1 className="categoria-info-produto">Padaria</h1>
                      <h1 className="nome-info-produto">Açúcar Refinado</h1>
                      <p className="descricao-info-produto">Açúcar refinado da Marca União pacote de 1 kilo</p>
                    </div>
                    <div className="parte-inferior">
                      <p className="preco-info-produto">R$00,00</p>
                      <hr />
                      <button>Adicionar à Lista</button>
                    </div>
                  </div>


                </div>
              </div>
            )}
          </div>
          <div className="card-produto" >
            <div className="espaco-colocar-img">
              <img className="imagem-produto" src="arroz.png" alt="" />
              <button className="botaoAdd" onClick={AlteraIcon}>
                {icon === 'Mais' ? (
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                ) : (
                  <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                )}
              </button>
            </div>
            <p className="preco-produto">R$ 00,00</p>
            <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            {popUpAtivo && (
              <div className="popUp-overlay">
                <div className="popUp-infoProd-container">


                  <div className="espaco-img-prod-container">
                    <div className="fundo-img">
                      <img src="acucar.png" alt="" />
                    </div>
                  </div>
                  <div className="infos-produto-container">
                    <div className="parte-superior">
                      <button className="bttn-fecha-PopUp" onClick={() => setPopUpAtivo(false)}>
                        <img src="CloseIcon.svg" alt="" />
                      </button>
                      <h1 className="categoria-info-produto">Padaria</h1>
                      <h1 className="nome-info-produto">Açúcar Refinado</h1>
                      <p className="descricao-info-produto">Açúcar refinado da Marca União pacote de 1 kilo</p>
                    </div>
                    <div className="parte-inferior">
                      <p className="preco-info-produto">R$00,00</p>
                      <hr />
                      <button>Adicionar à Lista</button>
                    </div>
                  </div>


                </div>
              </div>
            )}
          </div>
          <div className="card-produto" >
            <div className="espaco-colocar-img">
              <img className="imagem-produto" src="arroz.png" alt="" />
              <button className="botaoAdd" onClick={AlteraIcon}>
                {icon === 'Mais' ? (
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                ) : (
                  <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                )}
              </button>
            </div>
            <p className="preco-produto">R$ 00,00</p>
            <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            {popUpAtivo && (
              <div className="popUp-overlay">
                <div className="popUp-infoProd-container">


                  <div className="espaco-img-prod-container">
                    <div className="fundo-img">
                      <img src="acucar.png" alt="" />
                    </div>
                  </div>
                  <div className="infos-produto-container">
                    <div className="parte-superior">
                      <button className="bttn-fecha-PopUp" onClick={() => setPopUpAtivo(false)}>
                        <img src="CloseIcon.svg" alt="" />
                      </button>
                      <h1 className="categoria-info-produto">Padaria</h1>
                      <h1 className="nome-info-produto">Açúcar Refinado</h1>
                      <p className="descricao-info-produto">Açúcar refinado da Marca União pacote de 1 kilo</p>
                    </div>
                    <div className="parte-inferior">
                      <p className="preco-info-produto">R$00,00</p>
                      <hr />
                      <button>Adicionar à Lista</button>
                    </div>
                  </div>


                </div>
              </div>
            )}
          </div>
          <div className="card-produto" >
            <div className="espaco-colocar-img">
              <img className="imagem-produto" src="arroz.png" alt="" />
              <button className="botaoAdd" onClick={AlteraIcon}>
                {icon === 'Mais' ? (
                  <img className="iconsvgMais" src="IconMais.svg" alt="" />
                ) : (
                  <img className="iconsvgMais" src="CheckMark.svg" alt="" />
                )}
              </button>
            </div>
            <p className="preco-produto">R$ 00,00</p>
            <p className="descricao-produto">Arroz Parboilizado Camil Pacote 1 kilo</p>
            {popUpAtivo && (
              <div className="popUp-overlay">
                <div className="popUp-infoProd-container">


                  <div className="espaco-img-prod-container">
                    <div className="fundo-img">
                      <img src="acucar.png" alt="" />
                    </div>
                  </div>
                  <div className="infos-produto-container">
                    <div className="parte-superior">
                      <button className="bttn-fecha-PopUp" onClick={() => setPopUpAtivo(false)}>
                        <img src="CloseIcon.svg" alt="" />
                      </button>
                      <h1 className="categoria-info-produto">Padaria</h1>
                      <h1 className="nome-info-produto">Açúcar Refinado</h1>
                      <p className="descricao-info-produto">Açúcar refinado da Marca União pacote de 1 kilo</p>
                    </div>
                    <div className="parte-inferior">
                      <p className="preco-info-produto">R$00,00</p>
                      <hr />
                      <button>Adicionar à Lista</button>
                    </div>
                  </div>


                </div>
              </div>
            )}




          </div>
        </div>




      </div>
    </div>


  )
}


export default TelaDentroMercado