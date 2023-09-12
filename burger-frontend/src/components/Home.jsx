
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import { Route, Routes } from 'react-router-dom'
import Orders from './Orders/Orders'
import Checkout from './Orders/CheckOut/Checkout'

const Home = () => {
      return (
            <div>
                  <Header />
                  <div className="container">
                        <Routes>
                              <Route path='/' element={<BurgerBuilder />} />
                              <Route path='/order' element={<Orders />} />
                              <Route path='/checkout' element={<Checkout />} />
                        </Routes>
                  </div>
            </div>
      )
}

export default Home