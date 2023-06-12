import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackArrowButton from '../../../components/Button/BackArrowButton';
import OutlineBtn from '../../../components/Button/OutlineBtn';
import ComponentSelector from '../../../components/Button/ComponentSelector';
import { ContentTypes } from '../../../app/constants/enums';
import TextComponent from '../../../components/LessonComponents/TextComponent';
import FileUpload from '../../../components/InputFiled/FileUpload';
import InputField from '../../../components/InputFiled/InputField';

const CreateLesson: React.FC = () => {
    const navigate = useNavigate();

    interface IContents {
        index: number;
        contentType: ContentTypes;
        content: any;
    }

    const [contents, setContents] = useState<IContents[]>([]);

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
        if (contentType === ContentTypes.OrderedList) {
            console.log("print contents array ===> ", contents)
        } else {
            const newContent: IContents = {
                index,
                contentType,
                content: value
            };
            const updatedContents = [...contents];
            updatedContents[index] = newContent;
            setContents(updatedContents);
        }
    };


    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <BackArrowButton onClick={()=> navigate(-1)} classNames='z-50 border border-light_primary dark:border-dark_primary rounded-full h-10 w-10 flex p-2 justify-center items-center' />
                        <OutlineBtn btnText='Save Lesson' />
                    </div>
                </div>
            </nav>
            <div className='flex justify-between px-5 gap-5 w-full h-full mt-[100px]'>
                <div className='bg-light_primary_bg dark:bg-dark_primary_bg min-h-screen w-full lg:w-[65%] rounded-lg p-8  overscroll-y-contain'>
                    {contents.map((item, index) => {
                        if (item.contentType === ContentTypes.TitleLeft || item.contentType === ContentTypes.TitleCenter || item.contentType === ContentTypes.TitleRight ||
                            item.contentType === ContentTypes.SubtitleLeft || item.contentType === ContentTypes.SubtitleCenter || item.contentType === ContentTypes.SubtitleRight ||
                            item.contentType === ContentTypes.ParagraphLeft || item.contentType === ContentTypes.ParagraphCenter || item.contentType === ContentTypes.ParagraphRight ||
                            item.contentType === ContentTypes.BlockquoteLeft || item.contentType === ContentTypes.BlockquoteCenter || item.contentType === ContentTypes.BlockquoteRight) {
                            return <TextComponent key={item.index} contentType={item.contentType} onChange={(e) => handleComponentChange(item.contentType, item.index, e.target.value,)} />;
                        } else if (item.contentType === ContentTypes.ImageClassic) {
                            return <FileUpload key={item.index} id={`square-image${index}`} isSquareImage={false} onChange={(fileData) =>
                                handleComponentChange(item.contentType, item.index, fileData)} description='SVG, PNG, JPG or GIF (Ratio. 3:2)' />
                        } else if (item.contentType === ContentTypes.ImageSquare) {
                            return <FileUpload key={item.index} id={`classic-image${index}`} isSquareImage={true} onChange={(fileData) =>
                                handleComponentChange(item.contentType, item.index, fileData)
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

                                    {Array.isArray(item.content) && item.content.map((element: any, elementIndex: number) => (
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
                                <ComponentSelector id="title-left" title='Title' description='Position : Left' position='left' onClick={() => handleAddingComponent(ContentTypes.TitleLeft, undefined)} />
                                <ComponentSelector id="title-center" title='Title' description='Position : Middle' position='center' onClick={() => handleAddingComponent(ContentTypes.TitleCenter, undefined)} />
                                <ComponentSelector id="title-right" title='Title' description='Position : Right' position='right' onClick={() => handleAddingComponent(ContentTypes.TitleRight, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <ComponentSelector id="subtitle-left" title='Subtitle' description='Position : Left' position='left' onClick={() => handleAddingComponent(ContentTypes.SubtitleLeft, undefined)} />
                                <ComponentSelector id="subtitle-center" title='Subtitle' description='Position : Middle' position='center' onClick={() => handleAddingComponent(ContentTypes.SubtitleCenter, undefined)} />
                                <ComponentSelector id="subtitle-right" title='Subtitle' description='Position : Right' position='right' onClick={() => handleAddingComponent(ContentTypes.SubtitleRight, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <ComponentSelector id="paragraph-left" title='Paragraph' description='Position : Left' position='left' onClick={() => handleAddingComponent(ContentTypes.ParagraphLeft, undefined)} />
                                <ComponentSelector id="paragraph-center" title='Paragraph' description='Position : Middle' position='center' onClick={() => handleAddingComponent(ContentTypes.ParagraphCenter, undefined)} />
                                <ComponentSelector id="paragraph-right" title='Paragraph' description='Position : Right' position='right' onClick={() => handleAddingComponent(ContentTypes.ParagraphRight, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <ComponentSelector id="blockquote-left" title='Blockquote' description='Position : Left' position='left' onClick={() => handleAddingComponent(ContentTypes.BlockquoteLeft, undefined)} />
                                <ComponentSelector id="blockquote-center" title='Blockquote' description='Position : Middle' position='center' onClick={() => handleAddingComponent(ContentTypes.BlockquoteCenter, undefined)} />
                                <ComponentSelector id="blockquote-right" title='Blockquote' description='Position : Right' position='right' onClick={() => handleAddingComponent(ContentTypes.BlockquoteRight, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <ComponentSelector id='img-classic' title='Image' description='Square Image (1 : 1)' position='center' onClick={() => handleAddingComponent(ContentTypes.ImageSquare, undefined)} />
                                <ComponentSelector id='img-sqr' title='Image' description='Classic Imgae (3 : 2)' position='center' onClick={() => handleAddingComponent(ContentTypes.ImageClassic, undefined)} />
                            </div>
                            <div>
                                <ComponentSelector id='video' title='Video' description='Youtube video link' position='center' onClick={() => handleAddingComponent(ContentTypes.Video, undefined)} />
                            </div>
                            <div className='flex justify-between gap-2'>
                                <ComponentSelector id='list' title='List' description='Upcoming feature' position='center' disabled={true} />
                                <ComponentSelector id='Table' title='Table' description='Upcoming feature' position='center' disabled={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateLesson;
