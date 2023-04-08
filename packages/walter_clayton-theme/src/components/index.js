import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Page from "./page";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import Jumbotron from "./jumbotron";
import About from "./about";
import Footer from "./footer";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @param props - The props injected by Frontity's {@link connect} HOC.
 *
 * @returns The top-level react component representing the theme.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  const isHomePage = state.router.link === '/';
  const isPortfolioPage = state.router.link === '/portfolio/';

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        {isHomePage || isPortfolioPage ? <Jumbotron /> : null}
          <Switch>
              <Loading when={data.isFetching} />
              <List when={data.isArchive} />
              <Page when={data.IsPage} />
              <Post when={data.isPost} />
              <Post when={data.isPostType} />
              <About when={data.isAbout} />
              <PageError when={data.isError} />
          </Switch>
        <Footer></Footer>
      </Main>
    </>
  );
};

export default connect(Theme);

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color:  #E7E7E7;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #507A95;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;