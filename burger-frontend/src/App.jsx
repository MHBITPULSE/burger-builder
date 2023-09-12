import './App.css'
import Home from './components/Home'
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
