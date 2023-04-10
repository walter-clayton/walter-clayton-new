const settings = {
  "name": "my-website",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Walter Clayton Blog",
      "description": "Walter Clayton's Portfolio and blogging website",
    },
  },
  "packages": [
    {
      "name": "@frontity/walter_clayton-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "Home",
              "/"
            ],
            [
              "Portfolio",
              "/portfolio/"
            ],
            [
              "About",
              "/about/"
            ],
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      },
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "data":{
            "/about/":{
              isReady: true, 
              isFetching: false,
              isAbout: true,
           },
          },
          "api": "https://walter-clayton.000webhostapp.com/wp-json",
          "postTypes": [
            {
              type: "project",
              endpoint: "project",
              archive: "/portfolio",
              post: "/project/:slug",
            }
          ],
          taxonomies: [
            {
              taxonomy: "project_hard_skills",
              endpoint: "project_hard_skills",
              postTypeEndpoint: "project"
            },
            {
              taxonomy: "project_soft_skills",
              endpoint: "project_soft_skills",
              postTypeEndpoint: "project"
            }
          ],
          // Add the `beforeSSR` property to enable static file serving
          beforeSSR: async ({ state, actions }) => {
            await actions.source.fetch("/static/documents/walter.pdf");
          },
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    {
      "name": "pdf-loader",
      "state": {
        "pdf-loader": {
          "test": /\.(pdf)$/i,
          "use": [
            {
              "loader": "file-loader",
              "options": {
                "name": "[name].[ext]",
                "outputPath": "pdfs/",
              },
            },
          ],
        },
      },
    },
  ],
};

export default settings;
