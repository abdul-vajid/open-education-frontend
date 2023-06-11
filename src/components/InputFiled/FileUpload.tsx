import React, { useState, useRef } from 'react';

type FileUploadProps = {
    description?: string;
    isSquareImage?: boolean;
    id: string;
    onChange: (fileData: any) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ description, isSquareImage, id, onChange }) => {
    const [imageData, setImageData] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageData(e.target?.result as string);
                onChange(e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex justify-center">
            <div
                className={`relative ${isSquareImage ? 'w-64' : 'w-2/3'} h-64 rounded-lg cursor-pointer my-3`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleImageClick}
            >
                {imageData ? (
                    <img
                        id={`dropzone-file${id}`}
                        src={imageData}
                        alt="Uploaded"
                        className="w-full h-full rounded-lg object-cover"
                        style={{ objectFit: 'contain' }}
                    />
                ) : (
                    <div
                        className={`w-full h-full flex items-center justify-center border-2 border-light_secondary_bg border-dashed rounded-lg bg-light_primary_bg dark:bg-dark_primary_bg dark:border-dark_secondary_bg hover:border-light_primary hover:bg-light_secondary_bg dark:hover:border-dark_primary dark:hover:bg-dark_secondary_bg`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                        </div>
                    </div>
                )}

                {isHovered && imageData && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                        <p className="text-white text-center cursor-pointer" onClick={handleImageClick}>
                            Choose Image
                        </p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    id={`dropzone-file${id}`}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default FileUpload;
