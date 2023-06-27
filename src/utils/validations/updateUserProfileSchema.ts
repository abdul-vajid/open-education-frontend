import * as Yup from 'yup';

export const updateUserProfileSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, 'Fullname must be at least 2 characters')
        .max(50, 'Fullname must be at most 50 characters')
        .matches(/^[[a-zA-Z][a-zA-Z ]+[a-zA-Z]/, 'Invalid fullname. Please enter a valid name')
        .required('Full name is required'),
    phoneNumber: Yup.number()
        .min(5555555555, 'Invalid phone number')
        .max(9999999999, 'Invalid phone number')
        .required('Phone number is required'),
    profileTitle: Yup.string()
        .min(2, 'Profile title must be at least 2 characters')
        .max(75, 'Profile title must be at most 75 characters')
        .matches(/^[a-zA-Z0-9][a-zA-Z0-9 .\-_"':]*[a-zA-Z0-9]$/, 'Invalid profile title. Please enter a valid title')
        .required(),
    profilePicture: Yup.string()
        .required('Profile picture is required')
        .typeError('Profile picture must format error'),
    city: Yup.string()
        .min(2, 'City must be at least 2 characters')
        .max(75, 'City must be at most 75 characters')
        .matches(/^[a-zA-Z0-9][a-zA-Z0-9 .\-_"':]*[a-zA-Z0-9]$/, 'Invalid city. Please enter a valid title')
        .required('City is required'),
    country: Yup.string()
        .min(2, 'Country must be at least 2 characters')
        .max(75, 'Country must be at most 75 characters')
        .matches(/^[a-zA-Z0-9][a-zA-Z0-9 .\-_"':]*[a-zA-Z0-9]$/, 'Invalid country. Please enter a valid title')
        .required('Country is required'),
    about: Yup.string()
        .min(2, 'About must be at least 2 characters')
        .max(250, 'About must be at most 250 characters')
        .matches(/^[a-zA-Z0-9][a-zA-Z0-9 .\-_,"':]*[a-zA-Z0-9]$/, 'Invalid about. Please enter a valid title')
        .required('About is required'),
});
