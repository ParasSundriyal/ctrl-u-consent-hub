
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface AppRegistration {
  _id?: string;
  userId: string;
  appName: string;
  description: string;
  redirectUri: string;
  appId: string;
  appSecret: string;
  createdAt: Date;
}

export interface Consent {
  _id?: string;
  userId: string;
  appId: string;
  requestedScopes: string[];
  approvedScopes: string[];
  lastAccess: Date;
}

export async function registerApp(appData: Omit<AppRegistration, '_id' | 'appId' | 'appSecret' | 'createdAt'>) {
  try {
    const db = await connectToDatabase();
    const appsCollection = db.collection('apps');
    
    // Generate app credentials
    const appId = "app_" + Math.random().toString(36).substring(2, 15);
    const appSecret = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
    
    const newApp = {
      ...appData,
      appId,
      appSecret,
      createdAt: new Date()
    };
    
    const result = await appsCollection.insertOne(newApp);
    
    return { 
      success: true, 
      appId, 
      appSecret,
      _id: result.insertedId 
    };
  } catch (error) {
    console.error("App registration error:", error);
    throw error;
  }
}

export async function getUserApps(userId: string) {
  try {
    const db = await connectToDatabase();
    const appsCollection = db.collection('apps');
    
    return await appsCollection.find({ userId }).toArray();
  } catch (error) {
    console.error("Get user apps error:", error);
    throw error;
  }
}

export async function getUserConsents(userId: string) {
  try {
    const db = await connectToDatabase();
    const consentsCollection = db.collection('consents');
    
    return await consentsCollection.find({ userId }).toArray();
  } catch (error) {
    console.error("Get consents error:", error);
    throw error;
  }
}

export async function updateConsent(userId: string, appId: string, approvedScopes: string[]) {
  try {
    const db = await connectToDatabase();
    const consentsCollection = db.collection('consents');
    
    // Find existing consent
    const existingConsent = await consentsCollection.findOne({ userId, appId });
    
    if (existingConsent) {
      // Update existing consent
      await consentsCollection.updateOne(
        { userId, appId },
        { 
          $set: { 
            approvedScopes,
            lastAccess: new Date()
          } 
        }
      );
    } else {
      // Create new consent record
      await consentsCollection.insertOne({
        userId,
        appId,
        requestedScopes: approvedScopes, // Initially same as approved
        approvedScopes,
        lastAccess: new Date()
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error("Update consent error:", error);
    throw error;
  }
}

export async function recordAccessLog(userId: string, appId: string, accessedFields: string[], ipAddress: string) {
  try {
    const db = await connectToDatabase();
    const logsCollection = db.collection('accessLogs');
    
    await logsCollection.insertOne({
      userId,
      appId,
      accessedFields,
      timestamp: new Date(),
      ipAddress
    });
    
    return { success: true };
  } catch (error) {
    console.error("Record access log error:", error);
    throw error;
  }
}
