import React from 'react';

const POIList = ({poiList=[]}) => {
  return (
    <>
    <ul>
    { poiList.map((data,index) => {
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

export default POIList