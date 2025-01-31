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



        if (!safeDishes || safeDishes.length === 0) {
            setDishes(
                    fetchDishes.sort(() => Math.random() - 0.5).slice(0, 7)
            );
            
        } else {
            setDishes(
                    safeDishes.sort(() => Math.random() - 0.5).slice(0, 7)
            );
        }
    }

    
    return [menuDishes, setMenuDishes];
}
