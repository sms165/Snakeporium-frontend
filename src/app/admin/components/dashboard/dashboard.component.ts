import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  allowedFormats: string[] = ['jpeg', 'png', 'gif', 'bmp', 'svg+xml'];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];

    this.adminService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        console.log('Byte image:', element.byteImg);
        console.log('Image format from backend:', element.imageFormat);
        // Extract image format from the data URI

        const formatMatch = element.byteImg.match(/^data:image\/(\w+);base64,(.*)$/);
        if (this.allowedFormats.includes(element.imageFormat)) {
          // Image format is allowed
          const imageUrl = 'data:image/' + element.imageFormat + ';base64,' + element.byteImg;
          element.processedImg = imageUrl;

          // Log the type of image
          console.log('Image type:', element.imageFormat);

          this.products.push(element);
        } else {
          console.error('Unsupported image format for product:', element);
        }
      });
    });
  }
}
