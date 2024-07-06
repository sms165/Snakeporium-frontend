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
  predefinedQuestionsAndResponses: { question: string, response: string }[] = [];


  constructor(
    private customerService: CustomerService,

  private snackBar: MatSnackBar,
public dialog: MatDialog,

private activatedRoute : ActivatedRoute

) {

  }

  ngOnInit(){
    this.getProductDetailsById();
    this.getPredefinedQuestionsAndResponses();
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



  // getPredefinedQuestionsAndResponses(): void {
  //   this.customerService.getPredefinedQuestionsAndResponses(this.productId).subscribe(
  //     (data) => {
  //       this.getPredefinedQuestionsAndResponses = data;
  //       console.log(data)
  //       // Optionally, you can process the responses or use them in your chat interface
  //     },
  //     (error) => {
  //       console.error('Error fetching predefined questions and responses:', error);
  //     }
  //   );
  // }

  isFetchingPredefinedData = false; // Flag to indicate data fetching state

getPredefinedQuestionsAndResponses(): void {
  this.isFetchingPredefinedData = true; // Set flag to true before fetching
  this.customerService.getPredefinedQuestionsAndResponses(this.productId)
    .subscribe(
      (data) => {
        console.log(data)
        this.predefinedQuestionsAndResponses = data;
        this.isFetchingPredefinedData = false; // Set flag to false after successful fetch
      },
      (error) => {
        console.error('Error fetching predefined questions and responses:', error);
        this.isFetchingPredefinedData = false; // Set flag to false after error
      }
    );
}




}



