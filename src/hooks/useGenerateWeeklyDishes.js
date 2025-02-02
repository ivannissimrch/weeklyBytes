import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import removeDuplicateDishes from "../functions/removeDuplicateDishes";
import getSafeDishesFromLocal from "../functions/getSafeDishesFromLocal";

export default function useGenerateWeeklyDishes() {
    const fetchDishes = useLoaderData();
    const [menuDishes, setDishes] = useState([]);

    function setMenuDishes() {
        const safeDishes = getSafeDishesFromLocal();

        function randomizeSortSlice(arr) {
            return arr.sort(() => Math.random() - 0.5).slice(0, 7);
        }

        if (!safeDishes || safeDishes.length === 0) {
            setDishes(removeDuplicateDishes(fetchDishes, randomizeSortSlice(fetchDishes)));
        } else {
            setDishes(removeDuplicateDishes(safeDishes, randomizeSortSlice(safeDishes)));
        }
    }

    return [menuDishes, setMenuDishes];
}
