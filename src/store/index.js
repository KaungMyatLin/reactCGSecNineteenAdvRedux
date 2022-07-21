import { configureStore } from '@reduxjs/toolkit'
import uiSlceRdr from './ui-slice'
import cartSlceRdr from './cart-slice'
const cfgStore = configureStore({
    reducer: { uiSlceRdr, cartSlceRdr }
})
export default cfgStore;