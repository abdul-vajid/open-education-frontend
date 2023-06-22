import * as Yup from 'yup';

export const hostCourseSchema = Yup.object().shape({
    courseId: Yup.string()
        .required('CourseId is required')
        .typeError('CourseId must be a string'),
    courseTitle: Yup.string()
        .required('Course title is required')
        .min(5, 'Course title must be at least 5 characters')
        .max(150, 'Course title must be at most 150 characters')
        .typeError('Course title must be a string'),
    fieldOfStudy: Yup.string()
        .required('Field of Study field is required')
        .min(5, 'Field of Study must be at least 5 characters')
        .max(75, 'Field of Study must be at most 75 characters')
        .typeError('Field of Study must be a string'),
    description: Yup.string()
        .required('Description field is required')
        .min(15, 'Description must be at least 15 characters')
        .max(2000, 'Description must be at most 2000 characters')
        .typeError('Description must be a string'),
    prerequisites: Yup.string()
        .required('Prerequisites field is required'),
    imageUrl: Yup.string()
        .required('Course Image is required')
        .typeError('Course Image must format error'),
    courseFee: Yup.number()
        .required('Course Fee is required')
        .min(0, 'Invalid course fee')
        .max(9999999, 'Fee cannot exceed 9999999')
        .typeError('Fee must be a number'),
    paymentMode: Yup.string()
        .required('Payment mode is required')
        .oneOf(['Lesson-based', 'Course-based'], 'The payment mode should be either Lesson-based or Course-based')
        .typeError('Payment mode must be a string'),
    difficulty: Yup.string()
        .required('Course difficulty is required')
        .oneOf(['Hard', 'Medium', 'Easy'], "Course difficulty must be one of the allowed values: 'Hard', 'Medium', 'Easy'")
        .typeError('Course difficulty must be a string'),
});
