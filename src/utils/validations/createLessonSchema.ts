import * as Yup from 'yup';

export const createLessonSchema = Yup.object({
  courseId: Yup.string().required().typeError('CourseId must be a string').trim()
    .min(1, 'CourseId cannot be left empty')
    .required('CourseId is required'),
  lessonIndex: Yup.number().required().typeError('lessonIndex must be a number')
    .required('lessonIndex is required'),
  lessonTitle: Yup.string().required('Lesson title is required')
    .min(5, 'Lesson title must be at least 5 characters')
    .max(150, 'Lesson title must be at most 150 characters'),
  description: Yup.string().required('Description field is required')
    .min(15, 'Description must be at least 15 characters')
    .max(2000, 'Description must be at most 2000 characters'),
  contents: Yup.array().required('Contents must be an array')
    .of(
      Yup.object({
        index: Yup.number().required('The index field is required')
          .typeError('Index of the contents must be a number'),
        contentType: Yup.string().required('The contentType field is required')
          .typeError('Content type must be a string'),
        content: Yup.mixed().required('The content field is required'),
      })
    )
    .typeError('Content elements should be objects')
    .required('The contents field is required'),
});
