import { connect, styled } from "frontity";

/**
 * A "hamburger" icon used for opening the mobile menu.
 *
 * @param props - Props used to customize this element.
 * @returns A React component.
 */
const Logo = () => (
        <LogoContainer>
            <svg
            height="70"
            width="70"
            color="#F9AA8F"
            viewBox="0 0 250 250"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            >
            <path d="M188.5 115C188.5 160.411 158.015 197 114.5 197C70.9687 197 39.5 160.392 39.5 115C39.5 69.6923 70.8897 38 114.5 38C136.339 38 154.822 45.9432 167.847 59.5029C180.875 73.0655 188.5 92.3075 188.5 115Z" stroke="#F9AA8F" />
            <path d="M170.793 169.793C138.779 201.807 88.0679 200.654 57.2071 169.793C26.346 138.932 25.1937 90.2205 57.2071 58.2071C89.2207 26.1935 139.932 27.3463 170.793 58.2071C201.654 89.0682 202.806 137.78 170.793 169.793Z" stroke="#F9AA8F" />
            <path d="M200 112C200 157.17 158.256 190.5 114.5 190.5C70.6924 190.5 28 159.125 28 114C28 68.9287 70.6252 41 114.5 41C136.407 41 157.81 47.4878 173.712 59.6055C189.593 71.7071 200 89.4248 200 112Z" stroke="#F9AA8F"/>
            <path d="M100.558 132.423L64.6236 116.223V111.51L100.558 95.31V100.317L70.3673 113.866L100.558 127.342V132.423ZM107.967 139.639L103.254 138.24L122.105 79.6254L126.891 81.0245L107.967 139.639ZM129.631 132.423V127.342L159.822 113.866L129.631 100.317V95.31L165.565 111.51V116.223L129.631 132.423Z" fill="#F9AA8F"/>
            </svg>    
        </LogoContainer>
);

  export default connect(Logo);
  
  const LogoContainer = styled.div`
  @media (max-width: 560px) {
    display: flex;
    align-items: start;
    justify-content: start;
  }
  @media (min-width: 561px) {
    padding: 15px;
    display: flex;
    align-items: start;
    justify-content: start;
  }
`;
  