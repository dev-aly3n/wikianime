import {gql} from '@apollo/client';

export const detailQuery = gql`
query SelectedAnImE($id: Int) {
    Page {
      media(id: $id) {
        id
        title {
          english
          romaji
        }
        description
        duration
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        coverImage {
          large
          color
        }
        bannerImage
        episodes
        season
        seasonYear
        rankings {
          id
          context
          allTime
          rank
          year
        }
        format
        genres
        characters {
          edges {
            node {
              age
              gender
              name {
                full
              }
              description
              image {
                large
              }
            }
          }
        }
        streamingEpisodes {
          title
          thumbnail
          url
        }
        relations {
          edges {
            node {
              title {
                english
                romaji
              }
              id
              coverImage {
                large
                color
              }
              source
            }
          }
        }
        reviews {
          edges {
            node {
              id
              user {
                id
                name
                avatar {
                  medium
                }
              }
              score
              summary
              body
            }
          }
        }
        externalLinks {
          id
          site
          url
        }
        studios {
          edges {
            isMain
            node {
              name
              siteUrl
              id
            }
          }
        }
        tags {
          name
          rank
        }
        popularity
        meanScore
        source
        chapters
        volumes
        favourites
        nextAiringEpisode {
          timeUntilAiring
          episode
        }
      }
    }
  }
`;


export const homeQuery = gql`
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(id: $id, search: $search) {
      id
      coverImage {
        large
        color
      }
      title {
        english
        romaji
      }
    }
  }
}
`;
