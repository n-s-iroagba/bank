import api from "../../../utils"
import { LoginDetails, SuperAdminLoginDetails } from "../types/LoginDetails"

export const postWithNoAuth = async (url:string,data:LoginDetails|SuperAdminLoginDetails) =>{
    return await api.post(url,data)
  }