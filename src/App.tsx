import { FC, useContext, useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import { Context } from '.'
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser'
import UserService from './services/UserService'

const App: FC = () => {
   const { store } = useContext(Context)
   const [users, setUsers] = useState<IUser[]>([])

   useEffect(() => {
      if (localStorage.getItem('token')) {
         store.checkAuth()
      }
   }, [store])

   const getUsers = async () => {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
   }

   return (
      <div className='container'>
         {store.isLoading ? (
            <div className='second-title'>Loading...</div>
         ) : store.isAuth ? (
            <>
               <h1 className='title'>User is authorized {store.user.email}</h1>
               {store.user.isActivated ? (
                  <h2 className='second-title'>User is activated with email</h2>
               ) : (
                  <h2 className='second-title'>
                     Activate your account, please
                  </h2>
               )}
               <button
                  onClick={() => {
                     store.logout()
                  }}
               >
                  Logout
               </button>
               <div>
                  <button onClick={getUsers}>Get list of users</button>
               </div>
               <div className='users-container'>
                  {users.map((user) => (
                     <div className='users' key={user.email}>
                        {user.email !== store.user.email ? user.email : null}
                     </div>
                  ))}
               </div>
            </>
         ) : (
            <>
               <LoginForm>
                  <h1 className='title'>Autorize, please</h1>
               </LoginForm>
            </>
         )}
      </div>
   )
}

export default observer(App)

