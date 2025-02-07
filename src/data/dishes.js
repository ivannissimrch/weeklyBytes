export default async function dishesDataLoader() {
    const URL = "https://menus-api.vercel.app/dishes";
    const controller = new AbortController();

    const fetchTimeOut = setTimeout(() => {
        controller.abort();
        throw new Error(`Failed to fetch dishes from ${URL} in time. Check your connection or try again later.`);
    }, 5000);

    try {
        const response = await fetch(URL);
        clearTimeout(fetchTimeOut);
        if (!response.ok)
            throw new Error(`Failed to fetch dishes from "${URL}". Please check the source and try again.`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching dishes", error);
        return error;
    }
}
