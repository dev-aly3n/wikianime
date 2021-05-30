import React from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import Anims from './components/Anims';
import MyComponent from './components/MyComponent';

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",

})

function App() {

  //// jsx
  return (
    <ApolloProvider client={client}>
    <div className="app">
    <MyComponent />
    </div>
    <div>
      <Anims />
    </div>
    </ApolloProvider>
  );
}
//
export default App;
