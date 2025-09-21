export async function getRecipeFromAI(ingredientsArr) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredients: ingredientsArr
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.recipe;

    } catch (error) {
        console.error('Error calling recipe API:', error);
        throw error;
    }
}