import Recom from '../detailPage/Recom';


const HomeRecom = ({allRecom, keyParam}) => {
    

    return(
        <div className="home-rec">
        {
            allRecom.map((rec, index)=> {
                if(index<=1){
                return <Recom key={keyParam+ rec.media.id} widthParam={true} recom={rec} />
                }
            })
        }
        </div>
    )
}


export default HomeRecom;