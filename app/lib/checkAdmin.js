import { auth, currentUser } from "@clerk/nextjs/server";

export const checkAdmin = async () => {
  const user = await currentUser();
  
  // SIMPLEST METHOD: Check against your specific email
  const adminEmails = process.env.ADMIN_EMAIL; 
  
  if (!user || !user.emailAddresses.some(e => adminEmails.includes(e.emailAddress))) {
    return false;
  }
  return true;
};