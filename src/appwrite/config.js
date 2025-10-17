import conf from "../conf/conf.js";
import { Client, ID, TablesDB, Storage, Query, Permission, Role } from "appwrite";

export class Service {
  client = new Client();
  tables;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tables = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  // ✅ Create a new post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tables.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug, // or use ID.unique() if not using slug as ID
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  // ✅ Update an existing post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tables.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
      throw error;
    }
  }

  // ✅ Delete a post
  async deletePost(slug) {
    try {
      await this.tables.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // ✅ Get a single post
  async getPost(slug) {
    try {
      return await this.tables.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  // ✅ Get all posts (filtered)
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tables.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries,
      });
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // ✅ Upload file to storage
  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
        // Optional: set permissions
        // permissions: [Permission.read(Role.any())],
      });
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  // ✅ Delete a file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  // ✅ Get file preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview({
      bucketId: conf.appwriteBucketId,
      fileId: fileId,
    });
  }

  getFileView(fileId){
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId: fileId,
    });
  }
}

// ✅ Export single service instance
const service = new Service();
export default service;
