import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private cloudName = 'dhcfhzxwo';
    private uploadPreset = 'mange-homestay';

    constructor(private http: HttpClient) { }

    uploadImages(files: File[]): Observable<any[]> {
        const uploadObservables = files.map(file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', this.uploadPreset);

            return this.http.post<any>(
                `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
                formData
            );
        });

        return forkJoin(uploadObservables);
    }
}
