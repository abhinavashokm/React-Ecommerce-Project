
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AuthListener from './auth/AuthListener.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {

    return (
        <Provider store={store}>
            <Toaster position='top-center' />
            <AuthListener />
            <RouterProvider router={router} />
        </Provider>
    )
}

export default App

