import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelectors } from "../../store/slices/authSlice";
import { useFormik } from "formik";
import { loginRequest } from "../../store/actions/auth";
import { loginValidtor } from "./validators/loginValidation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector(authSelectors.selectAuth);
  useEffect(() => {
    if (userId) {
      navigate("/home"); //redirect user to desired route
    }
  }, [userId]);

  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidtor,
    onSubmit: (values) => {
      dispatch(loginRequest(values));
    },
  });
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <input className="w-full mb-2 p-2 border" placeholder="Email" />
          <input className="w-full mb-4 p-2 border" placeholder="Password" />

          <button className="w-full bg-black text-white py-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
