import React, { useState, useEffect } from "react";
import Scan from "./components/Scan";

const ShowResults = ({ results }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mostCommon = results.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    mostCommon = Object.keys(mostCommon).reduce((a, b) =>
      mostCommon[a] > mostCommon[b] ? a : b
    );

    const fetchDetails = async () => {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${mostCommon}.json`
      );
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoading(false);
    };

    fetchDetails();
  }, [results]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>{data?.status === 0 ? "Product not found" : ""}</p>
          <h3>{data?.product?.product_name}</h3>
          <img
            src={data?.product?.image_front_url}
            alt={data?.product?.product_name}
          />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      {results.length < 5 ? (
        <Scan setResults={setResults} />
      ) : (
        <ShowResults results={results} />
      )}
    </div>
  );
};

export default App;
