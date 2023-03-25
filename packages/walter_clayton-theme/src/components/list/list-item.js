import { connect, styled } from "frontity";
import { css } from '@emotion/react'
import Link from "../link";
import FeaturedMedia from "../featured-media";

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
    <MainArticle>
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
          <Category dangerouslySetInnerHTML={{ __html: getNameById(Number(item.categories), categoryState) }}/>
      </article>
    </MainArticle>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const breakpoints = [576, 1002, 1112, 1300]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const MainArticle = styled.div`
width: 475px;
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
  border-radius: 25px;
  background: #F5F5F6;
  align-self: flex-end;
  width: fit-content;
`;
