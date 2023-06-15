import React, { useState, useEffect } from "react";
import Product from "../components/productos";
import Metric from "../components/metrica";
import "../app/globals.css";




export default function Home() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    fetchData();
    fetchLatestProducts();
  }, []);

  async function fetchLatestProducts() {
    try {
      const latestProductsData = await fetchDataApi("products?limit=6");
      setLatestProducts(latestProductsData);
    } catch (error) {
      console.error("Error fetching latest products:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const productsData = await fetchDataApi("products");
      const cartsData = await fetchDataApi("carts");
      setProducts(productsData);
      setCarts(cartsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function calculateAveragePrice(products) {
    if (products.length === 0) {
      return 0;
    }

    const sumOfPrices = products.reduce((sum, product) => sum + product.price, 0);
    const averagePrice = (sumOfPrices / products.length).toFixed(2);

    return averagePrice;
  }

  function calculateTotalPrice(products, carts) {
    let totalPrice = 0;

    carts.forEach((cart) => {
      cart.products.forEach((product) => {
        const cartProduct = products.find((p) => p.id === product.productId);
        if (cartProduct) {
          totalPrice += cartProduct.price * product.quantity;
        }
      });
    });

    return totalPrice.toFixed(2);
  }

  function getMostSoldProducts(products) {
    const sortedProducts = products.sort((a, b) => b.rating.count - a.rating.count);
    const mostSoldProducts = sortedProducts.slice(0, 3);

    return mostSoldProducts;
  }

  

  setLatestProducts
  return (
    <>
      <div className="home-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <Metric
            data={products.length}
            text="Total de productos"
            icon="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />

          <Metric
            data={carts.length}
            text="No. de pedidos"
            icon="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />

          <Metric
            data={calculateTotalPrice(products, carts)}
            currency={true}
            text="Total generado"
            icon="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />


          <Metric
            data={calculateAveragePrice(products)}
            currency={true}
            text="Precio promedio"
            icon="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </div>

        <section>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Encuentra aquí los productos más vendidos
              </h2>

            </header>

            <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
              {getMostSoldProducts(products).map((product) => (
                <Product key={product.id} object={product} />
              ))}
            </ul>

            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl mt-20">
              Los recomendados del mes:
            </h2>

            <ul className="grid gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {latestProducts.map((product) => (
                <Product key={product.id} object={product} />
              ))}
            </ul>

          </div>
        </section>
      </div>
    </>
  );
}

async function fetchDataApi(apiUrl) {
  try {
    const response = await fetch(`https://fakestoreapi.com/${apiUrl}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

