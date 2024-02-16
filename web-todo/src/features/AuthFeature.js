import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetch2 } from "../Utility/FetchUtility"

const initialState = {
    token: "",
    loading: false,
    error:"",
    auth: true
}

const signupUser = createAsyncThunk(
    "signupUser",
    async (body, { rejectWithValue }) => {
        try {
            const result = await fetch2("/signup",body)
            return result
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const signInUser = createAsyncThunk(
    "signUser",
    async (body, { rejectWithValue }) => {
        try {
            const result = await fetch2("/signin",body)
            return result
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const authSlice = createSlice({
    name:"User",
    initialState,
    reducers:{
        addToken:(state, action) =>{
            state.token = localStorage.getItem("token") //line 77
        },
        logout:(state, action) => {
            state.token = null
            localStorage.getItem("token")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error;
            }else {
                state.error = action.payload.message
            }
        });
        builder.addCase(signupUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //SIGNIN
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error;
            }else {
                state.token = action.payload.token
                localStorage.setItem("token",action.payload.token)// (key,value)
            }
        });
        builder.addCase(signInUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        }
    })

export default authSlice.reducer;
export {signupUser,signInUser}
export const {addToken,logout} = authSlice.actions;