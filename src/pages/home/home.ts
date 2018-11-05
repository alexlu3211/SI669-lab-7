import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


const PLACEHOLDER_IMAGE: string = "/assets/imgs/placeholder.png";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	private image = PLACEHOLDER_IMAGE;
	timeStamp: any;
	images: any[] = [];

	constructor(public navCtrl: NavController,
				  private camera: Camera) {

	}


	takePic() {

		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
			if (imageData) {
				this.image = 'data:image/jpeg;base64,' + imageData;   
				this.timeStamp = Date.now(); 
				this.images.push({image: this.image, timeStamp: this.timeStamp})
			} else {
				this.image = PLACEHOLDER_IMAGE;
				this.timeStamp = null;
			}
		}, (err) => {
			this.image = PLACEHOLDER_IMAGE;
			this.timeStamp = null;
		});
		
		this.image = SPINNER_IMAGE;
	}

}
