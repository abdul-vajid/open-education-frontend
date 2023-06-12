import * as yup from "yup";

export const createCourseSchema = yup.object().shape({
    courseTitle: yup
        .string()
        .min(5, "Course title must be at least 5 characters")
        .max(150, "Course title must be at most 150 characters")
        .required("Course title is required"),
    fieldOfStudy: yup
        .string()
        .min(5, "Field of Study must be at least 5 characters")
        .max(75, "Field of Study must be at most 75 characters")
        .required("Field of Study is required"),
    description: yup
        .string()
        .min(15, "Description must be at least 15 characters")
        .max(2000, "Description must be at most 2000 characters")
        .required("Description is required"),
    prerequisites: yup.string().trim()
});
