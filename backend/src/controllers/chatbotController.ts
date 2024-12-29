import {Request, Response} from "express";
import {IProduct} from "../models/product";
import {IProductRepository} from "../repository/interfaces/IProductRepository";
import {Entities, IServiceAI, ServiceResponse} from "../services/interfaces/IServiceAI";
import Order from "../models/order";

export class ChatbotController {
  private productRepository: IProductRepository;
  private serviceAI: IServiceAI;
  private menu: IProduct[]=[];
  private productsRequested: { product?: IProduct, quantity?: number }[] = [];

  constructor(productRepository: IProductRepository, serviceAI: IServiceAI) {
    this.productRepository = productRepository;
    this.serviceAI = serviceAI;
    this.interact = this.interact.bind(this);
  }

  async interact(req: Request, res: Response) {

    try {
      const {userMessage, context} = req.body.message;
      let menuString = "";
      if (this.menu.length === 0) {
        this.menu = await this.productRepository.getMenu();
        menuString = JSON.stringify(this.menu);
      }
      
      const {intent, entities, response}: ServiceResponse = await this.serviceAI.getChatbotResponse(userMessage, context, menuString);

      switch (intent) {
        case "say_hi":
          res.status(200).json({intent: "greeting", responseData: null, message: "Hola! Bienvenido a SushIA en que puedo ayudarte?"});
          break;
        case "ask_faq":
          res.status(200).json({intent: "askResponded", responseData: null, message: response});
          break;
        case "view_menu":
          res.status(200).json({intent: "menuReturned", responseData: this.menu, message: "Aquí esta el menú: "});
          break;

        case "make_order":
          if(entities.length == 0){
            res.status(400).json({intent: "fail", responseData: null, message: "No se ha podido realizar la orden" +
                " debe" +
                " seleccionar al menos un producto, vuelva a intentarlo por favor"});
            return;
          }
          const missingProducts = await this.getMissingProducts(entities);
          if (missingProducts.length > 0) {
            res.status(404).json({
              intent: "fail", responseData: missingProducts,
              message: `No se encontraron los siguientes productos, ingrese un nuevo pedido`
            });
            return;
          }
          this.setProductRequest(entities)

          console.log(this.productsRequested)
          res.status(200).json({intent: "orderReceived", responseData: entities, message: "¿Es correcto este pedido?"});
          break;

        case "say_bye":
          res.status(200).json({intent: "byeMessage", responseData: null, message: "Adios, vuelva pronto!"});
          break;

        case "cancel_order":
          this.productsRequested = []
          res.status(200).json({intent: "orderCanceled", responseData: null, message: "Orden cancelada. ¿Desea hacer" +
            " otro pedido?"});
          break;

        case "confirm_order":
          const newOrder=await this.createOrder()
          res.status(201).json({intent: "orderConfirmed", responseData: newOrder, message: "Orden realizada con" +
              " éxito. Gracias por su compra!"});
          break;
        
        case "unknown":
        default:
          res.status(400).json({intent: "unknownMessage", responseData: null, message: "Disculpas no he podido" +
              " entender tu mensaje"});
          break;
      }
    } catch (error: any) {
      res.status(500).json({message: "Internal Server Error"});
    }
  }

  private normalizeString = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  private async getMissingProducts(entities: Entities): Promise<string[]> {
    const menu = await this.productRepository.getMenu();
    const productNamesInDB: string[] = menu.map((product: IProduct) => this.normalizeString(product.name));
    return entities.filter((entity: any) =>
      !productNamesInDB.includes(this.normalizeString(entity.entity_name))
    ).map((entity: any) => entity.entity_name);
  }

  private setProductRequest(entities: Entities): void {
    this.productsRequested = entities.map((entity: any) => {
      const normalizedEntityName = this.normalizeString(entity.entity_name);
      const product = this.menu.find((product) => this.normalizeString(product.name) === normalizedEntityName);
      return { product, quantity: entity.quantity };
    });
  }
  private async createOrder(): Promise<any> {
    const generateID= (): number=>{
      return Math.floor(1000 + Math.random()* 9000);
    }
    const newOrder={ products: [...this.productsRequested], status: "pending", clientName: "ID" + generateID()}
    const order = new Order(newOrder)
    await order.save()
    return {
      products: this.productsRequested.map(item => ({
        product: {
          name: item.product?.name,
          price: item.product?.price
        },
        quantity: item.quantity
      })),
      status: newOrder.status,
      clientName: newOrder.clientName
    }
  }
}



