import React from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import WrongPassword from "../../assets/WrongPassword.png";
import { useFormik } from "formik";
import { userGeneralSettings } from "../../schemas";
import { useState } from "react";
import { motion } from "framer-motion";
import Password from "../../assets/Password.png";
import { BASE_URL } from "../../defaultValues/DefaultValues";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const GeneralSettings = ({ openGeneral, setOpenGeneral }) => {
  //   Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  const user = userInfo;

  const userToken = Cookies.get("userToken");

  //   Submit Form
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let config = {
      method: "patch",
      url: `${BASE_URL}/profile/edit`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: values,
    };

    axios
      .request(config)
      .then((res) => {
        const SUCCESS_MESSAGE = response.data.message;
      toast.success(SUCCESS_MESSAGE, { autoClose: 3000 });
        return res.data;
      })
      .catch((err) => {
        const ERROR_MSG = err.message;
        toast.error(ERROR_MSG, { autoClose: 3000 });
      });

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
      username: user ? user.name : "",
      email:  user ? user.email : "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: userGeneralSettings,
    onSubmit,
  });


  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, x: -380, y: -260 },
        visible: { opacity: 1, x: -279, y: -260 },
      }}
      className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#FFFFFF] h-[520px] w-[600px] rounded-[12px] shadow-x2l p-[2rem] flex flex-col`}
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
        <div className="w-full h-full mt-[21px] flex flex-col gap-[26px]">
          <div className="flex gap-[26px] flex-wrap mt-[3rem]">
            <div className="text-[#344054] text-[14px] flex flex-col gap-[8px] w-[47%]">
              <p>Name</p>
              <div
                className={`h-[36px] border rounded-[5px] flex items-center px-2 gap-[9px] relative ${
                  errors.username && touched.username ? "border-[#FDA29B]" : ""
                }`}
              >
                <input
                  type="text"
                  className="h-full w-full"
                  placeholder="Jordan Ablorh"
                  error={errors.username}
                  touch={touched.username}
                  id="username"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                
              </div>
              <div className="h-[1.2rem]">
                <p className="text-[#F04438]">
                  {touched.username && errors.username}
                </p>
              </div>
            </div>
            <div className="text-[#344054] text-[14px] flex flex-col gap-[8px] w-[47%] mb-[2rem]">
              <p>Email</p>
              <div
                className={`h-[36px] border rounded-[5px] flex items-center px-2 gap-[9px] relative ${
                  errors.email && touched.email ? "border-[#FDA29B]" : ""
                }`}
              >
                <input
                  type='email'
                  className="h-full w-full"
                  placeholder="Create a new password"
                  error={errors.email}
                  touch={touched.email}
                  id="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="h-[1.2rem]">
                <p className="text-[#F04438]">
                  {touched.email && errors.email}
                </p>
              </div>
            </div>
            <div className="text-[#344054] text-[14px] flex flex-col gap-[8px] w-[47%]">
              <p>New Password</p>
              <div
                className={`h-[36px] border rounded-[5px] flex items-center px-2 gap-[9px] relative ${
                  errors.password && touched.password ? "border-[#FDA29B]" : ""
                }`}
              >
                <img src={Password} alt="password icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="h-full w-full"
                  placeholder="Create a new password"
                  error={errors.password}
                  touch={touched.password}
                  id="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BsEye /> : <BsEyeSlash />}
                </div>
                {touched.password && errors.password && (
                  <div className="absolute bg-white rounded-full right-[1.6rem] w-[1.5rem] h-[1.5rem] flex items-center justify-center">
                    <img src={WrongPassword} alt=" wrong password" />
                  </div>
                )}
              </div>
              <div className="h-[1.2rem]">
                <p className="text-[#F04438]">
                  {touched.password && errors.password}
                </p>
              </div>
            </div>
            <div className="text-[#344054] text-[14px] flex flex-col gap-[8px] w-[47%]">
              <p>Confirm New Password</p>
              <div className="h-[36px] border rounded-[5px] flex items-center px-2 gap-[9px] relative">
                <img src={Password} alt="password icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="h-full w-full"
                  placeholder="Confirm new password"
                  id="password_confirmation"
                  value={values.password_confirmation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  touch={touched.password_confirmation}
                  error={errors.password_confirmation}
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                </div>
                {touched.password_confirmation &&
                  errors.password_confirmation && (
                    <div className="absolute bg-white rounded-full right-[1.6rem] w-[1.5rem] h-[1.5rem] flex items-center justify-center">
                      <img src={WrongPassword} alt=" wrong password" />
                    </div>
                  )}
              </div>
              <div className="h-[1.2rem]">
                <p className="text-[#F04438]">
                  {touched.password_confirmation &&
                    errors.password_confirmation}
                </p>
              </div>
            </div>
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
    </motion.section>
  );
};

export default GeneralSettings;
