import React, { useState, useCallback, useEffect } from 'react';
import { Card } from './card.component.jsx';
import update from 'immutability-helper';
const style = {
    width: 400,
};
export const Container = (props) => {
    console.log("props container : ",props)
    const [input, setInput] = useState('');
    const {poiList} = props

    const fetchData = async () => {
    return await fetch('http://localhost:8080/api/poi/search')
      .then(response => response.json())
      .then(data => {
        console.log("[init][poiList]: ",data)
        props.updatePoiList(data) 
       });}

     useEffect( () => {fetchData()},[]);
     
const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = poiList[dragIndex];
    props.updatePoiList(update(poiList, {
        $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
        ],
    }));
}, [poiList]);
const renderCard = (card, index) => {
    return (<Card key={card.id} index={index} id={card.id} text={card.name} moveCard={moveCard}/>);
};

        return (
        <>
                <div style={style}>{poiList.map((card, i) => renderCard(card, i))}</div>
		</>
        );
}; 