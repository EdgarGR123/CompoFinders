import logo from '..//img/logoconfondo.svg'

export default function nuestra_hsitoria() {
    return (
        <section className="bg-success py-5">
        <div className="container">

            <div className="row align-items-center py-2">
                <div className="col-md-6">
                    <h1 className="h1 text-white font-weight-bold">Nuestra historia</h1>
                    <p className="text-white lead font-italic animate__animated animate__fadeInUp animate__slower">
                        <span className="text-success">En Compufinder, nos dedicamos a facilitar la búsqueda y comparación de precios de componentes de computadoras.</span>
                        <br />
                        <span className="text-white">Nuestro objetivo es ayudarte a encontrar las mejores ofertas y productos de alta calidad para que puedas armar o actualizar tu equipo con confianza.</span>
                    </p>
                </div>
                <div className="col-md-6 text-center">
                    <img src={logo} alt="About Hero" className="img-fluid rounded-circle shadow animate__animated animate__fadeInRight animate__slower" style={{ width: "400px", height: "400px" }} />
                </div>
            </div>
            
            <div className="row">
                <div className="row waypoint" data-animate="fadeInUp">
                    <div className="col-md-12">
                        <h2 className="h2 text-white font-weight-bold">Nuestra misión</h2>
                        <p className="text-white lead">
                            Nuestra misión es facilitar el proceso de compra de componentes de computadoras al brindar una plataforma que permita a los usuarios comparar precios de manera rápida y eficiente. Nos comprometemos a ofrecer información precisa, actualizada y accesible, mientras aplicamos nuestros conocimientos en programación para crear soluciones que optimicen la experiencia de compra.
                        </p>
                    </div>
                </div>
                <div className="row waypoint" data-animate="fadeInUp" style={{ marginTop: "20px" }}>
                    <div className="col-md-12">
                        <h2 className="h2 text-white font-weight-bold">Nuestra visión</h2>
                        <p className="text-white lead">
                            Nuestra visión es ser la plataforma de referencia en la búsqueda y comparación de precios de componentes de computadoras, proporcionando a nuestros usuarios una herramienta fiable, eficiente y completa. Nos esforzamos por ofrecer una experiencia intuitiva que permita a cualquier persona, desde principiantes hasta expertos, encontrar los componentes que necesitan al mejor precio disponible.
                        </p>
                    </div>
                </div>
                <div className="row waypoint" data-animate="fadeInUp" style={{ marginTop: "20px" }}>
                    <div className="col-md-12">
                        <h2 className="h2 text-white font-weight-bold">Nuestros valores</h2>
                        <div className="row">
                            <div className="col-md-4 waypoint" data-animate="fadeInLeft">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <i className="fa fa-check-circle fa-fw fa-2x text-success"></i>
                                        <h5 className="card-title text-white">Transparencia</h5>
                                        <p className="card-text text-white">Ofrecemos información clara y precisa sobre precios y características de los productos.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 waypoint" data-animate="fadeInUp">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <i className="fa fa-check-circle fa-fw fa-2x text-success"></i>
                                        <h5 className="card-title text-white">Calidad</h5>
                                        <p className="card-text text-white">Solo trabajamos con los sitios más confiables para garantizar que encuentres componentes de alta calidad.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 waypoint" data-animate="fadeInRight">
                                <div className="card border-0 shadow">
                                    <div className="card-body">
                                        <i className="fa fa-check-circle fa-fw fa-2x text-success"></i>
                                        <h5 className="card-title text-white">Innovación</h5>
                                        <p className="card-text text-white">Continuamente mejoramos nuestra plataforma para ofrecerte la mejor experiencia de usuario.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
    );
}