# 🔧 Google OAuth Setup Guide - Create New Project

## Step 1: Create New Google Cloud Project

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Click "Select a project"** (top left, next to Google Cloud logo)
3. **Click "NEW PROJECT"**
4. **Project Details**:
   - Project name: `Personal Dashboard OAuth`
   - Organization: Leave as default
   - Location: Leave as default
5. **Click "CREATE"**
6. **Wait for project creation** (takes 30-60 seconds)
7. **Select your new project** from the dropdown

## Step 2: Enable Required APIs

1. **Go to "APIs & Services" > "Library"**
2. **Search and enable these APIs**:
   - `Google+ API` (click ENABLE)
   - `Gmail API` (click ENABLE) 
   - `Google Calendar API` (click ENABLE)
   - `Google Tasks API` (click ENABLE)

## Step 3: Configure OAuth Consent Screen

1. **Go to "APIs & Services" > "OAuth consent screen"**
2. **Choose "External"** (unless you have a Google Workspace account)
3. **Click "CREATE"**
4. **Fill out App Information**:
   - App name: `Personal Dashboard`
   - User support email: `your-email@gmail.com`
   - Developer contact: `your-email@gmail.com`
5. **Click "SAVE AND CONTINUE"**
6. **Scopes**: Click "SAVE AND CONTINUE" (skip for now)
7. **Test users**: Add your email address, click "SAVE AND CONTINUE"
8. **Summary**: Click "BACK TO DASHBOARD"

## Step 4: Create OAuth 2.0 Credentials

1. **Go to "APIs & Services" > "Credentials"**
2. **Click "+ CREATE CREDENTIALS"**
3. **Select "OAuth 2.0 Client IDs"**
4. **Application type**: Select "Web application"
5. **Name**: `Personal Dashboard Web Client`
6. **Authorized JavaScript origins**:
   - Add: `http://localhost:5173`
   - Add: `http://localhost:3001`
7. **Authorized redirect URIs**:
   - Add: `http://localhost:5173`
   - Add: `http://localhost:5173/login`
   - Add: `http://localhost:5173/dashboard`
8. **Click "CREATE"**

## Step 5: Copy Your Credentials

1. **Copy the Client ID** (starts with numbers, ends with `.apps.googleusercontent.com`)
2. **Copy the Client Secret** (starts with `GOCSPX-`)
3. **Update your .env file** with these new credentials

## Step 6: Test the Integration

1. **Restart your development server**
2. **Go to the login page**
3. **Try Google Sign-In**

---

## 🚨 Common Issues & Solutions

### Issue: "OAuth client was not found"
- **Solution**: Make sure you're using the correct Client ID
- **Check**: The Client ID in your .env matches exactly what's in Google Cloud Console

### Issue: "redirect_uri_mismatch"
- **Solution**: Add all possible redirect URIs to your OAuth client
- **Add these URIs**:
  - `http://localhost:5173`
  - `http://localhost:5173/login`
  - `http://localhost:5173/dashboard`

### Issue: "Access blocked: This app's request is invalid"
- **Solution**: Complete the OAuth consent screen configuration
- **Make sure**: Your email is added as a test user

---

## 📝 Quick Checklist

- [ ] New Google Cloud project created
- [ ] Google+ API enabled
- [ ] Gmail API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth 2.0 client created
- [ ] Authorized origins added (`http://localhost:5173`)
- [ ] Authorized redirect URIs added
- [ ] Client ID copied to .env file
- [ ] Client Secret copied to .env file
- [ ] Development server restarted

---

## 🔄 If You Still Have Issues

1. **Delete the old project** (if you want to clean up)
2. **Wait 5-10 minutes** for Google's systems to update
3. **Clear your browser cache** and cookies
4. **Try incognito/private browsing mode**
5. **Check browser console** for detailed error messages