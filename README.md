# Asset Management App

A modern, RESTful asset management backend built with Spring Boot, JPA, H2, and Swagger UI.  
This project is designed as a coding portfolio piece to showcase API development, data modeling, validation, and documentation best practices.

---

## Features

- **CRUD operations** for assets (Create, Read, Update, Delete)
- **Data validation** and error handling
- **Swagger/OpenAPI documentation** out-of-the-box
- **Preloaded demo data** on startup
- **Ready for frontend integration** (CORS enabled)

---

## Technologies Used

- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- H2 Database (in-memory)
- Lombok
- Springdoc OpenAPI (Swagger)
- Maven

---

## Getting Started

### Prerequisites

- Java 17 or newer
- Maven

### Run Locally

Clone the repo and start the app:

```bash
git clone https://github.com/nicholasC03/asset-management-app.git
cd asset-management-app
./mvnw spring-boot:run
```

### Build Windows Executable

Run the following command to create a `.exe` launcher using Launch4j:

```bash
./mvnw package
```


