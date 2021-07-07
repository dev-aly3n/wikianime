import Recom from '../detailPage/Recom';


const HomeRecom = ({allRecom}) => {
    

    return(
        <div className="flex flex-col justify-around items-center home-rec">
        {
            allRecom.map((rec, index)=> {
                if(index<=1){
                return <Recom key={"homeRec"+ rec.media.id} recom={rec} />
                }
            })
        }
        </div>
    )
}


export default HomeRecom