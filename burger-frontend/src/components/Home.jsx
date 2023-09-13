
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import { Route, Routes } from 'react-router-dom'
import Orders from './Orders/Orders'
import Checkout from './Orders/CheckOut/Checkout'
import Auth from './Auth/Auth'
import { selectToken, authCheck } from '../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Home = () => {
      const dispatch = useDispatch();
      const token = useSelector(selectToken);
      useEffect(() => {
            dispatch(authCheck())
      }, [])


      let routes = null;

      if (token === null) {
            routes = (
                  <Routes>
                        <Route path='/login' element={<Auth />} resolve />
                  </Routes>
            )
      } else {
            routes = (
                  <Routes>
                        <Route path='/' element={<BurgerBuilder />} />
                        <Route path='/order' element={<Orders />} />
                        <Route path='/checkout' element={<Checkout />} />
                  </Routes>
            )
      }
      return (
            <div>
                  <Header />
                  <div className="container">
                        {routes}
                  </div>
            </div>
      )
}

export default Home