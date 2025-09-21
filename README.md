# ByteToBite - AI-Powered Recipe Generator

Transform your ingredients into delicious recipes using Google's Gemini AI. Never wonder "what should I cook?" again!

## 🚀 Project Overview

ByteToBite is an intelligent recipe generation platform that takes your available ingredients and creates personalized, detailed recipes using Google's Gemini AI. Whether you have leftover ingredients or want to try something new, our AI chef creates tailored recipes with step-by-step instructions.

### Key Features

- **Smart Recipe Generation**: Input any combination of ingredients and get AI-generated recipes
- **Google Gemini Integration**: Powered by Google's advanced Gemini 1.5 Flash model
- **PDF Export**: Download recipes as beautifully formatted PDF documents
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Processing**: Get recipes in seconds, not minutes
- **Ingredient Management**: Easy add/remove functionality for ingredients

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Markdown** - Rich recipe formatting
- **Modern ES6+** - Latest JavaScript features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Google Generative AI SDK** - Gemini API integration
- **PDFKit** - PDF document generation
- **CORS** - Cross-origin resource sharing

## 🔧 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Google Gemini API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/bytetobite.git
cd bytetobite
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Start the backend server
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file for frontend
echo "VITE_API_BASE_URL=http://localhost:3000/api" > .env

# Start the development server
npm run dev
```

### 4. Get Your Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to your backend `.env` file

## 🖥 Usage

1. **Add Ingredients**: Type ingredients you have available (e.g., "chicken", "rice", "tomatoes")
2. **Generate Recipe**: Click "Generate with Gemini AI" to create a personalized recipe
3. **View Recipe**: Get detailed cooking instructions, ingredient lists, and cooking times
4. **Export PDF**: Download your recipe as a PDF for offline use

## 📚 API Endpoints

### `GET /`
Health check endpoint
- **Response**: Server status and configuration info

### `POST /api/recipe`
Generate recipe from ingredients
- **Body**: `{ "ingredients": ["chicken", "rice", "onion"] }`
- **Response**: `{ "recipe": "markdown_formatted_recipe", "success": true }`

## 🔮 Future Enhancements

- **Dietary Restrictions**: Filter recipes by dietary preferences (vegan, gluten-free, etc.)
- **Cuisine Styles**: Specify cooking styles (Italian, Asian, Mediterranean)
- **Nutritional Info**: Display calorie and macro information
- **Recipe Ratings**: User feedback and recipe improvement
- **Shopping Lists**: Generate ingredient shopping lists
- **Recipe History**: Save and manage favorite recipes
- **Social Sharing**: Share recipes with friends and family

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Misha Gupta
- **Role**: Full-stack development, AI integration, UI/UX design
---

**Built for PennApps2025**
