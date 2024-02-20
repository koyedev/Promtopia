import Prompt from "@models/prompt";
import { ConnectToDb } from "@utils/database";

export const GET = async (request, {params} ) => {
    try {
        await ConnectToDb()

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 