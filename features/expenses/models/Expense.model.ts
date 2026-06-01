import mongoose  from "mongoose";

export interface Expense {
    amount: number;
    title: string;
    date: Date;
    category: string;
    notes?: string;
    createdBy: mongoose.Types.ObjectId;
}

const ExpenseSchema = new mongoose.Schema<Expense>({
    amount: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

// prevent model overwrite issue and create new one after

const Expense = mongoose.models.Expense || mongoose.model<Expense>('Expense', ExpenseSchema);

export default Expense;
