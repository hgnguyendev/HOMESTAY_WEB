import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../_services/users.service';
import { SwalService } from '../../../../_services/swal.service';

@Component({
  selector: 'app-modal-infor',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './modal-infor.component.html',
})
export class ModalInfor {
  user: any = {};
  editedUser: any = {};
  isEditing = false;
  isSaving = false;

  constructor(private _userService: UserService, private _swalService: SwalService) { }

  ngOnInit() {
    this._userService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = { ...user };
        this.editedUser = { ...user };
      }
    });
  }

  toggleEdit() {
    if (this.isEditing) {
      this.saveChanges();
    } else {
      this.isEditing = true;
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editedUser = { ...this.user };
  }

  async saveChanges() {
    this.isSaving = true;
    console.log("edit user", this.editedUser)
    try {
      const updated = await this._userService.editUser(this.editedUser);
      this.user = { ...updated };
      this.isEditing = false;
      this._swalService.success('Cập nhật thông tin thành công')
    } catch (err) {
      this._swalService.error('Cập nhật thông tin thất bại')
    } finally {
      this.isSaving = false;
    }
  }
}
