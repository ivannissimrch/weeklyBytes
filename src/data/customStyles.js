export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "rgb(255, 255, 255)",
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
      ? "rgb(54, 70, 136)"
      : "rgba(255, 254, 241, 1)",
    color: state.isFocused ? "white" : "black",
    textAlign: "center",
    width: "100%",
    
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "rgb(255, 230, 131)",
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
    const isMobile = window.innerWidth <= 640;

    return {
      ...provided,
      color: "black",
      opacity: state.isFocused ? "0" : "100",
      display: isMobile ? "none" : "block",
    };
  },
};
