
export default function Header() {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-indigo-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-center">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                            <img 
                                src="chef-icon.png" 
                                alt="chef claude icon" 
                                className="w-13 h-15 object-cover rounded-full relative z-10" 
                            />
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ByteToBite
                            </h1>
                            <p className="text-xs text-slate-500 mt-0.5">Powered by Google Gemini</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}