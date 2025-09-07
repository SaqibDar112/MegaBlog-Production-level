import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }   
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.tableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("CreatePost Error", error);
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.tableId,
                slug,
                //kya change krna hai is here
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("er", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.tableId,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.tableId,
                slug
            )
        } catch (error) {
            console.log(error);
        }
    }
    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.tableId,
                queries, //[we can use this as shown in doc but we have decleared in function so now easy to grasp]
            )
        } catch (error) {
            console.log("Post Error", error);
            return false
        }
    }

    //file upload services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    getFileView(fileId) {
        return this.bucket.getFileView(
            conf.bucketId,
            fileId,
        )
    }
}


const serviceObj = new Service(); //isse hume direct class ke function/ methods ka access milega.
export default serviceObj;