# School Management System

A modern web application built with Next.js and React for managing school directory. This application allows users to add new schools and browse through a comprehensive list of schools with detailed information.

## 🚀 Features

- **Add School**: Complete form with validation for adding new schools
- **Browse Schools**: Ecommerce-style grid layout to view all schools
- **Image Upload**: Upload and display school images
- **Form Validation**: Comprehensive validation for all input fields
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **MySQL Database**: Reliable data storage and retrieval

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Database**: MySQL
- **File Upload**: Native Next.js file handling
- **Image Optimization**: Next.js Image component

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MySQL database

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a MySQL database named `school_management`
   - The application will automatically create the required table on first run

4. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_management
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Pages

### 1. Home Page (`/`)
- Landing page with navigation to both main features
- Overview of system capabilities
- Modern, responsive design

### 2. Add School (`/addSchool`)
- Comprehensive form with validation
- Fields: Name, Address, City, State, Contact, Email, Image
- Real-time validation and error handling
- Image upload with file type and size validation
- Responsive design for all screen sizes

### 3. Show Schools (`/showSchools`)
- Ecommerce-style grid layout
- Displays school name, address, city, and image
- Responsive cards that adapt to screen size
- Empty state when no schools exist
- Loading and error states

## 🗄️ Database Schema

### Schools Table
```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT,
  email_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔧 API Endpoints

### GET `/api/schools`
- Fetches all schools from the database
- Returns: Array of school objects

### POST `/api/schools`
- Adds a new school to the database
- Accepts: FormData with school details and optional image
- Validation: All fields except image are required
- Returns: Success message with created school ID

## 📂 File Structure

```
school-management/
├── src/
│   ├── app/
│   │   ├── addSchool/
│   │   │   └── page.tsx         # Add school form page
│   │   ├── showSchools/
│   │   │   └── page.tsx         # Browse schools page
│   │   ├── api/
│   │   │   └── schools/
│   │   │       └── route.ts     # API endpoints
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   └── lib/
│       └── db.ts                # Database configuration
├── public/
│   └── schoolImages/            # Uploaded images directory
├── package.json
└── README.md
```

## ✨ Key Features Explained

### Form Validation
- **Name**: Required, minimum 2 characters
- **Address**: Required, minimum 10 characters
- **City/State**: Required, minimum 2 characters
- **Contact**: Required, exactly 10 digits
- **Email**: Required, valid email format
- **Image**: Optional, valid image file (JPEG, PNG, GIF), max 5MB

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### Image Handling
- File upload with validation
- Automatic image optimization
- Fallback placeholder for missing images
- Secure file storage in public/schoolImages

## 🚀 Deployment

### Environment Variables for Production
Make sure to set these environment variables in your hosting platform:

```env
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=school_management
NEXT_PUBLIC_API_URL=your_production_url
```

### Recommended Hosting Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **AWS**
- **DigitalOcean**

## 🔍 Testing

To test the application:

1. **Add a School**
   - Navigate to `/addSchool`
   - Fill out the form with valid data
   - Upload an image (optional)
   - Submit the form

2. **View Schools**
   - Navigate to `/showSchools`
   - Verify the school appears in the grid
   - Check responsive behavior on different screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `.env.local`
   - Ensure database exists

2. **Image Upload Issues**
   - Check file permissions for `public/schoolImages`
   - Verify file size is under 5MB
   - Ensure file type is supported (JPEG, PNG, GIF)

3. **Port Already in Use**
   - Change port: `npm run dev -- -p 3001`
   - Or kill the process using port 3000

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js and React