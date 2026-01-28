# Cloudinary Setup Guide

## Problem
The 404 errors for uploaded files occur because the `uploads/` directory is in `.gitignore`, meaning uploaded files are not deployed to production servers.

## Solution: Cloudinary Integration
We've integrated Cloudinary for cloud file storage in production.

### Setup Instructions

1. **Create a Cloudinary Account**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for a free account
   - Get your credentials from the Dashboard

2. **Add Environment Variables**
   Add these to your deployment environment (Vercel, Render, etc.):

   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key  
   CLOUDINARY_API_SECRET=your_api_secret
   NODE_ENV=production
   ```

3. **How it Works**
   - **Development**: Files are stored locally in `uploads/` directory
   - **Production**: Files are uploaded to Cloudinary and URLs are stored in database
   - File URLs will be accessible like: `https://res.cloudinary.com/your_cloud_name/image/upload/buloqboshi-applications/filename`

4. **Benefits**
   - ✅ Files persist across deployments
   - ✅ CDN delivery for faster access
   - ✅ Automatic image optimization
   - ✅ Secure file storage
   - ✅ No more 404 errors for uploaded files

### Current Status
- ✅ Cloudinary integration implemented
- ✅ Automatic fallback to local storage in development
- ✅ File deletion works for both storage types
- ⏳ Waiting for environment variables to be configured

### Next Steps
1. Add the Cloudinary environment variables to your deployment platform
2. Deploy the updated code
3. Test file uploads in production

The file upload size limit has also been increased from 10MB to 50MB with proper error handling.
