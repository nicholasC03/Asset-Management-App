# Asset Management App

Hey there! 👋 This is my asset management project - a full-stack web app for keeping track of your stuff. I built this to learn Spring Boot and modern web development, and honestly, it turned out pretty useful for organizing my own files and assets.

## What it does

Basically, you can:
- Register/login to keep your stuff private
- Add assets with names, descriptions, and all that good stuff
- Track purchase prices, years bought/sold, and quality ratings
- Search and filter through your collection
- See a dashboard with totals and stats

## Tech stack

I used:
- **Backend**: Spring Boot 3.5 with Java 21
- **Database**: H2 (in-memory for now, easy to switch to PostgreSQL later)
- **Frontend**: Plain HTML/CSS/JS - no frameworks, just vanilla
- **Build tool**: Maven

## Getting it running

### Prerequisites
- Java 21 (or 17+ should work)
- Maven

### Quick start
```bash
git clone https://github.com/nicholasC03/Asset-Management-App.git
cd Asset-Management-App
mvn spring-boot:run
```

Then open `http://localhost:8080` in your browser. The frontend is just static files, so you can also open `index.html` directly if you want to play around with just the client-side stuff.

## Project structure

```
Asset-Management-App/
├── src/main/java/com/assetmanagement/app/  # Spring Boot backend
│   ├── controller/                         # REST endpoints
│   ├── model/                             # JPA entities
│   ├── service/                           # Business logic
│   └── repository/                        # Data access
├── index.html                             # Frontend interface
├── script.js                              # Client-side logic
├── styles.css                             # Styling
└── pom.xml                                # Maven config
```

## Features I'm proud of

- **Clean separation**: Backend API + frontend UI
- **Responsive design**: Works on mobile and desktop
- **Real-time updates**: Dashboard updates as you add/remove assets
- **Form validation**: Both client and server-side validation
- **Error handling**: Proper error messages and user feedback

## What I learned

This project taught me a lot about:
- Spring Boot REST APIs
- JPA/Hibernate for database operations
- Modern JavaScript (ES6+ features)
- CSS Grid and Flexbox for layouts
- Git workflow and project organization

## Future ideas

Some things I might add later:
- File upload support
- Image thumbnails
- Export to CSV/PDF
- User roles and permissions
- API documentation with Swagger

## Contributing

Feel free to fork this and make it your own! If you find bugs or have ideas for improvements, I'm open to pull requests.

## License

MIT License - do whatever you want with it!

---

*Built with ❤️ and lots of coffee*
