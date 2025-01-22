import { useState } from "react";
import "./Allergies.css";
import Select from "react-select";
import { useLoaderData } from "react-router-dom";

const ALLERGENS = [
  {
    value: "Wheat Pasta Flour Bread Cake",
    label: "Gluten",
  },
  { value: "Milk Cream Cheese Butter Yogurt", label: "Dairy" },
  { value: "Eggs Egg", label: "Eggs" },
  { value: "Soy", label: "Soy" },
  { value: "Crab Lobster Shrimp", label: "Shellfish" },
  { value: "Tuna Salmon", label: "Fish" },
  { value: "Nuts", label: "Nuts" },
  { value: "Peanuts", label: "Peanuts" },
  { value: "Lemon Orange Lime", label: "Citrus" },
  { value: "Tomatoes Tomato", label: "Tomatoes" },
  { value: "Garlic", label: "Garlic" },
  { value: "Onions Onion", label: "Onions" },
  { value: "Corn", label: "Corn" },
  { value: "Avocado", label: "Avocado" },
];

const EMPLOYEES_DEFAULT_INFO = [
  { name: "Lisa Rexroad", allergies: [] },
  { name: "Jon Deichmann", allergies: [] },
  { name: "Jun Kyung Lee ", allergies: [] },
  { name: "Ivan Rebolledo", allergies: [] },
  { name: "JC Smiley Jr", allergies: [] },
  { name: "Vartika Patel", allergies: [] },
  { name: "Jessica Beazer", allergies: [] },
  { name: "Jennifer Alexander", allergies: [] },
  { name: "Radhika Lele", allergies: [] },
];

export default function Allergies() {
  return <h1>Allergies</h1>;
}

//Dishes API loader
export async function dishesDataLoader() {
  try {
    const ApiResponse = await fetch("https://menus-api.vercel.app/dishes");
    if (!ApiResponse.ok) {
      throw new Error(`Response status: ${ApiResponse.status}`);
    }
    const dishesData = await ApiResponse.json();
    return dishesData;
  } catch (error) {
    console.error(error.message);
  }
}
