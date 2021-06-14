import React, { useState, useCallback } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Markup } from 'interweave';
import {hexToRgbA} from '../chooks/simples';
import AnimeList from '../components/AnimeList'
import StreamList from '../components/StreamList'

const AnimeDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const id = params.animeID;

  const selectAnimeQuery = gql`
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
    return null

  }

  if (error) {
    console.log(error.message);
    return `Error! ${error}`
  }

       let aData = data.Page.media[0];
       let title = aData.title.english ? aData.title.english : aData.title.romaji;
       console.log(aData);
       let description = aData.description;
       let startDate = aData.startDate;
       let endDate = aData.endDate;
       let banner = aData.bannerImage;
       let characters = aData.characters.edges;
       let coverImage = aData.coverImage;
       let animeColor50 = hexToRgbA(coverImage.color,.5);
       let animeColor30 = hexToRgbA(coverImage.color,.3);
       let externalLinks = aData.externalLinks;
       let geners = aData.geners;
       let rankings = aData.rankings;
       let relations = aData.relations.edges;
       let reviews = aData.reviews.edges;
       let streamingEpisodes = aData.streamingEpisodes;
      
      
  return (
    <div>

        <div className="detail-grid-container">
          <div className="d-header" style={{backgroundImage:`url(${banner})`}}>
          <div className="banner-inside" >
            <h1 className="detail-title " style={{backgroundColor:`${animeColor50}`}}>{title}</h1>
          </div>
          </div>
          <div className="d-sidebar">
            <img className="detail-cover-image" style={{borderColor:`${animeColor30}`}} src={coverImage.large}></img>

            <div>{title}</div>
            <div>Episodes:{aData.episodes}</div>
            <div>Start date: {`${startDate.year}/${startDate.month}/${startDate.day}`}</div>
            <div>End date: {`${endDate.year}/${endDate.month}/${endDate.day}`}</div>
            <div>Episode Duration: {aData.duration}min</div>
            <div>{title}</div>
            <div>{title}</div>

            <div className="d-ranking">Ranking: 
            {rankings.map(rank=> {
             return <div key={rank.id} className="rank">#{rank.rank}-{rank.context}{rank.year?` at ${rank.year}` : ""}</div>
            })}
            </div>
            
          </div>

          <div className="d-main" >
            <Markup content={description} />
          </div>
      
          <div className="d-relate">
            
           <AnimeList allAnimeData={relations} />

          </div>
          <div className="d-watch">
            <StreamList allEpisode={streamingEpisodes} />
          </div>
          <div className="d-footer">6</div>
        </div>
      
    </div>
  );
};

export default AnimeDetail;
