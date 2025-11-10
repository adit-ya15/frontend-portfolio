import { getGroqChatCompletion } from "@/app/bot";
import { 
    getOverview, 
    getSkillsOverview, 
    getExperienceOverview, 
    getProjectsOverview, 
    getSCSCloudDetails, 
    getContactInfo, 
    getGitHubStats,
    getArchitectureDiagrams 
} from "@/app/bot/functions";
import { getSession, setSession } from "@/app/bot/sessions";
import { systemPrompt } from "@/app/bot/system_prompt";
import Groq from "groq-sdk";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        let { message, sessionId} = await req.json();
        if (!message || !sessionId) throw new Error("message and sessionId both required");
        const prevSession=await getSession(sessionId);
        if(!prevSession){
            const startingMessage:Groq.Chat.Completions.ChatCompletionMessageParam[]=[
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: message
                }
            ];
            await setSession(sessionId,{
                messages:startingMessage
            });
        }
        const session=await getSession(sessionId); 
        session?.messages.push({
            role: "user",
            content: message
        })
        let aiRes=(await getGroqChatCompletion(session!.messages)).choices[0].message;
        let toolCalls=aiRes.tool_calls;
        session!.messages.push(aiRes);
    
        let count=0;
        while(toolCalls&&toolCalls.length!=0){
            count++;
            if(count>12) return NextResponse.json({error: "Exceeded maximum tool call iterations"}, {status: 500});
            for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name;
                const functionToCall = availableFunctions[functionName];
                const functionResponse = functionToCall();
                session!.messages.push({
                    tool_call_id: toolCall.id,
                    role: "tool",
                    content: functionResponse,
                });
            }
            aiRes=(await getGroqChatCompletion(session!.messages)).choices[0].message
            toolCalls=aiRes.tool_calls 
            session!.messages.push(aiRes);
            if(aiRes.content) break;
        }
        return NextResponse.json({response: aiRes.content}, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

const availableFunctions: Record<string, Function> = {
    "getOverview": getOverview,
    "getSkillsOverview": getSkillsOverview,
    "getExperienceOverview": getExperienceOverview,
    "getProjectsOverview": getProjectsOverview,
    "getSCSCloudDetails": getSCSCloudDetails,
    "getContactInfo": getContactInfo,
    "getGitHubStats": getGitHubStats,
    "getArchitectureDiagrams": getArchitectureDiagrams,
} as const;