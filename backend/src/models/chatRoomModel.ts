import mongoose, { Document, Schema } from 'mongoose';

export interface IChatRoom extends Document {
    room: string;
    participants: mongoose.Types.ObjectId[];
    chats: {
        timestamps: Date;
        sender: mongoose.Types.ObjectId;
        dataType: 'video' | 'video-text' | 'audio' | 'text' | 'image';
        encryptedContent: string | { video: string; text: string }; // AES for text, AES-GCM for media
        iv: string;
        tag?: string; //  authentication tag for AES-GCM
    }[];
}

const ChatRoomSchema = new Schema<IChatRoom>({
    room: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    chats: [
        {
            timestamps: { type: Date, default: Date.now },
            sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            dataType: { type: String, enum: ['video', 'video-text', 'audio', 'text', 'image'], required: true },
            encryptedContent: { type: Schema.Types.Mixed, required: true }, // Stores encrypted data
            iv: { type: String, required: true },
            tag: { type: String }, //  authentication tag for AES-GCM
        },
    ],
});

export const ChatRoom = mongoose.model<IChatRoom>('ChatRoom', ChatRoomSchema);
