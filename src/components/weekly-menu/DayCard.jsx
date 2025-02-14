/* eslint-disable react/prop-types -- bypass proptypes error */

export function DayCard({ data, day, placeholder }) {
  return (
    <div className="flex flex-col w-full h-fit md:w-54 md:h-[300px] items-center bg-button-yellow">
      <h3 className="text-left w-full text-sm md:text-md lg:text-lg md:text-center px-1 md:px-0">{day}</h3>
      <div className="flex flex-row items-center justify-center bg-white  w-full h-full shadow-lg z-2">
        {typeof data === "object" ? (
          <div className="flex flex-row m-1 items-center justify-center w-[95%] bg-white">
            {data.off === false ? (
              <div className="w-full py-2 grid grid-cols-3 grid-rows-2 md:flex md:flex-col justify-between items-center">
                <div className="col-start-1 col-end-3 row-start-1 text-left text-md md:text-xl md:mb-3 md:text-center ">
                  <p>
                    {data.menu.name}
                  </p>
                </div>
                <div className="col-span-full row-start-2 row-end-2 md:mb-3 text-center text-sm md:text-md ">
                  <p className="hidden md:block md:text-center md:text-sm">
                    Ingredients:
                  </p>
                  <p>
                    {data.menu.ingredients.join(", ")}
                  </p>
                </div>
                <div className="col-start-3 col-end-4 row-start-1 row-end-1 text-right text-sm md:text-center md:text-md">
                  <p className="hidden md:block md:text-center md:text-sm">
                    Calories:
                  </p>
                  <p>
                    {data.menu.calories} kcal
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-md md:text-xl text-center">Day Off</p>
            )}
          </div>
        ) : (
          <p className="flex flex-row m-1 items-center justify-center w-[95%] bg-white text-md md:text-xl text-center">{placeholder}</p>
        )}
      </div>
    </div>
  );
}
