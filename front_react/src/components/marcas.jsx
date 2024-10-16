import aeon from '../img/aeon logo.jpg'
import kayfa from '../img/kayfa-logo.svg'
import intelmax from '../img/intelmax.svg'
import zona_digital from '../img/zona digital logo.svg' 
export default function Marcas() {
    return (
        <section className="bg-light py-5">
            <div className="container my-4">
                <div className="row text-center py-3">
                    <div className="col-lg-6 m-auto">
                        <h1 className="h1">Nuestro equipo</h1>
                        <p>Conoce a los sitios web que forman parte de nuestro equipo.</p>
                    </div>
                    <div className="col-lg-9 m-auto tempaltemo-carousel">
                        <div className="row d-flex flex-row">
                            {/* Controls */}
                            <div className="col-1 align-self-center">
                                <a className="h1" href="#templatemo-slide-brand" role="button" data-bs-slide="prev">
                                    <i className="text-light fas fa-chevron-left"></i>
                                </a>
                            </div>
                            {/* End Controls */}

                            {/* Carousel Wrapper */}
                            <div className="col">
                                <div className="carousel slide carousel-multi-item pt-2 pt-md-0" id="templatemo-slide-brand" data-bs-ride="carousel">
                                    {/* Slides */}
                                    <div className="carousel-inner product-links-wap" role="listbox">

                                        {/* First slide */}
                                        <div className="carousel-item active">
                                            <div className="row">
                                                <div className="col-3 p-md-5">
                                                    <a href="https://kayfa-store.com/"><img className="img-fluid brand-img" src={kayfa} alt="Brand Logo" /></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="https://www.aeon.com.sv/"><img className="img-fluid brand-img" src={aeon} alt="Brand Logo" /></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src={zona_digital} alt="Brand Logo" /></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src={intelmax} alt="Brand Logo" /></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="carousel-item">
                                            <div className="row">
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="carousel-item">
                                            <div className="row">
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                                                </div>
                                                <div className="col-3 p-md-5">
                                                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>



                            <div className="col-1 align-self-center">
                                <a className="h1" href="#templatemo-slide-brand" role="button" data-bs-slide="next">
                                    <i className="text-light fas fa-chevron-right"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
