import React, { useContext, useEffect, useState } from 'react'
import './HomeMercados.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import { boolean } from 'zod'

function HomeMercados() {
  const {
    calcularDistanciaRota,
    calcularDistanciaRaio,
    getDataById,
    getDataByForeignKey,
    getLocalStorage,
    setLocalStorage,
    getData,
  } = useContext(GlobalContext)

  const idCliente = getLocalStorage('id_cliente')

  const [mercadosDentro, setMercadosDentro] = useState([])
  const [mercadosFora, setMercadosFora] = useState([])
  const [mercados, setMercados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)

      // Buscar dados principais
      const [mercados, enderecosMercados] = await Promise.all([
        getData('mercados'),
        getData('enderecomercados'),
      ])
      setMercados(mercados)

      // Buscar endereços relacionados ao cliente atual
      const tabelaRelacao = await getDataByForeignKey('endereco_cliente_relecao', 'fk_id_cliente', idCliente)
      const enderecosRelacionados = await Promise.all(
        tabelaRelacao.map((item) => getDataById('enderecoclientes', item.fk_id_enderecocliente))
      )
      if (enderecosRelacionados.length === 0) {
        throw new Error('Nenhum endereço relacionado encontrado para o cliente atual.')
      }

      const enderecoAtualCliente = enderecosRelacionados.find((endereco) => endereco.isatual)
      if (!enderecoAtualCliente) {
        throw new Error('Endereço atual do cliente não encontrado.')
      }

      const mercadosDentro = [];
      const mercadosFora = [];

      const processarMercados = async () => {
        const resultados = await Promise.all(
          enderecosMercados.map(async (enderecoMercado) => {
            const distanciaRaio = calcularDistanciaRaio(
              enderecoAtualCliente.latitude,
              enderecoAtualCliente.longitude,
              enderecoMercado.latitude,
              enderecoMercado.longitude
            );

            const mercado = await getDataById('mercados', enderecoMercado.fk_id_mercado);
            const rota = await calcularDistanciaRota(enderecoAtualCliente, enderecoMercado, 'walk');

            const mercadoFormatado = {
              ...mercado,
              distancia: rota?.distanceInKm || 'N/A',
              tempo: `${(rota?.durationInHours || 0).toFixed(2)} min`,
              enderecoMercado
            };

            if (distanciaRaio <= 1000) {
              mercadosDentro.push(mercadoFormatado);
            } else {
              mercadosFora.push(mercadoFormatado);
            }
            return {mercadoFormatado}
          })
        );

        // Atualizar os estados com os dados filtrados
        setMercadosDentro(mercadosDentro);
        setMercadosFora(mercadosFora);
        setLocalStorage('mercadosDentro', mercadosDentro)
      };
      
      processarMercados();

      // Chamar a função para processar os mercados
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchData()
  }, []) // Carregar apenas uma vez




  if (loading) {
    return <div className="loading">
      <div className="spinner"></div>
    </div>
  }

  if (error) {
    return <div>Erro: {error}</div>
  }

  const slides = (dados) => {
    const result = []
    for (let i = 0; i < dados.length; i += 4) {
      result.push(dados.slice(i, i + 4))
    }
    return result
  }
  const slidesGeral = slides(mercadosFora)
  const slidesPerto = slides(mercadosDentro) 

  return (
    <div className='container-total-home'>
      <Navbar />
      <div id="container_home" className="container-home mt-5">
        <div className="TituloHome text-start">
          <h1>SuperMercados</h1>
        </div>
        <div className="sub-titulo2">
          <p>Perto de você</p>
        </div>
        {/* Carousel de mercados perto */}
        <Carousel slides={slidesPerto} />

        <div className="sub-titulo2">
          <p>Outros Mercados</p>
        </div>

        {/* Carousel de todos osmercados */}
        <Carousel slides={slidesGeral} />
      </div>
      <Footer />
    </div>
  )
}

export default HomeMercados
