export default function storeEmployeesInfo(updatedEmployeesData) {
  localStorage.setItem(
    "employeesInformation",
    JSON.stringify(updatedEmployeesData)
  );
}
