import {Component, EventEmitter, Input, OnInit, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {ScreenService} from '../../../core/services/screen.service';
import {IPdfViewMode} from '../../utils/pdf-viewer.utils';

@Component({
  selector: 'infratec-file-viewer',
  templateUrl: './file-viewer.component.html',
  styles: [`
    .button-download {
      position: absolute;
      right: 50px;
      bottom: 35px;
    }

    /*noinspection ALL*/
    .button-download .dx-button {
      width: 50px;
      height: 50px;
    }
  `]
})
export class FileViewerComponent implements OnInit {

  @Input()
  viewMode: IPdfViewMode;

  @Input()
  onSignFile: EventEmitter<boolean>;

  type: ViewType = ViewType.PDF;
  show = false;
  src: string | Blob;

  isImage = false;
  imageBlob: Blob;
  imageExtension: string;
  imageSanitizerSRC: any;

  isMobile: boolean;

  constructor(private sanitizer: DomSanitizer,
              private screenService: ScreenService) {
  }

  ngOnInit(): void {
    this.isMobile = this.screenService.isSmallScreen;
    this.screenService.changed.subscribe(() => this.isMobile = this.screenService.isSmallScreen);
  }

  toggleVisible(type: ViewType): void {
    this.type = type;
    this.show = !this.show;
  }

  showBlob(file: any): void {
    this.src = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(window.URL.createObjectURL(file)));
    this.toggleVisible(ViewType.PDF);
  }

  showByUrl(url: any): void {
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url).toString();
    this.toggleVisible(ViewType.PDF);
  }

  showImage(file: any, extension?: string): void {
    this.isImage = true;

    this.imageSanitizerSRC = null;
    this.toggleVisible(ViewType.IMAGEM);
    this.imageExtension = extension;
    this.imageBlob = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (readerEvent: any) => {
      this.imageSanitizerSRC = this.sanitizer.bypassSecurityTrustResourceUrl(readerEvent.target.result);
    };
  }

  downloadImage(): void {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(this.imageBlob);
    link.download = this.imageExtension ?? 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

enum ViewType {
  PDF = 'PDF',
  IMAGEM = 'Imagem'
}
