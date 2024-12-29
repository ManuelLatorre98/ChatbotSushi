export interface IProductRepository
{
  getAllProducts(): Promise<any>;
  getMenu(): Promise<any>;
  
}
