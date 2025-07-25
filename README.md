# Country Info Application

A NestJS-based application for managing country information.

## 🚀 Quick Start

### Local Development Setup

#### 1. Install dependencies
```bash
npm install 
```

#### 2. Setup MySQL database container
```bash
docker run -p 3306:3306 --name db_mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -v $(pwd)/mysql-init/my.cnf:/etc/mysql/conf.d/my.cnf \
  -v $(pwd)/mysql-init/init.sql:/docker-entrypoint-initdb.d/init.sql \
  -d mysql:8.0.40
```

#### 3. Build the application
```bash
npm run build
```

#### 4. Run migrations
```bash
npm run typeorm:run-migrations
```

#### 5. Start the application
```bash
# Development mode
npm run start

# Watch mode (auto-reload)
npm run start:dev

# Production mode
npm run start:prod
```

### 🐳 Docker Compose Setup

#### 1. Update .env file: Change TYPEORM_HOST to db_mysql

#### 2. Start containers:
```bash
docker compose up -d
```

#### 3. Run migrations
```bash
docker exec -it country-info-app npm run typeorm:run-migrations:docker
```

### 📚 API Documentation
#### Swagger UI is available at: http://localhost:3000/api

### 🔌 Default Port
#### Application runs on port 3000 by default

### 📦 Dependencies: 
#### - NestJS Framework
#### - MySQL Database
#### - TypeORM

### 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
If you have any questions, feel free contact me in telegram: https://t.me/satoshiinakomoto
