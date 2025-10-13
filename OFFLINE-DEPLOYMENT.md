# Offline Deployment Guide for Windows Server 2019

## 🎯 Overview
This guide helps you deploy Smile Insurance on a Windows Server 2019 machine without internet access.

## 📋 Prerequisites on Development Machine (WITH Internet)

1. **Node.js** installed
2. **npm** working
3. **Git** (optional)
4. **Docker** (for Docker deployment option)

## 🚀 Deployment Options

### Option 1: Node.js Offline Bundle (Recommended)

#### Step 1: Prepare on Development Machine
```bash
# 1. Install dependencies
npm install

# 2. Create offline bundle
chmod +x scripts/prepare-offline-deployment.sh
./scripts/prepare-offline-deployment.sh
```

#### Step 2: Transfer to Windows Server
1. Copy `smile-insurance-offline.tar.gz` to Windows Server
2. Extract using 7-Zip or similar tool
3. Navigate to extracted folder

#### Step 3: Deploy on Windows Server
```cmd
# 1. Install Node.js (download installer and copy to server)
# Download from: https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi

# 2. Run deployment script
deploy-windows.bat

# 3. Access application
# http://localhost:3000
```

### Option 2: Docker Offline Deployment

#### Step 1: Prepare Docker Images
```bash
# On development machine
chmod +x scripts/prepare-docker-offline.sh
./scripts/prepare-docker-offline.sh
```

#### Step 2: Windows Server Setup
1. Install Docker Desktop for Windows
2. Copy `smile-docker-offline.tar.gz` to server
3. Extract and run:
```cmd
deploy-docker-windows.bat
```

### Option 3: Portable Node.js (No Installation)

#### Step 1: Download Portable Node.js
1. Download Node.js portable: https://nodejs.org/dist/v18.17.0/node-v18.17.0-win-x64.zip
2. Extract to `portable-node/`

#### Step 2: Create Portable Package
```bash
# Create portable deployment
mkdir smile-portable
cp -r . smile-portable/
# Copy portable Node.js to smile-portable/node/
```

#### Step 3: Windows Batch Script
```cmd
@echo off
set PATH=%~dp0node;%PATH%
cd /d "%~dp0"
node --version
npm --version
npm run build
npm start
pause
```

## 🔧 Configuration for Offline Environment

### Environment Variables (.env.local)
```env
# Database (SQLite for offline)
DATABASE_URL="file:./data/smile.db"

# Disable external services
NEXT_TELEMETRY_DISABLED=1
DISABLE_ANALYTICS=true

# Local server settings
PORT=3000
NODE_ENV=production
```

### Package.json Scripts
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p 3000",
    "dev": "next dev -p 3000"
  }
}
```

## 🖥️ Desktop App Offline Setup

### Step 1: Copy Desktop App
```cmd
# Copy desktop folder to each staff computer
xcopy /E /I desktop C:\SmileInsurance\desktop
```

### Step 2: Configure Server IP
```cmd
# Set server IP (replace with actual server IP)
setx SMILE_SYNC_USERS_URL "http://192.168.1.100:3000/api/desktop/users"
```

### Step 3: Install Desktop Dependencies
```cmd
cd C:\SmileInsurance\desktop
npm install --offline --cache .npm-cache
```

## 🔍 Troubleshooting

### Common Issues

1. **npm install fails**
   - Use pre-bundled node_modules
   - Check Node.js version compatibility

2. **Port conflicts**
   - Change port in package.json: `"start": "next start -p 3001"`

3. **Database issues**
   - Use SQLite for offline: `DATABASE_URL="file:./data/smile.db"`

4. **Desktop app can't connect**
   - Check Windows Firewall
   - Verify server IP address
   - Test with: `curl http://server-ip:3000/api/health`

### Windows Server Specific

1. **Enable Windows Features**
   ```cmd
   # Enable IIS (optional)
   dism /online /enable-feature /featurename:IIS-WebServerRole

   # Enable .NET Framework
   dism /online /enable-feature /featurename:NetFx4Extended-ASPNET45
   ```

2. **Firewall Rules**
   ```cmd
   # Allow port 3000
   netsh advfirewall firewall add rule name="Smile Insurance" dir=in action=allow protocol=TCP localport=3000
   ```

3. **Windows Service (Optional)**
   - Use `node-windows` package to create Windows service
   - Auto-start on boot

## 📊 File Structure After Deployment

```
C:\SmileInsurance\
├── web\                    # Main application
│   ├── node_modules\       # Pre-installed dependencies
│   ├── .next\             # Built application
│   ├── package.json
│   └── start-smile-insurance.bat
├── desktop\               # Desktop app
│   ├── node_modules\
│   ├── main.js
│   └── package.json
└── data\                  # Database files
    └── smile.db
```

## ✅ Verification Steps

1. **Web Application**
   - Visit: http://localhost:3000
   - Check: http://localhost:3000/api/health

2. **Desktop App**
   - Run: `npm start` in desktop folder
   - Test QR login with demo credentials

3. **Staff Profile**
   - Visit: http://localhost:3000/staff/profile
   - Screenshot QR code for testing

## 🆘 Support

If you encounter issues:
1. Check Windows Event Viewer
2. Review application logs
3. Verify Node.js version compatibility
4. Test network connectivity between machines
