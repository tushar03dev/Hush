import mongoose, {Document, Schema} from 'mongoose';

// nested interface for chat messages
interface IChatMessage {
    timestamps: Date,
    sender: mongoose.Types.ObjectId,
    type: 'video' | 'video-text' | 'audio' | 'text' | 'image';
    encryptedContent: string | { video: string; text: string } | Buffer;
    iv: string;
    tag?: string; // Required for AES-GCM
}

export interface IChatRoom extends Document {
    name: string, // chatroom name
    participants : mongoose.Types.ObjectId[],
    chats: IChatMessage[],
}

// Schema Definition
const ChatRoomSchema = new Schema<IChatRoom>({
    name: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User',required: true }],
    chats: [{
        timestamps: {type: Date, default: Date.now},
        sender: {type: Schema.Types.ObjectId, ref: 'User',required: true},
    }]
});

export const ChatRoom = mongoose.model<IChatRoom>('ChatRooms', ChatRoomSchema);
