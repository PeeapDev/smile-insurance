# Smile Insurance - Docker Deployment Guide

Complete guide to deploy Smile Insurance system on your local organization server.

## 📋 Prerequisites

### Server Requirements
- **OS**: Linux (Ubuntu 20.04+, Debian, CentOS) or Windows Server
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: 20GB+ free space
- **CPU**: 2+ cores recommended
- **Network**: Static IP on your local network

### Software Requirements
1. **Docker** (20.10+)
2. **Docker Compose** (2.0+)

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Docker

**Ubuntu/Debian:**
```bash
# Update packages
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin

# Add your user to docker group (avoid sudo)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker compose version
```

**Windows Server:**
1. Download Docker Desktop for Windows
2. Install and restart
3. Enable WSL 2 backend

### Step 2: Clone/Copy Project

```bash
# If using git
git clone https://github.com/PeeapDev/smile-insurance.git
cd smile-insurance

# Or copy the project folder to your server
# scp -r smile-insurance user@server-ip:/opt/
```

### Step 3: Configure Environment

```bash
# Copy environment template
cp .env.docker .env

# Edit with your settings
nano .env  # or use vi, vim, or any text editor
```

**Important: Update these values in `.env`:**
```bash
# Change passwords (use strong passwords!)
POSTGRES_PASSWORD=your_secure_db_password_here
REDIS_PASSWORD=your_secure_redis_password_here

# Generate NextAuth secret
# Run: openssl rand -base64 32
NEXTAUTH_SECRET=your_generated_secret_here

# Update with your server's IP address
NEXTAUTH_URL=http://192.168.1.100:3000
SMILE_SYNC_USERS_URL=http://192.168.1.100:3000/api/desktop/users
```

### Step 4: Update Next.js Config

Edit `next.config.js` to enable standalone output:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // Add this line
  // ... rest of your config
}

module.exports = nextConfig
```

### Step 5: Build and Start

```bash
# Build and start all services
docker compose up -d

# Check if everything is running
docker compose ps

# View logs
docker compose logs -f
```

**Expected output:**
```
NAME                IMAGE                    STATUS
smile-postgres      postgres:15-alpine       Up (healthy)
smile-redis         redis:7-alpine           Up (healthy)
smile-web           smile-web:latest         Up (healthy)
smile-nginx         nginx:alpine             Up (healthy)
```

### Step 6: Access the System

Open your browser and navigate to:
- **Via Nginx**: `http://your-server-ip/`
- **Direct**: `http://your-server-ip:3000/`

**Default admin login** (you should change this):
- Username: `admin`
- Password: `admin123`

---

## 🖥️ Desktop App Configuration

### Option 1: Environment Variable (Recommended)

**Windows:**
```cmd
# Set permanently
setx SMILE_SYNC_USERS_URL "http://192.168.1.100:3000/api/desktop/users"

# Restart the desktop app
```

**Mac/Linux:**
```bash
# Add to ~/.bashrc or ~/.zshrc
echo 'export SMILE_SYNC_USERS_URL="http://192.168.1.100:3000/api/desktop/users"' >> ~/.bashrc
source ~/.bashrc

# Or set temporarily
export SMILE_SYNC_USERS_URL="http://192.168.1.100:3000/api/desktop/users"
cd desktop && npm start
```

### Option 2: Build Desktop App with Pre-configured Server

Update `desktop/main.js`:
```javascript
const DEFAULT_SERVER_URL = 'http://192.168.1.100:3000'

async function syncUsers() {
  const url = process.env.SMILE_SYNC_USERS_URL || `${DEFAULT_SERVER_URL}/api/desktop/users`
  // ... rest of the code
}
```

Then build installers:
```bash
cd desktop
npm run build  # Creates installers in desktop/dist/
```

Distribute the installers to staff computers.

---

## 🔧 Management Commands

### View Status
```bash
docker compose ps
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f web
docker compose logs -f postgres
```

### Stop Services
```bash
docker compose stop
```

### Start Services
```bash
docker compose start
```

### Restart Services
```bash
docker compose restart
```

### Update Application (Deploy New Code)
```bash
# Pull latest code
git pull

# Rebuild and restart
docker compose down
docker compose up -d --build

# Or without downtime
docker compose up -d --build --no-deps web
```

