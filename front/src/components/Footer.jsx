import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <div className='container-pagina'>
            <div className="container-footer">
                <hr className="footer-hr" />
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Mercado Fácil</h3>
                        <p>Site Institucional</p>
                    </div>
                    <div className="footer-section">
                        <h3>Descubra</h3>
                        <p>Cadastre seu Restaurante ou Mercado</p>
                    </div>
                    <div className="footer-section social">
                        <h3>Social</h3>
                        <div className="social-icons">
                            <i className="bi bi-facebook fs-4"></i>
                            <i className="bi bi-twitter-x fs-4"></i>
                            <i className="bi bi-youtube fs-4"></i>
                            <i className="bi bi-instagram fs-4 "></i>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
}

export default Footer;
