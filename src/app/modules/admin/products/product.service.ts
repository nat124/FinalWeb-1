import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validator } from '@angular/forms';
import { Product } from "./product.model";
import { CommonModule } from '@angular/common';
import { CommonService } from "../../../shared/services/common.service";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData: Product;
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  data = new CommonService();
  baseuri = this.data.getUri();
  getCategories() {
    return this.http.get(this.baseuri + 'category/getSubcategories');
  }
  getProduct(page, size, name) {
    return this.http.get(this.baseuri + 'products/getProducts?page=' + page + '&pageSize=' + size + '&search=' + name);
  }
  getProductfilter(filtration:any) {

    return this.http.post(this.baseuri + 'products/getProductsFilter',filtration);
  }
  getFilterProducts(ProductCategoryId, Availability) {
    return this.http.get<Product[]>(this.baseuri + 'products/getFilterProducts?CategoryId=' + ProductCategoryId + "&Availability=" + Availability);
  }
  getProductsByName(SearchName) {
    return this.http.get<Product[]>(this.baseuri + 'products/getProductsByName?Name=' + SearchName)
  }
  getProductById(id: number) {
    var data = this.http.get(this.baseuri + 'products/getProductById?id=' + id);
    return data;
  }
  getSubcategories() {
    return this.http.get(this.baseuri + 'category/getSubcategories');
  }

  getVendors() {
    return this.http.get(this.baseuri + 'user/getVendors');
  }

  addProduct(formData: Product) {

    return this.http.post(this.baseuri + 'products/addProduct', formData);
  }
  checkWhishlistOutFStock(obj:any){
    return this.http.post(this.baseuri + 'products/wishlistcheck', obj);

  }

  updateProduct(formData: Product) {

    return this.http.post(this.baseuri + 'products/updateProduct', formData);
  }

  uploadImages(fileToUpload: File) {
    const model: FormData = new FormData();
    model.append('Icon', fileToUpload, fileToUpload.name);

    return this.http.post(this.baseuri + 'products/uploadFile', model)
  }
  refreshList() {
    return this.http.get(this.baseuri + 'products/getProducts');
  }

  deleteProduct(Id: number) {
    return this.http.get(this.baseuri + 'products/deleteProduct?Id=' + Id);
  }

  checkExistingSKU(productId, variantId, sku) {
    return this.http.get(this.baseuri + 'products/checkExistingSKU?productId=' + productId + "&variantId=" + variantId + "&sku=" + sku);
  }
  getAllVariants() {
    return this.http.get(this.baseuri + 'products/getAllVariants');
  }
  getsubcategoryCategories() {
    return this.http.get(this.baseuri + 'category/get-category/all');
  }
  enableProduct(id) {
    return this.http.get(this.baseuri + 'products/enableProduct?id=' + id);
  }
  disableProduct(id) {
    return this.http.get(this.baseuri + 'products/disableProduct?id=' + id);
  }

  getCategoryByParentId(id) {
    return this.http.get(this.baseuri + 'category/getByParentId?id=' + id);
  }
  getcommission(id){
    return this.http.get(this.baseuri + 'commission/getByCategoryId?id=' + id);
``
  }
  getIncresedPrice(price)
  {
    return this.http.get(this.baseuri + 'commission/getIncresedPrice?price=' + price);

  }
}
