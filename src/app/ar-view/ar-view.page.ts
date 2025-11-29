import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface ArTarget {
  id: string;
  type: 'hiro' | 'barcode';
  value?: number; // For barcode
  imageSrc: string;
}

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar-view.page.html',
  styleUrls: ['./ar-view.page.scss'],
  standalone: false,
})
export class ArViewPage implements OnInit, OnDestroy {
  // Setup state
  currentImage: string | null = null;
  currentMarkerType: 'hiro' | 'barcode' = 'hiro';
  currentBarcodeValue: number = 1;

  // AR state
  targets: ArTarget[] = [];
  showScene: boolean = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.loadTargets();
  }

  ngOnDestroy() {
    this.cleanupAR();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addTarget() {
    if (this.currentImage) {
      const newTarget: ArTarget = {
        id: Date.now().toString(),
        type: this.currentMarkerType,
        value: this.currentMarkerType === 'barcode' ? this.currentBarcodeValue : undefined,
        imageSrc: this.currentImage
      };

      this.targets.push(newTarget);
      this.saveTargets();

      // Reset current selection
      this.currentImage = null;
      this.currentBarcodeValue++; // Increment for convenience
    }
  }

  deleteTarget(index: number) {
    this.targets.splice(index, 1);
    this.saveTargets();
  }

  saveTargets() {
    localStorage.setItem('arTargets', JSON.stringify(this.targets));
  }

  loadTargets() {
    const stored = localStorage.getItem('arTargets');
    if (stored) {
      this.targets = JSON.parse(stored);
    }
  }

  startAR() {
    if (this.targets.length > 0) {
      this.showScene = true;
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
    }
  }

  async close() {
    if (this.showScene) {
      this.showScene = false;
      this.cleanupAR();
    } else {
      try {
        await this.modalController.dismiss();
      } catch (e) {
        console.log('Modal dismiss failed, trying location back', e);
        window.history.back();
      }
    }
  }

  reset() {
    this.showScene = false;
    this.cleanupAR();
  }

  cleanupAR() {
    const video = document.getElementById('arjs-video');
    if (video) {
      video.remove();
    }
  }

  clearData() {
    localStorage.removeItem('arTargets');
    this.targets = [];
    this.currentImage = null;
    this.currentBarcodeValue = 1;
  }

  getBarcodeUrl(value: number): string {
    return `https://raw.githubusercontent.com/nicolocarpignoli/artoolkit-barcode-markers-collection/master/3x3/${value}.png`;
  }
}
