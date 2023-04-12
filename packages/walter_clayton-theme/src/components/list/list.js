import { connect, styled, decode } from "frontity";
import Item from "./list-item";
import Pagination from "./pagination";
import { useState } from "react";

const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the items based on the search term.
  const filteredItems = data.items.filter(({ type, id }) => {
    const item = state.source[type][id];
  // match the state id with the item id to find the name
    const matchedCategories = item.categories.reduce((acc, curr) => {
      if (state.source.category[curr]) {
        acc.push(state.source.category[curr].name);
      }
      return acc;
    }, []);

    const title = item.title.rendered.toLowerCase();
    const excerpt = item.excerpt.rendered.toLowerCase();
    const categoryNames = matchedCategories.join(" ").toLowerCase();
    return (
      title.includes(searchTerm.toLowerCase()) ||
      excerpt.includes(searchTerm.toLowerCase()) ||
      categoryNames.includes(searchTerm.toLowerCase())
    );
  });

  // Render only the filtered items.
  const itemsToRender = searchTerm ? filteredItems : data.items;

  return (
    <ParentContainer>
      {/* Add search input */}
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <ChildContainer>
        {/* If the list is a taxonomy, we render a title. */}
        {data.isTaxonomy && (
          <Header>
            {data.taxonomy}:{" "}
            <b>{decode(state.source[data.taxonomy][data.id].name)}</b>
          </Header>
        )}

        {/* If the list is for a specific author, we render a title. */}
        {data.isAuthor && (
          <Header>
            Author: <b>{decode(state.source.author[data.id].name)}</b>
          </Header>
        )}


        {/* Iterate over the filtered items of the list. */}
        {itemsToRender.map(({ type, id }) => {
          const item = state.source[type][id];
          // Render one Item component for each one.
          return <Item key={item.id} item={item} />;
        })}
        <Pagination />
      </ChildContainer>
    </ParentContainer>
  );
};

export default connect(List);

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const ParentContainer = styled.section`
  width: 95%;
  max-width: 1200px;
  margin: auto;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  ${mq[2]} {
    width: 100%;
    flex-direction: column;
    margin: auto;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChildContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  ${mq[2]} {
    width: 100%;
    flex-direction: column;
    margin: auto;
  }
`;

const Header = styled.h3`
  font-weight: 300;
  text-transform: capitalize;
  color: rgba(12, 17, 43, 0.9);
`;
const SearchInput = styled.input`
  font-weight: 300;
  font-size: 18px;
  color: rgba(12, 17, 43, 0.9);
  border-radius: 25px;
  border: none;
  line-height: 1.5;
  padding: 5px;
  text-align: center;
  width: 90%;
  margin: auto;
`;

