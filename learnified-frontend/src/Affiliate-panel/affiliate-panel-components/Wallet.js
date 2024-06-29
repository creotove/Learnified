import React from "react";
import optionsIcon from "../../assets/icons/pack/optionIcon.svg";
import simIcon from "../../assets/icons/pack/simIcon.svg";
import eyeIcon from "../../assets/icons/pack/eyeIcon.svg";
import { RUPEE_ICON } from "../../constants";
import useAuth from "../../hooks/useAuth";

const Wallet = () => {
  const { auth } = useAuth();

  return (
    <div className="w-96 h-56 bg-gradient-to-tl from-purple-500  via-purple-500 to-purple-100 rounded-3xl p-4 text-white">
      <div className="flex justify-end items-center">
        <p className="drop-shadow-lg text-sm">wallet</p>
        <img className="cursor-pointer invert" src={optionsIcon} />
      </div>
      <div>
        <p className="drop-shadow-lg">instant money</p>
        <img src={simIcon} />
      </div>
      <div className="flex items-center">
        <p className="drop-shadow-lg tracking-[4px]">Available balance</p>
        <img src={eyeIcon} />
      </div>
      <div>
        <p className="drop-shadow-lg text-3xl">{RUPEE_ICON} 168,785</p>
        <p>
          {auth?.user?.firstName} {auth?.user?.lastName}
        </p>
      </div>
    </div>
  );
};

export default Wallet;
