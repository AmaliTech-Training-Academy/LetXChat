import React from "react";
import ConfirmImg from "../../assets/confirmation alert.svg";

const RegModal = () => {
  return (
    <section className="w-screen h-screen bg-[#344054b3] absolute left-0 top-0 z-20 backdrop-blur flex items-center justify-center">
      <div className="h-[150px] w-[90vw] sm:w-[471px] rounded-xl flex flex-col items-center gap-5">
        <div className="mt-[30px]">
          <img src={ConfirmImg} alt="confirm icon" />
        </div>
        <div className="text-center flex flex-col items-center mb-[50px]">
          <p className="w-max">Account created</p>
          <p className="w-max">Successfully</p>
        </div>
      </div>
    </section>
  );
};

export default RegModal;
