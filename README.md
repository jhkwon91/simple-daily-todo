# Simple Daily Todo Application

A simple yet feature-rich daily todo application built with HTML, CSS, and JavaScript. This application allows you to manage your daily tasks with categories, priorities, due dates, and progress tracking.

## Features

- Add, edit, and delete todo items
- Categorize todos (업무, 개인, 공부)
- Mark todos as complete
- Search functionality to find specific tasks
- Progress tracking with visual progress bar
- Data persistence using localStorage
- Data export/import capabilities
- Filter options (all, pending, completed)
- Responsive design for mobile devices
- Priority levels (low, medium, high)
- Due date management

## How to Run

This is a client-side web application that works directly in your browser:

1. **Direct method:**
   - Double-click on `simple-daily-todo/index.html` in your file explorer
   - Or open it directly in your browser using the file path

2. **Using a local server (recommended for development):**
   - Open terminal
   - Navigate to your project directory: `cd /path/to/your/project`
   - Run: `python3 -m http.server 8000` (for Python 3) or `python -m SimpleHTTPServer 8000` (for Python 2)
   - Open your browser and go to `http://localhost:8000/simple-daily-todo/index.html`

## Project Structure

```
.
├── README.md
├── simple-daily-todo/
│   ├── index.html
│   ├── style.css
│   └── script.js
```

## Technologies Used

- **HTML5** - For structuring the application
- **CSS3** - For styling and responsive design
- **JavaScript** - For application logic and interactivity
- **localStorage** - For data persistence

## Browser Support

This application works in all modern browsers including:
- Chrome 50+
- Firefox 45+
- Safari 10+
- Edge 14+

## Development

The application is built as a single-page application with all HTML, CSS, and JavaScript in one package. No build process or additional dependencies are required.

## License

This project is available as open source under the terms of the MIT License.