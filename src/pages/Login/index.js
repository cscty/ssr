import { Link, Outlet } from "react-router-dom";
const Login = () => {
  return (
    <div>
      <h1>登录页</h1>
      <br />
      <Link to="/">跳转到首页</Link>
      <Outlet />
    </div>
  );
};

export default Login;
