const settings = {
  "name": "my-website",
  "state": {
    "frontity": {
      "url": "https://test.frontity.org",
      "title": "Walter Clayton Blog",
      "description": "Walter Clayton's Portfolio and blogging website"
    }
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
              "/project/"
            ],
            [
              "About",
              "/about/"
            ]
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "api": "https://walter-clayton.000webhostapp.com/wp-json",
          "postTypes": [
            {
              type: "project",
              endpoint: "project",
              archive: "/project"
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
          ]
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
