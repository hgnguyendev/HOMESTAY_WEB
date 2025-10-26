export interface IImage {
    image: string;  // URL của ảnh
}

export interface IAmenity {
    id: string;
    name: string;
}



export type BookingStatus = 'booked' | 'not_booked';

export interface IHomeStay {
    roomName: string;
    roomAcreage: string;
    roomType: string;
    price: number;
    images: IImage[];
    description: string;
    amenities: IAmenity[];
    status: BookingStatus;
    address: string;
}
