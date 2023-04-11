import { styled, css } from "frontity";
import React, { useState, useEffect, useRef } from "react";
import profileImage from "../../../../static/images/profile.png";
import inspirationImage from "../../../../static/images/brancusi.png";
import peterWilding from "../../../../static/images/peter-wilding.jpeg";
import younesElmiri from "../../../../static/images/younes-elmiri.jpeg";
import virgileBarbieux from "../../../../static/images/virgile-barbieux.jpeg";
import jeanBernard from "../../../../static/images/jean-bernard-tanquery.jpeg";
import christinaImage from "../../../../static/images/christina.jpeg";
import julietCarter from "../../../../static/images/juliet-carter.jpeg";
import beaPava from "../../../../static/images/bea-pava.jpeg";
import claudiuCornea from "../../../../static/images/claudiu-cornea.jpeg";
import Review from "../components/review";
import data from "../../../../static/data/reviews.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const sectionOneRef = useRef(null); // Define sectionOneRef here
  const sectionTwoRef = useRef(null); // Define sectionTwoRef here
  const sectionThreeRef = useRef(null); // Define sectionTwoRef here

  const [reviews, setReviews] = useState(data);
  const [index, setIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const review = reviews[index];

  const handlePrev = () => {
    setIndex(index - 1 < 0 ? reviews.length - 1 : index - 1);
    setReviewIndex(reviewIndex - 1 < 0 ? reviews.length - 1 : reviewIndex - 1);
  };

  const handleNext = () => {
    setIndex((index + 1) % reviews.length);
    setReviewIndex((reviewIndex + 1) % reviews.length);
  };
  
  const [isSectionOneVisible, setIsSectionOneVisible] = useState(false);
  const [isSectionTwoVisible, setIsSectionTwoVisible] = useState(false);
  const [isSectionThreeVisible, setIsSectionThreeVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.target === sectionOneRef.current) {
          setIsSectionOneVisible(entry.isIntersecting);
        }
        if (entry.target === sectionTwoRef.current) {
          setIsSectionTwoVisible(entry.isIntersecting);
        }
        if (entry.target === sectionThreeRef.current) {
          setIsSectionThreeVisible(entry.isIntersecting);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );
    
    if (sectionOneRef.current) {
      observer.observe(sectionOneRef.current);
    }
    
    if (sectionTwoRef.current) {
      observer.observe(sectionTwoRef.current);
    }

    if (sectionThreeRef.current) {
      observer.observe(sectionThreeRef.current);
    }
    
    return () => {
      if (sectionOneRef.current) {
        observer.unobserve(sectionOneRef.current);
      }
      
      if (sectionTwoRef.current) {
        observer.unobserve(sectionTwoRef.current);
      }
      if (sectionThreeRef.current) {
        observer.unobserve(sectionThreeRef.current);
      }
    };
  }, []);


  return (
    <AboutMain>
      <SectionOne>
        <ContainerParent ref={sectionOneRef} isVisible={isSectionOneVisible}>
            <OrderOne>
              <Title>Walter Clayton</Title>
              <Subtitle>Turning abstract ideas into clean and simple solutions.</Subtitle>   
            </OrderOne>
            <OrderTwo>
              <Image src={profileImage} alt="walter clayton profile picture" />
            </OrderTwo>
          </ContainerParent>
      </SectionOne>
      <SectionOneSvg preserveAspectRatio="xMidYMin slice" width="100%" height="100%" viewBox="0 0 1513 92" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M1512.12 1.20728H0.115723L1512.12 91.61V1.20728Z" fill="#FECBB8" />
        <path d="M0.115723 90.8214H1512.12L0.115723 0.418701V90.8214Z" fill="#507A95" />
      </SectionOneSvg>
      <SectionTwo>
        <ContainerParent ref={sectionTwoRef} isVisible={isSectionTwoVisible}>
          <OrderOne>
            <Image src={inspirationImage} alt="Brancusi" />
          </OrderOne>
          <OrderOne>
            <Quote
            css={css`
            color: white;
            }`
            }>
            “Simplicity is complexity resolved”</Quote>
            <hr></hr>
            <Author
            css={css`
            color: white;
            }`
            }>
            Constantin Brancusi</Author>
          </OrderOne>
        </ContainerParent>
      </SectionTwo>
        <SectionTwoSvg preserveAspectRatio="xMidYMin slice"
          width="834" height="91" viewBox="0 0 834 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0.540039H835L0 91V0.540039Z" fill="#507A95"/>
        <path d="M835 91H-3.85046e-05L835 0.540009V91Z" fill="white"/>
        </SectionTwoSvg>
        <SectionThree>
          <ContainerParent ref={sectionThreeRef} isVisible={isSectionThreeVisible}>
            <ContainerParentReview>
                <button type="button" onClick={handlePrev} css={css`text-decoration: none; border: none; background: none;}`}>
                <FontAwesomeIcon icon={faChevronLeft} size="5x" css={css`color: #507A95;:hover{color: #FECBB8;}`}/>
                </button>
              <ContainerReview>
                <Review key={`review-${reviewIndex}`} {...review} reviewIndex={reviewIndex} index={index}></Review>
                <ButtonContainer>
                </ButtonContainer>  
              </ContainerReview>
                  <button type="button" onClick={handleNext} css={css`text-decoration: none; border: none; background: none;}`}>
                  <FontAwesomeIcon icon={faChevronRight} size="5x" css={css`color: #507A95;:hover{color: #FECBB8;}`}/>
                  </button>
            </ContainerParentReview>
          </ContainerParent>
        </SectionThree>
        <SectionThreeSvg preserveAspectRatio="xMidYMin slice"
         width="100%" height="100%" viewBox="0 0 1512 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1512 0.0209961H0L1512 90.4237V0.0209961Z" fill="white"/>
        </SectionThreeSvg>
      </AboutMain>
  )
}

