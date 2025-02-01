import { AlignHorizontalCenter } from "@mui/icons-material";

export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "rgba(221, 238, 248, 1)",
    textAlign: "center",
    overflow: "hidden",
  }),
  ValueContainer: (provided) => ({
    ...provided,
    textAlign: "center",
    justifyContent: "center",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(197, 233, 255, 1)"
      : "rgba(221, 238, 248, 1)",
    textAlign: "center",
    width:"100%"
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "rgba(197, 233, 255, 1)",
  }),
  placeholder: (provided) => {
    return {
      ...provided,
      textAlign: "center",
      justifyContent: "center",
    };
  },
  indicatorSeparator: (provided, state) => ({}),
  clearIndicator: (provided, state) => ({}),
  dropdownIndicator: (provided, state) => {
    return {
      ...provided,
      color: "black",
      transform: state.isFocused ? "rotate(180deg)" : "rotate(0deg)",
    };
  },
};
