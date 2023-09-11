import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";


export default function PreOreder({ data }) {

  const PreOrder = data.filter((product) => product.condition === "Preorder");
  

  return (
    <div className="d-flex flex-column justify-content-center mb-4">
      
      <h1 className="fw-bold fs-4 text-uppercase text-center">PreOrder</h1>
      <Link className=" fw-bold text-decoration-underline fs-6 text-secondary text-center mb-4
       " to={`/collections`}>
        VIEW ALL
      </Link>
      <div className="d-flex gap-4  overflow-y-hidden gap-4 scrollbody px-3" >
        {PreOrder.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        
        ))}
      </div>
     
    </div>
  );
}
