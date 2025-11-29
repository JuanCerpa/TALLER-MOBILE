import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ArViewPage } from '../ar-view/ar-view.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private modalController: ModalController) { }

  async openAR() {
    const modal = await this.modalController.create({
      component: ArViewPage,
      componentProps: {}
    });
    return await modal.present();
  }

}
