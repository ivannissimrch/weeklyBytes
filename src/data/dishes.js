const fetchDishes = async () => {
    try {
        const response = await fetch("https://menus-api.vercel.app/dishes");
        if (!response.ok) throw new Error("Failed to fetch dishes");
        return await response.json();
    } catch (error) {
        console.error("Error fetching dishes", error);
        throw error;
    }
};

const dishes = await fetchDishes();
export { dishes };
