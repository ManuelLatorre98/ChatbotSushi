import request from 'supertest'
import app from '../src/app'
import * as dotenv from 'dotenv';

dotenv.config()
describe('Chatbot sushi API tests',()=>{

  it('Ask if its open', async () => {
    const firstRequest = {
      "message":{
        "userMessage": "A que hora es el partido de argentina",
        "conext": ""
      }
    }
    const spectedRes = {
      "intent": "unknownMessage",
      "responseData": null,
      "message": "Disculpas no he podido entender tu mensaje"
    }
    const response = await request(process.env.URI_TEST!)
      .post('/api/interact')
      .send(firstRequest)

    expect(response.status).toBe(400)
    expect(response.body).toEqual(spectedRes)
  })

  it('Ask for menu', async () => {
    const firstRequest = {
      "message":{
        "userMessage": "Quiero el menú",
        "conext": ""
      }
    }
    const spectedRes = {
      "intent": "menuReturned",
      "responseData": expect.any(Array),
      "message": "Aquí esta el menú: "
    }
    const response = await request(process.env.URI_TEST!)
      .post('/api/interact')
      .send(firstRequest)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(spectedRes)
  })

  it('Make a request with missing products', async () => {
    const firstRequest = {
      "message":{
        "userMessage": "Quiero pedir dos maki roll, un frushi, tres uramaki, cinco gunkan ",
        "conext": ""
      }
    }
    const spectedRes = {
      "intent": "fail",
      "responseData": expect.any(Array),
      "message": "No se encontraron los siguientes productos, ingrese un nuevo pedido"
    }

    const response = await request(process.env.URI_TEST!)
      .post('/api/interact')
      .send(firstRequest)

    expect(response.status).toBe(404)
    expect(response.body.responseData).toBeInstanceOf(Array)
    expect(response.body).toEqual(spectedRes)
  })


  it('Make a rejected request', async () => {
    const firstRequest = {
      "message":{
        "userMessage": "Quiero pedir dos maki roll, un frushi, tres uramaki, cinco gunkan ",
        "conext": ""
      }
    }
    const spectedRes1 = {
      "intent": "fail",
      "responseData": expect.any(Array),
      "message": "No se encontraron los siguientes productos, ingrese un nuevo pedido"
    }

    const secondRequest = {
      "message": {
        "userMessage": "Si quiero hacer un nuevo pedido",
        "conext": "Quiero pedir  dos maki roll, tres uramaki, cinco gunkan \nNo se encontraron los siguientes" +
          " productos, ¿desea cambiar el pedido?"
      }
    }
    const spectedRes2 = {
      "intent": "fail",
      "responseData": null,
      "message": "No se ha podido realizar la orden debe seleccionar al menos un producto, vuelva a intentarlo por favor"
    }

    const res1 = await request(process.env.URI_TEST!)
      .post('/api/interact')
      .send(firstRequest)

    expect(res1.status).toBe(404)
    expect(res1.body.responseData).toBeInstanceOf(Array)
    expect(res1.body).toEqual(spectedRes1)

    const res2 = await request(process.env.URI_TEST!)
      .post('/api/interact')
      .send(secondRequest)

    expect(res2.status).toBe(400)
    expect(res2.body.responseData).toBe(null)
    expect(res2.body).toEqual(spectedRes2)
  })

  it('Make an accepted request', async () => {
    const firstRequest = {
      "message":{
        "userMessage": "quiero 2 california roll y tres uramaki",
        "conext": "Si quiero hacer un nuevo pedido\nNo se ha podido realizar la orden debe seleccionar al menos un producto, vuelva a intentarlo por favor"
      }
    }
    const spectedRes = {
      "intent": "orderReceived",
      "responseData": expect.any(Array),
      "message": "¿Es correcto este pedido?"
    }

    const response = await request(process.env.URI_TEST!)
      .post('/api/interact')
      .send(firstRequest)

    expect(response.status).toBe(200)
    expect(response.body.responseData).toBeInstanceOf(Object)
    expect(response.body).toEqual(spectedRes)
  })

  it('Order confirmed', async () => {
    const spectedRes = {
      "intent": "orderConfirmed",
      "responseData": {
        "products": expect.any(Array),
        "status": "pending",
        "clientName": expect.any(String)
      },
      "message": "Orden realizada con éxito. Gracias por su compra!"
    }
    const firstRequest = {
      "message":{
        "userMessage": "ok",
        "conext": "quiero 2 california roll y tres uramaki\n¿Es correcto este pedido?"
      }

    }
    const response = await request(process.env.URI_TEST!)
      .post('/api/interact')
      .send(firstRequest)

    expect(response.status).toBe(201)
    expect(response.body.responseData).toBeInstanceOf(Object)
    expect(response.body).toEqual(spectedRes)
  })

  it('Message not recognized', async () => {
    const spectedRes = {
      "intent": "unknownMessage",
      "responseData": null,
      "message": "Disculpas no he podido entender tu mensaje"
    }
    const firstRequest = {
      "message":{
        "userMessage": "A que hora es el partido de argentina",
        "conext": ""
      }
    }


    const response = await request(process.env.URI_TEST!)
      .post('/api/interact')
      .send(firstRequest)

    expect(response.status).toBe(400)
    expect(response.body).toEqual(spectedRes)
  })
})
