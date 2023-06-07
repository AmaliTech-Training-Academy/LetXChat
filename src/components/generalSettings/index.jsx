import React from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import WrongPassword from "../../assets/WrongPassword.png";
import { useFormik } from "formik";
import { userGeneralSettings } from "../../schemas";
import { useState } from "react";
import { motion } from "framer-motion";
import Password from "../../assets/Password.png";
import { BASE_URL } from "../../defaultValues/DefaultValues";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../feature/userSlice";
import { InputField } from "../../shared";

const GeneralSettings = ({ openGeneral, setOpenGeneral }) => {
  //   Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const user = userInfo;

  //   Submit Form
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const submitValues = {};
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        submitValues[key] = value;
      }
    });

    dispatch(updateUser(submitValues));
    actions.resetForm();
  };

  //   Formik Validation
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      fullname: user ? user.name : "",
      email: user ? user.email : "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: userGeneralSettings,
    onSubmit,
  });

  return (
    <section
      className={`absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#FFFFFF] h-max md:h-[500px] w-[90vw] md:w-[600px] rounded-[12px] shadow-x2l p-[2rem] flex flex-col`}
    >
      <div
        onClick={() => setOpenGeneral(false)}
        className="flex justify-end text-[#1570efe6] cursor-pointer"
      >
        Done
      </div>
      <div className="text-[#667085] flex items-center pl-1 h-[44px] w-full border-b border-b-[#D9D9D9]">
        General
      </div>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="w-full h-full mt-4 flex flex-col gap-[26px]">
          <div className="grid md:grid-cols-2 gap-4 md:gap-[26px] mt-4 md:mt-14">
            <InputField
              label="Name"
              name="fullname"
              id="fullname"
              type="text"
              placeholder="Jordan Ablorh"
              value={values.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.fullname && touched.fullname}
            />

            <InputField
              label="Email"
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              errorMessage={errors.email && touched.email}
            />

            <InputField
              label="New Password"
              name="password"
              id="password"
              type="password"
              placeholder="Enter new password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.password && errors.password}
            />

            <InputField
              label="Confirm New Password"
              name="password_confirmation"
              id="password_confirmation"
              type="password"
              placeholder="Confirm new password"
              value={values.password_confirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                touched.password_confirmation && errors.password_confirmation
              }
            />
          </div>
          <div className="flex justify-end mt-[0.2rem]">
            <button
              type="submit"
              className="text-[14px] text-[#FFFFFF] bg-[#1570ef] px-[12px] py-[8px] rounded-[10px] hover:bg-[#2d69be] transition duration-300 ease-in-out"
            >
              {isSubmitting ? "Loading" : " Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default GeneralSettings;
