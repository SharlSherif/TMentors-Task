import React, { useEffect, useState } from "react";
import "./App.css";

// I know that this is supposed to be an environment variable
const API = "http://localhost:4000/api/";

function App() {
  // ?filters
  const [CategoryFilterID, setCategoryFilterID] = useState("All");
  const [BrandFilterID, setBrandFilterID] = useState("All");
  const [PriceFilter, setPrice] = useState(0);
  // ?filters


  //? all products, never modified after initialization
  const [products, setProducts] = useState([]);
  //? products that actually get rendered, modified with filters (used for proper filtering)
  const [productsRender, setProductsRender] = useState(products);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  console.log(products, categories, PriceFilter);
  // ? I could've used Redux Saga or Thunk but it's way too simple for that
  useEffect(() => {
    const getProductsWithCategoriesAJAX = async () => {
      //? check if the data is already cached before making a GET request
      let cachedData = sessionStorage.getItem("data");

      //? products exist in sessionStorage
      if (cachedData !== null) {
        console.log("Loaded from cache");

        let cachedDataParsed = JSON.parse(cachedData);

        setProducts(cachedDataParsed.products);
        setCategories(cachedDataParsed.categories);
        setBrands(cachedDataParsed.brands);
      } else {
        console.log("Had to make a request");

        fetch(API + "product")
          .then((response) => response.json())
          .then((data) => {
            // ? store it in sessionStorage, not localStorage because we want it to be cleared when the browser is closed since localStorage never expires
            sessionStorage.setItem("data", JSON.stringify(data));

            setProducts(data.products);
            setCategories(data.categories);
            setBrands(data.brands);
          });
      }
    };
    getProductsWithCategoriesAJAX();

    RenderProducts();
  }, [CategoryFilterID, BrandFilterID, PriceFilter]);

  //? responsible for applying filters without breaking the original array of products
  const RenderProducts = () => {
    let currentProducts = products;

    if (CategoryFilterID !== "All") {
      // CategoryFilterID is going to contain the category ID to filter by
      currentProducts = currentProducts.filter(
        (product) => product.category._id == CategoryFilterID
      );
    }
    if (BrandFilterID !== "All") {
      // BrandFilterID is going to contain the category ID to filter by
      currentProducts = currentProducts.filter(
        (product) => product.brand._id == BrandFilterID
      );
    }

    if (PriceFilter > 0) {
      // BrandFilterID is going to contain the category ID to filter by
      currentProducts = currentProducts.filter(
        (product) => product.price <= PriceFilter
      );
    }

    setProductsRender(currentProducts);
  };

  const SearchThroughProducts = (query) => {
    //? incase the query is empty, return all the products
    if (query.length < 1) {
      setProductsRender(products);
      return;
    }
    query = query.toLowerCase();
    let results = [];
    for (let product of products) {
      if (
        product.name.toLowerCase().includes(query) ||
        product.name.toLowerCase().includes(query)
      ) {
        results.push(product);
      }
    }

    setProductsRender(results);
  };

  return (
    <div className="App">
      <input onChange={(e) => SearchThroughProducts(e.target.value)} />
      <input
        placeholder="price"
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      {categories.map((category) => {
        return (
          <p onClick={() => setCategoryFilterID(category._id)}>
            {category.name}
          </p>
        );
      })}

      {brands.map((brand) => {
        return <p onClick={() => setBrandFilterID(brand._id)}>{brand.name}</p>;
      })}
      {productsRender.map((product) => {
        return (
          <p>
            {product.price} - {product.name}
          </p>
        );
      })}
    </div>
  );
}

export default App;
