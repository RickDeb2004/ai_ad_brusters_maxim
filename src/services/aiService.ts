import axios from 'axios';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/gpt2';
const API_KEY = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;

export async function transformAdContent(adDetails: string): Promise<string> {
  try {
    const response = await axios.post(
      HUGGING_FACE_API_URL, 
      { 
        inputs: `Transform this advertisement into a spooky, witty description: ${adDetails}` 
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedText = response.data[0].generated_text
      .replace(adDetails, '')
      .trim()
      .slice(0, 150);

    return generatedText || 'A mysterious advertisement lurks here...';
  } catch (error) {
    console.error('AI Transformation Failed', error);
    return 'A ghostly ad escaped detection...';
  }
}