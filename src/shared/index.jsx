import { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export const InputField = ({
  label,
  name,
  id,
  type,
  placeholder,
  value,
  onBlur,
  onChange,
  touched,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className={`flex w-full flex-col gap-2 ${errorMessage && "mb-2"}`}>
      <label htmlFor={name}>{label}</label>

      <div
        className={`h-[40px] text-base relative rounded-[9px] border border-borderColor placeholder:text-placeholder overflow-hidden focus:border-link hover:border-link ${
          errorMessage && "border-error focus:border-error hover:border-error"
        }`}
      >
        <input
          className="h-full w-full p-[9px]"
          id={id}
          name={name}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          touched={touched}
          autoComplete='true'
        />
        {type === "password" && (
          <div
            onClick={handleShowPassword}
            className="flex items-center absolute top-[50%] -translate-y-[50%] right-3"
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </div>
        )}
      </div>
      <p className="text-errorMessage">{errorMessage}</p>
    </div>
  );
};

export const Button = ({ children, type }) => {
  return (
    <button
      type={type}
      className="capitalize bg-brown text-white w-full md:w-[20rem] mx-auto h-[40px] rounded-[9px] hover:bg-hoverColor"
    >
      {children}
    </button>
  );
};

export const Avatar = ({ image, alt }) => {


  return (
  
      <img src={image} alt={alt} className="w-full h-full  rounded-full z-20" />
  );
};