### Database Backup
```bash
# Backup
docker compose exec postgres pg_dump -U smile smile_insurance > backup_$(date +%Y%m%d).sql

# Restore
docker compose exec -T postgres psql -U smile smile_insurance < backup_20250108.sql
```

### Clean Up (Remove Everything)
```bash
# Stop and remove containers, networks
docker compose down

# Remove volumes (WARNING: deletes all data!)
docker compose down -v
```

---

## 🔐 Security Recommendations

### 1. Change Default Passwords
- Update all passwords in `.env`
- Change default admin password after first login

### 2. Firewall Configuration
```bash
# Ubuntu/Debian
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp  # If accessing directly
sudo ufw enable

# Only allow from your network
sudo ufw allow from 192.168.1.0/24 to any port 3000
```

### 3. Enable HTTPS (Optional but Recommended)

Generate self-signed certificate for internal use:
```bash
# Create SSL directory
mkdir -p ssl

# Generate certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/nginx.key \
  -out ssl/nginx.crt \
  -subj "/CN=insurance.yourcompany.local"
```

Update `nginx.conf` to enable HTTPS (uncomment SSL sections).

### 4. Regular Backups
Set up automated backups:
```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups/smile-insurance"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
docker compose exec -T postgres pg_dump -U smile smile_insurance | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup uploads
docker compose cp smile-web:/app/uploads $BACKUP_DIR/uploads_$DATE

# Keep only last 7 days
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete
EOF

chmod +x backup.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /path/to/backup.sh") | crontab -
```

---

## 📊 Monitoring

### Check Resource Usage
```bash
# Container stats
docker stats

# Disk usage
docker system df
```

### Health Checks
```bash
# Web app health
curl http://localhost:3000/api/health

# Nginx health
curl http://localhost/health

# Database connection
docker compose exec postgres pg_isready -U smile
```

---

## 🐛 Troubleshooting

### Services Won't Start
```bash
# Check logs
docker compose logs

# Check if ports are in use
sudo netstat -tulpn | grep -E ':(80|443|3000|5432|6379)'

# Restart Docker
sudo systemctl restart docker
docker compose up -d
```

### Database Connection Issues
```bash
# Check database is running
docker compose exec postgres psql -U smile -d smile_insurance -c "SELECT 1;"

# Reset database (WARNING: deletes data)
docker compose down -v
docker compose up -d
```

### Desktop App Can't Connect
1. Check server IP is correct in environment variable
2. Verify firewall allows port 3000
3. Test connection: `curl http://your-server-ip:3000/api/desktop/users`
4. Check web service logs: `docker compose logs web`

### Out of Disk Space
```bash
# Clean up Docker
docker system prune -a

# Remove old images
docker image prune -a

# Check volume sizes
docker system df -v
```

---

## 🔄 Auto-Start on Server Boot

Docker containers are configured with `restart: unless-stopped`, so they automatically start when the server boots.

**Verify:**
```bash
# Reboot server
sudo reboot

# After reboot, check services
docker compose ps
```

If containers don't auto-start:
```bash
# Enable Docker service
sudo systemctl enable docker

# Ensure compose file is in correct location
cd /opt/smile-insurance
docker compose up -d
```

---

## 📈 Scaling (Future)

If you need to handle more users:

### Add More Web Instances
```yaml
# In docker-compose.yml
services:
  web:
    deploy:
      replicas: 3  # Run 3 instances
```

### Use External Database
Point `DATABASE_URL` to a dedicated PostgreSQL server.

---

## 📞 Support

For issues:
1. Check logs: `docker compose logs -f`
2. Review this guide's troubleshooting section
3. Contact your system administrator

---

## ✅ Post-Deployment Checklist

- [ ] All services running (`docker compose ps`)
- [ ] Web app accessible via browser
- [ ] Admin login works
- [ ] Desktop app connects successfully
- [ ] Passwords changed from defaults
- [ ] Firewall configured
- [ ] Backup script set up
- [ ] SSL certificate installed (if using HTTPS)
- [ ] Staff trained on desktop app usage

---

**Deployment Date:** _____________  
**Deployed By:** _____________  
**Server IP:** _____________  
**Admin Contact:** _____________
