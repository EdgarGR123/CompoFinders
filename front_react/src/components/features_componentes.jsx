import React from 'react';
import imagen1 from '../img/category_img_01.jpg'
import imagen2 from '../img/category_img_02.jpg'
import imagen3 from '../img/category_img_03.jpg'

function features_componentes() {
    return (
        <section className="bg-light">
            <div className="container py-5">
                <div className="row text-center py-3">
                    <div className="col-lg-6 m-auto">
                        <h1 className="h1">Featured Product</h1>
                        <p>
                            Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card h-100">
                            <a href="shop-single.html">
                                <img src={imagen1} className="card-img-top" alt="Gym Weight" />
                            </a>
                            <div className="card-body">
                                <ul className="list-unstyled d-flex justify-content-between">
                                    <li>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-muted fa fa-star"></i>
                                        <i className="text-muted fa fa-star"></i>
                                    </li>
                                    <li className="text-muted text-right">$240.00</li>
                                </ul>
                                <a href="shop-single.html" className="h2 text-decoration-none text-dark">Gym Weight</a>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card h-100">
                            <a href="shop-single.html">
                                <img src={imagen2} className="card-img-top" alt="Cloud Nike Shoes" />
                            </a>
                            <div className="card-body">
                                <ul className="list-unstyled d-flex justify-content-between">
                                    <li>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-muted fa fa-star"></i>
                                        <i className="text-muted fa fa-star"></i>
                                    </li>
                                    <li className="text-muted text-right">$480.00</li>
                                </ul>
                                <a href="shop-single.html" className="h2 text-decoration-none text-dark">Cloud Nike Shoes</a>
                                <p className="card-text">
                                    Aenean gravida dignissim finibus. Nullam ipsum diam, posuere vitae pharetra sed, commodo ullamcorper.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card h-100">
                            <a href="shop-single.html">
                                <img src={imagen3} className="card-img-top" alt="Summer Addides Shoes" />
                            </a>
                            <div className="card-body">
                                <ul className="list-unstyled d-flex justify-content-between">
                                    <li>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                        <i className="text-warning fa fa-star"></i>
                                    </li>
                                    <li className="text-muted text-right">$360.00</li>
                                </ul>
                                <a href="shop-single.html" className="h2 text-decoration-none text-dark">Summer Addides Shoes</a>
                                <p className="card-text">
                                    Curabitur ac mi sit amet diam luctus porta. Phasellus pulvinar sagittis diam, et scelerisque ipsum lobortis nec.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default features_componentes;
