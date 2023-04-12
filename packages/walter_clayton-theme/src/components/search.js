import { connect } from "frontity";
import { styled } from "frontity";
import { useState } from "react";

const Search = ({ state }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = state.source.data.items.filter(
    (post) =>
      (post.title?.rendered?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (post.content?.rendered?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  return (
    <SearchContainer>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
`;

export default connect(Search);
