import { Injectable } from '@nestjs/common';
import axios from 'axios';
require('dotenv').config();

@Injectable()
export class AiService {
  async generateSummary(reviews: string[]) {
    const apiKey = process.env.OPENAI_API_KEY;
    console.log(reviews)
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini',
        // messages: [{ role: 'user', content: `Summarize these reviews about a uni professor and provide a score from 1 to 5: ${reviews}` }],
        messages: [{ role: 'user', content: `hi there` }],
        temperature: 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      });

      console.log(response);
      return response.data.choices[0].text;
    } catch (e) {
      console.log(e)
      return 'no summary';
    }

  }
}
