export default function getSafeDishesFromLocal() {
    return JSON.parse(localStorage.getItem("safeDishes"));
}
