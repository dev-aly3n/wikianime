import React from 'react';

import {useSelector} from 'react-redux';

const Kimi = () => {

    const dude = useSelector(state =>  state.animelist.homeAnime);
    console.log(dude);
    return(
        <div></div>
    )
}


export default Kimi;