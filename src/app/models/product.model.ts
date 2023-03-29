// Interfaz de category para manejar el objeto
export interface Category {
  id: string;
  name: string;
}


export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category' > {
  categoryId: number;
}
// para put, se utiliza el Partial para poner todos los atributos como
// opcionales (?)
export interface UpdateProductDTO extends Partial<CreateProductDTO> {

}
