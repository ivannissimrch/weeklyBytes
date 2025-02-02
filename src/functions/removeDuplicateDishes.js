
function countOccurrences(arr, value) {
    let count = 0;
    for (let element of arr) {
        if (element.name === value.name) {
            count++;
        }
    }
    return count;
}

/**
 * Takes an array of all dishes and an array of 7 dishes and replaces any dishes 
 * that appear more then once in the 7 dishes array with a random dish from the 
 * all dishes array. 
 * 
 * The function returns the 7 dishes array with no duplicates.
 * @param {object[]} allDishes Array of all dishes
 * @param {object[]} sevenDishes Array of 7 dishes
 * @returns {object[]} Array of 7 dishes with no duplicates
 */
export default function removeDuplicateDishes(allDishes, sevenDishes) {
    let duplicates = true;
    let currentArray = [...sevenDishes]; // Start with original array

    while (duplicates) {
        duplicates = false; // Reset flag at start of each check
        let newArray = [];
        
        currentArray.forEach((dish) => {
            const numberOfOccur = countOccurrences(currentArray, dish);

            if (numberOfOccur > 1 && !newArray.some(d => d.name === dish.name)) {
                duplicates = true;
                let replacementDish;
                do {
                    const randomNumber = Math.floor(Math.random() * allDishes.length);
                    replacementDish = allDishes[randomNumber];
                } while (currentArray.some(d => d.name === replacementDish.name));
                newArray.push(replacementDish);
            } else if (!newArray.some(d => d.name === dish.name)) {
                newArray.push(dish);
            }
        });

        currentArray = newArray; // Update current array for next iteration
    }

    return currentArray;
}