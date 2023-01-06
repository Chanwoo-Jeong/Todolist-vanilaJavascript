const TodoObj = {
  Todo: "운동하기",
  deadDate: "2023 / 01 / 08",
  deadTime: " 13: 00",
  Important: "4단계 vs 오늘 해야하는 일(안해도되는일)",
  subTodo: {
    work1: "줄넘기100개",
    work2: "팔굽혀펴기",
    work3: "숨쉬기운동",
    work4: "턱걸이",
    work5: "숨쉬기운동",
    work6: "프로틴먹기",
    work7: "짐볼운동하기",
  },
};

let key = 0; // TodoList 를 key로 두어 차후 데이터 수정 및 삭제를 편하게 하기위해
const TodoData = {}; // 객체로 구성 내부 데이터도 객체로 보관 json형식이 됌

//add button 클릭시 TODO객체 생성 (생성자 함수)
const MakeTodo = function (todo, deadDate, deadTime, Important, subTodo) {
  this.Todo = todo;
  this.Date = deadDate;
  this.Time = deadTime;
  this.Important = Important;
  this.SubTodo = subTodo;
};

const Todo = document.querySelector(".todolist");

const MakeTodoObj = () => {
  const TodoValue = document.querySelector("#todoinput");
  const TodoDate = document.querySelector("#tododate");
  const Todotime = document.querySelector("#todotime");
  const Important = document.querySelector("#Important");

  if (
    !(TodoValue.value && TodoDate.value && Todotime.value && Important.value)
  ) {
    alert("채우지 않은 내용이 있습니다.");
    return;
  }

  const TodoObj = new MakeTodo(
    TodoValue.value,
    TodoDate.value,
    Todotime.value,
    Important.value,
    { subTodo: {} }
  );

  // 만들어진 TODO객체를 TodoData 박스에 넣고 차후 활용
  TodoData[key] = TodoObj;
  console.log(TodoData)
  const keyValue = key; // key 값 저장

  //value 값 초기화
  TodoValue.value = "";
  TodoDate.value = "";
  Todotime.value = "";
  Important.value = "";

  //TodoData속 데이터를 이용해 투두리스트 컨테이너 child 채우기
  const todoEle = TodoData[keyValue];

  const Todo = document.querySelector(".todolist");
  const obj = document.createElement("div");
  obj.style.display = "flex";

  const workbox = document.createElement("input");
  workbox.value = todoEle.Todo;
  workbox.disabled = true;
  obj.appendChild(workbox);

  const datebox = document.createElement("input");
  datebox.value = todoEle.Date;
  datebox.disabled = true;
  obj.appendChild(datebox);

  const timebox = document.createElement("input");
  timebox.value = todoEle.Time;
  timebox.disabled = true;
  obj.appendChild(timebox);

  const importantBox = document.createElement("input");
  importantBox.value =
    todoEle.Important === "4"
      ? "오늘마감"
      : todoEle.Important === "3"
      ? "중요한일"
      : todoEle.Important === "2"
      ? "여유있음"
      : "안중요해";
  importantBox.disabled = true;

  obj.appendChild(importantBox);

  // 삭제버튼구현
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "삭제";
  deleteBtn.addEventListener("click", () => {
    Todo.removeChild(obj);
    delete TodoData[`${keyValue}`];
    console.log(TodoData)
  });
  obj.appendChild(deleteBtn);

  Todo.appendChild(obj);

  key++;
};

//리셋버튼
const reset = () => {
  while (Todo.hasChildNodes()) {
    Todo.removeChild(Todo.firstChild);
    for(const TodoItem in TodoData){
        delete TodoData[`${TodoItem}`];
    }
  }
};

// 필터할때 쓸듯
const appendTodoList = (TodoArray) => {
  const Todo = document.querySelector(".todolist");

  for (const TodoItem of TodoArray) {
    const obj = document.createElement("div");
    obj.style.display = "flex";

    const workbox = document.createElement("input");
    workbox.value = TodoItem.Todo;
    workbox.disabled = true;
    obj.appendChild(workbox);

    const datebox = document.createElement("input");
    datebox.value = TodoItem.Date;
    datebox.disabled = true;
    obj.appendChild(datebox);

    const timebox = document.createElement("input");
    timebox.value = TodoItem.Time;
    timebox.disabled = true;
    obj.appendChild(timebox);

    const importantBox = document.createElement("input");
    importantBox.value =
      TodoItem.Important === "4"
        ? "오늘마감"
        : TodoItem.Important === "3"
        ? "중요한일"
        : TodoItem.Important === "2"
        ? "여유있음"
        : "안중요해";
    importantBox.disabled = true;
    obj.appendChild(importantBox);

    Todo.appendChild(obj);
  }
};

const Mktodolist = () => {
  const Todo = document.querySelector(".todolist");
  const obj = document.createElement("div");

  const workbox = document.createElement("input");
  const work = document.querySelector("#todoinput");
  workbox.value = work.value;
  workbox.disabled = true;
  obj.appendChild(workbox);

  const datebox = document.createElement("input");
  datebox.type = "date";
  const date = document.querySelector("#tododate");
  datebox.value = date.value;
  datebox.disabled = true;
  obj.appendChild(datebox);

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "수정";
  editBtn.addEventListener("click", () => {
    workbox.disabled = !workbox.disabled;
    datebox.disabled = !datebox.disabled;
    editBtn.innerHTML = workbox.disabled === true ? "수정" : "수정완료";
  });
  obj.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "삭제";
  deleteBtn.addEventListener("click", () => {
    Todo.removeChild(obj);
  });
  obj.appendChild(deleteBtn);

  obj.style.display = "flex";
  console.log(obj);

  Todo.appendChild(obj);
  work.value = "";
  date.value = "";
};
