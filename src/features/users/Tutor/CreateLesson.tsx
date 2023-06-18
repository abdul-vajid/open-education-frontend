import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackArrowButton from '../../../components/Button/BackArrowButton';
import OutlineBtn from '../../../components/Button/OutlineBtn';
import SelectorButton from '../../../components/Button/SelectorButton';
import { ContentTypes } from '../../../app/constants/enums';
import TextComponent from '../../../components/LessonComponents/TextComponent';
import FileUpload from '../../../components/InputFiled/FileUpload';
import InputField from '../../../components/InputFiled/InputField';
import SaveLessonModal from '../../../components/Modal/SaveLessonModal';
import { IoClose } from 'react-icons/io5';
import PrimaryBtn from '../../../components/Button/PrimaryBtn';
import TextArea from '../../../components/InputFiled/TextArea';
import { useFormik } from 'formik';
import { useAppSelector } from '../../../app/hooks/storeHooks';
import { createLessonSchema } from '../../../utils/validations/createLessonSchema';
import useAxiosPrivate from '../../../app/hooks/useAxiosPrivate';
import { useErrorToast, useSuccessToast } from '../../../app/hooks/toastHooks';


interface IContents {
    index: number;
    contentType: ContentTypes;
    content: any;
}

const CreateLesson: React.FC = () => {
    const navigate = useNavigate();
    const axios = useAxiosPrivate();
    const [contents, setContents] = useState<IContents[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);

    const { course, courseDetailsAvailable } = useAppSelector(state => state.currentCourse)

    useEffect(() => {
        if (!courseDetailsAvailable) {
            navigate("/tutor/courses",
                {
                    replace: true
                });
        }
    })

    let highestIndex: number = 0
    if (course?.lessons.length > 0 && Array.isArray(course?.lessons)) highestIndex = course.lessons.length

    const handleAddingComponent = (component: ContentTypes, index: number | undefined) => {
        const newIndex = contents.length;
        const newContent: IContents = {
            index: newIndex,
            contentType: component,
            content: ""
        };

        if (index !== undefined) {
            const updatedContents = [...contents];
            updatedContents[index] = newContent;
            setContents(updatedContents);
        } else {
            setContents(prevContents => [...prevContents, newContent]);
        }
    };


    const handleComponentChange = (contentType: ContentTypes, index: number, value: any,) => {
        const newContent: IContents = {
            index,
            contentType,
            content: value
        };
        const updatedContents = [...contents];
        updatedContents[index] = newContent;
        setContents(updatedContents);
    };

    const formik = useFormik({
        initialValues: {
            courseId: course._id,
            lessonTitle: "",
            description: "",
            lessonIndex: highestIndex + 1,
            contents: contents.filter(element => {
                return element.content && element.content !== "" && element.content !== null && element.content !== undefined;
            })
        },

        validationSchema: createLessonSchema,

        onSubmit: async (values) => {
            setIsLoading(true);

            const filteredContents = contents.filter(element => {
                return element.content && element.content !== "" && element.content !== null && element.content !== undefined;
            })

            if (filteredContents.length <= 0) {
                formik.setFieldError("contents", "Please review the content and try again.")
            }

            await axios.post('/course/create-lesson', {
                courseId: values.courseId,
                lessonTitle: values.lessonTitle,
                description: values.description,
                lessonIndex: values.lessonIndex,
                contents: contents.filter(element => {
                    return element.content && element.content !== "" && element.content !== null && element.content !== undefined;
                })
            })
                .then((res: any) => {
                    if (res.data.success === true) {
                        formik.resetForm();
                        res.data.message && useSuccessToast({
                            message: res.data.message
                        });
                        navigate(`/tutor/course/details/`,
                            {
                                replace: true
                            });
                    } else {
                        useErrorToast({
                            message: res.data.message || "Something went wrong",
                        });
                    }
                })
                .catch((err: any) => {
                    useErrorToast({
                        message: err?.response?.data?.message || "Something went wrong",
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    });

    if (formik.errors === formik.errors.contents && formik.isSubmitting) {
        useErrorToast({
            message: "Please review the content and try again.",
        });
    } else if (formik.errors === formik.errors.courseId && formik.isSubmitting) {
        useErrorToast({
            message: "Something went wrong. Please try again.",
        });
    } else if (formik.errors === formik.errors.lessonIndex && formik.isSubmitting) {
        useErrorToast({
            message: "Something went wrong. Please try again...",
        });
    } else if (formik.errors){
        console.log(formik.errors)
    }


    return (
        <div className='className="overflow-auto"'>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <BackArrowButton onClick={() => modalVisibility ? setModalVisibility(false) : navigate(-1)} classNames='z-50 border border-light_primary dark:border-dark_primary rounded-full h-10 w-10 flex p-2 justify-center items-center' />
                        <OutlineBtn btnText='Upload Lesson' isDisabled={modalVisibility ? true : false} onClick={() => setModalVisibility(!modalVisibility)} />
                    </div>
                </div>
            </nav>
            {
                modalVisibility && <div className='fixed top-50 flex justify-center md:left-40 lg:left-64 md:justify-start h-full w-full z-50'>
                    <SaveLessonModal title='Ready to Upload Your Lesson?'
                        topComponentOne={<InputField
                            inputType='text'
                            labelText='Lesson Title'
                            name='lessonTitle'
                            isInverted={true}
                            placeHolder="eg: Introduction to Digital marketing"
                            messageType="error"
                            value={formik.values.lessonTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isMessage={formik.touched.lessonTitle}
                            message={formik.errors.lessonTitle}
                        />}
                        topComponentTwo={<TextArea
                            labelText='Lesson Description'
                            name='description'
                            isInverted={true}
                            placeHolder="eg: Introduction to Digital Marketing: Explore the basics of online marketing, including SEO, social media, PPC, and more. Kickstart your journey towards digital success!"
                            messageType="error"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isMessage={formik.touched.description}
                            message={formik.errors.description}
                        />}
                        rightButton={<PrimaryBtn isLoading={isLoading ? true : false} loadingText="Uploading" btnText='Upload Lesson' onClick={formik.submitForm} />}
                        leftButton={<OutlineBtn btnText='Preview' />} paragraphOne='
                                We highly recommend previewing your lesson before uploading it. Our lesson quality assurance bot will automatically remove any empty components, ensuring the highest quality for your lesson. Thank you for your understanding, and happy teaching!
            '
                        closeButton={<IoClose onClick={() => setModalVisibility(false)} className="text-2xl text-light_primary_text dark:text-dark_primary_text cursor-pointer" />} />
                </div>
            }
            <div className='flex justify-between px-5 gap-5 w-full h-full mt-[100px]'>
                <div className='bg-light_primary_bg dark:bg-dark_primary_bg min-h-screen w-full lg:w-[65%] rounded-lg p-8  overscroll-y-contain'>
                    {contents.map((item, index) => {
                        if (item.contentType === ContentTypes.TitleLeft || item.contentType === ContentTypes.TitleCenter || item.contentType === ContentTypes.TitleRight ||
                            item.contentType === ContentTypes.SubtitleLeft || item.contentType === ContentTypes.SubtitleCenter || item.contentType === ContentTypes.SubtitleRight ||
                            item.contentType === ContentTypes.ParagraphLeft || item.contentType === ContentTypes.ParagraphCenter || item.contentType === ContentTypes.ParagraphRight ||
                            item.contentType === ContentTypes.BlockquoteLeft || item.contentType === ContentTypes.BlockquoteCenter || item.contentType === ContentTypes.BlockquoteRight) {
                            return <TextComponent key={item.index} contentType={item.contentType} onChange={(e) => handleComponentChange(item.contentType, item.index, e.target.value,)} />;
                        } else if (item.contentType === ContentTypes.ImageClassic) {
                            return <FileUpload key={item.index} id={`square-image${index}`} isSquareImage={false} onChange={(imageUrl) =>
                                handleComponentChange(item.contentType, item.index, imageUrl)} description='SVG, PNG, JPG or GIF (Ratio. 3:2)' />
                        } else if (item.contentType === ContentTypes.ImageSquare) {
                            return <FileUpload key={item.index} id={`classic-image${index}`} isSquareImage={true} onChange={(imageUrl) =>
                                handleComponentChange(item.contentType, item.index, imageUrl)
                            } description='SVG, PNG, JPG or GIF (Ratio. 1:1)' />
                        } else if (item.contentType === ContentTypes.Video) {
                            return (
                                <div key={index} className='w-[50%]'>
                                    <InputField inputType='text' labelText='Video link' name={`video-link${index}`} onChange={(e) => handleComponentChange(item.contentType, item.index, e.target.value)} />
                                    {item.content && item.content !== "" && <iframe
                                        width="560"
                                        height="315"
                                        src={item.content}
                                        title={`Embedded YouTube video ${index}`}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    />}
                                </div>
                            );
                        } else if (item.contentType === ContentTypes.OrderedList) {
                            return (
                                <div key={index} className='flex flex-col gap-2 mb-4'>
                                    <TextComponent contentType={item.contentType} placeholder='Click here to edit List title' onChange={(e) => handleComponentChange(item.contentType, item.index, e.target.value)} />

                                    {Array.isArray(item.content) && item.content.map((_element: any, elementIndex: number) => (
                                        elementIndex !== 0 && <TextComponent contentType={item.contentType} placeholder={`Edit item ${elementIndex} in the list`} onChange={(e) => handleComponentChange(item.contentType, item.index, e.target.value)} />
                                    ))}

                                    <TextComponent contentType={item.contentType} placeholder='Add new item to the list' onChange={(e) => handleComponentChange(item.contentType, item.index, e.target.value)} />
                                </div>
                            )
                        }
                    })}
                </div>
                <div className='bg-light_primary_bg dark:bg-dark_primary_bg rounded-lg p-8 h-full w-[35%]  overscroll-y-auto'>
                    <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Add Component</span>
                    <div className='mt-5'>
                        <span className='text-light_secondary_text dark:text-dark_secondary_text text-md md:text-lg lg:text-lg font-normal mb-5'>Choose Component</span>
                        <div className='my-5 flex flex-col gap-2'>
                            <div className='flex justify-between gap-2'>
                                <SelectorButton id="title-left" title='Title' description='Position : Left' position='left' onClick={() => handleAddingComponent(ContentTypes.TitleLeft, undefined)} />
                                <SelectorButton id="title-center" title='Title' description='Position : Middle' position='center' onClick={() => handleAddingComponent(ContentTypes.TitleCenter, undefined)} />
                                <SelectorButton id="title-right" title='Title' description='Position : Right' position='right' onClick={() => handleAddingComponent(ContentTypes.TitleRight, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <SelectorButton id="subtitle-left" title='Subtitle' description='Position : Left' position='left' onClick={() => handleAddingComponent(ContentTypes.SubtitleLeft, undefined)} />
                                <SelectorButton id="subtitle-center" title='Subtitle' description='Position : Middle' position='center' onClick={() => handleAddingComponent(ContentTypes.SubtitleCenter, undefined)} />
                                <SelectorButton id="subtitle-right" title='Subtitle' description='Position : Right' position='right' onClick={() => handleAddingComponent(ContentTypes.SubtitleRight, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <SelectorButton id="paragraph-left" title='Paragraph' description='Position : Left' position='left' onClick={() => handleAddingComponent(ContentTypes.ParagraphLeft, undefined)} />
                                <SelectorButton id="paragraph-center" title='Paragraph' description='Position : Middle' position='center' onClick={() => handleAddingComponent(ContentTypes.ParagraphCenter, undefined)} />
                                <SelectorButton id="paragraph-right" title='Paragraph' description='Position : Right' position='right' onClick={() => handleAddingComponent(ContentTypes.ParagraphRight, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <SelectorButton id="blockquote-left" title='Blockquote' description='Position : Left' position='left' onClick={() => handleAddingComponent(ContentTypes.BlockquoteLeft, undefined)} />
                                <SelectorButton id="blockquote-center" title='Blockquote' description='Position : Middle' position='center' onClick={() => handleAddingComponent(ContentTypes.BlockquoteCenter, undefined)} />
                                <SelectorButton id="blockquote-right" title='Blockquote' description='Position : Right' position='right' onClick={() => handleAddingComponent(ContentTypes.BlockquoteRight, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <SelectorButton id='img-classic' title='Image' description='Square Image (1 : 1)' position='center' onClick={() => handleAddingComponent(ContentTypes.ImageSquare, undefined)} />
                                <SelectorButton id='img-sqr' title='Image' description='Classic Imgae (3 : 2)' position='center' onClick={() => handleAddingComponent(ContentTypes.ImageClassic, undefined)} />
                            </div>
                            <div>
                                <SelectorButton id='video' title='Video' description='Youtube video link' position='center' onClick={() => handleAddingComponent(ContentTypes.Video, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <SelectorButton id='list' title='List' description='Upcoming feature' position='center' disabled={true} />
                                <SelectorButton id='Table' title='Table' description='Upcoming feature' position='center' disabled={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateLesson;
