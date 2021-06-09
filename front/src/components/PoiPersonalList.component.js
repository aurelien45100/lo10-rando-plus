import React from 'react';

const POIPersonalList = ({poiList=[]}) => {
  return (
    <>
    <ul>
    { poiList.map((data,index) => {
        if (data) {
          return (
            <div key={data.name}>
              <li>{data.name} - <a href={"http://localhost:8080/api/poi/delete/"+data.id}>SUPPRIMER</a></li>
	    </div>	
    	   )	
    	 }
    	 return null
    }) }
    </ul>
    </>
  );
}

export default POIPersonalList