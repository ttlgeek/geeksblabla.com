import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import EpisodeItem from "../components/EpisodeItem"
import EpisodesMenu from "../components/EpisodesMenu"

export default ({ data: { allMdx } }) => {
  const lastEpisode = allMdx.edges[0].node
  return (
    <Layout
      withNextEpisode
      mainStyle={{
        marginTop: "100px",
      }}
    >
      <Helmet>
        <script
          async
          defer
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"
        />
      </Helmet>
      <EpisodesMenu selectedEpisode={lastEpisode.id} />
      <Episode
        style={{
          alignSelf: "flex-start",
          width: "100%",
        }}
        {...lastEpisode.fields}
        description={lastEpisode.code.body}
      />
      <div id="fb-root" />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(
      filter: {
        frontmatter: { published: { eq: true }, isNext: { eq: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          code {
            body
          }
          fields {
            id
            title
            slug
            date(formatString: "MMMM DD, YYYY")
            duration
            url
            video
          }
        }
      }
    }
  }
`
