import { useSelector, useDispatch } from "react-redux";
import {counterActions} from '../store/counterSlice';

const MyComponent = () => {
    const counter = useSelector((state) => state.counter.counter);
    const dispatch = useDispatch();

  const increase = () => {
    dispatch(counterActions.increment({xDirection:10}));
  };
  const decrease = () => {
    dispatch(counterActions.decrement());
  };
  console.log(counter);
//

  return (
    <div>
 
    </div>
  );
};

export default MyComponent;
