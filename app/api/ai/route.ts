import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connectDb";
import User from "@/models/userSchema";
import axios from "axios";

export async function POST(request: NextRequest) {
    try {
        await connectDb();
        const { email, query } = await request.json();
        const apiKey = process.env.OPENAI_API_KEY;

        const production = process.env.NODE_ENV === 'production';

        // if (true) {
        //     console.log("in development mode");
        //     return NextResponse.json({ message: "bhaiya aap hume achhe lgte ho 🥰" }, {status: 200});
        // }

        const openAIChatCompletion = async (messages: Array<{ role: string; content: string; }>) => {
      
            try {
              const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  model: 'gpt-3.5-turbo',
                  messages: messages,
                  max_tokens: 100,
                  temperature: 0.7,
                }),
              });
              
              const data = await response.json();
                console.log(data)
              return data.choices[0].message.content;
            } catch (error) {
                console.error('Error:', error);
                return NextResponse.json({ message: "An error occured while getting response." }, {status: 500});
            }
          };
      
          const messages = [
            { role: 'system', content: 'You are a helpful assistant named ExoAssist for an event named Exogenesis. The user has already registered and the final rounds are on 7th to 10th dec. You need guide people for the event and their details. For now, the creative event has its submission on 2nd Dec, Surprise submi on 3rd Dec, Cryptic on 5th. The offline is from 7th - 10th for the finals.' },
            { role: 'user', content: query }
          ];
      
        const result = await openAIChatCompletion(messages);

        // const result = "bhaijaan aap hume achha lagte ho"
        return NextResponse.json({ message: result }, {status: 200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "An error occured while getting response." }, {status: 500});
    }
}