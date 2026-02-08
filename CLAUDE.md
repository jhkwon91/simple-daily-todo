# Simple Daily Todo Application

## Project Overview

A simple yet feature-rich daily todo application built with HTML, CSS, and JavaScript. This client-side web application allows users to manage their daily tasks with categories, priorities, due dates, and progress tracking.

## Key Features

- **Task Management**: Add, edit, and delete todo items
- **Categorization**: Organize tasks into categories (업무, 개인, 공부)
- **Completion Tracking**: Mark tasks as complete with visual feedback
- **Search Functionality**: Find specific tasks quickly
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Data Persistence**: Todos saved using localStorage between browser sessions
- **Data Export/Import**: Export and import your todo data as JSON
- **Filtering**: View all, pending, or completed tasks
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Priority Levels**: Assign low, medium, or high priority to tasks
- **Due Date Management**: Set and track task deadlines

## How to Run

This is a pure client-side web application that works directly in any modern browser:

1. **Direct Method**:
   - Open `simple-daily-todo/index.html` directly in your browser

2. **Local Server (Recommended)**:
   - Navigate to project directory in terminal
   - Run: `python3 -m http.server 8000` (Python 3) or `python -m SimpleHTTPServer 8000` (Python 2)
   - Visit `http://localhost:8000/simple-daily-todo/index.html`

## Technical Details

- **Frontend Technologies**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: localStorage for data persistence
- **No Backend Required**: Pure client-side application
- **Responsive**: Mobile-first design approach
- **No External Dependencies**: Self-contained application

## File Structure

```
.
├── README.md
├── CLAUDE.md
└── simple-daily-todo/
    ├── index.html
    ├── style.css
    └── script.js
```

## Usage Instructions

1. Enter a task in the input field and select a category
2. Click "추가" (Add) or press Enter to add the task
3. Use the checkboxes to mark tasks as complete
4. Use the "수정" (Edit) button to modify tasks
5. Use the "삭제" (Delete) button to remove tasks
6. Filter tasks using the "전체", "진행중", and "완료" buttons
7. Search tasks using the search input field
8. Export data using the "데이터 내보내기" button
9. Import data using the "데이터 가져오기" button

## Browser Compatibility

Works in all modern browsers including Chrome, Firefox, Safari, and Edge.

## Limitations

- Data is stored locally in the browser's localStorage
- No server-side synchronization
- Single-user interface (no multi-user features)

## Development Notes

This application demonstrates modern web development practices including:
- Clean separation of HTML, CSS, and JavaScript
- Responsive design principles
- Local data storage
- Event handling and DOM manipulation
- User experience considerations