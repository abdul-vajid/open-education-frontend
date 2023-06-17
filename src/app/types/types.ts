import { AxiosInstance } from "axios";

export type TCourse = {
    _id: string;
    authorId: string;
    courseTitle: string;
    imageUrl?: string;
    courseFee?: string;
    paymentMode?: string;
    valuationMode?: string;
    difficulty?: string;
    fieldOfStudy: string;
    enrolledCount: number;
    status: string;
    description: string;
    prerequisites: string[] | string;
    discountCoupons: any[] | string;
    lessons: any[] | string;
    reviews: any[] | string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

export type ApiOperations = {
    isLoading?: boolean
    isGetCallError?: boolean
    isPostCallError?: boolean
    getCallErrorMsg?: string
    postCallErrorMsg?: string
}

export type TFetchCourseExtra = {
    courseId: string
    axiosInstance: AxiosInstance
}

export type TPostCallExtra = {
    body: any
    axiosInstance: AxiosInstance
}
