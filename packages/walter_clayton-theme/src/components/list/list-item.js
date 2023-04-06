import { connect, styled } from "frontity";
import { css } from '@emotion/react'
import Link from "../link";
import FeaturedMedia from "../featured-media";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useEffect, useRef} from "react";
/**
 * Item Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 * - FeaturedMedia: the featured image/video of the post
 */


const Item = ({ state, item }) => {
  const categoryState = state.source.category;
  const date = new Date(item.date);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, { threshold: 0.5 }); // Trigger the callback when 50% of the item is visible

    observer.observe(itemRef.current);

    return () => observer.disconnect();
  }, []);

  function getNameById(number, obj) {
    if (obj.id === number) {
      return obj.name;
    }
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        const result = getNameById(number, obj[key]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  return (
    <MainArticle ref={itemRef} className="card">
      <article 
      css={css`
      display: flex; 
      flex-direction: column;
      }
    `}>
        <Link link={item.link}>
          <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
        </Link>
        <div>
          <PublishDate>
            {" "}
              <span>{date.toLocaleString("en-GB", {
                day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                }</span>
          </PublishDate>
        </div>

        {/*
        * If the want to show featured media in the
        * list of featured posts, we render the media.
      */}
        {state.theme.featured.showOnList && (
          <FeaturedMedia id={item.featured_media} />
        )}

        {/* If the post has an excerpt (short summary text), we render it */}
        {item.excerpt && (
          <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
          )}
          <ReadMore>         
            <Link link={item.link}>
              Read More
            </Link>
          </ReadMore>
          <ButtonContainer>
            { item.github_url && (
              <Link link={item.github_url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'github']} size="lg" css={css`color: #F9AA8F;:hover{color: #507A95;}`}>
                </FontAwesomeIcon>
              </Link>
            )}
            { item.demo_url && (
              <Link link={item.demo_url} target="_blank" rel="noopener noreferrer">
                <Demo>
                  Demo
                </Demo>
              </Link>
            )}
          </ButtonContainer>
      </article>
      { Object.values(item.categories).length !== 0 && ( 
      <Category dangerouslySetInnerHTML={{ __html: getNameById(Number(item.categories), categoryState) }}/>
      )}
    </MainArticle>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const breakpoints = [576, 1002, 1112, 1300]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const MainArticle = styled.div`
display: flex;
flex-direction: column;
width: 500px;
padding: 25px;
border-radius: 25px;
margin: 25px;
background-color: white;
color: black;
${mq[3]} {
  width: 400px;
}
${mq[2]} {
  width: 350px;
}
${mq[1]} {
  width: auto;
}
opacity: 0;
transform: translateY(20px);
transition: opacity 0.3s ease-out, transform 0.3s ease-out;

&.active {
  opacity: 1;
  transform: translateY(0);
}
`;

const Title = styled.h1`
  font-size: 24px;
  line-height: 1.5;
  box-sizing: border-box;
  margin-top: 5px;
`;

const PublishDate = styled.span`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  font-weight: 300;
`;

const Excerpt = styled.div`
  line-height: 1.5em;
  color: rgba(12, 17, 43, 0.8);
`;

const Category = styled.div`
  padding: 10px;
  margin-top: 10px;
  border-radius: 25px;
  background: #F5F5F6;
  align-self: flex-end;
`;

const Demo = styled.div`
  padding: 10px;
  margin-left: 10px;
  border-radius: 25px;
  color: white;
  background-color: #507A95;
  &:hover {
    color: #F9AA8F;
    font-weight: 500;
  }
`;

const ReadMore = styled.div`
  color: #507A95;
  align-self: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: baseline;
  align-self: flex-end;
`;