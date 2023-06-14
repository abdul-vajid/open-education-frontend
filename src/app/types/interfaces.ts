export interface ICourseDetails {
    courseId: string;
    courseTitle: string;
    fieldOfStudy: string;
    imageUrl?: string;
    status: string;
    courseFee?: number;
    paymentMode?: string;
    valuationMode?: string;
    difficulty?: string;
    enrolledCount?: number;
    description: string;
    totalLessons: number;
    prerequisites: string | string[];
    discountCoupons: string | string[];
    lessons: string | ILessonWithoutContent[];
}

export interface IReview {
    userId: string;
    fullname: string;
    rating: number;
    comment: string;
}

export interface IPayloadActionFetchCourse {
    courseDetails: ICourseDetails;
    reviews: IReview[]
}

export interface ILessonWithoutContent {
    lessonId: string,
    lessonIndex: number,
    lessonTitle: string,
    lessonDescription: string,
    lessonStatus: boolean
}
