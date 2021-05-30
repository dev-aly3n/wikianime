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
//

  return (
    <div>
      <h1>Hi redux</h1>
      <div>num: {counter}</div>
      <div>
        <button className="bg-gray-400 m-auto border-2 p-5" onClick={increase}>
          increase
        </button>
        <button className="bg-gray-400 m-auto border-2 p-5" onClick={decrease}>
          decrease
        </button>
      </div>
      <button
        className="bg-gray-400 m-auto border-2 p-5"
    
      >
        dude!
      </button>
    </div>
  );
};

export default MyComponent;
