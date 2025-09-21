import React from "react"

interface IngredientsListProps {
    ingredients: string[];
    getRecipe: () => void;
    isLoading: boolean;
    ref: React.RefObject<HTMLDivElement>;
}

export default function IngredientsList(props: IngredientsListProps) {
    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
        <li 
            key={ingredient} 
            className="flex items-center px-4 py-3 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-xl border border-indigo-100 transform hover:scale-105 transition-all duration-200 hover:shadow-md"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 flex-shrink-0"></div>
            <span className="text-slate-700 font-medium capitalize">{ingredient}</span>
        </li>
    ))

    return (
        <section className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ingredients Ready
                </h2>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                    {props.ingredients.length} items
                </span>
            </div>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8" aria-live="polite">
                {ingredientsListItems}
            </ul>

            {props.ingredients.length > 2 && (
                <div className="border-t border-indigo-100 pt-8" ref={props.ref}>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full mb-4 shadow-lg animate-pulse">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            Ready for Gemini?
                        </h3>
                        <p className="text-slate-600 mb-6 max-w-md mx-auto">
                            You've got some great ingredients! Let Google's Gemini AI create a personalized recipe just for you.
                        </p>
                        <button 
                            onClick={props.getRecipe}
                            disabled={props.isLoading}
                            className={`px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-semibold rounded-xl transform transition-all duration-300 shadow-lg hover:shadow-xl ${
                                props.isLoading 
                                    ? 'opacity-75 cursor-not-allowed' 
                                    : 'hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 hover:scale-105'
                            }`}
                        >
                            {props.isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Gemini is thinking...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Generate with Gemini AI
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}