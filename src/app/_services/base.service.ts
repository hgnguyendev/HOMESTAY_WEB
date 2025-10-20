import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable(
    { providedIn: 'root' }
)
export class BaseService {
    constructor(private _httpClient: HttpClient) { }

    async get(
        url: string,
        options = {} as any,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .get<any>(url, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error) {
            return this._handleError(error, isShowMsg);
        }
    }

    async post(
        url: string,
        data = {},
        options = {} as any,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .post<any>(url, data || {}, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error) {
            return this._handleError(error, isShowMsg);
        }
    }

    async put(
        url: string,
        data = {},
        options = {} as any,
        requestId: any = null,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .put<any>(url, data || {}, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error) {
            return this._handleError(error, isShowMsg);
        }
    }

    async delete(
        url: string,
        options = {} as any,
        requestId: any = null,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .delete<any>(url, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error) {
            return this._handleError(error, isShowMsg);
        }
    }

    async patch(
        url: string,
        body: any,
        options = {} as any,
        requestId: any = null,
        isShowMsg = true
    ): Promise<any> {
        try {
            const result = await this._httpClient
                .patch<any>(url, body, options || {})
                .toPromise();
            return this._extractResult(result);
        } catch (error) {
            return this._handleError(error, isShowMsg);
        }
    }

    private _extractResult(result: any) {
        if (result && result['success'] === false) {
            return Promise.reject(result);
        }

        return result ? result.data : result;
    }

    private async _handleError(
        error: any,
        isShowMsg = true
    ): Promise<any> {
        return Promise.reject(error);
    }
}
