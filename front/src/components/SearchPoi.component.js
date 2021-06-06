import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.component';
import POIList from './POIList.component';

const SearchPoi = (props) => {
  const [input, setInput] = useState('');
  const [poiListDefault, setPoiListDefault] = useState();
  const [poiList, setPoiList] = useState();

  const fetchData = async () => {
    return await fetch('http://localhost:8080/api/poi/search')
      .then(response => response.json())
      .then(data => {
         setPoiList(data) 
         setPoiListDefault(data)
       });}

  const updateInput = async (input) => {
     const filtered = poiListDefault.filter(poi => {
      return poi.name.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setPoiList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
      <h1>Liste des POI</h1>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <POIList poiList={poiList}/>
    </>
   );
}

export default SearchPoi