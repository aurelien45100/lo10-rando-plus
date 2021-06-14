import React from 'react';

const POIofCircuit = ({poiListOfCircuit=[]}) => {
  return (
    <>
    <ul>
    { poiListOfCircuit.map((data,index) => {
      console.log(data)
        if (data) {
          return (
            <div key={data.name}>
              <li>{data.name}</li>
	    </div>	
    	   )	
    	 }
    	 return null
    }) }
    </ul>
    </>
  );
}

export default POIofCircuit