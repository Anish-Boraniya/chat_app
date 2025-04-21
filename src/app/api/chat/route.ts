import Chat from "@/models/Chat";
import socket from "@/socket";
import connectDB from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { sender, receiver, message } = await req.json();

        if (!sender || !receiver || !message) {
            return NextResponse.json({ message: "Please provide sender, receiver, and message" }, { status: 400 });
        }

        let chat = await Chat.findOne({
            users: { $all: [sender, receiver] }
        });

        if (!chat) {
            chat = await Chat.create({
                users: [sender, receiver],
                messages: [{ senderId: sender, receiverId: receiver, message: message }],
            });
        } else {
            chat.messages.push({ senderId: sender, receiverId: receiver, message: message });
            await chat.save();
        }

        const populatedChat = await Chat.findById(chat?._id).populate('users', '-password').populate('messages.senderId', '-password').populate('messages.receiverId', '-password');
        return NextResponse.json({ chat: populatedChat },{ status: 200 } );

    } catch (error) {
        console.error("error of post Chat", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    await connectDB();

    try {
        const searchParams = req.nextUrl.searchParams;
        const sender = searchParams.get("sender");
        const receiver = searchParams.get("receiver");

        
        if (!sender || !receiver) {
            return NextResponse.json({ message: "Please provide both sender and receiver IDs" }, { status: 400 });
        }

        const chat = await Chat.findOne({
            users: { $all: [sender, receiver] }
        })
        .populate('users', '-password')
        .populate('messages.senderId', '-password')
        .populate('messages.receiverId', '-password');

        if (!chat) {
            return NextResponse.json({ message: "Chat not found between these users" }, { status: 200 });
        }

        console.log("get chat" , chat )

        return NextResponse.json({ chat: chat , message: "GET request received" }, { status: 200 });

    } catch (error) {
        console.error("Error fetching chat:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500})
    }
}

export async function DELETE(req: NextRequest) {
    await connectDB();
    try {
        const { chatId, messageId } = await req.json();

        if (!chatId || !messageId) {
            return NextResponse.json({ message: "Please provide chatId and messageId" }, { status: 400 });
        }

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return NextResponse.json({ message: "Chat not found" }, { status: 404 });
        }

        // Filter out the message
        chat.messages = chat.messages.filter(
            (msg: any) => msg._id.toString() !== messageId
        );

        await chat.save();

        const updatedChat = await Chat.findById(chatId)
            .populate('users', '-password')
            .populate('messages.senderId', '-password')
            .populate('messages.receiverId', '-password');

        return NextResponse.json({ chat: updatedChat, message: "Message deleted" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting message:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
