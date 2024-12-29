export type Entities = { product?: string; quantity?: number}[]
export type ServiceResponse = {
  intent: string
  entities: Entities
  response: string
}
export interface IServiceAI {
  configuration():void
  getChatbotResponse(message: string, context:string, menu:string): Promise<ServiceResponse>;
}
