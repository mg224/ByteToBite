import React from "react"
import AIRecipe from "./AIRecipe"
import { getRecipeFromAI } from "../api"

export default function Main() {

    const [ingredients, setIngredients] = React.useState<string[]>([])
    const [recipe, setRecipe] = React.useState<string>("")
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>("")
    const [isDownloadingPDF, setIsDownloadingPDF] = React.useState<boolean>(false)
    const recipeSection = React.useRef<HTMLDivElement>(null)

    function addIngredient(formData: FormData) {
        const newIngredient = formData.get("ingredient")
        if (typeof newIngredient === 'string' && newIngredient.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()])
        }
    }

    function removeIngredient(indexToRemove: number) {
        setIngredients(prevIngredients => 
            prevIngredients.filter((_, index) => index !== indexToRemove)
        )
    }

    async function getRecipe() {
        if (ingredients.length === 0) {
            setError("Please add at least one ingredient first!")
            return
        }

        setIsLoading(true)
        setError("")
        
        try {
            console.log('Starting recipe generation with ingredients:', ingredients);
            const recipeMarkdown = await getRecipeFromAI(ingredients);
            console.log('Recipe received:', recipeMarkdown);
            setRecipe(recipeMarkdown);
            setError(""); // Clear any previous errors
        } catch (error) {
            console.error("Error generating recipe:", error);

            // More specific error messages
            let errorMessage = "Failed to generate recipe. ";
            
            if (error instanceof Error) {
                if (error.message.includes('API key') || error.message.includes('401')) {
                errorMessage += "There's an issue with the API configuration.";
            } else if (error.message.includes('500')) {
                errorMessage += "Server error - please check if your backend server is running properly.";
            } else if (error.message.includes('404')) {
                errorMessage += "API endpoint not found. Make sure your backend server is running on http://localhost:3000";
            } else if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
                errorMessage += "Can't connect to the server. Make sure your backend is running.";
            } else {
                errorMessage += error.message || "Please try again.";
            }
            }
            
            setError(errorMessage);
            setRecipe(""); // Clear any previous recipe
        } finally {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mb-6 shadow-lg animate-pulse">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Your Personal Sous Chef
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Powered by Google Gemini - Transform your ingredients into delicious recipes 
                        with cutting-edge artificial intelligence.
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-700 font-medium">{error}</p>
                            <button 
                                onClick={() => setError("")}
                                className="ml-auto text-red-500 hover:text-red-700"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Ingredient Input Form */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 p-8 mb-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Your Ingredients
                    </h3>
                    <form action={addIngredient} className="flex gap-3">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="e.g. chicken, tomatoes, basil..."
                                aria-label="Add ingredient"
                                name="ingredient"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-slate-700 placeholder-slate-400 bg-white/90"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                        >
                            Add
                        </button>
                    </form>

                    {/* Ingredients Display */}
                    {ingredients.length > 0 && (
                        <div className="mt-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {ingredients.map((ingredient, index) => (
                                    <span 
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-medium border border-indigo-200"
                                    >
                                        {ingredient}
                                        <button
                                            onClick={() => removeIngredient(index)}
                                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={getRecipe}
                                    disabled={isLoading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-400 disabled:to-slate-500 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Gemini is thinking...
                                        </div>
                                    ) : (
                                        "Generate Recipe"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Recipe Display */}
                <div ref={recipeSection}>
                    {recipe && <AIRecipe recipe={recipe} ingredients={ingredients} />}
                </div>
            </div>
        </main>
    )
}
