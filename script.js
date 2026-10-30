const API_URL = "https://6ae34d7d933120ae20f8a038.mockapi.io/todo";
let todos = []; //서버에서 받은 목록 저장

window.addEventListener("load", function () {
    const titleInput = document.querySelector('#title');
    const subjectInput = document.querySelector('#subject');
    const taskInput = document.querySelector('#task');
    const deadlineInput = document.querySelector('#deadline');
    const priorityInput = document.querySelector('#priority');
    const todoBtn = document.querySelector('#todoBtn');
    const todoList = document.querySelector('#todoList');
    const search = document.querySelector('#search');

    let editId = null;

    function render(list) {
        todoList.innerHTML = "";
        list.forEach(function (todo) {
            const tr = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = todo.id;

            const tdTitle = document.createElement('td');
            tdTitle.textContent = todo.title;

            const tdSubject = document.createElement('td');
            tdSubject.textContent = todo.subject;

            const tdTask = document.createElement('td');
            tdTask.textContent = todo.task;

            const tdDeadline = document.createElement('td');
            tdDeadline.textContent = todo.deadline;

            const tdPriority = document.createElement('td');
            tdPriority.textContent = todo.priority;

            const tdComplete = document.createElement('td');
            tdComplete.innerHTML = '<input type="checkbox">';
            const tddeleteBtn = document.createElement("button");
            tddeleteBtn.textContent = "삭제";
            tddeleteBtn.addEventListener("click", function () {
                if (confirm("삭제하시겠습니까?")) {//서버에 삭제 요청
                    deleteTodo(todo.id);
                }
            });

            const editBtn = document.createElement("button");
            editBtn.textContent = "수정";

            editBtn.addEventListener("click", function () {
                titleInput.value = todo.title;
                subjectInput.value = todo.subject;
                taskInput.value = todo.task;
                deadlineInput.value = todo.deadline;
                priorityInput.value = todo.priority;

                editId = todo.id;
                todoBtn.textContent = "저장";
            });


            tr.appendChild(tdId);
            tr.appendChild(tdTitle);
            tr.appendChild(tdSubject);
            tr.appendChild(tdTask);
            tr.appendChild(tdDeadline);
            tr.appendChild(tdPriority);
            tr.appendChild(tdComplete);
            tdComplete.appendChild(tddeleteBtn);
            tdComplete.appendChild(editBtn);

            todoList.appendChild(tr);
        });
    }

    async function loadTodos() { //sync해주는데 
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {//응답 없으면 
                throw new Error("목록을 불러오지 못했습니다.");
            }
            todos = await response.json(); //json으로
            render(todos);
        } catch (error) {
            alert(error.message);
        }
    }
    loadTodos();

    async function addTodo(newTodo) {//서버에 todo추가
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo)
            });
            if (!response.ok) {
                alert("등록 실패!");
                return;
            }
            await loadTodos(); // 목록 다시 불러오기
        } catch (error) {
            alert("서버 연결 오류");
        }
    }

    async function updateTodo(id, data) { // 서버의 todo 수정
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                alert("수정 실패!");
                return;
            }
            await loadTodos();
        } catch (error) {
            alert("서버 연결 오류");
        }
    }

    async function deleteTodo(id) { // 서버의 todo 삭제
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                alert("삭제 실패!");
                return;
            }
            await loadTodos();
        } catch (error) {
            alert("서버 연결 오류");
        }
    }

    search.addEventListener("input", function () { // 제목으로 검색
        const keyword = search.value;
        const result = todos.filter(function (t) {
            return t.title.includes(keyword);
        });
        render(result);
    });

    todoBtn.addEventListener("click", function () {
        if (!titleInput.checkValidity()) {
            alert("제목을 5자 이상 입력해주세요!");
            titleInput.focus();
            return;
        }
        if (!subjectInput.checkValidity()) {
            alert("과목명을 입력하세요.");
            subjectInput.focus();
            return;
        }
        if (!taskInput.checkValidity()) {
            alert("할일을 입력하세요.");
            taskInput.focus();
            return;
        }
        if (!deadlineInput.checkValidity()) {
            alert("기한을 입력하세요.");
            deadlineInput.focus();
            return;
        }
        if (!priorityInput.checkValidity()) {
            alert("우선순위를 범위에 맞게 입력하세요.(1-20)");
            priorityInput.focus();
            return;
        }
        //여기까지 상단 입력부분

        if (editId === null) {
            const newTodo = {
                title: titleInput.value,
                subject: subjectInput.value,
                task: taskInput.value,
                deadline: deadlineInput.value,
                priority: Number(priorityInput.value)
            };
            addTodo(newTodo);
        } else {
            const data = {
                title: titleInput.value,
                subject: subjectInput.value,
                task: taskInput.value,
                deadline: deadlineInput.value,
                priority: Number(priorityInput.value)
            };
            updateTodo(editId, data);
            editId = null;
            todoBtn.textContent = "일정 등록";
        }

        titleInput.value = "";
        subjectInput.value = "";
        taskInput.value = "";
        deadlineInput.value = "";
        priorityInput.value = "";
        titleInput.focus();
    })
})