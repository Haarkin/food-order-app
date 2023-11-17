import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CardContext from '../store/CardContext'
import UserProgressContext from '../store/UserProgressContext'

export default function Header() {
    const userProgressCtx = useContext(UserProgressContext)
    const cartContext = useContext(CardContext)

    const totalCartItems = cartContext.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)

    function handleShowCart() {
        userProgressCtx.showCart()
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}