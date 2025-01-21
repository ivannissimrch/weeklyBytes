import { useEffect, useState } from "react";
import { dishes } from "../data/dishes";
const TEMPALLERGIES = ["Gluten", "Eggs"];

export default function useGenerateWeeklyDishes() {
    const [currentWeekDishes, setCurrentWeekDishes] = useState(dishes); // Temp data to simulate a filtered list of dishes based off employee allergies

    useEffect(() => {
        const filteredDishes = dishes.filter(
            (dish) => !dish.ingredients.some((ingredient) => TEMPALLERGIES.includes(ingredient))
        );
        const dishesForWeek = filteredDishes.sort(() => Math.random() - 0.5).slice(0, 7);
        setCurrentWeekDishes(dishesForWeek);
    }, []);

    return currentWeekDishes;
}
