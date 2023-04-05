import { connect, styled, css } from "frontity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = ({ state }) => {
  return (
    <FooterContainer className="footer">
      <div>
          <IconContainer>
            <a href="https://github.com/walter-clayton/" target="_blank">
              <FontAwesomeIcon icon={faGithub} css={css`color: #6C757D`} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/walter-clayton-2b50b4191/" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} css={css`color: #6C757D`} size="2x" />
            </a>
          </IconContainer>
          <hr css={css`color: #6C757D`}></hr>
          <span css={css`color: #6C757D`}>
            {" "}
            &copy; {new Date().getFullYear()} Walter Clayton, All Rights Reserved
          </span>
      </div>
    </FooterContainer>
  );
};

export default connect(Footer);

const FooterContainer = styled.footer`
    height: 20vh;
    display: flex;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    color: #333;
`
const IconContainer = styled.footer`
    display: flex;
    justify-content: space-evenly;
    width: 40%;
    margin: auto;
`