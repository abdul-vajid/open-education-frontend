import React from 'react'
import "../../utils/styles/styles.scss"
import { ContentTypes } from '../../app/constants/enums'

type TextComponentProps = {
    contentType: ContentTypes
    placeholder?: string
    onChange?: (value: any) => void
}

const TextComponent: React.FC<TextComponentProps> = ({ contentType, onChange, placeholder }) => {
    return (
        <div className={`flex w-full 
        ${contentType === ContentTypes.ParagraphRight || contentType === ContentTypes.TitleRight || contentType === ContentTypes.SubtitleRight || contentType === ContentTypes.BlockquoteRight ? "justify-end" :
                contentType === ContentTypes.ParagraphCenter || contentType === ContentTypes.TitleCenter || contentType === ContentTypes.SubtitleCenter || contentType === ContentTypes.BlockquoteCenter ? "justify-center" :
                    "justify-start"}`}>
            <input onChange={onChange} placeholder={placeholder ? placeholder : "Click here to edit"} type="text" className={`
            ${contentType === ContentTypes.ParagraphRight || contentType === ContentTypes.TitleRight || contentType === ContentTypes.SubtitleRight || contentType === ContentTypes.BlockquoteRight ? "text-right" :
                    contentType === ContentTypes.ParagraphCenter || contentType === ContentTypes.TitleCenter || contentType === ContentTypes.SubtitleCenter || contentType === ContentTypes.BlockquoteCenter ? "text-center" :
                        "text-left"}
            text-light_primary_text dark:text-dark_primary_text bg-transparent border-0 outline-none
            ${contentType === ContentTypes.TitleLeft || contentType === ContentTypes.TitleCenter || contentType === ContentTypes.TitleRight ? "font-bold text-xl md:text-2xl lg:text-3xl mb:3" :
                    contentType === ContentTypes.SubtitleLeft || contentType === ContentTypes.SubtitleCenter || contentType === ContentTypes.SubtitleRight ? "font-medium text-md md:text-lg lg:text-xl mb:2" :
                        contentType === ContentTypes.ParagraphLeft || contentType === ContentTypes.ParagraphCenter || contentType === ContentTypes.ParagraphRight ? "font-normal text-sm mb:4" :
                            contentType === ContentTypes.BlockquoteLeft || contentType === ContentTypes.BlockquoteCenter || contentType === ContentTypes.BlockquoteRight ? "font-medium italic text-sm mb:3" :
                                ""
                }
        
            `} />
        </div>
    )
}

export default TextComponent