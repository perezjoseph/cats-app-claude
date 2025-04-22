const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('static'));

// Configure AWS Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

// Cat API configuration
const CAT_API_URL = "https://api.thecatapi.com/v1/images/search";
const CAT_API_KEY = process.env.CAT_API_KEY || '';

// Main route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// API route to get cat images
app.get('/api/cats', async (req, res) => {
  try {
    const headers = {};
    if (CAT_API_KEY) {
      headers['x-api-key'] = CAT_API_KEY;
    }

    // Add timestamp to prevent caching
    const timestamp = Date.now();
    const response = await axios.get(`${CAT_API_URL}?limit=9&timestamp=${timestamp}`, { headers });

    // Set cache control headers
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cat images:', error);
    res.status(500).json({ error: 'Failed to fetch cat images' });
  }
});

// New API route for generating meme descriptions with AWS Bedrock
app.get('/api/meme', async (req, res) => {
  try {
    // Get a random cat image first
    const headers = {};
    if (CAT_API_KEY) {
      headers['x-api-key'] = CAT_API_KEY;
    }

    const catResponse = await axios.get(`${CAT_API_URL}?limit=1`, { headers });
    const catImage = catResponse.data[0];

    // Prepare the prompt for Anthropic Claude
    const prompt = `
      Create a short, funny meme caption for a cat image. 
      The caption should be humorous, witty, and cat-related. 
      Keep it clean and family-friendly.
      Make it brief (15 words or less) and punchy, like a classic internet meme.
      Just return the caption text without any explanations or quotation marks.
    `;

    // Call AWS Bedrock with Claude model
    const modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-v2';
    const bedrockParams = {
      modelId: modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        prompt: `Human: ${prompt}\n\nAssistant:`,
        max_tokens_to_sample: 100,
        temperature: 0.7,
        top_p: 0.9,
      }),
    };

    const command = new InvokeModelCommand(bedrockParams);
    const bedrockResponse = await bedrockClient.send(command);
    
    // Parse the Bedrock response
    const responseBody = JSON.parse(new TextDecoder().decode(bedrockResponse.body));
    const caption = responseBody.completion.trim();

    // Return both the image and the caption
    res.json({
      image: catImage,
      caption: caption
    });
  } catch (error) {
    console.error('Error generating meme:', error);
    res.status(500).json({ error: 'Failed to generate meme' });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});