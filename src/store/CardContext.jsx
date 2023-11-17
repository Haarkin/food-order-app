import { createContext, useReducer, useState } from "react";

const CardContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
})

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCardItemIndex = state.items.findIndex((item) => item.id === action.item.id)

        const updatedItems = [...state.items]

        if (existingCardItemIndex > -1) {
            const existingItem = state.items[existingCardItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCardItemIndex] = updatedItem
        } else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }

        return { ...state, items: updatedItems }
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCardItemIndex = state.items.findIndex((item) => item.id === action.id)

        const existingCardItem = state.items[existingCardItemIndex]
        const updatedItems = [...state.items]

        if (existingCardItem.quantity === 1) {
            updatedItems.splice(existingCardItemIndex, 1)
        } else {
            const updatedItem = {
                ...existingCardItem,
                quantity: existingCardItem.quantity - 1
            }
            updatedItems[existingCardItemIndex] = updatedItem
        }

        return { ...state, items: updatedItems }
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            items: []
        }
    }

    return state
}

export function CardContextProvider({ children }) {
    const [ cart, dispatchCartAction ] = useReducer(cartReducer, { items: [] })

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item })
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id })
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }
    return <CardContext.Provider value={cartContext}>{children}</CardContext.Provider>
}

export default CardContext