const API=import.meta.env.VITE_API_URL||"http://localhost:5000/api";
export async function api(path,options={}){const token=localStorage.getItem("sp_token");const headers={"Content-Type":"application/json",...(options.headers||{})};if(token)headers.Authorization=`Bearer ${token}`;const r=await fetch(`${API}${path}`,{...options,headers});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.message||"Request failed");return d}
export function login(d){localStorage.setItem("sp_token",d.token);localStorage.setItem("sp_user",JSON.stringify(d.user))}
export function logout(){localStorage.removeItem("sp_token");localStorage.removeItem("sp_user")}
export function currentUser(){try{return JSON.parse(localStorage.getItem("sp_user"))}catch{return null}}
