import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../store/counter";
const Home = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>

      <h1>首页</h1>
      <br />
      <div>
        <Link to="/login/son">跳转到登录页</Link>
      </div>
      <div>
        <Link to="/login/e1e1e1">跳转到404</Link>
      </div>
      <br />
      <button onClick={() => console.log("click me")}>点击</button>
    </div>
  );
};
Home.getInitData = (store) => {
  return store.dispatch(increment());
};

export default Home;
