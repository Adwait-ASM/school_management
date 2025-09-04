# Deployment Guide

This guide will help you deploy the School Management System to various hosting platforms.

## 🚀 Quick Start

1. **Environment Variables**
   Create these environment variables in your hosting platform:
   ```env
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=school_management
   NEXT_PUBLIC_API_URL=your_app_url
   ```

2. **Database Setup**
   - Run the SQL script in `scripts/init-db.sql`
   - Or let the app auto-create the table on first run

## 📦 Platform-Specific Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Import project in Vercel dashboard
   - Connect your repository

2. **Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required environment variables

3. **Database**
   - Use Vercel PostgreSQL or external MySQL service
   - Update connection string in environment variables

4. **Deploy**
   ```bash
   npm run build
   ```

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add in Site Settings → Environment Variables

3. **Database**
   - Use external MySQL service (AWS RDS, PlanetScale, etc.)

### Railway

1. **Connect GitHub**
   - Create new project from GitHub repo

2. **Environment Variables**
   - Add in Variables tab

3. **Database**
   - Add MySQL service in Railway
   - Use provided connection details

### DigitalOcean App Platform

1. **Create App**
   - Connect GitHub repository

2. **Environment Variables**
   - Add in App Settings

3. **Database**
   - Use DigitalOcean Managed Database

## 🗄️ Database Options

### Cloud Database Services

1. **PlanetScale** (MySQL)
   - Serverless MySQL platform
   - Great for Next.js apps
   - Free tier available

2. **AWS RDS**
   - Managed MySQL service
   - Highly scalable
   - Pay-as-you-go pricing

3. **Google Cloud SQL**
   - Managed MySQL service
   - Integration with other Google services

4. **Azure Database for MySQL**
   - Microsoft's managed MySQL service

### Self-Hosted Options

1. **DigitalOcean Droplet**
   - Virtual private server
   - Full control over configuration

2. **AWS EC2**
   - Virtual server in the cloud
   - Various instance types available

## 🔧 Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database created and accessible
- [ ] Image upload directory permissions set
- [ ] Build process tested locally
- [ ] All dependencies included in package.json
- [ ] Error handling tested
- [ ] Responsive design verified

## 🚨 Important Notes

1. **File Uploads**
   - Static hosting (Vercel, Netlify) may not persist uploaded files
   - Consider using cloud storage (AWS S3, Cloudinary) for production

2. **Database Connections**
   - Ensure your database allows connections from your hosting platform
   - Configure connection pooling for better performance

3. **CORS**
   - May need to configure CORS settings for cross-origin requests

## 🔍 Testing Deployment

1. **Functionality Test**
   - Add a new school
   - Verify it appears in the list
   - Test image upload
   - Check responsive design

2. **Performance Test**
   - Test loading times
   - Verify image optimization
   - Check mobile performance

## 🐛 Common Deployment Issues

### Database Connection Failed
- Verify connection string
- Check firewall settings
- Ensure database is accessible from hosting platform

### Image Upload Not Working
- Check file permissions
- Verify upload directory exists
- Consider cloud storage for production

### Build Errors
- Check for TypeScript errors
- Verify all dependencies are installed
- Test build locally first

## 📊 Monitoring

Consider adding monitoring tools:
- **Vercel Analytics** (if using Vercel)
- **Google Analytics**
- **Sentry** for error tracking
- **Uptime monitoring** services

## 🔄 CI/CD Pipeline

Example GitHub Actions workflow:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm run test
      - name: Build application
        run: npm run build
```

## 📞 Support

If you encounter issues during deployment:
1. Check the hosting platform's documentation
2. Verify environment variables are set correctly
3. Check application logs for errors
4. Test the application locally first

---

Happy deploying! 🚀
