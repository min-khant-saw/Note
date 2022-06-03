const container = document.querySelector(".container"),
  info = document.querySelector(".info");

const create = () => {
  info.style.transform = "translate(-50%, -50%) scale(1)";
  document.body.style.setProperty("--pos", "fixed");
};

const removeInfo = () => {
  info.style.transform = "translate(-50%, -50%) scale(0)";
  document.body.style.setProperty("--pos", "--pos");
};

let noteNumber = 0;

const noteData = JSON.parse(localStorage.getItem("note")) || [];

let title;
let text;

const deleteFunction = (event) => {
  event.target.parentElement.remove();
  noteData.splice(event.target.id, 1);
  console.log(event.target.id);
  localStorage.setItem("note", JSON.stringify(noteData));
};

const addFunction = (event) => {
  event.preventDefault();
  title = document.getElementById("head").value;
  text = document.getElementById("text").value;
  noteData.push({
    count: noteNumber,
    title: title,
    text: text,
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("note", JSON.stringify(noteData));
  info.style.transform = "translate(-50%, -50%) scale(0)";
  document.body.style.setProperty("--pos", "--pos");
  container.innerHTML = "";
  html_element_data();
  noteNumber++;
  title = "";
  text = "";
};

const dbDelete = (event) => {
  event.target.remove();
  noteData.splice(event.target.id, 1);
  localStorage.setItem("note", JSON.stringify(noteData));
};

const html_element_data = () => {
  container.innerHTML += `
  ${noteData
    .map((i) => {
      return `
        <div class="round-6 note" ondblclick="dbDelete(event)" id="${i.count}">
        <h2 class="note-title">${i.title}</h2>
        <span onclick="deleteFunction(event)" class="del" id="${i.count}">Delete</span>
        <p class="note-text">
        ${i.text}
        </p>
        <small>Note Data: ${i.date}</small>
        </div>`;
    })
    .join("")}`;
};

html_element_data();
