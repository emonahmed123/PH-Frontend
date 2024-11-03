/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Login = () => {
  const [login] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "emon",
    },
  });
  console.log(location);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register("userId")} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
