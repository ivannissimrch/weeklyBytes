/* eslint-disable react/prop-types -- bypass proptypes error */

export function DayCard({ data, day, placeholder }) {
  return (
    <div>
      <h3 className="text-center p-2">{day}</h3>
      <div className="grid items-center justify-center bg-slate-300 w-60 h-72">
        {typeof data === "object" ? (
          <div>
            {data.off === false ? (
              <div className="flex flex-col items-center">
                <p className="mb-3">{data.menu.name}</p>
                <p>Ingredients:</p>
                <p className="mb-3 text-center">{data.menu.ingredients.join(", ")}</p>
                <p>Calories:</p>
                <p className="mb-3">{data.menu.calories}kcal</p>
              </div>
            ) : (
              <p>Day Off</p>
            )}
          </div>
        ) : (
          <p>{placeholder}</p>
        )}
      </div>
    </div>
  );
}
