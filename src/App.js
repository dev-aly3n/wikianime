import React from "react";
import { gql, useQuery } from '@apollo/client';
import {useDispatch, useSelector} from 'react-redux'
import {AnimeData} from './store/counterSlice';
import Kimi from './components/Kimi'




function App() {
  const dispatch = useDispatch();

  const EXCHANGE_RATES = gql`
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
            medium
            color
          }
          title {
            romaji
          }
        }
      }
    }
`;

const { loading, error, data } = useQuery(EXCHANGE_RATES);
dispatch(AnimeData(data))







  //// jsx
  return (

    <div className="app">
    <div>
    <Kimi/>
    </div>
    </div>

  );
}
//
export default App;
