import { AxiosInstance } from "axios";

export type TCourse = {
    _id: string;
    authorId: string;
    courseTitle: string;
    imageUrl?: string;
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

export type TFetchCourseExtra = {
    courseId: string
    axiosInstance: AxiosInstance
}
