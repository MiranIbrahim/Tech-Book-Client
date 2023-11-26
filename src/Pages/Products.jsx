import { useState, useEffect } from 'react';

import useProducts from '../Hooks/useProducts';
import { Link } from 'react-router-dom';
import { GrLike } from 'react-icons/gr';

const Products = () => {
  const api = '/products';
  const key = 'products';
  const [products, loading, refetch] = useProducts({ api, key });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const pageSize = 20;

//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;

//   const paginatedProducts = products.slice(startIndex, endIndex);

//   useEffect(() => {
//     refetch();
//   }, [currentPage, refetch]);

//   const handleSearch = () => {
//     setCurrentPage(1);
//     refetch();
    
//   };

  return (
    <div className="py-10">
      <h2 className="my-10 text-3xl text-center ">All Products</h2>
      {/* <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by tags"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={handleSearch} className="btn btn-primary ml-2">
          Search
        </button>
      </div> */}
      <div className="md:grid grid-cols-4 gap-4">
        {products.map((item) => (
          <div key={item._id} className="card bg-base-100 border">
            
            <figure className="px-10 pt-10">
                  <img src={item.image} alt='' className="rounded-xl" />
                </figure>
                <div className="card-body">
                  <Link to={`/productDetails/${item._id}`}><h2 className="card-title hover:underline">{item.productName}</h2></Link>
                  <div>Tags: {item.tags.map((tag,index) => <div key={index} className="badge badge-secondary badge-outline mr-2">{tag}</div>)}</div>
                  <div className="text-lg flex items-center gap-3">
                    <button className="text-lg "><GrLike></GrLike></button> <p>{item.upvoteCount} </p>
                  </div>
                </div>
          </div>
        ))}
      </div>
      {/* <div className="my-5 flex justify-between">
        {currentPage > 1 && (
          <button className="btn btn-primary" onClick={() => setCurrentPage((prev) => prev - 1)}>
            Previous Page
          </button>
        )}
        {currentPage * pageSize < products.length && (
          <button className="btn btn-primary" onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next Page
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Products;
