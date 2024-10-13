import imagen1 from '../img/logo.svg'
import imagen2 from '../img/_05ed51eb-35a7-4189-9650-3d09ed352018.jpg'
import imagen3 from '../img/Vision-Artificial.jpg'
function Baner() {
    return (
        <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
            <ol className="carousel-indicators">
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" className="active"></li>
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="container">
                        <div className="row p-5">
                            <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img className="img-fluid" src={imagen1} alt="" />
                            </div>
                            <div className="col-lg-6 mb-0 d-flex align-items-center">
                                <div className="text-align-left align-self-center">
                                    <h1 className="h1 text-success"><b>Compufinder</b></h1>
                                    <h3 className="h2">Sitio ideal para buscar los mejores precios de los Componentes de computadoras que buscas</h3>
                                    <p>
                                        Gracias a nuestro proyecto, podrás obtener un panorama claro de los precios actuales en componentes, ayudándote a tomar decisiones inteligentes de compra. ¡Únete a nuestra misión de hacer el mundo de la tecnología más accesible!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="container">
                        <div className="row p-5">
                            <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img className="img-fluid" src={imagen2}  alt="" />
                            </div>
                            <div className="col-lg-6 mb-0 d-flex align-items-center">
                                <div className="text-align-left">
                                    <h1 className="h1">Misión</h1>
                                    <h3 className="h2">Nuestra misión es desarrollar una plataforma innovadora</h3>
                                    <p>
                                        Nuestra misión es facilitar el proceso de compra de componentes de computadoras al brindar una plataforma que permita a los usuarios comparar precios de manera rápida y eficiente. Nos comprometemos a ofrecer información precisa, actualizada y accesible, mientras aplicamos nuestros conocimientos en programación para crear soluciones que optimicen la experiencia de compra. Este proyecto también refleja nuestro deseo de contribuir al crecimiento tecnológico y de aprendizaje.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="container">
                        <div className="row p-5">
                            <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img className="img-fluid" src={imagen3} alt="" />
                            </div>
                            <div className="col-lg-6 mb-0 d-flex align-items-center">
                                <div className="text-align-left">
                                    <h1 className="h1">Visión</h1>
                                    <h3 className="h2">Nuestra visión es convertirnos en la plataforma líder en la comparación de precios de componentes de computadoras</h3>
                                    <p>
                                        Nuestra visión es ser la plataforma de referencia en la búsqueda y comparación de precios de componentes de computadoras, proporcionando a nuestros usuarios una herramienta fiable, eficiente y completa. Nos esforzamos por ofrecer una experiencia intuitiva que permita a cualquier persona, desde principiantes hasta expertos, encontrar los componentes que necesitan al mejor precio disponible. A largo plazo, queremos posicionarnos como líderes en la industria, conocidos por la innovación y el uso de tecnologías modernas en beneficio de los usuarios.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
                <i className="fas fa-chevron-left"></i>
            </a>
            <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
                <i className="fas fa-chevron-right"></i>
            </a>
        </div>
    );
}

export default Baner;
