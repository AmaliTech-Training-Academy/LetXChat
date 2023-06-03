import React, { useEffect, useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import CameraIcon from "../../assets/SignUpCamera.png";
import { useFormik } from "formik";
import { basicSchema } from "../../schemas";
import AvatarImg from '../../assets/avatar.jpg'
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../feature/authActions";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Avatar, Button, InputField } from "../../shared";

const SignUp = () => {


  // Upload Image
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileSelection = (event) => {
    setImagePreview(event.target.files[0]);
    setFieldValue("image", event.target.files[0]);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userAccount } = useSelector((state) => state.auth);

  //   Submit Form
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // transform email string to lowercase to avoid case sensitivity issues in login
    values.email = values.email.toLowerCase();

    dispatch(registerUser(values));
  };

  useEffect(() => {
    // redirect user to login page when registration if successful
    if (userAccount) {
      navigate("/signup/signupmodal");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [navigate, userAccount]);

  //   Formik Validation
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      image: "",
      fullname: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <main className="w-screen h-screen bg-white flex items-center justify-center overflow-x-hidden">
      <form
        className="h-[90vh] md:h-max flex-col py-10 overflow-y-scroll sm:overflow-y-visible  w-[90vw] md:w-[85vw] lg:w-[750px] shadow-backgroundShadow rounded-[15px]"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-[22.2944px] leading-[27px] text-brown text-center uppercase  mb-5">
          Sign up
        </h2>
        <div className="w-full h-max text-center">
            <label htmlFor="image">
          <div className="w-[70px] h-[70px] mx-auto rounded-full relative mb-4 border bg-avatar bg-no-repeat bg-center bg-cover border-borderColor">

              {imagePreview && (
                  <Avatar
                  width={70}
                  image={URL.createObjectURL(imagePreview)}
                  alt="Image upload"
                  />
                  )}

              <div className="absolute -right-1 top-14 bg-white rounded-full p-1">
                <input
                  hidden
                  id="image"
                  name="image"
                  accept="image/*"
                  type="file"
                  // value={undefined}
                  onChange={handleFileSelection}
                  onBlur={handleBlur}
                />

                <img
                  style={{ width: "1rem", height: "1rem" }}
                  src={CameraIcon}
                  alt="camera"
                />
              </div>
          </div>
            </label>

          {errors.image && touched.image && (
            <p className="text-errorMessage font-normal mt-[-1rem] mb-[1rem]">
              {errors.image}
            </p>
          )}
        </div>

        <section className="px-5 sm:px-[44px]">
          <section className="flex flex-col justify-between gap-[10px]">
            <div className="flex flex-col md:flex-row gap-4">
              <InputField
                label="Fullname*"
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Enter your full full name"
                value={values.fullname}
                onBlur={handleBlur}
                onChange={handleChange}
                errorMessage={touched.fullname && errors.fullname}
              />

              <InputField
                label="Username*"
                id="username"
                type="text"
                name="username"
                placeholder="Ekowsmith"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                errorMessage={touched.username && errors.username}
              />
            </div>

            <InputField
              label="Work Email*"
              id="email"
              name="email"
              type="email"
              placeholder="Example@amalitech.com"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              errorMessage={touched.email && errors.email}
            />

            <div className="flex flex-col md:flex-row gap-4 ">
              <InputField
                label="Password*"
                id="password"
                name="password"
                type="password"
                placeholder="Example@amalitech.com"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                errorMessage={touched.password && errors.password}
              />

              <InputField
                label="Confirm Password*"
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder="Example@amalitech.com"
                value={values.password_confirmation}
                onBlur={handleBlur}
                onChange={handleChange}
                errorMessage={
                  touched.password_confirmation && errors.password_confirmation
                }
              />
            </div>
          </section>

          <section className="w-full mx-auto flex flex-col gap-[1rem] mt-[2rem] text-center">
            <Button type="submit">
              {loading || isSubmitting ? "Loading..." : "Sign Up"}
            </Button>

            <p>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#3683F5", cursor: "pointer" }}>
                Login
              </Link>
            </p>
          </section>
        </section>
      </form>
    </main>
  );
};

export default SignUp;
