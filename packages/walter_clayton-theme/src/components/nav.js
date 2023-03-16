import { connect, styled } from "frontity";
import Link from "./link";
import Logo from "./logo";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = ({ state }) => (
  <NavContainer>
      <LogoMobile>
        <Logo/>
      </LogoMobile>
    <NavContainerDesktop>
      <LogoDesktop>
        <Logo/>
      </LogoDesktop>
      {state.theme.menu.map(([name, link]) => {
        // Check if the link matched the current page url
        const data = state.source.get(state.router.link);
        const isCurrentPage = data.route === link;

        return (
          <NavItem key={name}>
            {/* If link url is the current page, add `aria-current` for a11y */}
            <Link link={link} aria-current={isCurrentPage ? "page" : undefined}>
              {name}
            </Link>
          </NavItem>
        );
      })}
    </NavContainerDesktop>
  </NavContainer>
);

export default connect(Nav);

const LogoMobile = styled.nav`

}
  `;

const LogoDesktop = styled.nav`
@media screen and (min-width: 560px) {
  display: none;
  }
  `;

const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  overflow-x: auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  `;

const NavContainerDesktop = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 560px) {
    display: none;
  `;
  
  const NavItem = styled.div`
  padding: 0;
  margin: 0 16px;
  color: #fff;
  font-size: 0.9em;
  box-sizing: border-box;
  flex-shrink: 0;

  & > a {
    display: inline-block;
    line-height: 2em;
    border-bottom: 3px solid;
    border-bottom-color: transparent;
    /* Use for semantic approach to style the current link */
    &[aria-current="page"] {
      color: #F9AA8F;
      font-weight: 600;
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;

    &:after {
      content: "";
      display: inline-block;
      width: 24px;
    }
  }
  @media screen and (max-width: 560px) {
    display: none;
`;
