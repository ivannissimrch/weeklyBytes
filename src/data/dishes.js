export default async function dishesDataLoader() {
    try {
        const response = await fetch("https://menus-api.vercel.app/dishes");
        if (!response.ok) throw new Error("Failed to fetch dishes");
        return await response.json();
    } catch (error) {
        console.error("Error fetching dishes", error);
        throw error;
    }
}
