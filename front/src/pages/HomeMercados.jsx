import React, { useContext, useEffect, useState } from 'react'
import './HomeMercados.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'

function HomeMercados() {
  const {
    calcularDistanciaRota,
    calcularDistanciaRaio,
    getDataById,
    getDataByForeignKey,
    getLocalStorage,
    getData,
  } = useContext(GlobalContext)

  const idEnderecoClienteAtual = getLocalStorage('id_enderecocliente')
  const idCliente = getLocalStorage('id_cliente')

  const [mercadosDentro, setMercadosDentro] = useState([])
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

      // Buscar endereços relacionados ao cliente atual
      const tabelaRelacao = await getDataByForeignKey('endereco_cliente_relacao', 'fk_id_cliente', idCliente)
      const enderecosRelacionados = await Promise.all(
        tabelaRelacao.map((item) => getDataById('enderecoclientes', item.fk_id_enderecocliente))
      )

      if (enderecosRelacionados.length === 0) {
        throw new Error('Nenhum endereço relacionado encontrado para o cliente atual.')
      }

      const enderecoAtualCliente = enderecosRelacionados.find(
        (enderecoCliente) => enderecoCliente.id_enderecocliente === idEnderecoClienteAtual
      )

      if (!enderecoAtualCliente) {
        throw new Error('Endereço atual do cliente não encontrado.')
      }

      // Processar dados para mercados dentro do raio
      const mercadosFiltrados = await Promise.all(
        enderecosMercados.map(async (enderecoMercado) => {
          const distanciaRaio = calcularDistanciaRaio(
            enderecoAtualCliente.latitude,
            enderecoAtualCliente.longitude,
            enderecoMercado.latitude,
            enderecoMercado.longitude
          )

          if (distanciaRaio <= 1000) {
            const mercado = await getDataById('mercados', enderecoMercado.fk_id_mercado)
            const rota = await calcularDistanciaRota(enderecoAtualCliente, enderecoMercado)

            return {
              ...mercado,
              distancia: rota?.distanceInKm || 'N/A',
              tempo: `${(rota?.durationInHours || 0).toFixed(2)} min`,
            }
          }

          return null
        })
      )

      setMercadosDentro(mercadosFiltrados.filter(Boolean) || [])
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

  const slides = (dados) => {
    const result = []
    for (let i = 0; i < dados.length; i += 4) {
      result.push(dados.slice(i, i + 4))
    }
    return result
  }

  if (loading) {
    return <div className="loading">
      <div className="spinner"></div>
    </div>
  }

  if (error) {
    return <div>Erro: {error}</div>
  }

  const slidesVisitados = slides(mercadosDentro)
  const slidesPerto = slidesVisitados // Reutilizando lógica, se necessário

  return (
    <div>
      <Navbar />
      <div id="container_home" className="container mt-5">
        <div className="TituloHome text-start">
          <h1 className="titulo">SuperMercados</h1>
          <div className="sub-titulo">
            <p className="visitas-mercado">Visitados Recentemente</p>
          </div>
        </div>

        {/* Carousel de mercados visitados */}
        <Carousel slides={slidesVisitados}/>

        <div className="sub-titulo2">
          <p>Perto de você</p>
        </div>

        {/* Carousel de mercados perto de você */}
        <Carousel slides={slidesPerto}/>
      </div>
      <Footer />
    </div>
  )
}

export default HomeMercados
