
import { useFormik } from "formik";
import React, { useState } from "react";
import { adminLoginSchema } from "../../schemas";
import { ADMIN_URL } from "../../defaultValues/DefaultValues";
import axios from "axios";
import { Navigate } from "react-router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, InputField } from "../../shared";



const AdminLogin = () => {


  const [isLoading, setIsLoading] = useState(false);

  // Submit Form
  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    let config = {
      method: "post",
      url: `${ADMIN_URL}`,
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      data: values,
    };
    axios(config)
      .then(function (response) {
        setIsLoading(false);
        Cookies.set("adminToken", response.data.token);
        const SUCCESS_MESSAGE = response.data.message;
        toast.success(SUCCESS_MESSAGE, { autoClose: 3000 });
      })
      .catch((error) => {
        const ERROR_MESSAGE = error.response.data.message;
        toast.warn(ERROR_MESSAGE);
        console.error(error.response);
      });
  };

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
      email: "",
      password: "",
    },
    validationSchema: adminLoginSchema,
    onSubmit,
  });

  if (Cookies.get("adminToken")) {
    return <Navigate to="/admin-dashboard" />;
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <form
        className="w-[90vw] sm:w-[450px] h-max bg-primary shadow-backgroundShadow rounded-[15px] px-[20px] py-8"
        onSubmit={handleSubmit}
      >
        <h2 className="font-[inter] font-bold text-[22.2944px] leading-[27px] text-center text-brown uppercase mb-5">
          Admin Log In
        </h2>

        <section className="flex flex-col w-full gap-3 md:gap-[30px] my-2">
          <InputField
            label="Email*"
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email or ID"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={touched.email && errors.email}
          />

          <InputField
            label="Password*"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            errorMessage={touched.password && errors.password}
          />

          <section className="w-full mx-auto flex flex-col text-center gap-[1rem] my-[1rem]">
            <Button>{isSubmitting ? "Loading" : "Log In"}</Button>
          </section>
        </section>
        <div className="flex justify-center">
          <Link
            to="/login"
            style={{
              color: "#3683F5",
              cursor: "pointer",
            }}
          >
            Login as User
          </Link>
        </div>
      </form>
    </main>
  );
};

export default AdminLogin;
