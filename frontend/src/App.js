import React, { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

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
      if (product.name.toLowerCase().includes(query)) {
        results.push(product);
      }
    }

    setProductsRender(results);
  };

  return (
    <div className="box">
      <div className="left">
        <h4 className="title">Price</h4>

        <div className="price-range">
          <input
            placeholder="maximum price"
            className="form-control"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="filters">
          <h4 className="title">Categories</h4>
          <ul>
            <li>
              <input
                name="category"
                onClick={() => setCategoryFilterID("All")}
                type="radio"
                className="choice"
              />

              <span>All Categories</span>
            </li>
            {categories.map((category) => {
              return (
                <li>
                  <input
                    name="category"
                    onClick={() => setCategoryFilterID(category._id)}
                    type="radio"
                    className="choice"
                  />

                  <span>{category.name}</span>
                </li>
              );
            })}
          </ul>

          <h4 className="title">Brands</h4>

          <ul>
            <li>
              <input
                name="brand"
                onClick={() => setBrandFilterID("All")}
                type="radio"
                className="choice"
              />

              <span>All Brands</span>
            </li>
            {brands.map((brand) => {
              return (
                <li>
                  <input
                    onClick={() => setBrandFilterID(brand._id)}
                    type="radio"
                    name="brand"
                    className="choice"
                  />

                  <span>{brand.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="right">
        <input
          onChange={(e) => SearchThroughProducts(e.target.value)}
          className="search-input form-control"
          placeholder="Search.."
        />

        <div className="grid">
          {productsRender.length < 1 && <p>No results were found</p>}
          {productsRender.map((product) => {
            return (
              <ProductCard product={product} />
              // <p>
              //   {product.price} - {product.name}
              // </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
