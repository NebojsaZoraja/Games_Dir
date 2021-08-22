import axios from 'axios';
import { CART_ADD_ITEM } from '../constatns/cartConstants';

export const addToCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/games/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            game: data._id,
            title: data.title,
            image: data.image,
            price: data.price
        }
    })

    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItem));
}