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

export interface IAuthorDetails {
    userId: string;
    fullname: string;
    phoneNumber: number;
    about: string;
    city: string;
    country: string;
    profilePicture: string;
    profileTitle: string;
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
    lessonStatus: string
}

export interface ApiResponse {
    success: boolean,
    message: string,
    data: any
}

export interface IQuestion {
    question: string;
    correctAnswer: string;
    optionA: string;
    optionB: string;
    optionC: string;
}

export interface IChatList {
    userId: string;
    fullname: string;
    chatId: string;
    profilePicture?: string
    latestMessage?: IMessage;
    updatedAt: any
    users: IUsersArrayWithUnReadMessageCount[]
}

export interface ISingleChat {
    partnerDetails: IPartnerDetails
    accessedChat: IAccessedChat
    messages: IMessage[]
}

export interface IPartnerDetails {
    userId: string
    fullname: string
    profilePicture?: string
}

export interface IAccessedChat {
    isGroupChat: boolean
    users: IUsersArrayWithUnReadMessageCount[]
    _id: string
}

export interface IMessage {
    _id: string
    sender: string
    content: string
    chat: string
    readBy: string[]
    updatedAt?: any
}
export interface IUsersArrayWithUnReadMessageCount {
    userId: string,
    unReadMessageCount: number
}