import bcrypt from "bcrypt"
// hash password before storing

export const hashpassword=async(password)=>{
    return await bcrypt.hash(password,10);

};
// compare password during login

export  const comparePassword=async(password,hash)=>{
  return await bcrypt.compare(password,hash);
}