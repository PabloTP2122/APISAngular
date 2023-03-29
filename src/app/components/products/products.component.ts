import { Component, OnInit } from '@angular/core';

//Para evitar callback hell con observables
import { switchMap } from 'rxjs/operators';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar])

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
  ngOnInit(): void {
    // Async
    this.productsService.getAllProducts(10, 0)
      .subscribe(data => {
        this.products = data;
        this.offset += this.limit;
      });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
      .subscribe(data => {
        //console.log('product ', data);
        this.productChosen = data;
        this.statusDetail = 'success';
      }, errorMsg => {
        console.log('Error: ', errorMsg);
        //alert(errorMsg);
        this.statusDetail = errorMsg;
      });
  }
  // Evitando callback hell al hacer multiples llamados
  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
      .pipe(
        //Para concatenar las peticiones
        switchMap((product) => this.productsService.update(product.id, { title: 'change' })
        )
      )
      .subscribe(data => {
        console.log(data);
      });
  }
  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'okasjdnjlasjl',
      images: ['https://placeimg.com/640/480/any'],
      price: 5000,
      categoryId: 5,
    }
    this.productsService.create(product).subscribe(data => {
      console.log('Creado ', data);
      this.products.unshift(data);
    });
  }
  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Gato',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe(data => {
      console.log('Actualizado' + data);
      const productIndex = this.products.findIndex(item =>
        item.id === this.productChosen.id);
      this.products[productIndex] = data;
    });
  }
  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(
      () => {
        const productIndex = this.products.findIndex(
          item => item.id === this.productChosen.id
        );
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
  }
  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }


}
