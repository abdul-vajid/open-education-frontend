import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IMessage } from '../../../app/types/interfaces';


type InitialState = {
    messages: IMessage[]
    isMessageAvailable: boolean
}

const initialState: InitialState = {
    messages: [],
    isMessageAvailable: false
}

const currentChatSlice = createSlice({
    name: 'currentChat',
    initialState,
    reducers: {
        setMessageList: ((state, action: PayloadAction<InitialState['messages']>) => {
            state.messages = action.payload
            state.isMessageAvailable = true
        }),
        addNewMessageToList: ((state, action: PayloadAction<InitialState['messages']>) => {
            state.messages.push(...action.payload);
            state.isMessageAvailable = true;
        })
    }
})

export default currentChatSlice.reducer
export const { setMessageList, addNewMessageToList} = currentChatSlice.actions