"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductCard({ product, onAddToCart, onRemoveFromCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(product);
    setQuantity(quantity + 1);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      onRemoveFromCart(product);
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white p-5 gap-4 flex flex-col justify-center items-center shadow-md m-2 w-1/3">
      <img src={product.image} alt={product.title} className=" productImage mb-2" />
      <p className="text-lg text-base font-semibold">{product.title}</p>
      <p className="text-gray-500">${product.price}</p>
      <div className="flex items-center justify-center w-full mt-2">
        <button onClick={handleRemoveFromCart} className="bg-gray-200 w-1/4 flex justify-center p-1 rounded">
          -
        </button>
        <span className="mx-2">{quantity}</span>
        <button onClick={handleAddToCart} className="bg-blue-500 w-1/4 flex justify-center text-white p-1 rounded">
          +
        </button>
      </div>
      <button onClick={() => onAddToCart(product)} className=" self-center flex justify-center bg-green-500 text-white p-2 rounded w-3/4">
        Add to Cart
      </button>
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setTotalItemsInCart(totalItemsInCart + 1); // Update the total items count
  };

  const handleRemoveFromCart = (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
  };

  return (
    <div className=" w-full p-4">
      <div className="my-5 flex justify-between w-full px-10 items-center">
        <h1 className="text-2xl font-semibold ">Product List</h1>
        <p className="text-xl font-semibold">Items in Cart: {totalItemsInCart}</p>
      </div>
      <div className="flex w-full items-center gap-20 justify-center flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          ))
        )}
      </div>

    </div>
  );
}

export default ProductList;
