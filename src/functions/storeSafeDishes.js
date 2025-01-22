export default function storeSafeDishes(dishesSafeForEmployees) {
    localStorage.setItem("safeDishes", JSON.stringify(dishesSafeForEmployees));
}