export default About;

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const AboutMain = styled.div`
  width: 100%;
  justify-content: center;
`;
const SectionOne = styled.div`
  background-color: #FECBB8;
  height: 90vh;
  display: flex;
  ${mq[2]} {
    height: 100vh;
  }
`;
const SectionTwo = styled.div`
  margin-top: -25px;
  background-color: #507A95;
  height: 90vh;
  display: flex;
  flex-direction: column;
  ${mq[2]} {
    height: 100vh;
  }
`;
const SectionThree = styled.div`
  margin-top: -25px;
  background-color: white;
  height: 90vh;
  display: flex;
  ${mq[2]} {
    height: 100vh;
    text-align: center;  
  }
`;
const ContainerParent = styled.div`
  margin-top: 10px;
  margin: auto;
  display: flex;
  flex-direction: row;
  ${mq[2]} {
    flex-direction: column;
  }
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
`;
const ContainerParentReview = styled.div`
  max-width: 1200px;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 90%;
  padding: 30px 0 30px 0;
  ${mq[2]} {
  }
`;
const SectionOneSvg = styled.svg`
  width: 100%;
  margin-top: -25px;
  height: 50px;
`;
const SectionTwoSvg = styled.svg`
  width: 100%;
  margin-top: -25px;
  overflow: visible;
`;
const SectionThreeSvg = styled.svg`
  width: 100%;
  height: 50px;
  overflow: visible;
`;

const Image = styled.img`
  width: inherit;
`;

const ContainerReview = styled.div`
  padding: 50px;
  ${mq[2]} {
    padding: 0px;
  }
`;

const OrderOne = styled.div`
align-items: center;
display flex;
flex-direction: column;
margin: auto;
width: 100%;
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
${mq[2]} {
  width: 80%;
  order: -1;
  text-align: center;
}
`;
const ButtonContainer = styled.div`
text-align: center; 
`;

const Title = styled.p`
font-size: 32px;
line-height: 1.5;
font-weight: 800;
}
`;
const Subtitle = styled.p`
font-size: 22px;
line-height: 1.5;
}
`;
const Quote = styled.p`
font-size: 22px;
line-height: 1.5;
}
`;
const Author = styled.p`
font-size: 20px;
line-height: 1.5;
}
`;