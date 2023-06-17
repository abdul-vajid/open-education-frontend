import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCourse as Course } from '../../../app/types/types';
import { CourseStatus } from '../../../app/types/enums';

type InitialState = {
    courseDetailsAvailable: boolean;
    course: Course,
};

const initialState: InitialState = {
    course: {
        _id: '',
        authorId: '',
        courseTitle: '',
        imageUrl: '',
        courseFee: '',
        paymentMode: '',
        valuationMode: '',
        difficulty: '',
        fieldOfStudy: '',
        enrolledCount: 0,
        status: '',
        description: '',
        prerequisites: '',
        discountCoupons: '',
        lessons: '',
        reviews: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
    },
    courseDetailsAvailable: false,
};

interface setCurrentCoursePayload extends Course {
    courseId: string;
}

const currentCourseSlice = createSlice({
    name: 'tutor-courses',
    initialState,
    reducers: {
        setCurrentCourse: (state, action: PayloadAction<setCurrentCoursePayload>) => {
            state.courseDetailsAvailable = true
            if (action.payload.status !== CourseStatus.Draft) {
                state.course.imageUrl = action.payload.imageUrl
                state.course.courseFee = action.payload.courseFee
                state.course.paymentMode = action.payload.paymentMode
                state.course.valuationMode = action.payload.valuationMode
                state.course.difficulty = action.payload.difficulty
            }
            state.course._id = action.payload.courseId
            state.course.courseTitle = action.payload.courseTitle
            state.course.fieldOfStudy = action.payload.fieldOfStudy
            state.course.description = action.payload.description
            state.course.lessons = action.payload.lessons
            state.course.prerequisites = action.payload.prerequisites
            state.course.authorId = action.payload.authorId
            state.course.status = action.payload.status
        },
        clearCurrentCourse: (state) => {
            state.courseDetailsAvailable = false
            state.course = {
                _id: '',
                authorId: '',
                courseTitle: '',
                imageUrl: '',
                courseFee: '',
                paymentMode: '',
                valuationMode: '',
                difficulty: '',
                fieldOfStudy: '',
                enrolledCount: 0,
                status: '',
                description: '',
                prerequisites: '',
                discountCoupons: '',
                lessons: '',
                reviews: '',
                createdAt: '',
                updatedAt: '',
                __v: 0,
            }
        }
    },
});

export default currentCourseSlice.reducer;
export const { setCurrentCourse, clearCurrentCourse } = currentCourseSlice.actions