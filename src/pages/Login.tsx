/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhFrom from "../components/form/PhFrom";
import PhInupt from "../components/form/PhInupt";
const Login = () => {
  const [login] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const defaultValues = {
    userId: "A-0001",
    password: "emon",
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    console.log(data);

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken);
      console.log(user);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("logged in", { id: toastId, duration: 2000 });

      navigate(location?.state ? location.state.from.pathname : "/");
    } catch (error) {
      console.log(error);
      toast.error("Something wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhFrom onSubmit={onSubmit} defaultValues={defaultValues}>
        <div>
          <label htmlFor="id">ID: </label>
          <PhInupt type="text" registers="userId" />
        </div>
        <div className="my-5">
          <label htmlFor="password">Password: </label>
          <PhInupt type="text" registers="password" />
        </div>
        <Button htmlType="submit">Login</Button>
      </PhFrom>
    </Row>
  );
};

export default Login;
