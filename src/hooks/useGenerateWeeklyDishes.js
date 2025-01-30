// import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useLoaderData } from "react-router-dom";
import {useState} from "react"
import getSafeDishesFromLocal from "../functions/getSafeDishesFromLocal";

export default function useGenerateWeeklyDishes() {
    const fetchDishes = useLoaderData();
    const [menuDishes, setDishes] = useState([]);

    function setMenuDishes() {
        const safeDishes = getSafeDishesFromLocal();

        function randomizeSortSlice(array) {
            console.log(array.length);
            return array.sort(() => Math.random() - 0.5).slice(0, 7);
        }
        if (!safeDishes || safeDishes.length === 0) {
            setDishes(
                randomizeSortSlice(fetchDishes)
            );
            return;
        } else {
            setDishes(
                randomizeSortSlice(safeDishes)
            );
        }
    }

    
    return [menuDishes, setMenuDishes];
}
