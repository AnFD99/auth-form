import { FC, useContext, useState, ReactNode } from 'react'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import '../App.css'

type Props = { children: ReactNode }


const LoginForm: FC<Props> = ({ children }) => {
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const { store } = useContext(Context)

   return (
      <div>
         <div className='logo'></div>
         {children}
         <div className='inputs'>
            <input
               type='text'
               placeholder='Email'
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value)
               }}
            />
            <input
               type='password'
               placeholder='Password'
               value={password}
               onChange={(e) => {
                  setPassword(e.target.value)
               }}
            />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>
               Registration
            </button>
         </div>
      </div>
   )
}

export default observer(LoginForm)







