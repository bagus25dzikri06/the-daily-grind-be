import {Request, Response} from "express"
import Transaction from "../models/transaction.model"
import Menu from "../models/menu.model"

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactionData = req.body

        if (req.file) {
            transactionData.paymentProof = req.file.path
        } else {
            res.status(400).json({
                message: 'Payment proof is required'
            })
            return
        }

        if (typeof transactionData.purchasedMenus === 'string') {
            try {
                transactionData.purchasedMenus = JSON.parse(transactionData.purchasedMenus)
            } catch (error) {
                res.status(400).json({
                    message: 'Invalid format for purchasedMenus'
                })
                return
            }
        }

        transactionData.status = 'pending'

        const transaction = new Transaction(transactionData)
        await transaction.save()
        res.status(201).json(transaction)
    } catch (error) {
        res.status(500).json({
            message: 'Error creating bank', error
        })
    }
}

export const getAllTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await Transaction.find().sort({
            createdAt: -1
        }).populate('purchasedMenus.menuId')
        res.status(200).json(transactions)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching transactions', error
        })
    }
}

export const getTransactionByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('purchasedMenus.menuId')
        if (!transaction) {
            res.status(404).json({
                message: 'Transaction not found'
            })
            return
        }
        res.status(200).json(transaction)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching transaction', error
        })
    }
}

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const {status} = req.body
        const existingTransaction = await Transaction.findById(req.params.id)
        if (!existingTransaction) {
            res.status(404).json({
                message: 'Transaction not found'
            })
            return
        }

        if (status === 'paid' && existingTransaction.status !== 'paid') {
            for (const item of existingTransaction.purchasedMenus) {
                await Menu.findByIdAndUpdate(item.menuId, {
                    $inc: {
                        stock: -item.qty
                    },
                })
            }
        }

        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            {status},
            {
                new: true
            }
        )    
        res.status(200).json(transaction)    
    } catch (error) {
        res.status(500).json({
            message: 'Error updating transaction status', error
        })
    }
}