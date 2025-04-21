import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IUser } from "../models/User";
import { redirect } from "next/navigation";
import { json } from "node:stream/consumers";

interface userSate {
    loading: boolean ;
    error: any; 
    users: IUser[]   
    user: IUser | null
    chat: IUser | null
}


const initialState: userSate = {
    loading: false,
    users: [],
    error: null ,
    user: null,
    chat: null,
}

export const getUsers = createAsyncThunk(
    "user/get",
    async ()=>{
        try {
          const response = await axios.get('/api/user/')        
          console.log("thunk response",response.data)
          return response.data;
        } catch (error) {
          console.error('error in get users :', error)
        }
      }
)

export const sign_up = createAsyncThunk(
    "sign-up/user",
    async (data: any)=>{
        try{
            const response = await axios.post("http://localhost:5000/api/user/add", data);

            if(response.status === 404){
                alert("email alredy exist")
                return
            }

            if(response.status === 200){
                redirect("/")
            }
            
            return response.data

        }catch(error){
            console.log("error in login",error);
          throw error
        }
    }
)

export const login = createAsyncThunk(
    "login/user",
    async (credentials: {email: String, password: String} )=>{
        try{
            // const credentials = {email,password}
            const response:any = await axios.post("/api/login",credentials)
            console.log("login succes" , response);
            if(response.status === 400){
                console.log("emial not found")
            }
            if(response){
                const token = response.token
                localStorage.setItem("token", token)
            }
            return response.data.user
        }catch(error){
          console.log("error in login",error);
          throw error
        }
    }
)


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setChat: (state,action)=>{
         state.chat = action.payload
          console.log("setchat" , state.chat , action);
        },
        removeChat: (state)=>{
            state.chat = null
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getUsers.pending , (state)=>{
            state.loading = true;
        })
        .addCase(getUsers.fulfilled , (state,action)=>{
            console.log("reducer data users ", action.payload);
            state.loading = false ;
            state.users = action.payload;
            state.error = null;
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.error = action.error.message
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.user = action.payload;
            localStorage.setItem("login", JSON.stringify(action.payload))
            console.log("login action respons" , action.payload , state.user);
        })
        .addCase(login.rejected,(state,action)=>{
            console.log("login error in store ", action.error);
            
        })
    }
})

export const {setChat , removeChat} = userSlice.actions;
export default userSlice.reducer