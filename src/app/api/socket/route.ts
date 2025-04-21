// src/app/api/socket/route.ts
import { NextResponse } from 'next/server';
import { Server as IOServer } from 'socket.io';
import type { NextRequest } from 'next/server';


// Config exports for Next.js route handlers
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Keep a singleton instance of the Socket.IO server
let io: IOServer | null = null;

export async function GET(req: NextRequest) {
  // Only initialize once
  if (!io) {
    // Create a new response to access the server
    const res = new NextResponse();
    
    // Access the underlying HTTP server
    // @ts-ignore - NextResponse doesn't expose socket property in types
    const server = res.socket?.server || global.server;
    
    if (!server) {
      console.error("HTTP server instance not available");
      return NextResponse.json({ error: "Socket initialization failed" }, { status: 500 });
    }

    // Initialize Socket.IO with the HTTP server
    io = new IOServer(server, {
      path: '/api/socket',
      cors: {
        origin: '*',
        methods: ["GET", "POST"]
      }
    });

    // Set up connection handler
    io.on('connection', (socket) => {
      console.log('✅ New socket connection:', socket.id);

      // Chat message event
      socket.on('send_message', (data) => {
        console.log('📨 New message sent:', data);
        io?.emit('send', data); // Broadcast to all clients
      });

      // Delete message event
      socket.on('delete_message_request', (data) => {
        console.log('🗑️ Delete message request:', data);
        io?.emit('delete_message', data);
      });

      // Delete entire chat event
      socket.on('delete_chat_request', (data) => {
        console.log('🗑️ Delete chat request:', data);
        io?.emit('delete_chat', data);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('❌ Socket disconnected:', socket.id);
      });
    });

    console.log('🎉 Socket.IO server initialized');
  }

  // Return a simple response to confirm the server is running
  return NextResponse.json({ 
    status: "Socket.IO server is running",
    timestamp: new Date().toISOString()
  });
}