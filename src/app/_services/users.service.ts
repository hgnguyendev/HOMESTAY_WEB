
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { AppConfig } from "../_configs/app-config";
import { BaseService } from "./base.service";

import { EmailAuthProvider, PhoneAuthProvider, RecaptchaVerifier, getAuth, linkWithCredential, reauthenticateWithCredential, updatePassword } from '@angular/fire/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _baseService: BaseService,
        private _angularFireAuth: AngularFireAuth) { }

    isAuthenticating: boolean = false
    private auth = getAuth()
    private verificationId: string | null = null;


    private _currentUserSubject = new ReplaySubject<any>(1);
    currentUser$ = this._currentUserSubject.asObservable();
    currentUser: any;

    private _recaptchaVerifierCheck = new BehaviorSubject<boolean>(false)
    recaptchaVerifierCheck$ = this._recaptchaVerifierCheck.asObservable()

    async registerWithEmail(data: any) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/users/auth/register-with-email`, data);
    }

    async confirmEmail({ email, otp }: { email: string, otp: string }) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/users/auth/confirm-email`, { email, otp });
    }

    async editUser(data: any) {
        return this._baseService.put(`${AppConfig.settings.apiEndpoint}/users/edit-user`, data);
    }

    async changePassWord(oldPassWord: string, newPassWord: string) {
        const user = this.auth.currentUser
        console.log(user)
        if (user) {
            try {
                const credential = EmailAuthProvider.credential(user.email!, oldPassWord);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassWord);
                console.log("Mật khẩu đã được cập nhật thành công!");
            } catch (error: any) {
                throw new Error(this.getFirebasePasswordError(error.code));
            }
        }
    }

    // Hàm xử lý lỗi Firebase
    private getFirebasePasswordError(errorCode: string): string {
        const errorMessages: Record<string, string> = {
            'auth/wrong-password': 'Mật khẩu cũ không chính xác!',
            'auth/weak-password': 'Mật khẩu mới quá yếu, hãy chọn mật khẩu mạnh hơn!',
            'auth/requires-recent-login': 'Vui lòng đăng nhập lại để đổi mật khẩu!',
            'auth/user-not-found': 'Tài khoản không tồn tại!',
            'auth/too-many-requests': 'Bạn đã thử quá nhiều lần, hãy thử lại sau!',
        };
        return errorMessages[errorCode] || 'Đã xảy ra lỗi, vui lòng thử lại hoặc mật khẩu cũ không chính xác';
    }


    async createUserFirebase(email: string, password: string) {
        try {
            const result = await this._angularFireAuth.createUserWithEmailAndPassword(email, password);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async createUser(data: any) {
        return this._baseService.post(`${AppConfig.settings.apiEndpoint}/users/create-user`, data);
    }

    async loginWithEmail(email: string, password: string) {
        try {
            const result = await this._angularFireAuth.signInWithEmailAndPassword(email, password);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUserInfo() {
        try {
            const userInfo = await this._baseService.get(`${AppConfig.settings.apiEndpoint}/users/info`);
            this.setCurrentInfo(userInfo);
        } catch (err) {
            this._currentUserSubject.next(null);
            throw err; // 🔹 ném lỗi ra để caller xử lý
        }
    }


    // async updatePhoneDB(data: { phone: string, userId: string }) {
    //   try {

    //     const userPhone = await this._baseService.put(`${AppConfig.settings.apiEndpoint}/users/auth/update/phone`, data)
    //     return userPhone
    //   } catch (error) {
    //     throw error
    //   }
    // }

    setCurrentInfo(user: any) {
        this.currentUser = user;
        this._currentUserSubject.next(user);
    }

    async verifyOTP(otpCode: string) {
        try {
            // if (!this.confirmationResult) {
            //     throw new Error("Không tìm thấy thông tin xác nhận. Hãy gửi lại mã OTP.");
            // }

            // const result = await this.confirmationResult.confirm(otpCode);
            // console.log("Xác thực thành công:", result.user);
            // return result.user;
        } catch (error: any) {
            console.error("Lỗi xác thực OTP:", error.message);
            throw new Error(error.message);
        }
    }

    async sendPassWordReset(email: string) {
        try {
            const result = await this._angularFireAuth.sendPasswordResetEmail( email)
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    async logout() {
        try {
            const result = await this._angularFireAuth.signOut();
            return result;
        } catch (error) {
            throw error;
        }
    }
}
