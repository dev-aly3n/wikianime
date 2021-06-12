import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const AnimeDetail = () => {
  const params = useParams();
  const id = params.animeID;

  const selectAnimeQuery = gql`
    query SelectedAnImE($id: Int) {
      Page {
        media(id: $id) {
          id
          title {
            english
          }
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
          seasonYear
          rankings {
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
                }
                id
                coverImage {
                  medium
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
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(selectAnimeQuery, {
    variables: {
      id: id,
    },
  });

  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log(error.message);
  }

  useEffect(() => {
    if (data) {
      const aData = data.Page.media[0];
      const title = aData.title.english;
      const startDate = aData.startDate;
      const endDate = aData.endDate;
      const banner = aData.bannerImage;
      const characters = aData.characters.edges;
      const coverImage = aData.coverImage;
      const externalLinks = aData.externalLinks;
      const geners = aData.geners;
      const rankings = aData.rankings;
      const relations = aData.relations.edges;
      const reviews = aData.reviews.edges;
      const streamingEpisodes = aData.streamingEpisodes;
    }
  }, [data]);

  return (
  <div className='detail-grid-container'>
  

  </div>
  );
};

export default AnimeDetail;
