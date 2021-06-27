import {gql} from '@apollo/client';

export const detailQuery = gql`
query SelectedAnImE($id: Int) {
      Media(id: $id) {
        id
        title {
          english
          romaji
        }
        description(asHtml: true)
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
          season
        }
        format
        genres
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
              format
              status
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
        trailer {
          id
        }
        characters (sort:[ROLE]) {
          edges {
            role
            voiceActors {
              id
              name {
                full
              }
              image {
                medium
              }
              languageV2
            }
            node {
              id
              name {
                full
              }
              image {
                medium
              }
            }
          }
        }
        staff{
          edges {
            node{
              id
            }
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
      source
      format
      status
    }
  }
}
`;


export const charQuery = gql`
query SelectedChar($char_id: Int, $staff_id: Int) {
  Character(id: $char_id) {
    id
    name {
      full
      native
    }
    age
    gender
    dateOfBirth {
      year
      month
      day
    }
    description(asHtml:true)
    image {
      large
    }
    favourites
    media {
      edges {
        node {
          id
          coverImage {
            large
          }
          format
          source
          status
          title {
            english
            romaji
          }
        }
      }
    }
  }
  Staff(id: $staff_id) {
    id
    name {
      full
      native
    }
    favourites
    age
    gender
    dateOfBirth {
      year
      month
      day
    }
    dateOfDeath {
      year
      month
      day
    }
    homeTown
    languageV2
    image {
      large
    }
    yearsActive
    description(asHtml: true)
    staffMedia {
      edges {
        node {
          id
          coverImage {
            large
          }
          format
          source
          status
          title {
            english
            romaji
          }
        }
      }
    }
  }
}

`;