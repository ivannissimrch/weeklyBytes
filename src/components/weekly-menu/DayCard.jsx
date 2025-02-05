/* eslint-disable react/prop-types -- bypass proptypes error */

export function DayCard({ data, day, placeholder }) {
  return (
    <div className="flex flex-col w-full h-fit md:w-54 md:h-[300px] items-center">
      <h3 className="text-center text-md mb-1">{day}</h3>
      <div className="flex flex-row items-center justify-center bg-custom-blue w-full h-full shadow-lg z-2">
        {typeof data === "object" ? (
          <div>
            {data.off === false ? (
              <div className="flex flex-col items-center">
                <p className="mb-3 text-center text-lg">{data.menu.name}</p>
                <p className="text-center text-sm">Ingredients:</p>
                <p className="mb-3 text-center text-xs">{data.menu.ingredients.join(", ")}</p>
                <p className="text-center text-sm">Calories:</p>
                <p className="text-center text-xs">{data.menu.calories}kcal</p>
              </div>
            ) : (
              <p className="text-lg text-center">Day Off</p>
            )}
          </div>
        ) : (
          <p className="text-lg text-center">{placeholder}</p>
        )}
      </div>
    </div>
  );
}
