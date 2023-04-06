import { connect, styled, decode } from "frontity";
import Item from "./list-item";
import Pagination from "./pagination";

const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  return (
    <Container>
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

      {/* Iterate over the items of the list. */}
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one Item component for each one.
        return <Item key={item.id} item={item} />;
      })}
      <Pagination />
    </Container>
  );
};

export default connect(List);

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const Container = styled.section`
  width: 95%;
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
