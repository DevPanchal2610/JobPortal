# JobPortal - Full Stack Job Management System

A modern, full-stack job portal application built with **Spring Boot** backend and **React** frontend. This application enables users to post jobs, apply for positions, and manage their applications efficiently.

## 🏗️ Project Architecture

### Backend
- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Security**: JWT (JSON Web Tokens) authentication
- **Database**: (Configure in `application.properties`)
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Package Manager**: npm
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router v6

## 📋 Project Structure

```
JobPortal/
├── JobPortal/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/dev/jobportal/
│   │   │   │   ├── JobPortalApplication.java    # Main application class
│   │   │   │   ├── config/                       # Configuration classes
│   │   │   │   ├── controller/                   # REST API endpoints
│   │   │   │   ├── dto/                          # Data Transfer Objects
│   │   │   │   ├── enums/                        # Enumerations
│   │   │   │   ├── model/                        # Entity models
│   │   │   │   ├── repository/                   # Data access layer
│   │   │   │   ├── security/                     # Security & JWT
│   │   │   │   └── service/                      # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties        # Application configuration
│   │   └── test/                                 # Test classes
│   └── pom.xml                                   # Maven configuration
│
├── JobPortalFrontend/            # React Frontend
│   ├── src/
│   │   ├── components/                           # Reusable components
│   │   ├── pages/                                # Page components
│   │   ├── services/                             # API service calls
│   │   ├── context/                              # React Context
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                                   # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
├── README.md
└── .git/
```

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher (for backend)
- **Node.js** v18+ and npm (for frontend)
- **Maven** 3.6+ (for building backend)

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd JobPortal/JobPortal
   ```

2. **Configure the database** (Edit `src/main/resources/application.properties`)
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/jobportal
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd JobPortal/JobPortalFrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📚 API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/validate` - Validate JWT token

### Job Endpoints
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/{id}` - Get job by ID
- `POST /api/jobs` - Create new job (Recruiter only)
- `PUT /api/jobs/{id}` - Update job (Owner only)
- `DELETE /api/jobs/{id}` - Delete job (Owner only)

### Application Endpoints
- `GET /api/applications` - Get user applications
- `GET /api/applications/{id}` - Get application details
- `POST /api/applications` - Apply for a job
- `PUT /api/applications/{id}/status` - Update application status

### User Endpoints
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users/{id}/applications` - Get user's job applications

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for users and recruiters
- **Password Hashing**: Bcrypt password encryption
- **CORS Configuration**: Configured for frontend communication

## 🛠️ Technology Stack

### Backend Dependencies
- Spring Boot Web Starter
- Spring Data JPA
- Spring Security
- JWT (io.jsonwebtoken)
- MySQL Connector
- Lombok
- Maven

### Frontend Dependencies
- React 18
- React Router v6
- Axios
- Vite
- CSS (Vanilla)

## 📝 Key Features

✅ User authentication (Register/Login)
✅ Job posting and management
✅ Job search and filtering
✅ Apply for jobs
✅ Track application status
✅ User profile management
✅ Role-based dashboard
✅ Responsive UI design

## 🔧 Environment Variables

### Backend (.env or application.properties)
```properties
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/jobportal
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your_secret_key
JWT_EXPIRATION=86400000
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8080/api
```

## 📦 Building for Production

### Backend
```bash
cd JobPortal/JobPortal
mvn clean package -DskipTests
# JAR file will be in target/ directory
java -jar target/jobportal-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd JobPortal/JobPortalFrontend
npm run build
# Build output will be in dist/ directory
```

## 🐛 Troubleshooting

**Backend won't start?**
- Ensure MySQL is running and configured correctly
- Check `application.properties` for correct database credentials
- Verify Java 17+ is installed: `java -version`

**Frontend shows blank page?**
- Clear browser cache and reload
- Ensure backend is running on port 8080
- Check browser console for errors

**Port already in use?**
- Backend: Change `server.port=8080` in `application.properties`
- Frontend: Run `npm run dev -- --port 5174`

## 📚 Documentation

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [JWT Authentication Guide](https://jwt.io)

## 👥 Contributors

- Development Team

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Last Updated**: March 2026
**Version**: 0.0.1-SNAPSHOT
