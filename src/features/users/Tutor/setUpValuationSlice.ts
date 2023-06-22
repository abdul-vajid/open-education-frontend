import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TFetchQuizExtra, TPostCallExtra } from '../../../app/types/types';
import { IQuestion } from '../../../app/types/interfaces';

type InitialState = {
    quiz: {
        _id: string;
        courseId: string;
        lessonId: string;
        questions: IQuestion[]
    }
    creatingQuizErrorMsg: string;
    fetchingQuizErrorMsg: string;
    isLoading: boolean
    isQuizAvailable: boolean
};

const initialState: InitialState = {
    quiz: {
        _id: "",
        courseId: "",
        lessonId: "",
        questions: [{
            question: "",
            correctAnswer: "",
            optionA: "",
            optionB: "",
            optionC: "",
        }],
    },
    isQuizAvailable: false,
    creatingQuizErrorMsg: "",
    fetchingQuizErrorMsg: "",
    isLoading: false
};


export const fetchQuiz = createAsyncThunk('quiz/fetchQuiz', async ({ axiosInstance, courseId, lessonId }: TFetchQuizExtra) => {
    const axios = axiosInstance;
    let api: string = `/valuation/get-quiz/${courseId}`
    if (!lessonId || lessonId !== undefined) {
        api = `/valuation/get-quiz/${courseId}/${lessonId}`
    }
    try {
        const response = await axios.get(api)
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const createQuiz = createAsyncThunk(
    'quiz/createQuiz',
    async ({ axiosInstance, body }: TPostCallExtra) => {
        const axios = axiosInstance;
        try {
            const response = await axios.post('/valuation/create-quiz', body);
            return response.data.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        }
    }
);


const setupValuationSlice = createSlice({
    name: 'tutor-courses',
    initialState,
    reducers: {
        clearQuestions: (state) => {
            state.quiz.questions = initialState.quiz.questions
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuiz.pending, (state) => {
            state.isLoading = true
            console.log("fetchQuiz.pending")
        })
            .addCase(fetchQuiz.fulfilled, (state, action: PayloadAction<InitialState['quiz']>) => {
                state.isLoading = false
                state.isQuizAvailable = true
                state.quiz = action.payload
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isQuizAvailable = false;
                state.quiz = initialState.quiz
                state.fetchingQuizErrorMsg = action.error.message || 'Something went wrong';
            });
        builder.addCase(createQuiz.pending, (state) => {
            state.isLoading = true
        })
            .addCase(createQuiz.fulfilled, (state, action: PayloadAction<InitialState['quiz']>) => {
                state.isLoading = false
                state.quiz = action.payload
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.creatingQuizErrorMsg = action.error.message || 'Something went wrong';
            });
    },
});

export default setupValuationSlice.reducer;
export const { clearQuestions } = setupValuationSlice.actions