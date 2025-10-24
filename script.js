const newBtn = document.querySelector("#newBtn");
const title = document.querySelector(".title");
const editorContent = document.querySelector("#content");
const notesList = document.querySelector(".notes-list");

// Function to select all text inside the title
function titleSelect() {
    if (!title) return; // Exit if title doesn't exist
    const range = document.createRange(); // Create a new range (for selecting text)
    const selection = window.getSelection(); // Get current text selection
    range.selectNodeContents(title); // Select all content of the title
    selection.removeAllRanges(); // Clear any previous selection
    selection.addRange(range); // Apply new selection
}

// When a note in the list is clicked
notesList.addEventListener("click", (e) => {
    const li = e.target.closest("li"); // Get the clicked <li> or its parent
    if (!li) return; // Exit if not clicking on a <li>

    // Remove "active" class from all notes
    notesList.querySelectorAll("li.active").forEach((item) => {
        item.classList.remove("active");
    });

    // Add "active" class to the clicked note
    li.classList.add("active");
});

// When "New Note" button is clicked
newBtn.addEventListener("click", () => {
    // Remove "active" class from current active note (if any)
    const currentActive = notesList.querySelector(".active");
    if (currentActive) currentActive.classList.remove("active");

    // Create a new <li> for the note
    const li = document.createElement("li");
    li.classList.add("list-item"); // Add styling class

    // Create a <h2> for the note title
    const h2 = document.createElement("h2");
    h2.textContent = title.textContent; // Copy current title text

    li.classList.add("active"); // Make the new note active
    li.appendChild(h2); // Add the <h2> to <li>
    notesList.prepend(li); // Add the new note at the top of the list

    // Focus on the title and select all text so user can edit immediately
    title.focus();
    titleSelect();
});

// When Enter key is pressed inside the title
title.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent creating a new line
        editorContent.focus(); // Move cursor to the note content area
    }
});

// When typing inside the title
title.addEventListener("input", (e) => {
    const activeLi = document.querySelector("li.active"); // Get active note
    let h2 = activeLi.firstElementChild; // Get its <h2> title
    h2.textContent = e.target.textContent; // Update <h2> to match title input
});
