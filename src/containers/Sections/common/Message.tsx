import React, { useEffect, useState } from 'react'
import LoaderCard from '../../../components/Card/LoaderCard'
import ListEmpty from '../../../components/ErrorCards/ListEmpty'
import { FiSend } from "react-icons/fi"
import { useAppDispatch, useAppSelector } from '../../../app/hooks/storeHooks'
import blankProfilePic from "../../../utils/assets/blank-profile-picture.png"
import useAxiosPrivate from '../../../app/hooks/useAxiosPrivate'
import { addNewMessageToList, clearSingleChat, sendMessage } from '../../../features/users/Common/inboxSlice'
import io from "socket.io-client";
import BackArrowButton from '../../../components/Button/BackArrowButton'

const ENDPOINT = "http://localhost:3004";

const Message: React.FC = () => {
    const [socket, setSocket] = useState<any>(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const { isSingleChatLoading, isSingleChatfetched, singleChat } = useAppSelector(state => state.inbox)
    const user = useAppSelector(state => state.user)
    const [newMessage, setNewMessage] = useState("");
    const { userId } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const axiosInstance = useAxiosPrivate()

    const handleSendMessage = async (key?: string) => {
        if ((!key || key === "Enter") && (!newMessage || newMessage != "")) {
            dispatch(sendMessage({
                body: {
                    chatId: singleChat.accessedChat._id,
                    content: newMessage
                },
                axiosInstance
            })).then((action) => {
                let chat = action.payload
                chat.users = singleChat.accessedChat.users
                socket.emit("new message", chat)
                dispatch(addNewMessageToList(action.payload))
                setNewMessage("");
            })
        }
    };

    useEffect(() => {
        const newSocket = io(ENDPOINT);
        setSocket(newSocket);
        newSocket.emit("setup", user.userId);
        newSocket.on("connected", () => setSocketConnected(true));

        newSocket.on("typing", () => {
            setIsTyping(true);
        });

        newSocket.on("stop typing", () => {
            setIsTyping(false);
        });
        newSocket.on("message received", async (newMessageReceived: any) => {
            dispatch(addNewMessageToList(newMessageReceived));
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);


    useEffect(() => {
        if (isSingleChatfetched && socketConnected) {
            socket.emit("join chat", singleChat.accessedChat._id);
        }
    }, [isSingleChatfetched, socketConnected, socket]);

    const typingHandler = (value: string) => {
        setNewMessage(value);
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", singleChat.accessedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        let timerLength = 3000;
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", singleChat.accessedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <div>
            <div className="w-full min-h-[83vh] flex flex-col justify-between px-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                {isSingleChatLoading ? <div className='min-h-[75vh] flex flex-col justify-center'><LoaderCard size='md' /> </div> : <>
                    <div className="border-b border-gray-400 dark:border-gray-500 flex flex-col pb-6 md:flex-row gap-5 items-start md:items-center justify-between mb-5">
                        <div className='flex items-center gap-5'>
                            <div className='pt-5 flex'>
                                <BackArrowButton onClick={() => dispatch(clearSingleChat())} />
                            </div>
                            <img className="w-8 h-8 rounded-full" src={!singleChat.partnerDetails.profilePicture || singleChat.partnerDetails.profilePicture === "Not Available" ? blankProfilePic : singleChat.partnerDetails.profilePicture} alt="Bonnie image" />
                            <div className={`${istyping && "flex flex-col gap-1 pt-3"}`}>
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{singleChat.partnerDetails.fullname}</h5>
                                {
                                    istyping && <span className='text-xs text-light_primary_text rounded-lg dark:text-dark_primary_text'>
                                        typing...
                                    </span>
                                }
                            </div>
                        </div>
                        {/* <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Online</span> */}
                    </div>
                    <div>
                        <div className='mb-7 max-h-[55vh] overflow-scroll flex flex-col-reverse'>
                            <ul>
                                {
                                    isSingleChatfetched && singleChat.messages.length > 0 ? singleChat.messages.map((message, i) => (
                                        <li className={`flex ${userId === message.sender ? "justify-end" : "justify-start"} gap-3 pb-3 items-end`} key={i}>
                                            {/* <div>
                                                <img className="w-6 h-6 rounded-full ring-1" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
                                            </div> */}
                                            <span className={`text-sm text-light_primary_text rounded-lg dark:text-dark_primary_text py-1 px-2 ${userId === message.sender ? "bg-light_primary dark:bg-dark_primary" : "bg-light_primary_bg dark:bg-dark_primary_bg"}`}>
                                                {message.content}
                                            </span>
                                        </li>
                                    )) :
                                        <ListEmpty />
                                }
                            </ul>
                        </div>
                        <div className='mb-5 md:mb-2 lg:mb-0'>
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <input value={newMessage} onChange={(e) => typingHandler(e.target.value)} onKeyDown={(e) => handleSendMessage(e.key)} type="text" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message here..." required />
                                {
                                    newMessage && <div onClick={() => handleSendMessage()} className='absolute right-3.5 bottom-4'>
                                        <FiSend className="text-2xl text-light_primary dark:text-dark_primary cursor-pointer" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default Message