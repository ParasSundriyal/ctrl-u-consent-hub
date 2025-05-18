
import { connectToDatabase } from '@/lib/mongodb';
import { toast } from '@/hooks/use-toast';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string; // Note: In production, never store plain text passwords
  createdAt: Date;
}

export async function registerUser(userData: Omit<User, '_id' | 'createdAt'>) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    // In a real app, you would hash the password here
    // For demo purposes, we're storing it as-is (NOT recommended for production)
    
    const result = await usersCollection.insertOne({
      ...userData,
      createdAt: new Date()
    });
    
    return { success: true, userId: result.insertedId };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    
    // Find user by email
    const user = await usersCollection.findOne({ email });
    
    // Check if user exists and password matches
    // Note: In production, you'd compare password hashes
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Remove password from user object before returning
    const { password: _, ...userWithoutPassword } = user;
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
