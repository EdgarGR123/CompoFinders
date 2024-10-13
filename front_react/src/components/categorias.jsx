import imagen1 from '../img/category_img_01.jpg'
import imagen2 from '../img/category_img_02.jpg'
import imagen3 from '../img/category_img_03.jpg'
function categorias() {
    return (
        <section className="container py-5">
            <div className="row text-center pt-3">
                <div className="col-lg-6 m-auto">
                    <h1 className="h1">Algunos de nuestros Productos</h1>
                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-4 p-5 mt-3">
                    <a href="#">
                        <img src={imagen1} className="rounded-circle img-fluid border" alt="Watches" />
                    </a>
                    <h5 className="text-center mt-3 mb-3">Watches</h5>
                    <p className="text-center">
                        <a className="btn btn-success">Comprar</a>
                    </p>
                </div>
                <div className="col-12 col-md-4 p-5 mt-3">
                    <a href="#">
                        <img src={imagen2} className="rounded-circle img-fluid border" alt="Shoes" />
                    </a>
                    <h5 className="text-center mt-3 mb-3">Shoes</h5>
                    <p className="text-center">
                        <a className="btn btn-success">Comprar</a>
                    </p>
                </div>
                <div className="col-12 col-md-4 p-5 mt-3">
                    <a href="#">
                        <img src={imagen3} className="rounded-circle img-fluid border" alt="Accessories" />
                    </a>
                    <h5 className="text-center mt-3 mb-3">Accessories</h5>
                    <p className="text-center">
                        <a className="btn btn-success">Comprar</a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default categorias;
