import React, { Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom'
import './App.css';
import { getItem } from './utils/localStorage';

const CartContextProvider = React.lazy(() => import('./context/CartContext'))
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(()=> import('./pages/Login'));
const Register = React.lazy(()=> import('./pages/Register'));
const ProductsList = React.lazy(()=> import('./containers/ProductsList'))
const Product = React.lazy(() => import('./components/Product'))
const Cart = React.lazy(() => import('./components/Cart'))
const Profile = React.lazy(() => import('./components/Profile'))
const PassportRestore = React.lazy(() => import('./components/PassportRestore'))
const RestorePassport = React.lazy(() => import('./components/RestorePassport'))
const CreateProducts = React.lazy(() => import('./components/CreateProducts'))
const Footer = React.lazy(() => import('./components/Footer'))

const user = (element) => {
  const result = JSON.parse(getItem('user'))
  if(!result) return <Navigate to='/login'/>
  return element
}

const admin = (element) => {
  const result = JSON.parse(getItem('user'))
  if(!result || result.user.role !== "admin") return <Navigate to='/products'/>
  return element
}

function App() {
  return (
    <Suspense fallback='Cargando...'>
      <CartContextProvider>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={ user(<ProductsList/>)} />
            <Route path='/products/:id' element={ user(<Product/>) }/>
            <Route path='/createproducts' element={ admin(<CreateProducts/>)}/>
            <Route path='/cart' element={ user(<Cart/>) }/>
            <Route path='/profile' element={ user(<Profile/>)}/>
            <Route path='/passportrequestrestore' element={<PassportRestore/>}/>
            <Route path='/restorepassport' element={<RestorePassport/>}/>
            <Route path='/*' element={<Navigate to='/'/>}/>
          </Routes>
          <Footer/>
      </CartContextProvider>
    </Suspense>
  );
}

export default App;
