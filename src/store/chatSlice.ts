import axios from "axios";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import socket from "../socket"

interface Chat {
    loading: boolean;
    chat: any;
    error: any;
}

const initialState: Chat = {
    loading: false,
    chat: [],
    error: null 
}

export const getChat = createAsyncThunk(
    "chat/get",
    async (data: {sender: any , receiver: any},  { rejectWithValue })=>{
       try{
        const {sender , receiver} = data
        console.log("userslice chat", sender , receiver);
        
         const response = await axios.get("/api/chat", {params: {sender , receiver}})
         if(!response){
            console.log("not founde chat " ); 
         }

         console.log("get chat " );
         return response.data
       }catch(error: any){
        console.log("error in fetching chat", error);
        throw error
        return rejectWithValue(error?.response?.data || error?.message || "An unexpected error occurred");
       }
    }
)

export const sendChat = createAsyncThunk(
    "send/chat",
    async (data: {sender: any , receiver: any , message: string})=>{
        try{
            const response: any = await axios.post("api/chat", data)
            console.log("send chat data" , response);
             
            return response.data
        }catch(error){
            console.log("error in send chat " , error);
            throw error
        }
    }
)

export const deleteMessege = createAsyncThunk(
    "delete/messge",
    async (data: {chatId: any , messageId: any}, {rejectWithValue})=>{
        try{

            const response: any = await axios.delete("/api/chat", {data})
            
            if (response.status === 200) {
                console.log("Message deleted:", response.data);
                return response.data.chat;
            } else {
                console.error("Delete failed:", response.data.message);
                return rejectWithValue(response.data.message);
              }
        }catch(error){
            console.error("Error deleting message:", error);
        }
    }
)

export const deleteChat = createAsyncThunk(
    "chat/delete",
    async (data: {id: any})=>{
        try{
            const {id} = data
            const response = await axios.delete(`/api/chat/${id}`)

            if(!response){
               console.log("not found chat");
            }
        }catch(error){
            console.log("error in delete chat" , error);
            throw error
        }
    }
)

const chatSlice = createSlice({
    name: "Chat",
    initialState,
    reducers: {
        clearChat: (state)=>{
            state.chat = [];
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getChat.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getChat.fulfilled , (state,action)=>{
            state.chat = action.payload.chat
            console.log("get data", action.payload);
        })
        .addCase(getChat.rejected , (state,action)=>{
            state.error = action.error
            console.log("error in get chat ", action.error);
            
        })
        .addCase(sendChat.fulfilled , (state,action)=>{
            state.chat = action.payload.chat
            console.log("send data", action.payload);
        })
        .addCase(sendChat.rejected , (state,action)=>{
            state.error = action.error
        })
        .addCase(deleteMessege.fulfilled , (state,action)=>{
            state.chat = action.payload
            console.log("delet message data", action.payload);
        })
        .addCase(deleteMessege.rejected , (state,action)=>{
            state.error = action.error
            console.log("error in delete message ", action.error);
        })
        .addCase(deleteChat.fulfilled , (state,action)=>{
            state.chat = []
            console.log("action data chat delete", action.payload);
        })
        .addCase(deleteChat.rejected , (state,action)=>{
            state.error = action.error
            console.log("error in delete chat ", action.error);
            
        })

    }
})

export default chatSlice.reducer
export const {clearChat} = chatSlice.actions;