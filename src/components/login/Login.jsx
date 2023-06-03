import { useFormik } from "formik";
import React, { useEffect } from "react";

import { loginSchema } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../feature/authActions";
import { fetchUserInfo } from "../../feature/userSlice";
import { Button, InputField } from "../../shared";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Submit Form
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (userToken) {
      dispatch(fetchUserInfo(userToken));
      navigate("/chat");
    }
  }, [userToken, dispatch]);

  // Formik Validation

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    isSubmitting,
  } = useFormik({
    initialValues: {
      emailID: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[90vw] md:w-[550px] h-max bg-primary shadow-backgroundShadow rounded-[15px] py-8 sm:py-0 px-5 flex items-center flex-col justify-center"
      >
        <h2 className="font-[inter] font-bold text-[22.2944px] leading-[27px] text-center text-brown uppercase mb-5">
          Log In
        </h2>

        <section className="flex flex-col w-full md:gap-[30px] mb-2">
          <div className="mb-4">

          <InputField
            type="text"
            label="Email/ Chat ID*"
            id="emailID"
            name="emailID"
            placeholder="Enter your email or ID"
            value={values.emailID}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={touched.emailID && errors.emailID}
          />
          <InputField
            label="Password*"
            id="password"
            name="password"
            type="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={touched.password && errors.password}
            placeholder="Enter password"
          />
            </div>

          <Button type="submit">
            {loading || isSubmitting ? "Loading..." : "Log In"}
          </Button>

          <div className=" flex flex-col items-center gap-3 mt-3 sm:mt-0">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ color: "#3683F5", cursor: "pointer" }}
              >
                Sign Up
              </Link>
            </p>
            <p>
              Are you and Admin?{" "}
              <Link
                to="/admin-login"
                style={{
                  color: "#3683F5",
                  cursor: "pointer",
                }}
              >
                Login as Admin
              </Link>
            </p>
          </div>
        </section>
      </form>
    </main>
  );
};

export default Login;
