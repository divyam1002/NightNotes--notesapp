const newBtn = document.querySelector("#newBtn");
const title = document.querySelector(".title");
const editorContent = document.querySelector("#content");
const notesList = document.querySelector(".notes-list");

let notes = [];
let activeNoteId = null;

// Load Notes
window.addEventListener("load", (e) => {
    const stored = JSON.parse(localStorage.getItem("notes")) || [];
    notes = stored;
    renderNotes();
});

//Render Notes
function renderNotes() {
    notesList.innerHTML = "";
    notes.forEach((note) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        if (note.id === activeNoteId) li.classList.add("active");

        const h2 = document.createElement("h2");
        h2.textContent = note.title || "Untitled";
        li.appendChild(h2);

        li.dataset.id = note.id;
        notesList.prepend(li);
    });
}

// Create Note
newBtn.addEventListener("click", () => {
    const note = {
        id: Date.now(),
        title: "Untitled",
        content: "",
        createdAt: new Date().toISOString(),
    };

    notes.push(note);
    activeNoteId = note.id;

    saveNotes();
    renderNotes();
    loadNoteToEditor(note.id);

    title.focus();
    titleSelect();
});

// Function to load a note into editor
function loadNoteToEditor(id) {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    activeNoteId = id;
    title.textContent = note.title;
    editorContent.textContent = note.content;

    document.querySelectorAll(".list-item").forEach((li) => {
        li.classList.toggle("active", li.dataset.id == id);
    });
}

// Handle note click (load its content)
notesList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);
    loadNoteToEditor(id);
});

// Save notes to localStorage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Handel typing in title
title.addEventListener("input", (e) => {
    const note = notes.find((n) => n.id === activeNoteId);
    if (!note) return;
    note.title = e.target.textContent || "Untitled";
    saveNotes();
    renderNotes();
});

// Switching from title to editor
title.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        editorContent.focus();
    }
});

// Handel typing in editor
editorContent.addEventListener("input", (e) => {
    const note = notes.find((n) => n.id === activeNoteId);
    if (!note) return;

    note.content = editorContent.textContent;
    saveNotes();
});

// Select all title text (your function)
function titleSelect() {
    if (!title) return;
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(title);
    selection.removeAllRanges();
    selection.addRange(range);
}
