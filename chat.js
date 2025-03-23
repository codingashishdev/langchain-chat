import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as dotenv from 'dotenv';
import cors from "cors";
import express from "express"
import { HumanMessage } from "@langchain/core/messages";

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())

app.post('/chat', async (req, res) => {
    const { query } = req.body;
    const model = new ChatGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
        modelName: "gemini-1.5-flash",
        maxOutputTokens: 2048
    });

    const input = [
        new HumanMessage({
            content: [
                {
                    type: "text",
                    text: `${query}`
                },
            ],
        }),
    ];

    const result = await model.invoke(input)

    res.status(200).json({
        status: 200,
        data: result.content,
        message: "Model calling successful"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})