async function createSillyPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      news: allSanityNews(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
            _createdAt
            tags {
              slug {
                current
              }
            }
          }
        }
      }
      tags: allSanityTag(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const news = (result.data.news || {}).edges || []
  const tags = (result.data.tags || {}).edges || []

  news.forEach(edge => {
    const date = edge.node._createdAt.substr(0, 10)
    const id = edge.node.id
    const slug = edge.node.slug.current
    const tag = edge.node.tags[0].slug.current
    const path = `/${tag}/${slug}/${date}/`

    createPage({
      path,
      component: require.resolve("./src/templates/news.js"),
      context: { id },
    })
  })

  tags.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/${slug}/`

    createPage({
      path,
      component: require.resolve("./src/templates/tag.js"),
      context: { id },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await createSillyPages(graphql, actions)
}
