import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILessonWithoutContent } from '../../../app/types/interfaces';

type InitialState = {
    curentLessonAvailable: boolean;
    currentlessonDetailsAvailable: boolean;
    curentLesson: ILessonWithoutContent,
    // TODO: curentDetailedLesson: CurentDetailedLesson,

};

const initialState: InitialState = {
    curentLesson: {
        lessonId: "",
        lessonTitle: '',
        lessonDescription: '',
        lessonIndex: 0,
        lessonStatus: ""
    },
    curentLessonAvailable: false,
    currentlessonDetailsAvailable: false,
};


const currentLessonSlice = createSlice({
    name: 'current-lesson',
    initialState,
    reducers: {
        setCurrentLesson: (state, action: PayloadAction<ILessonWithoutContent>) => {
            state.curentLesson = action.payload
            state.curentLessonAvailable = true
        },
        clearCurrentLesson: (state) => {
            state.curentLesson = initialState.curentLesson
        }
    },
});

export default currentLessonSlice.reducer;
export const { setCurrentLesson, clearCurrentLesson } = currentLessonSlice.actions