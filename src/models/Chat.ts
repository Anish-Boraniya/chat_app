import mongoose, { Document } from "mongoose";

interface Chat extends Document {
    user: mongoose.Types.ObjectId[];
    messages: [{
        senderId:  mongoose.Types.ObjectId;
        receiverId:  mongoose.Types.ObjectId;
        isGroupChat: boolean;
        message: string;
    }];

}

const chatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        senderId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        receiverId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        isGroupChat: { type: Boolean, default: false },
        message: {type: String}  
    },{timestamps: true}]
},
{timestamps: true}
)

const Chat = mongoose.models.Chat || mongoose.model<Chat>("Chat", chatSchema);

export default Chat


