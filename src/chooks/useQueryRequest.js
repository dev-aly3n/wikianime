// import {useEffect} from 'react';
// import {useDispatch} from 'react-redux';
// import {useQuery} from '@apollo/client'


// const useQueryRequest = (query,variables_obj,dispatch_arg) => {
//     const dispatch = useDispatch();

//     const { loading, error, data } =  useQuery(query,{
//         variables: variables_obj
//         });
        
//         if(loading){
//             console.log('loading');
//             }
            
//             if(error){
//             console.log(error.message);
//             }
            
//             useEffect(() => {
//                 if (data){
//                   dispatch(dispatch_arg(data))

//                 }
//               }, [data,dispatch]);

// }

// export default useQueryRequest;