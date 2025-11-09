import { Component, Input } from '@angular/core';
import { CommentsService } from '../../../../_services/comments.service';
import { SwalService } from '../../../../_services/swal.service';
import { firstValueFrom } from 'rxjs';
import { UploadService } from '../../../../_services/upload.service';

interface IStar {
  star: number
}

@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class Comments {
  isComments: boolean = false;
  maxStar: number = 5;
  rating: number = 0;
  hoverIndex: number | null = null;
  comment: string = '';
  previewImages: { file: File, url: string }[] = [];
  comments: any;




  @Input() dataHomestay: any;

  constructor(
    private _commentsService: CommentsService,
    private _swalService: SwalService,
    private _uploadService: UploadService
  ) { }

  ngOnInit() {
    this.getComments();
  }

  async getComments() {
    try {
      this.comments = await this._commentsService.getComments(this.dataHomestay._id);
      console.log("get comment homestay", this.comments);
    } catch (error: any) {

    }
  }

  handleIsComments() {
    this.isComments = true;
  }

  get stars(): number[] {
    return Array(this.maxStar).fill(0).map((_, i) => i);
  }

  onStarClick(index: number) {
    this.rating = index + 1;
  }

  onStarHover(index: number) {
    this.hoverIndex = index;
  }

  onStarLeave() {
    this.hoverIndex = null;
  }

  isFilled(index: number): boolean {
    if (this.hoverIndex !== null) {
      return index <= this.hoverIndex;
    }
    return index < this.rating;
  }

  handleCancelComments() {
    this.isComments = false;
  }

  handleSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previewImages.push({
              file: file,
              url: e.target.result
            });
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  removeImage(index: number) {
    this.previewImages.splice(index, 1);
  }

  async handleSendComments() {
    console.log('send comments')
    try {
      const newFiles = this.previewImages
        .filter(img => img.file)
        .map(img => img.file);

      let imageUrls: string[] = [];
      if (newFiles.length > 0) {
        const results = await firstValueFrom(this._uploadService.uploadImages(newFiles));
        imageUrls = results.map((r: any) => r.secure_url);
      }

      const payload = {
        comment: this.comment,
        images: imageUrls,
        rating: this.rating,
        room_id: this.dataHomestay._id,
      };

      await this._commentsService.sendComments(payload);
      this.comment = '';
      this.previewImages = [];
      this.rating = 0;
      this.getComments();
    } catch (error) {
      console.error('Error sending comment:', error);
      this._swalService.error('Đã xảy ra lỗi, vui lòng thử lại!');
    }
  }


}
