import {Request, Response} from "express"
import Menu from "../models/menu.model"

export const addMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuData = req.body
        if (req.file) {
            menuData.imageUrl = req.file.path
        }

        const menu = new Menu(menuData)
        await menu.save()
        res.status(201).json(menu)
    } catch (error) {
        res.status(500).json({
            message: 'Error creating menu', error
        })
    }
}
export const updateMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuData = req.body
        if (req.file) {
            menuData.imageUrl = req.file.path
        } 

        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            menuData,
            {
                new: true
            }
        )
        if (!menu) {
            res.status(404).json({
                message: 'Menu not found'
            })
            return
        }
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({
            message: 'Error updating menu', error
        })
    }
}
export const deleteMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuData = req.body
        if (req.file) {
            menuData.imageUrl = req.file.path
        } 

        const menu = await Menu.findByIdAndDelete(req.params.id)
        if (!menu) {
            res.status(404).json({
                message: 'Menu not found'
            })
            return
        }
        res.status(200).json({
            message: "Menu deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting menu', error
        })
    }
}
export const getAllMenu = async (req: Request, res: Response): Promise<void> => {
    try {
        const menus = await Menu.find().populate('category').sort({
            createdAt: -1
        })
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching menus', error
        })
    }    
}
export const getMenuByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const menu = await Menu.findById(req.params.id).populate('category')
        if (!menu) {
            res.status(404).json({
                message: 'Menu not found'
            })
            return
        }
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching menu', error
        })
    }    
}