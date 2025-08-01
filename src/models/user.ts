import mongoose, { Schema, Document } from "mongoose";

interface Permissions {
  user: {
    readUser: boolean;
    createUser: boolean;
    updateUserPassword: boolean;
    retrieveUserPassword: boolean;
    deleteUser: boolean;
    updateUserPermissions: boolean;
  };
  product: {
    readProducts: boolean;
    addProducts: boolean;
    updateProducts: boolean;
    deleteProducts: boolean;
  };
  service: {
    readServices: boolean;
    addServices: boolean;
    updateServices: boolean;
    deleteServices: boolean;
  };
  blog: {
    readBlogs: boolean;
    addBlogs: boolean;
    updateBlogs: boolean;
    deleteBlogs: boolean;
  };
  query: {
    readQueries: boolean;
    deleteQueries: boolean;
    // updateQueries: boolean;
    updateQueryStatus: boolean;
  };
  log: {
    readLogs: boolean;
    deleteLogs: boolean;
  };
}

export interface IUser extends Document {
  id: number;
  username: string;
  password: string;
  email: string;
  permissions: Permissions;
}

const UserSchema: Schema = new Schema<IUser>({
  id: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // should be encrypted
  email: { type: String, unique: true, required: true },
  permissions: {
    user: {
      readUser: { type: Boolean, default: false },
      createUser: { type: Boolean, default: false },
      updateUserPassword: { type: Boolean, default: false },
      retrieveUserPassword: { type: Boolean, default: false },
      deleteUser: { type: Boolean, default: false },
      updateUserPermissions: { type: Boolean, default: false },
    },
    product: {
      readProducts: { type: Boolean, default: false },
      addProducts: { type: Boolean, default: false },
      updateProducts: { type: Boolean, default: false },
      deleteProducts: { type: Boolean, default: false },
    },
    service: {
      readServices: { type: Boolean, default: false },
      addServices: { type: Boolean, default: false },
      updateServices: { type: Boolean, default: false },
      deleteServices: { type: Boolean, default: false },
    },
    blog: {
      readBlogs: { type: Boolean, default: false },
      addBlogs: { type: Boolean, default: false },
      updateBlogs: { type: Boolean, default: false },
      deleteBlogs: { type: Boolean, default: false },
    },
    query: {
      readQueries: { type: Boolean, default: false },
      deleteQueries: { type: Boolean, default: false },
      // updateQueries: { type: Boolean, default: false },
      updateQueryStatus: { type: Boolean, default: false },
    },
    log: {
      readLogs: { type: Boolean, default: false },
      deleteLogs: { type: Boolean, default: false },
    },
  },
});

// Check if the model already exists to prevent the "Cannot overwrite" error
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
