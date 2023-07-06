import { useState } from "react"
import UserNavBar from "../../../containers/Navbars/UserNavBar"
import UserSidebar from "../../../containers/Navbars/UserSidebar"
import ChatList from "../../../containers/Sections/common/ChatList"
import Message from "../../../containers/Sections/common/Message"
import { useAppSelector } from "../../../app/hooks/storeHooks"
// import { getChatList } from "./inboxSlice"
// import useAxiosPrivate from "../../../app/hooks/useAxiosPrivate"


const Inbox: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    // const dispatch = useAppDispatch()
    // const axiosInstance = useAxiosPrivate()
    const { isSingleChatfetched, isSingleChatLoading } = useAppSelector(state => state.inbox)

    // For version 2
    // useEffect(() => {
    //     dispatch(getChatList(axiosInstance))
    // }, [])

    return (
        <>
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu}/>
            {/* 
            ============================== Version 2 Inbox Ui ======================================

            <div className="p-5 mt-20 md:ml-64 hidden xl:flex gap-5 lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <div className="w-full lg:w-3/6">
                    <ChatList />
                </div>
                <div className="w-3/6">
                    {(isSingleChatfetched || isSingleChatLoading) && <Message />}
                </div>
            </div> 

             <div className="p-5 mt-20 md:ml-64 flex xl:hidden gap-5 lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <div className="w-full">
                    {(isSingleChatfetched || isSingleChatLoading) ? <Message /> : <ChatList />}
                </div>
            </div > */}

            <div className="p-5 mt-20 md:ml-64 flex gap-5 lg:gap-5" onClick={() => { setSideMenu(true) }}>
                {(isSingleChatfetched || isSingleChatLoading) ? <div className="w-full lg:w-2/3"><Message />: </div> :
                    <div className="w-full lg:w-2/4"> <ChatList /></div>
                }

            </div >
        </>
    )
}

export default Inbox