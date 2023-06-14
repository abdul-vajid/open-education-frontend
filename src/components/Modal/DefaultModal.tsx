import React from 'react'

type DefaultModalProps = {
    title: string;
    paragraphOne: string
    paragraphTwo?: string
    paragraphThree?: string
    leftButton: any
    rightButton: any
    closeButton: any
    topComponentOne?: any
    topComponentTwo?: any
}

const DefaultModal: React.FC<DefaultModalProps> = ({ title, paragraphOne, paragraphTwo, paragraphThree, leftButton, rightButton, closeButton, topComponentOne, topComponentTwo }) => {
    return (
        <div>
            <div id="defaultModal" tabIndex={-1} className="z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-light_secondary_bg rounded-lg shadow dark:bg-dark_secondary_bg">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                {
                                    closeButton
                                }
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {
                                topComponentOne
                            }
                            {
                                topComponentTwo
                            }
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {paragraphOne}
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {paragraphTwo}
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {paragraphThree}
                            </p>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            {
                                leftButton
                            }
                            {
                                rightButton
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DefaultModal