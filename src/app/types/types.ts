import { AxiosInstance } from "axios";

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

export type TFetchQuizExtra = {
    courseId: string
    lessonId: string | undefined
    axiosInstance: AxiosInstance
}

export type TPostCallExtra = {
    body: any
    axiosInstance: AxiosInstance
}

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

export type TPublishedCourse = {
    courseId: string;
    courseTitle: string;
    fieldOfStudy: string;
    imageUrl: string;
    courseFee: number;
    paymentMode: string;
    valuationMode: string;
    difficulty: string;
    enrolledCount: number;
    description: string;
    totalLessons: number;
    prerequisites: string[];
    discountCoupons: string;
    reviews: string;
    authorDetails: {
      autherId: string;
      fullname: string;
      profilePicture: string;
      profileTitle: string;
      country: string;
      city: string;
      about: string;
    };
  };
  

export type LessonInCourse = {
    lessonId: string
    lessonIndex?: number
    lessonTitle: string
    lessonDescription: string
    lessonStatus: string
}


