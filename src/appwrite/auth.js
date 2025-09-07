import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another method
                return this.login({email,password});
            }else{
                return userAccount;
            }
        } catch (error) {
            console.error("error",error);
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error ", error);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSession("current");
            return true;
        } catch (error) {
            console.error("Try Again",error);
            return false;
        }
    }
    
}
const authServices = new AuthService();

export default authServices;