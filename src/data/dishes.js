const URL = "https://menus-api.vercel.app/dishes";
const HTTP_TIMEOUT = 30000; // 30 second timeout

export default async function dishesDataLoader() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HTTP_TIMEOUT);

    try {
        const response = await fetch(URL, { signal: controller.signal });

        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status} ${response.statusText}. Cannot find dishes API at "${URL}". Check the path or try again later.`
            );
        }

        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            console.error("Fetch request timed out.");
            return { error: "Request timed out. Please check your connection or try again later." };
        } else if (error.name === "TypeError") {
            console.error("Network error or invalid URL.");
            return { error: "Network error or invalid API URL" };
        } else {
            console.error("Unexpected error:", error);
            return { error: error.message };
        }
    } finally {
        clearTimeout(timeoutId);
    }
}
