import Chat from "@/models/Chat";
import connectDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const chatId = params.id;

    if (!chatId) {
      return NextResponse.json({ message: "Please provide chatId in URL" }, { status: 400 });
    }

    const deletedChat = await Chat.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Chat deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
