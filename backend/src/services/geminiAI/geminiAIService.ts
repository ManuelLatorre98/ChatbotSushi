//todo hacer configuration y getChatbotResponse

import {IServiceAI, ServiceResponse} from "../interfaces/IServiceAI";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {getIntentAndEntitiesSchema} from "./geminiOutputSchemas";

export class GeminiAIService implements IServiceAI {
  private client: any
  private genAI: GoogleGenerativeAI | undefined
  constructor() {
    this.configuration();
  }
  configuration():void {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.client = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: getIntentAndEntitiesSchema
      }
    })
  }

  async getChatbotResponse(message: string, context: string, menu:string):Promise<ServiceResponse> {
    const prompt=`$
              **Message received:**
              ${message} 

              **Previous Context:**
              ${context} 

              **Menu:**
              ${menu}
              
              **FAQ:**
              ${process.env.ASK_FAQ}

              **Scenario:**

              A user is interacting with a chatbot for a sushi ordering service. The chatbot supports Spanish and English.

              **Task:**

              1. **Identify the user's intent:**
                  * **say_hi:**
                      *English: "Hello", "Hi", "Hey"
                      *Spanish: "Hola", "Hola!", "Buenas", "como estas?"
                  * **view_menu:** 
                      * English: "What's on the menu?", "Show me the menu"
                      * Spanish: "que hay en el menú?", "mostrame el menú", "quiero el menú"
                  * **make_order:** 
                      * English: "I want to order", "Can I get...", "I'd like..."
                      * Spanish: "me gustaria...", "quisiera...", "quiero..."
                  * **say_bye:** 
                      * English: "Goodbye", "Bye", "See you later", "no" 
                      * Spanish: "Adios", "Chau", "Me voy", "no" 
                  * **confirm_order:** 
                      * English: "Yes", "Confirm", "ok", "fine"
                      * Spanish: "Si", "Confirmar", "Confirmo", "Correcto", "perfecto"
                  * **cancel_order:** 
                      * English: "Cancel", "I want to cancel", "Nevermind", "Incorrect"
                      * Spanish: "Cancelar", "No quiero", "Olvidalo", "Incorrecto"
                  * **ask_faq:** 
                      * English: "What are your hours?", "Are you open?"
                      * Spanish: "A que hora abren?", "Estan abiertos?", "Hola a que hora abren?", "Hola estan abiertos?"
                  * **unknown:**
                      * Any other message that doesn't fit the above categories. " ".undefined messages, null messages, white messages, etc.

              2. **Extract relevant entities:**
                  * If the intent is **make_order**:
                      * Extract the **food_item** (e.g., "maki", "uramaki", "gunkan", "sashimi", "nigiri")
                      * If applicable, extract the **quantity** (e.g., "two", "three", "one order", "dos", "tres", "una orden")
                      
              3. **Return a response**
                  * If the intent is **ask_faq**:
                    * Return friendly response in spanish.
                    * Be clear and concise.
                    * Never confirm the answer or say "yes","si","no". Only give the information.

              **Example Message:**

              * English: "I'd like to order two sashimi and three nigiri." 
              * Spanish: "Me gustaría pedir dos sashimi y tres nigiri."

              **Expected Output:**

              {
                "entities": [
                  { "entity_name": 'sashimi', "quantity": 2 },
                  { "entity_name": 'nigiri', "quantity": 3 },
                ],
                "intent": 'make_order',
                "response":"..."
              } 
    `

    const result = await this.client.generateContent(prompt)
    console.log(JSON.parse(result.response.text()))
    return JSON.parse(result.response.text());
  }
}
