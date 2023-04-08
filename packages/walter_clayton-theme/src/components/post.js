import { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import List from "./list";
import FeaturedMedia from "./featured-media";
import dayjs from "dayjs"
/**
 * The Post component that Mars uses to render any kind of "post type", like
 * posts, pages, attachments, etc.
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const Post = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get a human readable date.
  const date = new Date(post.date);
  const formattedDate = dayjs(post.date).format("DD MMMM YYYY")
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, [actions.source]);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <ChildContainer>
        <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

        {/* Hide author and date on pages */}
        {!data.isPage && (
          <SubTitle>
            <DateWrapper>
              {" "}
              {formattedDate}
            </DateWrapper>
          </SubTitle>
        )}
        {/* Look at the settings to see if we should include the featured image */}
        {state.theme.featured.showOnPost && (
          <FeaturedMedia id={post.featured_media} />
        )}

        {data.isAttachment ? (
          // If the post is an attachment, just render the description property,
          // which already contains the thumbnail.
          <div dangerouslySetInnerHTML={{ __html: post.description.rendered }} />
        ) : (
          // Render the content using the Html2React component so the HTML is
          // processed by the processors we included in the
          // libraries.html2react.processors array.
          <Content>
            <Html2React html={post.content.rendered} />
          </Content>
        )}
      </ChildContainer>
    </Container>
  ) : null;
};

export default connect(Post);

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const Container = styled.section`
background-color: white;
border-radius: 5px;
  width: 95%;
  max-width: 800px;
  margin: auto;
  list-style: none;
  display: flex;
  flex-direction: column
  justify-content: center;
  flex-wrap: wrap;
  ${mq[2]} {
    width: 100%;
    flex-direction: column;
    margin: auto;
  }
`;
const ChildContainer = styled.section`
padding: 25px;
`;
const Title = styled.h1`
  font-size: 32px;
  line-height: 1.5;
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
`;
const SubTitle = styled.p`
  font-size: 22px;
  line-height: 1.3;
  margin: 0;
  margin-top: 18px;
  color: rgba(117, 117, 117, 1);
`;

const DateWrapper = styled.p`
font-size: 22px;
line-height: 1.3;
font-weight: 400;
margin: 0;
margin-top: 18px;
color: rgba(117, 117, 117, 1);
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }

  ${mq[2]} {
    p {
      font-size: 18px;
    }
  }
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    width: 100%;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #507A95;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #507A95;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #507A95;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
