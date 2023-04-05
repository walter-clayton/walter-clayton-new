import React from 'react';

const Review = ({id, author, review, reviewIndex, index}) => {
    let position = "nextSlide";
    if(reviewIndex === index){
       position = 'activeSlide'
      }
    if(reviewIndex === index - 1 || (index === 0 && reviewIndex === review.length - 1)){
       position = 'lastSlide'
      }
     return(
        <div className={position} key={id}>
        <p className="title">{review}</p>
        <hr></hr>
        <p className="text">{author}</p>
        </div>
        );
       }

       export default Review;