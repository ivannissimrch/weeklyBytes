export default function identifySafeDishes(fetchedDishes, uniqueAllergens) {
  return fetchedDishes.filter((dish) => {
    //exclude dishes with allergen on name
    const hasAllergenInName = dish.name
      .split(" ")
      .some((name) => uniqueAllergens.includes(name));
    if (hasAllergenInName) {
      return false;
    }
    //exclude dishes with allergen on ingredients
    const hasAllergenInIngredients = dish.ingredients.every(
      (ingredient) => !uniqueAllergens.includes(ingredient)
    );
    return hasAllergenInIngredients;
  });
}
