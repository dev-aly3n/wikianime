import { gql } from "@apollo/client";

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
            rating
            ratingAmount
            summary
            body(asHtml: true)
            createdAt
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
      characters(sort: [ROLE]) {
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
      staff(sort: FAVOURITES_DESC) {
        edges {
          node {
            id
          }
        }
      }
      recommendations {
        edges {
          node {
            rating
            mediaRecommendation {
              id
              format
              source
              status
              title {
                english
                romaji
              }
              coverImage {
                large
              }
              description
            }
          }
        }
      }
    }
  }
`;

export const homeQuery = gql`
  {
    top100: Page(perPage: 50, page: 1) {
      media(sort: SCORE_DESC) {
        id
        title {
          english
          romaji
        }
        coverImage {
          large
        }
        source
        format
        status
        averageScore
        popularity
        seasonYear
        season
        tags {
          name
        }
        description(asHtml:true)
      }
    }
    airing: Page(perPage: 50, page: 1) {
      airingSchedules(sort: TIME, notYetAired: true) {
        media {
          id
          nextAiringEpisode {
            episode
            timeUntilAiring
          }
          bannerImage
          title {
            english
            romaji
          }
          source
          format
          genres
          coverImage {
            large
          }
          description(asHtml: true)
        }
      }
    }
    trending: Page(page: 1, perPage: 50) {
      media(sort: TRENDING_DESC) {
        id
        coverImage {
          large
        }
        title {
          english
          romaji
        }
        source
        format
        status
        averageScore
        meanScore
      }
    }
    homeRecom: Page(perPage: 30, page: 1) {
      recommendations(sort: RATING_DESC) {
        rating
        media {
          id
          description(asHtml: true)
          title {
            english
            romaji
          }
          format
          status
          source
          coverImage {
            large
          }
        }
      }
    }
    allTime: Page(perPage: 50, page: 1) {
      media(sort: POPULARITY_DESC) {
        id
        title {
          english
          romaji
        }
        coverImage {
          large
        }
        source
        format
        status
        averageScore
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
      description(asHtml: true)
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
