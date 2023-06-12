export type TCourse = {
    _id: string;
    authorId: string;
    courseTitle: string;
    imageUrl?: string;
    fieldOfStudy: string;
    enrolledCount: number;
    status: string;
    description: string;
    prerequisites: string[];
    discountCoupons: any[];
    lessons: any[];
    reviews: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};