export default function getEmployeesInfoLocal() {
  return JSON.parse(localStorage.getItem("safeDishes"));
}
