import React from "react"
import ReactMarkdown from "react-markdown"

export default function AIRecipe({ recipe, ingredients = [] }) {

    return (
        <section className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-200 p-8 animate-fadeIn">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full mb-4 shadow-lg animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                            Gemini AI Recipe
                        </h2>
                        <p className="text-slate-600">Your personalized recipe is ready!</p>
                    </div>
                </div>
            </div>
            
            <div 
                className="prose prose-lg max-w-none
                    prose-headings:text-slate-800 prose-headings:font-bold
                    prose-h1:text-2xl prose-h1:mb-4 prose-h1:text-center prose-h1:bg-gradient-to-r prose-h1:from-indigo-600 prose-h1:to-purple-600 prose-h1:bg-clip-text prose-h1:text-transparent
                    prose-h2:text-xl prose-h2:mb-3 prose-h2:text-slate-700 prose-h2:border-b prose-h2:border-indigo-200 prose-h2:pb-2
                    prose-h3:text-lg prose-h3:mb-2 prose-h3:text-slate-700
                    prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:mb-6 prose-li:mb-2 prose-li:text-slate-700
                    prose-ol:mb-6 prose-ol:pl-6
                    prose-strong:text-slate-800 prose-strong:font-semibold
                    prose-em:text-indigo-600 prose-em:not-italic prose-em:font-medium"
                aria-live="polite"
            >
                <ReactMarkdown
                    components={{
                        h1: ({children}) => (
                            <h1 className="flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                                <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                {children}
                            </h1>
                        ),
                        h2: ({children}) => (
                            <h2 className="flex items-center text-xl font-bold text-slate-700 border-b border-indigo-200 pb-2 mb-4 mt-8">
                                <div className="w-2 h-6 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full mr-3"></div>
                                {children}
                            </h2>
                        ),
                        h3: ({children}) => (
                            <h3 className="text-lg font-semibold text-slate-700 mb-3 mt-6">
                                {children}
                            </h3>
                        ),
                        ul: ({children}) => (
                            <ul className="space-y-2 mb-6">
                                {children}
                            </ul>
                        ),
                        ol: ({children}) => (
                            <ol className="space-y-3 mb-6 counter-reset">
                                {children}
                            </ol>
                        ),
                        li: ({children, ...props}) => {
                            const isOrderedList = props.node?.parent?.tagName === 'ol';
                            return (
                                <li className={`flex items-start ${isOrderedList ? 'pl-2' : ''}`}>
                                    {!isOrderedList && (
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    )}
                                    <span className="text-slate-700 leading-relaxed">{children}</span>
                                </li>
                            );
                        },
                        p: ({children}) => (
                            <p className="text-slate-600 leading-relaxed mb-4">
                                {children}
                            </p>
                        ),
                        strong: ({children}) => (
                            <strong className="font-semibold text-slate-800 bg-indigo-50 px-1 rounded">
                                {children}
                            </strong>
                        )
                    }}
                >
                    {recipe}
                </ReactMarkdown>
            </div>

            <div className="mt-8 pt-6 border-t border-indigo-100 flex justify-center">
                <div className="flex items-center text-sm text-slate-500">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Powered by Google Gemini AI
                </div>
            </div>
        </section>
    )
}