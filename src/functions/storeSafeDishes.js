export default function (dishesSafeForEmployees) {
  localStorage.setItem("safeDishes", JSON.stringify(dishesSafeForEmployees));
}
