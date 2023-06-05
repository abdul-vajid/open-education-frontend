import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { constRoles } from '../../app/constants/BasicConstants'

type InitialState = {
    role: string,
    event: string
}
const initialState: InitialState = {
    role: constRoles.guest,
    event: ""
}

const publicSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        roleIsLearner: state => {
            state.role = constRoles.learner
        },
        roleIsTutor: (state) => {
            state.role = constRoles.tutor
        },
        roleIsAdmin: state => {
            state.role = constRoles.admin
        },
        roleIsGuest: state => {
            state.role = constRoles.guest
        },
        setEvent: (state, action: PayloadAction<string>) => {
            state.event = action.payload
        },
        clearEvent: state => {
            state.event = ""
        }
    }
})

export default publicSlice.reducer
export const { roleIsLearner, roleIsTutor, roleIsAdmin, roleIsGuest, setEvent, clearEvent } = publicSlice.actions