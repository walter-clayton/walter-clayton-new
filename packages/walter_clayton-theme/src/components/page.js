import { connect } from "frontity";

const Page = ({ state, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
    console.log(data)
  // Get the component that should be used to render this page.
  const Html2React = libraries.html2react.Component;
  const Component = data.component;

  return (
    <>
      {/* Render the page header */}
      <h1>{data.title?.rendered}</h1>
      <p>By {data.author?.name}</p>

      {/* Render the page content */}
      <Html2React html={data.content?.rendered} />

      {/* Render the page footer */}
      <p>Published on {data.date}</p>
    </>
  );
};

export default connect(Page);
