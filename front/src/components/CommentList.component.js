import React from 'react';

const CommentList = ({commentList=[]}) => {
  return (
    <div>
    { commentList.map((data,index) => {
        if (data) {
          return (
            <div className="card">
                <ul>
                    <li>Note : {data.note} / 5</li>
                    <li>Créé par : {data.userId} (à remplacer par le nom)</li>
                </ul>
                <p>{data.content}</p>
	        </div>	
    	   )	
    	 }
    	 return null
    }) }
    </div>
  );
}

export default CommentList