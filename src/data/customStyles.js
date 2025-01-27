export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "rgba(224, 231, 255,1)",
    textAlign: "center",
    overflow: "hidden",
  }),
  ValueContainer: (provided) => ({
    ...provided,
    textAlign: "center",
    justifyContent: "center",
    height: "64px",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(197, 233, 255, 1)"
      : "rgb(241, 245, 249)",
    textAlign: "center",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "rgba(224, 231, 255,1)",
  }),
  placeholder: (provided) => {
    return {
      ...provided,
      textAlign: "center",
      justifyContent: "center",
      height: "64px",
      padding: "10px",
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
