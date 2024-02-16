import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetch2,fetch3 } from "../Utility/FetchUtility"

const initialState = {todos:[],loading:false}

export const createTodo = createAsyncThunk(
    "createTodo",
    async (body, { rejectWithValue }) => {
        try {
            const result = await fetch2("/createtodo",body)
            return result
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const fetchTodo = createAsyncThunk(
    "fetchTodo",
    async (body, { rejectWithValue }) => {
        try {
            const result = await fetch3("/gettodos","get")
            return result
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteTodo = createAsyncThunk(
    "deleteTodo",
    async (id, { rejectWithValue }) => {
        try {
            const result = await fetch3(`/remove/${id}`,"delete")
            return result
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const todoSlice = createSlice({
    name:"Todo",
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder.addCase(createTodo.fulfilled,(state,action) => {
            state.loading = false;
            if (action.payload.message) {
                state.todos.push(action.payload.message) //{_id,todo,todoBy}
            }
        })
        builder.addCase(createTodo.pending, (state,action) => {
            state.loading = true
        })
        builder.addCase(fetchTodo.fulfilled,(state,action) => {
            state.loading = false;
            if (action.payload.message) {
                state.todos = action.payload.message; // directly mutate the state
            }
        })
        builder.addCase(deleteTodo.fulfilled,(state,action) => {
            state.loading = false;
            if (action.payload.message) {
                const removeTodo = state.todos.filter(item => {
                    return item._id !== action.payload.message._id
                }); // directly mutate the state
                state.todos = removeTodo
            }
        })
    }
})

export default todoSlice.reducer;
export const {} = todoSlice.actions;