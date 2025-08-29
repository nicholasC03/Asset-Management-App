# Asset Management App - Client Side

A modern, client-side asset management application that runs entirely in your browser. No server required!

## 🚀 Features

- **User Authentication**: Register and login with local storage
- **Asset Management**: Upload, view, and manage your digital assets
- **File Support**: Images, documents, videos, audio, and other file types
- **Search & Filter**: Find assets quickly with search and type filtering
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Local Storage**: All data is stored locally in your browser
- **File Preview**: View images directly in the browser
- **Download Assets**: Download your files anytime
- **Modern UI**: Beautiful, intuitive interface with smooth animations

## 📁 Project Structure

```
asset-management-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── README.md           # This file
└── src/                # Original Spring Boot backend (kept for reference)
    └── main/
        └── java/
            └── com/
                └── assetmanagement/
                    └── app/
                        ├── controller/
                        ├── model/
                        ├── service/
                        └── ...
```

## 🛠️ How to Use

### Getting Started

1. **Download or Clone** the repository
2. **Open** `index.html` in your web browser
3. **Register** a new account or login with existing credentials
4. **Start managing** your assets!

### No Installation Required

This application runs entirely in your browser using:
- **HTML5** for structure
- **CSS3** for styling and animations
- **JavaScript ES6+** for functionality
- **Local Storage** for data persistence
- **File API** for file handling

### Features in Detail

#### 🔐 Authentication
- Create new accounts with username, email, and password
- Secure login with existing credentials
- Session persistence (stays logged in until logout)
- Password hashing for security

#### 📦 Asset Management
- **Upload Files**: Drag and drop or click to select files
- **Auto-detection**: File types are automatically detected
- **Metadata**: Track file size, creation date, and last modified
- **Descriptions**: Add custom descriptions to your assets
- **Categories**: Organize by type (image, document, video, audio, other)

#### 🔍 Search & Organization
- **Real-time Search**: Find assets by name or description
- **Type Filtering**: Filter by file type
- **Dashboard Stats**: View total assets, storage used, and last updated

#### 📱 Responsive Design
- **Mobile-friendly**: Optimized for all screen sizes
- **Touch Support**: Works great on touch devices
- **Modern UI**: Clean, professional interface

## 💾 Data Storage

All data is stored locally in your browser's localStorage:

- **Users**: User accounts and authentication data
- **Assets**: File metadata and base64-encoded file data
- **Sessions**: Current user session information

### Storage Limits

- **LocalStorage**: ~5-10MB per domain (varies by browser)
- **File Size**: Recommended under 5MB per file for best performance
- **Total Storage**: Depends on available browser storage

## 🔧 Technical Details

### Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### File Support

- **Images**: JPG, PNG, GIF, WebP
- **Documents**: PDF, DOC, DOCX, TXT, RTF
- **Videos**: MP4, AVI, MOV, WMV
- **Audio**: MP3, WAV, FLAC, AAC
- **Other**: Any file type

### Security Features

- **Password Hashing**: Basic Base64 encoding (demo purposes)
- **Input Validation**: Form validation and sanitization
- **File Type Validation**: Checks file extensions
- **XSS Protection**: Safe HTML rendering

## 🚀 Deployment

### GitHub Pages

1. **Push** your code to GitHub
2. **Enable** GitHub Pages in repository settings
3. **Select** source branch (usually `main`)
4. **Access** your app at `https://username.github.io/repository-name`

### Local Development

1. **Clone** the repository
2. **Open** `index.html` in your browser
3. **Start developing** - no build process required!

### Custom Domain

1. **Upload** files to your web server
2. **Configure** your domain to point to the files
3. **Access** via your custom domain

## 📝 Usage Examples

### Adding an Asset

1. Click **"Add Asset"** button
2. Fill in the asset name and description
3. Select a file from your computer
4. Choose the appropriate file type
5. Click **"Add Asset"** to save

### Searching Assets

1. Use the **search box** to find assets by name or description
2. Use the **type filter** to show only specific file types
3. Results update in real-time as you type

### Managing Assets

1. **View**: Click the "View" button to see asset details
2. **Download**: Click "Download" to save the file locally
3. **Delete**: Click "Delete" to remove the asset (with confirmation)

## 🔄 Migration from Backend

This client-side version maintains the same core functionality as the original Spring Boot backend:

### Preserved Features
- ✅ User registration and authentication
- ✅ Asset upload and management
- ✅ File metadata tracking
- ✅ Search and filtering
- ✅ User-specific asset storage

### New Benefits
- 🚀 **No server required**
- 💨 **Instant loading**
- 🔒 **Privacy-focused** (data stays local)
- 📱 **Works offline**
- 🎨 **Modern UI/UX**

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. **Check** browser compatibility
2. **Clear** browser cache and localStorage
3. **Try** a different browser
4. **Report** issues on GitHub

## 🔮 Future Enhancements

Potential improvements for future versions:

- **Cloud Storage**: Integration with Google Drive, Dropbox, etc.
- **File Compression**: Automatic image/video compression
- **Advanced Search**: Full-text search within documents
- **Sharing**: Share assets with other users
- **Backup**: Export/import asset collections
- **Tags**: Add custom tags to assets
- **Collections**: Group assets into collections
- **API**: REST API for external integrations

---

**Enjoy managing your assets locally and securely! 🎉**
