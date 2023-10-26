import React  from "react";


export default function Home({data}) {
  
  return (
    <div>
      <div
        className="container  w-75  border border-1 mt-5 rounded-2 shadow p-4 mb-4 bg-white "
        style={{ height: "350px" }}
      >
        <div
          class="  mx-auto"
          style={{ width: "330px ", fontSize: "30px" }}
        >
          Home Page
        </div>
      <h3>Name:{data.name}</h3>
      <h4>Email:{data.email}</h4>
      </div>
      
    </div>
  );
}
