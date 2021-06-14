import React, { useState, useEffect } from 'react';
import CreateCircuit from "./create-circuit.component";

const CreateCircuits = (props) => {
  const [circuitList, setCircuitList] = useState();

  const fetchData = async () => {
    return await fetch('http://localhost:8080/api/circuits/search')
      .then(response => response.json())
      .then(data => {
        console.log("[init][CreateCircuits]: ",data)
        setCircuitList(data) 
       });}  

  useEffect(() => {
    console.log("[OK] : useEffect / CreateCircuits")
    fetchData()
  },[]);
	

  return (
    <>
      {
        circuitList && <CreateCircuit circuitList={circuitList}/>
      }
    {/*   <div>
        {circuitList.map(e => {
          console.log(e)
        })
        }
      </div> */}
      {/* <MapWithMarker markers = {poiList}/> */}
    </>
   );
}

export default CreateCircuits