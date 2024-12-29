import {SchemaType} from "@google/generative-ai";

export const getIntentAndEntitiesSchema = {
  description: "Response",
  type: SchemaType.OBJECT,
  properties: {
    intent: {
      type: SchemaType.STRING
    },
    entities: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          entity_name: {
            type: SchemaType.STRING
          },
          quantity: {
            type: SchemaType.NUMBER
          }
        }
      }
    },
    response: {
      type: SchemaType.STRING
    }

  }
}
