import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TGetCallWithParamsIdExtra, TPostCallExtra } from '../../../app/types/types';
import { AxiosInstance } from 'axios';
import { IChatList, IMessage, ISingleChat } from '../../../app/types/interfaces';


type InitialState = {
    chatList: IChatList[];
    singleChat: ISingleChat
    isChatListLoading: boolean
    isSingleChatLoading: boolean
    isSingleChatfetched: boolean
    isSendMessageLoading: boolean
    chatListError: string | undefined
    singleChatError: string | undefined
    sendMessageError: string | undefined
}

const initialState: InitialState = {
    chatList: [],
    singleChat: {
        accessedChat: {
            _id: "",
            isGroupChat: false,
            users: []
        },
        messages: [],
        partnerDetails: {
            fullname: "",
            profilePicture: "",
            userId: ""
        },
    },
    chatListError: undefined,
    singleChatError: undefined,
    sendMessageError: undefined,
    isChatListLoading: false,
    isSingleChatfetched: false,
    isSingleChatLoading: false,
    isSendMessageLoading: false

}

export const getChatList = createAsyncThunk('inbox/getChatList', async (axiosInstance: AxiosInstance) => {
    const axios = axiosInstance;
    try {
        const response = await axios.get('communicate/chats')
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const getSingleChat = createAsyncThunk('inbox/getSingleChat', async ({ paramsId, axiosInstance }: TGetCallWithParamsIdExtra) => {
    const axios = axiosInstance;
    try {
        const response = await axios.get(`communicate/chat/${paramsId}`)
        console.log("response.data.data in thunk getSingleChat >> ", response.data.data)
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const accessChatByUser = createAsyncThunk('inbox/accessChatByUser', async ({ paramsId, axiosInstance }: TGetCallWithParamsIdExtra) => {
    const axios = axiosInstance;
    try {
        const response = await axios.get(`communicate/access-chat/${paramsId}`)
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const sendMessage = createAsyncThunk('inbox/sendMessage', async ({ body, axiosInstance }: TPostCallExtra) => {
    const axios = axiosInstance;
    try {
        const response = await axios.post('communicate/send-message', body)
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
        addNewMessageToList: ((state, action: PayloadAction<IMessage>) => {
            if(state.singleChat.messages[state.singleChat.messages.length -1]._id != action.payload._id){
                state.singleChat.messages.push(action.payload);
            }
        }),
        clearSingleChat: ((state) => {
            state.isSingleChatfetched = false
        })
    },
    extraReducers: (builder) => {
        builder.addCase(getChatList.pending, (state) => {
            state.isChatListLoading = true
            state.chatListError = undefined
        })
            .addCase(getChatList.fulfilled, (state, action: PayloadAction<InitialState['chatList']>) => {
                state.isChatListLoading = false
                state.chatList = action.payload
            })
            .addCase(getChatList.rejected, (state, action) => {
                state.isChatListLoading = false
                state.chatListError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(getSingleChat.pending, (state) => {
                state.isSingleChatLoading = true
                state.isSingleChatfetched = false
                state.singleChatError = undefined
            })
            .addCase(getSingleChat.fulfilled, (state, action: PayloadAction<InitialState['singleChat']>) => {
                state.isSingleChatLoading = false
                state.isSingleChatfetched = true
                state.singleChat = action.payload
            })
            .addCase(getSingleChat.rejected, (state, action) => {
                state.isSingleChatLoading = false
                state.isSingleChatfetched = false
                state.singleChatError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(accessChatByUser.pending, (state) => {
                state.isSingleChatLoading = true
                state.isSingleChatfetched = false
                state.singleChatError = undefined
            })
            .addCase(accessChatByUser.fulfilled, (state, action: PayloadAction<InitialState['singleChat']>) => {
                state.isSingleChatLoading = false
                state.isSingleChatfetched = true
                state.singleChat = action.payload
            })
            .addCase(accessChatByUser.rejected, (state, action) => {
                state.isSingleChatLoading = false
                state.isSingleChatfetched = false
                state.singleChatError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(sendMessage.pending, (state) => {
                state.isSendMessageLoading = true
                state.sendMessageError = undefined
            })
            .addCase(sendMessage.fulfilled, (state) => {
                state.isSendMessageLoading = false
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isSendMessageLoading = false
                state.sendMessageError = action.error.message || 'Something went wrong, Try again';
            })
    },
})

export default inboxSlice.reducer
export const { addNewMessageToList, clearSingleChat } = inboxSlice.actions