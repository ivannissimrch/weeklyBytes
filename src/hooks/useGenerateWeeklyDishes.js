import getSafeDishesFromLocal from "../functions/getSafeDishesFromLocal";

export default function useGenerateWeeklyDishes() {
    return getSafeDishesFromLocal().slice(0, 7);
}
