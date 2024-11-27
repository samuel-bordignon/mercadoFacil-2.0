import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

function Carousel({ slides}) {
    const { setLocalStorage } = useContext(GlobalContext);
    const navigate = useNavigate();

  if (!slides || slides.length === 0) {
    return <div>Carregando...</div>;
  }

  const onCardClick = (id) => {
    setLocalStorage('id_mercado', id);
    navigate('/telaDentroMercado');
  }

  return (
    <div className="carousel slide" data-bs-ride="false" data-bs-wrap="false">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <div className="row">
              {slide.map((mercado, idx) => (
                <div className="col-md-4" key={mercado.id_mercado || idx}>
                  <div className="cardMercado" onClick={() => onCardClick(mercado.id_mercado)}>
                    <div className="cardContent">
                      <div className="imagemCard">
                        <img src={mercado.logo} alt={mercado.nome} />
                      </div>
                      <div className="info-mercado">
                        <p className="nome-mercado">{mercado.nome}</p>
                        <p className="detalhes-mercado">{mercado.distancia} km • {mercado.tempo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="btn-custom carousel-control-prev" type="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="btn-custom carousel-control-next" type="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
}

export default Carousel;