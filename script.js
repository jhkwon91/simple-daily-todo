// DOM 요소들
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const categorySelect = document.getElementById('categorySelect');
const currentDateElement = document.getElementById('currentDate');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const searchInput = document.getElementById('searchInput');

// 상수 정의
const CONFIG = {
    FILTERS: {
        ALL: 'all',
        COMPLETED: 'completed',
        PENDING: 'pending'
    },
    PRIORITIES: {
        HIGH: 'high',
        MEDIUM: 'medium',
        LOW: 'low'
    },
    DEFAULT_PRIORITY: 'medium',
    EXPORT_FILE_NAME: 'todo-data.json',
    MAX_TODO_LENGTH: 100
};

// 현재 날짜 표시
/**
 * 현재 날짜를 화면에 표시합니다.
 * @returns {void}
 */
function updateCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    currentDateElement.textContent = `${year}년 ${month}월 ${day}일`;
}

// 할 일 데이터 관리
let todos = [];
let currentFilter = CONFIG.FILTERS.ALL; // 'all', 'completed', 'pending'
let currentSearch = ''; // 현재 검색어

// localStorage에서 할 일 불러오기
/**
 * localStorage에서 할 일 데이터를 불러옵니다.
 * @returns {void}
 */
function loadTodos() {
    const savedTodos = localStorage.getItem('dailyTodos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
        updateProgress();
    }
}

// localStorage에 할 일 저장
/**
 * 할 일 데이터를 localStorage에 저장합니다.
 * @returns {void}
 */
function saveTodos() {
    localStorage.setItem('dailyTodos', JSON.stringify(todos));
    updateProgress();
}

// 할 일 추가
/**
 * 새로운 할 일을 추가합니다.
 * @returns {void}
 */
function addTodo() {
    const text = todoInput.value.trim();
    const category = categorySelect.value;
    
    if (text) {
        const newTodo = {
            id: Date.now(),
            text: text,
            category: category,
            completed: false,
            createdAt: new Date().toISOString(),
            dueDate: null,
            priority: CONFIG.DEFAULT_PRIORITY
        };
        
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        
        // 입력창 초기화
        todoInput.value = '';
        todoInput.focus();
    }
}

// 할 일 수정
/**
 * 특정 할 일을 수정합니다.
 * @param {number} id - 수정할 할 일의 ID
 * @param {string} newText - 새로운 할 일 내용
 * @returns {void}
 */
function editTodo(id, newText) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
    );
    saveTodos();
    renderTodos();
}

// 할 일 삭제
/**
 * 특정 할 일을 삭제합니다.
 * @param {number} id - 삭제할 할 일의 ID
 * @returns {void}
 */
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// 할 일 완료 상태 토글
/**
 * 특정 할 일의 완료 상태를 토글합니다.
 * @param {number} id - 상태를 토글할 할 일의 ID
 * @returns {void}
 */
function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

// 필터링된 할 일 렌더링
/**
 * 필터링된 할 일 목록을 화면에 렌더링합니다.
 * @returns {void}
 */
function renderFilteredTodos() {
    todoList.innerHTML = '';
    
    // 필터링된 할 일만 표시
    let filteredTodos = todos;
    if (currentFilter === CONFIG.FILTERS.COMPLETED) {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (currentFilter === CONFIG.FILTERS.PENDING) {
        filteredTodos = todos.filter(todo => !todo.completed);
    }
    
    // 검색어로 필터링
    if (currentSearch) {
        filteredTodos = filteredTodos.filter(todo =>
            todo.text.toLowerCase().includes(currentSearch.toLowerCase()) ||
            todo.category.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<p class="no-todos">할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>';
        return;
    }
    
    filteredTodos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoElement.innerHTML = `
            <div class="todo-item-content">
                <input type="checkbox" class="check-button" ${todo.completed ? 'checked' : ''}>
                <div class="todo-text-container">
                    <span class="todo-text">${todo.text}</span>
                    ${todo.dueDate ? `<span class="todo-due-date">마감: ${formatDate(todo.dueDate)}</span>` : ''}
                    <span class="todo-priority priority-${todo.priority}">${getPriorityText(todo.priority)}</span>
                </div>
                <span class="todo-category category-${todo.category}">${todo.category}</span>
            </div>
            <div class="todo-actions">
                <button class="edit-button" data-id="${todo.id}">수정</button>
                <button class="delete-button" data-id="${todo.id}">삭제</button>
            </div>
        `;
        todoList.appendChild(todoElement);
    });
}

// 이벤트 리스너 추가
/**
 * 할 일 항목에 이벤트 리스너를 추가합니다.
 * @returns {void}
 */
