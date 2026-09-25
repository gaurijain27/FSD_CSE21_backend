import { useEffect, useState } from "react";
import "./App.css";

function App() {

  
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // Get Products
  const getProducts = async () => {

    const response = await fetch(
      "http://localhost:5000/api/products"
    );

    const data = await response.json();

    setProducts(Array.isArray(data) ? data : data.data || []);
  };

  // Run when page loads
  useEffect(() => {
    getProducts();
  }, []);


  // Add Product
  const addProduct = async (e) => {

    e.preventDefault();

    const product = {
      name: name,
      price: Number(price),
      category: category,
      stock: 0
    };

    await fetch("http://localhost:5000/api/products", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(product)
    });

    // Clear form
    setName("");
    setPrice("");
    setCategory("");

    // Get updated products
    getProducts();
  };


  // Delete Product
  const deleteProduct = async (id) => {

    await fetch(
      `http://localhost:5000/api/products/${id}`,
      {
        method: "DELETE"
      }
    );

    getProducts();
  };


  return (
    <div className="container">

      <h1>Product Management System</h1>


      {/* Add Product Form */}

      <form className="form" onSubmit={addProduct}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">
          Add Product
        </button>

      </form>


      <hr />


      {/* Product Table */}

      <div className="table-wrap">
        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>

          </thead>


          <tbody>

            {products.map((product) => (

              <tr key={product.id}>

                <td>{product.id}</td>

                <td>{product.name}</td>

                <td>₹{product.price}</td>

                <td>{product.category}</td>

                <td>

                  <button
                    className="action-btn"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>

    </div>
  );
}

export default App; 