import { Router } from 'express';
import { ChatbotController } from '../controllers/chatbotController';
import { MongoProductRepository } from '../repository/mongoProductRepository';
import Product from '../models/product';
import { GeminiAIService } from '../services/geminiAI/geminiAIService';
import * as dotenv from "dotenv";

dotenv.config();

const router = Router();

// Dependencies
const mongoRepository = new MongoProductRepository(Product);
const chatBotService = new GeminiAIService();
const chatbotController = new ChatbotController(mongoRepository, chatBotService);

// Routes
router.post("/interact", chatbotController.interact);

export default router;
