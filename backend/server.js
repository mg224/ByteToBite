import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import PDFDocument from 'pdfkit';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// System prompt for recipe generation
const SYSTEM_PROMPT = `
    You are a helpful cooking assistant that creates recipes based on ingredients provided by users. 

    Guidelines:
    - Create practical, delicious recipes using some or all of the provided ingredients
    - You can suggest additional common ingredients if needed, but try to keep it simple
    - Include clear instructions and estimated cooking time
    - Format your response in markdown for easy reading
    - Make the recipe suitable for home cooking
    - If the ingredients seem unusual together, suggest the best way to use them or recommend a fusion approach
    `
;

async function getRecipeFromGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    const prompt = `${SYSTEM_PROMPT}

I have these ingredients: ${ingredientsString}

Please suggest a recipe I can make with some or all of these ingredients. Include ingredients list, instructions, and estimated cooking time.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
}

// Utility function to convert markdown to plain text for PDF
function markdownToPlainText(markdown) {
    return markdown
        .replace(/#{1,6}\s+/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/^\s*[-*+]\s+/gm, '• ') // Convert list items
        .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
        .trim();
}

// Routes

// Health check
app.get('/', (req, res) => {
    res.json({ 
        message: 'Recipe API with Google Gemini is running!',
        model: 'gemini-1.5-flash'
    });
});

// Generate recipe from ingredients
app.post('/api/recipe', async (req, res) => {
    try {
        const { ingredients } = req.body;
        
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ 
                error: 'Please provide an array of ingredients' 
            });
        }

        const recipe = await getRecipeFromGemini(ingredients);
        
        res.json({
            success: true,
            ingredients: ingredients,
            recipe: recipe,
            model: 'gemini-1.5-flash',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error generating recipe:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to generate recipe. Please try again.';
        if (error.message?.includes('API_KEY')) {
            errorMessage = 'Invalid or missing Gemini API key. Please check your configuration.';
        } else if (error.message?.includes('quota')) {
            errorMessage = 'API quota exceeded. Please try again later.';
        }
        
        res.status(500).json({ error: errorMessage });
    }
});

// Export recipe as PDF
app.post('/api/recipe/pdf', async (req, res) => {
    try {
        const { ingredients, recipe } = req.body;
        
        if (!ingredients || !recipe) {
            return res.status(400).json({ 
                error: 'Please provide both ingredients and recipe' 
            });
        }

        // Create PDF
        const doc = new PDFDocument();
        
        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=recipe.pdf');
        
        // Pipe PDF to response
        doc.pipe(res);
        
        // Add content to PDF
        doc.fontSize(20).text('AI-Generated Recipe', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(14).text('Ingredients Used:', { underline: true });
        doc.fontSize(12).text(ingredients.join(', '));
        doc.moveDown();
        
        doc.fontSize(14).text('Recipe:', { underline: true });
        doc.moveDown();
        
        // Convert markdown to plain text and add to PDF
        const plainTextRecipe = markdownToPlainText(recipe);
        doc.fontSize(11).text(plainTextRecipe, {
            width: 500,
            align: 'left'
        });
        
        doc.moveDown();
        doc.fontSize(8).text(`Generated using Google Gemini AI on: ${new Date().toLocaleString()}`, {
            align: 'center'
        });
        
        // Finalize PDF
        doc.end();
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ 
            error: 'Failed to generate PDF. Please try again.' 
        });
    }
});

// Get recipe and return PDF in one call
app.post('/api/recipe-pdf', async (req, res) => {
    try {
        const { ingredients } = req.body;
        
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ 
                error: 'Please provide an array of ingredients' 
            });
        }

        // Generate recipe
        const recipe = await getRecipeFromGemini(ingredients);
        
        // Create PDF
        const doc = new PDFDocument();
        
        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=gemini-recipe.pdf');
        
        // Pipe PDF to response
        doc.pipe(res);
        
        // Add content to PDF
        doc.fontSize(20).text('AI-Generated Recipe', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(14).text('Ingredients Used:', { underline: true });
        doc.fontSize(12).text(ingredients.join(', '));
        doc.moveDown();
        
        doc.fontSize(14).text('Recipe:', { underline: true });
        doc.moveDown();
        
        // Convert markdown to plain text and add to PDF
        const plainTextRecipe = markdownToPlainText(recipe);
        doc.fontSize(11).text(plainTextRecipe, {
            width: 500,
            align: 'left'
        });
        
        doc.moveDown();
        doc.fontSize(8).text(`Generated using Google Gemini AI on: ${new Date().toLocaleString()}`, {
            align: 'center'
        });
        
        // Finalize PDF
        doc.end();
        
    } catch (error) {
        console.error('Error:', error);
        
        let errorMessage = 'Failed to generate recipe and PDF. Please try again.';
        if (error.message?.includes('API_KEY')) {
            errorMessage = 'Invalid or missing Gemini API key. Please check your configuration.';
        }
        
        res.status(500).json({ error: errorMessage });
    }
});

app.listen(PORT, () => {
    console.log(`Recipe API with Google Gemini running on port ${PORT}`);
    console.log(`Using model: gemini-1.5-flash`);
    console.log(`Available endpoints:`);
    console.log(`  GET  /                - Health check`);
    console.log(`  POST /api/recipe      - Generate recipe from ingredients`);
    console.log(`  POST /api/recipe/pdf  - Export existing recipe as PDF`);
    console.log(`  POST /api/recipe-pdf  - Generate recipe and return as PDF`);
});