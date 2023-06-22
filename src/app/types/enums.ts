export enum CourseStatus {
    Draft = "draft",
    Published = "published",
    Unlisted = "unlisted",
}

export enum ValuationModes {
    CourseBasedMcq = "course-based mcq",
    LessonBasedMcq = "lesson-based mcq",
}

export enum TutorRoutes {
    courses = "/tutor/courses",
    courseDetails = "/tutor/course/details",
    createLesson = "/tutor/course/create-lesson",
    setupValuation = "/tutor/course/setup-valuation",
    createLessonbasedQuiz = "/tutor/course/create-quiz",
    hostCourse = "/tutor/course/host",
}