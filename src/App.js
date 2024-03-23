import React, { useState, useEffect } from "react";
import Scan from "./components/Scan";

const ShowResults = ({ result }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${result}.json`
      );
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoading(false);
    };

    fetchDetails();
  }, [result]);

  console.log(data);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
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
  const [result, setResult] = useState(null);

  return (
    <div>
      {!result ? (
        <Scan setResult={setResult} />
      ) : (
        <ShowResults result={result} />
      )}
    </div>
  );
};

export default App;
