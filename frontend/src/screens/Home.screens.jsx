import { useEffect, useState } from "react";

import CardComponent from "@/components/Card.component";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex gap-10 flex-wrap">
      {products.map((product) => (
        <CardComponent key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Home;
