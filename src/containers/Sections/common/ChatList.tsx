import React from 'react'
import SearchField from '../../../components/InputFiled/SearchField'
import LoaderCard from '../../../components/Card/LoaderCard'
import ListEmpty from '../../../components/ErrorCards/ListEmpty'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/storeHooks'
import blankProfilePic from '../../../utils/assets/blank-profile-picture.png'
import { getSingleChat } from '../../../features/users/Common/inboxSlice'
import useAxiosPrivate from '../../../app/hooks/useAxiosPrivate'

const ChatList: React.FC = () => {
    const { chatList, isChatListLoading } = useAppSelector(state => state.inbox)
    const axiosInstance = useAxiosPrivate()
    const dispatch = useAppDispatch()

    const handleClick = (chatId: string) => {
        dispatch(getSingleChat({
            paramsId: chatId,
            axiosInstance
        }))
    }

    return (
        <div>
            <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between my-5">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Chats</h5>
                    <SearchField />
                </div>
                <div>
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            isChatListLoading ? <LoaderCard /> :
                                !chatList || chatList.length <= 0 ? <ListEmpty /> :
                                    chatList.map((chat, i) => (
                                        chat.latestMessage?.content && chat.latestMessage?.content !== "" && <li className="py-3 sm:py-4" key={i}>
                                            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => handleClick(chat.chatId)}>
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={!chat.profilePicture || chat.profilePicture === "Not Available" ? blankProfilePic : chat.profilePicture} alt="Bonnie image" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {chat.fullname}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {chat.latestMessage?.content}
                                                    </p>
                                                </div>
                                                <span className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center py-1.5 px-2 rounded-full dark:bg-gray-700 dark:text-blue-400">
                                                    9
                                                </span>
                                            </div>
                                        </li>
                                    )
                                    )
                        }
                    </ul>
                </div>
                <div className='flex justify-between align-baseline mt-7'>
                    <a href="#" className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                        Previous
                    </a>
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>

                </div>
            </div>
        </div>
    )
}

export default ChatList