import React, { useContext } from 'react';
import './HomeMercados.css';
import Navbar from '../components/Navbar';
import { GlobalContext } from '../contexts/GlobalContext';

function HomeMercados() {
  const { mercadosVisitados } = useContext(GlobalContext);

  const slidesVisitados = [];
  const slidesPerto = [];

  // Agrupando os mercados visitados em slides
  for (let i = 0; i < mercadosVisitados.length; i += 3) {
    slidesVisitados.push(mercadosVisitados.slice(i, i + 3));
    slidesPerto.push(mercadosVisitados.slice(i, i + 3)); 
  }

  return (
    <div>
      <Navbar />
      <div id="container_home" className="container mt-5">
        <div className="TituloHome text-start">
          <h1 className="titulo">SuperMercados</h1>
          <div className='sub-titulo'>
            <p className="visitas-mercado">Visitados Recentemente</p>
          </div>
        </div>

        {/* Carousel de mercados visitados */}
        <div id="carouselVisitados" className="carousel slide" data-bs-ride="false" data-bs-wrap="false">
          <div className="carousel-inner">
            {slidesVisitados.map((slide, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="row">
                  {slide.map((mercado, idx) => (
                    <div className="col-md-4" key={idx}>
                      <div className="cardMercado">
                        <div className='cardContent'>
                          <div className="imagemCard">
                            <img src={mercado.logo} alt={`Mercado ${idx + 1}`} />
                          </div>
                          <div className="info-mercado">
                            <p className="nome-mercado">{mercado.nome}</p>
                            <p className="detalhes-mercado">{mercado.distancia} • {mercado.tempo}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Botões de navegação */}
          <button className="btn-custom carousel-control-prev" type="button" data-bs-target="#carouselVisitados" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="btn-custom carousel-control-next" type="button" data-bs-target="#carouselVisitados" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>

        <div className='sub-titulo2'>
          <p>Perto de você</p>
        </div>

        {/* Carousel de mercados perto de você */}
        <div id="carouselPerto" className="carousel slide" data-bs-ride="false" data-bs-wrap="false">
          <div className="carousel-inner">
            {slidesPerto.map((slide, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="row">
                  {slide.map((mercado, idx) => (
                    <div className="col-md-4" key={idx}>
                      <div className="cardMercado">
                        <div className='cardContent'>
                          <div className="imagemCard">
                            <img src={mercado.logo} alt={`Mercado ${idx + 1}`} />
                          </div>
                          <div className="info-mercado">
                            <p className="nome-mercado">{mercado.nome}</p>
                            <p className="detalhes-mercado">{mercado.distancia} • {mercado.tempo}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Botões de navegação */}
          <button className="btn-custom carousel-control-prev" type="button" data-bs-target="#carouselPerto" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="btn-custom carousel-control-next" type="button" data-bs-target="#carouselPerto" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>

        {/* Outro Carousel de mercados perto de você (opcional) */}
        <div id="carouselPerto2" className="carousel slide" data-bs-ride="false" data-bs-wrap="false">
          <div className="carousel-inner">
            {slidesPerto.map((slide, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="row">
                  {slide.map((mercado, idx) => (
                    <div className="col-md-4" key={idx}>
                      <div className="cardMercado">
                        <div className='cardContent'>
                          <div className="imagemCard">
                            <img src={mercado.logo} alt={`Mercado ${idx + 1}`} />
                          </div>
                          <div className="info-mercado">
                            <p className="nome-mercado">{mercado.nome}</p>
                            <p className="detalhes-mercado">{mercado.distancia} • {mercado.tempo}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Botões de navegação */}
          <button className="btn-custom carousel-control-prev" type="button" data-bs-target="#carouselPerto2" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="btn-custom carousel-control-next" type="button" data-bs-target="#carouselPerto2" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeMercados;
