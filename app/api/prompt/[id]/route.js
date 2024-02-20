import Prompt from "@models/prompt";
import { ConnectToDb } from "@utils/database";

//Get All prompt
export const GET = async (request, {params}) => {
    try {
        await ConnectToDb()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if(!prompt) return new Response("Prompt not Found", { status: 404 })


        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

//Update
export const PATCH = async (request, {params}) => {
   const {prompt, tag} = await request.json()

   try{
    await ConnectToDb()

    const existingPrompt = await Prompt.findById(params.id)

    if(!existingPrompt) new Response("Prompt not Found", { status: 404 })

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag

    await existingPrompt.save()
    return new Response(JSON.stringify(existingPrompt), { status: 200 })
   }catch (err) {
    return new Response("Failed to Update the Prompt", { status: 500 })
   }
}

//Delete Prompt
export const DELETE = async (request, {params}) => {
    try{
     await ConnectToDb()

     await Prompt.findByIdAndDelete(params.id)

     return new Response(JSON.stringify("Prompt Delted successfully"), { status: 200 })

    }catch(err){
        return new Response("Failed to Delete Prompt", { status: 500 })
    }
}