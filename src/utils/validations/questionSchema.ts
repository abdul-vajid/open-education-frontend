import * as Yup from 'yup';

export const questionSchema = Yup.object().shape({
    question: Yup.string().
        required('Question is required')
        .min(1, 'Question should have at least 1 character')
        .matches(/\S/, 'Question cannot be empty').strict(),
    correctAnswer: Yup.string().
        required('Correct answer is required').strict()
        .min(1, 'Correct answer should have at least 1 character'),
    optionA: Yup.string()
        .required('Option 1 is required')
        .min(1, 'Option 1 should have at least 1 character')
        .matches(/\S/, 'Option 1 cannot be empty').strict(),
    optionB: Yup.string()
        .required('Option 2 is required')
        .min(1, 'Option 2 should have at least 1 character')
        .matches(/\S/, 'Option 2 cannot be empty').strict(),
    optionC: Yup.string()
        .required('Option 3 is required')
        .min(1, 'Option 3 should have at least 1 character')
        .matches(/\S/, 'Option 3 cannot be empty').strict(),
});
