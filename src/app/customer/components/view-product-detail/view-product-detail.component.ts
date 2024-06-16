import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrl: './view-product-detail.component.scss'
})
export class ViewProductDetailComponent {

  productId: number = this.activatedRoute.snapshot.params["productId"];
  allowedFormats: string[] = ['jpeg', 'png', 'gif', 'bmp', 'svg+xml'];
  processedImg: string;
  product: any;
  FAQs: any[] = [];
  reviews: any[] = [];
  randomQuestions: string[] = [];
  chatMessages: { content: string; type: 'user' | 'bot' }[] = [];
  newMessage: string = '';


  constructor(
    private customerService: CustomerService,

  private snackBar: MatSnackBar,
public dialog: MatDialog,

private activatedRoute : ActivatedRoute

) {

  }

  ngOnInit(){
    this.getProductDetailsById();
    }



    getProductDetailsById() {
      this.customerService.getProductDetailById(this.productId).subscribe(res => {
        this.product = res.productDto;
        this.product.processedImg = 'data:image/' + res.productDto.imageFormat + ';base64,' + res.productDto.byteImg;
console.log(this.product.processedImg)
        this.FAQs = res.faqDtoList;

        res.reviewDtoList.forEach(element => {
          if (this.allowedFormats.includes(element.imageFormat)) {
            // Image format is allowed
            // console.log('Base64 Image Data:', element.returnedImg);
            const imageUrl = 'data:image/' + element.imageFormat + ';base64,' + element.returnedImg;
            element.processedImg = imageUrl;

            //  console.log(element.processedImg);


            this.reviews.push(element);


          } else {
            console.error(`Unsupported image format for product: ${element.imageFormat}`, element);
          }
        });
        // console.log(this.reviews);
      }, error => {
        console.error('Error fetching product details:', error);
      });
    }

    addToWishlist() {
      const wishlistDto = {
          productId: this.productId,
          userId: UserStorageService.getUserId()
      };

      this.customerService.addProductToWishlist(wishlistDto).subscribe(
          res => {
              if (res && res.id != null) {
                  this.snackBar.open("Product has been added to wishlist", "Close", {
                      duration: 5000
                  });
              }
          },
          err => {
              if (err.status === 400 ) {
                  this.snackBar.open("Already in wishlist", "ERROR", {
                      duration: 5000
                  });
              } else {
                  this.snackBar.open("Error adding product to wishlist", "ERROR", {
                      duration: 5000
                  });
              }
          }
      );
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '') return;

    this.chatMessages.push({ content: this.newMessage.trim(), type: 'user' });

    // Send user message to backend for processing (if needed)

    this.newMessage = ''; // Clear the input field
  }

  askRandomQuestions(): void {
    this.customerService.getRandomQuestionsWithProductDetails(this.productId).subscribe(
      (questions) => {
        this.randomQuestions = questions;
      },
      (error) => {
        console.error('Error fetching random questions:', error);
      }
    );
  }
}



