import mongoose, {Schema, Document} from "mongoose";

export interface IMenu extends Document {
    name: string;
    description: string;
    isAvailable: boolean;
    price: number;
    imageUrl: string;
    category: mongoose.Types.ObjectId;
}

const MenuSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model<IMenu>('Menu', MenuSchema)