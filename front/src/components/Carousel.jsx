import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from 'sweetalert2';


function Carousel({ slides }) {
  const { setLocalStorage, getLocalStorage } = useContext(GlobalContext);
  const navigate = useNavigate();
  const idMercado = getLocalStorage('id_mercado');
  const listaCompras = getLocalStorage('listaDefout');
  const [aviso, setAviso] = useState(false);

  if (!slides || slides.length === 0) {
    return <div className="spinner"></div>
  }

  const naoSalvarLista = (id) => {
    setAviso(false);
    setLocalStorage('listaDefout', []);
    setLocalStorage('id_mercado', id);
  }
  
  const salvarLista = async (id)  => {
    setAviso(false);
    setLocalStorage('listaDefout', []);
    setLocalStorage('id_mercado', id);
    navigate('/telaDentroMercado');
  }

  const onCardClick = (id) => {
    if (id !== idMercado && listaCompras.length > 0) {
      setAviso(true);
  
      // Exibe o modal do SweetAlert2 com botões personalizados
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Suas compras serão perdidas se entrar em outro mercado sem salvar.\nDeseja mesmo entrar sem salvar sua lista de compras?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Salvar lista',
        cancelButtonText: 'Entrar sem salvar',
        reverseButtons: true,
        customClass: {
          confirmButton: 'btn-confirm',
          cancelButton: 'btn-cancel'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Se o usuário clicar em "Salvar lista", chama a função naoSalvarLista
          salvarLista(id)
        } else {
          // Se o usuário clicar em "Cancelar"
          naoSalvarLista(id);
          console.log('Usuário optou por não sair sem salvar');
        }
      });
    } else {
      // Se não houver compras ou o id for o mesmo, simplesmente navega
      console.log('Navegando para o mercado', id);
      setLocalStorage('id_mercado', id);
      navigate('/telaDentroMercado');
    }
  };

  return (
    <div className="carousel slide" data-bs-ride="false" data-bs-wrap="false">
      <button className="btn-custom carousel-control-prev" type="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <div className="row">
              {slide.map((mercado, idx) => (
                <div className="col-md-4" key={mercado.id_mercado || idx}>
                  <div className="cardMercado" onClick={() => onCardClick(mercado.id_mercado)}>
                    <div className="cardContent">
                      <div className="imagemCard">
                        <img src={`/uploads_images/${mercado.logo}`} alt={mercado.nome} />
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
      <button className="btn-custom carousel-control-next" type="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
}

export default Carousel;