import React from 'react';
import { styled } from "frontity";

const Review = ({id, author, image, role, review, reviewIndex, index}) => {
    let position = "nextSlide";
    if(reviewIndex === index){
       position = 'activeSlide'
      }
    if(reviewIndex === index - 1 || (index === 0 && reviewIndex === review.length - 1)){
       position = 'lastSlide'
      }
     return(
         <Container className={position} key={id}>
            <OrderOne>
               <Author className="text">{author}</Author>
               <Role className="text">{role}</Role>
               <hr></hr>
               <ReviewText>"{review}"</ReviewText>
            </OrderOne>
            <OrderTwo>
               <ImageAvatar height="128" width="128" src={image} alt={author + " " + role} />
            </OrderTwo>
         </Container>
        );
       }

       export default Review;

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)
       
const ImageAvatar = styled.img`
line-height: 0;		/* remove line-height */ 
display: inline-block;	/* circle wraps image */
margin: 5px;
border: 4px solid rgba(200,200,200,0.4);
border-radius: 50%;	/* relative value */
/*box-shadow: 0px 0px 5px rgba(0,0,0,0.4);*/
transition: linear 0.25s;
height: 250px;
width: 250px;
`;
const Container = styled.div`
display: flex;
flex-direction: row;
${mq[2]} {
flex-direction: column;
}
`;

const OrderOne = styled.div`
align-items: center;
display flex;
flex-direction: column;
margin: auto;
width: 90%;
padding: 30px 0 30px 0;
${mq[2]} {
  width: 80%;
  text-align: center;
}
`;
const OrderTwo = styled.div`
align-items: center;
display flex;
flex-direction: column;
margin: auto;
width: 90%;
padding: 30px 0 30px 0;
text-align: center;
${mq[2]} {
  width: 80%;
  order: -1;
}
`;

const Author = styled.p`
font-size: 22px;
line-height: 1.5;
`;
const Role = styled.p`
font-size: 20px;
line-height: 1.5;
font-style: italic;
`;
const ReviewText = styled.p`
font-size: 18px;
line-height: 1.5;

`;
