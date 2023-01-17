import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/IUser'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { API_URL } from '../api'

export default class Store {
   user = {} as IUser
   isAuth = false
   isLoading = false

   constructor() {
      makeAutoObservable(this)
   }

   setAuth(bool: boolean) {
      this.isAuth = bool
   }

   setUser(user: IUser) {
      this.user = user
   }

   setLoading(bool: boolean) {
      this.isLoading = bool
   }

   async login(email: string, password: string) {
      this.setLoading(true)
      try {
         const response = await AuthService.login(email, password)
         localStorage.setItem('token', response.data.accessToken)
         this.setAuth(true)
         this.setUser(response.data.user)
      } catch (err) {
      } finally {
         this.setLoading(false)
      }
   }

   async registration(email: string, password: string) {
      this.setLoading(true)
      try {
         const response = await AuthService.registration(email, password)
         localStorage.setItem('token', response.data.accessToken)
         this.setAuth(true)
         this.setUser(response.data.user)
      } catch (err) {
      } finally {
         this.setLoading(false)
      }
   }

   async logout() {
      this.setLoading(true)
      try {
         await AuthService.logout()
         localStorage.removeItem('token')
         this.setAuth(false)
         this.setUser({} as IUser)
      } catch (err) {
      } finally {
         this.setLoading(false)
      }
   }

   async checkAuth() {
      this.setLoading(true)
      try {
         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
            withCredentials: true,
         })

         localStorage.setItem('token', response.data.accessToken)
         this.setAuth(true)
         this.setUser(response.data.user)
      } catch (err) {
      } finally {
         this.setLoading(false)
      }
   }
}

