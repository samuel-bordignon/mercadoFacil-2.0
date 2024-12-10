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
  const listaCompras = getLocalStorage('listaDefout')
  const [produtosdb, setProdutosdb] = useState([])

  const calcularDistanciaRota = async (endereco1, endereco2, profile) => {
    if (endereco1?.longitude && endereco1?.latitude && endereco2?.longitude && endereco2?.latitude && profile) {
      const startPoint = [endereco1.longitude, endereco1.latitude] // Longitude e Latitude do primeiro endereço
      const endPoint = [endereco2.longitude, endereco2.latitude] // Longitude e Latitude do segundo endereço

      // Velocidades médias em m/s
      const veloCaminhada = 3.78
      const veloBicicleta = 4.7
      const veloCarro = 7.88

      const url = `http://router.project-osrm.org/route/v1/car/${startPoint.join(',')};${endPoint.join(',')}?overview=false&geometries=polyline`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`)
        }


        const data = await response.json()
        const route = data.routes?.[0]

        if (!route) {
          throw new Error('Nenhuma rota encontrada entre os pontos especificados.')
        }

        const distanceInMeters = route.distance // Distância em metros
        const distanceInKm = (distanceInMeters / 1000).toFixed(2) // Distância em km

        // Escolher velocidade baseada no perfil
        let velocidadeEscolhida
        switch (profile) {
          case 'walk':
            velocidadeEscolhida = veloCaminhada
            break
          case 'bike':
            velocidadeEscolhida = veloBicicleta
            break
          case 'car':
            velocidadeEscolhida = veloCarro
            console.log('escolheu carro')
            break
          default:
            velocidadeEscolhida = veloCaminhada
            break
        }

        // Calcular duração em horas
        const durationInMin = (distanceInMeters / velocidadeEscolhida / 60)

        const formataMinutos =
          durationInMin >= 60
            ? `${Math.floor(durationInMin / 60)}h ${durationInMin % 60}min`
            : `${durationInMin.toFixed(0)}min`


        return { distanceInKm, formataMinutos }
      } catch (error) {
        console.error('Erro ao calcular a rota:', error.message)
      }
    } else {
      console.error('Os endereços ou perfil não foram fornecidos corretamente.')
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)

      // Buscar dados principais
      const [mercados, enderecosMercados] = await Promise.all([
        getData('mercados'),
        getData('enderecomercados'),
      ])
      setMercados(mercados || [])

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
              distancia: (rota?.distanceInKm) || 'N/A',
              tempo: `${(rota?.formataMinutos || 0)}`,
              enderecoMercado
            };

            if (distanciaRaio <= 5000) {
              mercadosDentro.push(mercadoFormatado);
            } else {
              mercadosFora.push(mercadoFormatado);
            }
            return { mercadoFormatado }
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
      <Navbar listaCompras={listaCompras} produtosdb={[]} setProdutosdb={setProdutosdb}/>
      <div id="container_home" className="container-home">
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