function addEventListeners() {
    // 이벤트 리스너는 렌더링 후에 추가해야 합니다
    document.querySelectorAll('.check-button').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const id = parseInt(this.closest('.todo-item').querySelector('.edit-button').dataset.id);
            toggleTodo(id);
        });
    });
    
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const todo = todos.find(t => t.id === id);
            if (todo) {
                // 수정할 내용을 묻는 프롬프트
                const newText = prompt('할 일을 수정하세요:', todo.text);
                if (newText !== null && newText.trim() !== '') {
                    editTodo(id, newText.trim());
                }
            }
        });
    });
    
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            deleteTodo(id);
        });
    });
}

// 할 일 렌더링
/**
 * 할 일 목록을 화면에 렌더링합니다.
 * @returns {void}
 */
function renderTodos() {
    renderFilteredTodos();
    addEventListeners();
}

// 우선순위 텍스트 변환 함수
/**
 * 우선순위 값을 텍스트로 변환합니다.
 * @param {string} priority - 우선순위 값
 * @returns {string} - 변환된 우선순위 텍스트
 */
function getPriorityText(priority) {
    switch(priority) {
        case CONFIG.PRIORITIES.HIGH: return '높음';
        case CONFIG.PRIORITIES.MEDIUM: return '중간';
        case CONFIG.PRIORITIES.LOW: return '낮음';
        default: return '중간';
    }
}

// 날짜 형식 변환 함수
/**
 * 날짜 문자열을 지정된 형식으로 변환합니다.
 * @param {string} dateString - 원본 날짜 문자열
 * @returns {string} - 변환된 날짜 문자열
 */
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 진행률 업데이트
/**
 * 할 일 진행률을 업데이트합니다.
 * @returns {void}
 */
function updateProgress() {
    if (todos.length === 0) {
        progressText.textContent = '0% 완료';
        progressFill.style.width = '0%';
        return;
    }
    
    const completedCount = todos.filter(todo => todo.completed).length;
    const progress = Math.round((completedCount / todos.length) * 100);
    
    progressText.textContent = `${progress}% 완료`;
    progressFill.style.width = `${progress}%`;
}

// 필터 변경
/**
 * 할 일 필터를 변경합니다.
 * @param {string} filter - 변경할 필터
 * @returns {void}
 */
function changeFilter(filter) {
    currentFilter = filter;
    renderTodos();
}

// 검색어 변경
/**
 * 할 일 검색어를 변경합니다.
 * @returns {void}
 */
function handleSearch() {
    currentSearch = searchInput.value.trim();
    renderTodos();
}

// 데이터 내보내기
/**
 * 할 일 데이터를 JSON 파일로 내보냅니다.
 * @returns {void}
 */
function exportData() {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', CONFIG.EXPORT_FILE_NAME);
    linkElement.click();
}

// 데이터 가져오기
/**
 * JSON 파일에서 할 일 데이터를 가져옵니다.
 * @param {Event} event - 파일 선택 이벤트
 * @returns {void}
 */
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedTodos = JSON.parse(e.target.result);
            if (Array.isArray(importedTodos)) {
                todos = importedTodos;
                saveTodos();
                renderTodos();
                alert('데이터가 성공적으로 가져와졌습니다!');
            } else {
                alert('잘못된 데이터 형식입니다.');
            }
        } catch (error) {
            alert('데이터 가져오기 중 오류가 발생했습니다.');
        }
    };
    reader.readAsText(file);
}

// 이벤트 리스너
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
searchInput.addEventListener('input', handleSearch);

// 필터 버튼 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    // 기존 코드 유지
    updateCurrentDate();
    loadTodos();
    
    // 데이터 내보내기/가져오기 버튼 추가
    const dataButtons = document.createElement('div');
    dataButtons.className = 'data-buttons';
    dataButtons.innerHTML = `
        <button id="exportBtn" class="export-button">데이터 내보내기</button>
        <input type="file" id="importBtn" accept=".json" style="display: none;">
        <label for="importBtn" class="import-button">데이터 가져오기</label>
    `;
    
    // 데이터 버튼을 헤더에 추가
    const header = document.querySelector('.header');
    header.appendChild(dataButtons);
    
    // 내보내기 버튼 이벤트
    document.getElementById('exportBtn').addEventListener('click', exportData);
    
    // 가져오기 버튼 이벤트
    document.getElementById('importBtn').addEventListener('change', importData);
    
    // 필터 버튼 추가
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <button class="filter-button ${currentFilter === CONFIG.FILTERS.ALL ? 'active' : ''}" data-filter="all">전체</button>
        <button class="filter-button ${currentFilter === CONFIG.FILTERS.PENDING ? 'active' : ''}" data-filter="pending">진행중</button>
        <button class="filter-button ${currentFilter === CONFIG.FILTERS.COMPLETED ? 'active' : ''}" data-filter="completed">완료</button>
    `;
    
    // 필터 버튼에 이벤트 리스너 추가
    filterContainer.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            changeFilter(filter);
            
            // 활성 버튼 스타일 업데이트
            filterContainer.querySelectorAll('.filter-button').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // 필터 버튼을 todoList 위에 삽입
    todoList.parentNode.insertBefore(filterContainer, todoList);
});