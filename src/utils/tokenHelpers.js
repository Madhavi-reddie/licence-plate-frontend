

import jwt from 'jsonwebtoken'



const presentUserId = (token) =>{

  return jwt.decode(token)['id']

}
const PresentUserRole = (token) =>{
  return jwt.decode(token)['role']

}

const isTokenExpired = (token) =>{
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }

  export {
    isTokenExpired,
    presentUserId,
    PresentUserRole
  }
  