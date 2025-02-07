import Calendar from "../components/Calendar.jsx";
import useGenerateMenu from "../hooks/useGenerateMenu.jsx";
import ModalA from "../components/GenerateMenuPageModals/ModalA.jsx";
import ModalB from "../components/GenerateMenuPageModals/ModalB.jsx";
import ModalC from "../components/GenerateMenuPageModals/ModalC.jsx";
import ModalD from "../components/GenerateMenuPageModals/ModalD.jsx";
import ModalE from "../components/GenerateMenuPageModals/ModalE.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalF from "../components/GenerateMenuPageModals/ModalF.jsx";

export default function GenerateMenu() {
  const {
    handleSelectedDaysUpdate,
    handleOffDaysUpdate,
    handleGenerate,
    handleRegenerate,
    modalType,
    setModalType,
  } = useGenerateMenu();

  const [arrayOfTrues, SetArrayOfTrues] = useState([]);
  const [trueSwitch, setTrueSwitch] = useState(false);

  const handleTrueArrayChange = (array) => {
    SetArrayOfTrues(array);
  };

  useEffect(() => {
    if (arrayOfTrues.length === 7) {
      setModalType("F");
    }
  }, [arrayOfTrues]);

  return (
    <div className=" flex flex-col items-center bg-custom-yellow w-[95%] md:w-[95%] lg:w-[70%]">
      <div className="grid grid-col grid-cols-3 py-2 items-center justify-between w-full">
        <NavLink
          className="w-fit hover:text-button-blue flex flex-row items-center justify-start"
          to={"/"}
        >
          <ArrowBackIcon fontSize="medium" className="" />
          <span className="hidden md:block md:text-md">Return to Home</span>
          <span className="md:hidden text-xs">Home</span>
        </NavLink>
        <h2 className="text-center text-lg md:text-2xl ">Generate Menu</h2>
      </div>
      <div className="flex flex-col items-center w-full bg-custom-blue py-4 md:py-6">
        <div className="flex flex-col items-center w-[95%] md:w-4/5 text-sm md:text-lg">
          <h2 className="text-center text-md md:text-lg font-semibold items-center mb-3">Select Date</h2>
          <span className="text-center items-center ">
            Choose a week to generate a menu for
          </span>
          <Calendar 
            onSelectedDaysChange={handleSelectedDaysUpdate}
            onOffDaysChange={handleOffDaysUpdate}
            onTrueArrayChange={handleTrueArrayChange}
          />
        </div>
        <div className="flex flex-row justify-center w-full">
          <button
            onClick={handleGenerate}
            className="bg-button-blue border-2 text-white rounded-3xl p-2 m-3  w-3/12 text-center text-sm md:text-md hover:bg-white hover:text-button-blue hover:border-2 hover:border-button-blue"
          >
            Generate
          </button>
          <button
            onClick={() => setModalType("C")}
            className="bg-button-blue border-2 text-white rounded-3xl p-2 m-3 w-3/12 text-center text-sm md:text-md hover:bg-white hover:text-button-blue hover:border-2 hover:border-button-blue"
          >
            Regenerate
          </button>
        </div>
      </div>
      {modalType === "A" && <ModalA onClose={() => setModalType(null)} />}
      {modalType === "B" && <ModalB onClose={() => setModalType(null)} />}
      {modalType === "F" && <ModalF onClose={() => setModalType(null)} />}
      {modalType === "C" && (
        <ModalC
          onAgree={handleRegenerate}
          onDisagree={() => setModalType(null)}
        />
      )}
      {modalType === "D" && <ModalD onClose={() => setModalType(null)} />}
      {modalType === "E" && <ModalE onClose={() => setModalType(null)} />}
    </div>
  );
}
