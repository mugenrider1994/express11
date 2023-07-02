document.addEventListener('DOMContentLoaded', () => {
  let noteTitle;
  let noteText;
  let saveNoteBtn;
  let newNoteBtn;
  let noteList;

  if (window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    noteList = document.querySelector('.list-container .list-group');
  }

  // Show an element
  const show = (elem) => {
    elem.style.display = 'inline';
  };

  // Hide an element
  const hide = (elem) => {
    elem.style.display = 'none';
  };

  // activeNote is used to keep track of the note in the textarea
  let activeNote = {};

  const getNotes = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const saveNote = async (note) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      return response.json();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const renderActiveNote = () => {
    hide(saveNoteBtn);

    if (activeNote.id) {
      noteTitle.setAttribute('readonly', true);
      noteText.setAttribute('readonly', true);
      noteTitle.value = activeNote.title;
      noteText.value = activeNote.text;
    } else {
      noteTitle.removeAttribute('readonly');
      noteText.removeAttribute('readonly');
      noteTitle.value = '';
      noteText.value = '';
    }
  };

  const handleNoteSave = async () => {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value,
    };
    await saveNote(newNote);
    getAndRenderNotes();
    renderActiveNote();
  };

  // Delete the clicked note
  const handleNoteDelete = async (e) => {
    e.stopPropagation();

    const note = e.target.closest('.list-group-item');
    const noteId = note.dataset.note;

    if (activeNote.id === noteId) {
      activeNote = {};
    }

    await deleteNote(noteId);
    getAndRenderNotes();
    renderActiveNote();
  };

  // Sets the activeNote and displays it
  const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.closest('.list-group-item').dataset.note);
    renderActiveNote();
  };

  // Sets the activeNote to an empty object and allows the user to enter a new note
  const handleNewNoteView = (e) => {
    activeNote = {};
    renderActiveNote();
  };

  const handleRenderSaveBtn = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
      hide(saveNoteBtn);
    } else {
      show(saveNoteBtn);
    }
  };

  const renderNoteList = (notes) => {
    if (window.location.pathname === '/notes') {
      noteList.innerHTML = '';
    }

    if (notes.length === 0) {
      const emptyMessage = document.createElement('li');
      emptyMessage.classList.add('list-group-item');
      emptyMessage.innerText = 'No saved notes';
      noteList.appendChild(emptyMessage);
    }

    notes.forEach((note) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.dataset.note = JSON.stringify(note);

      const noteTitle = document.createElement('span');
      noteTitle.classList.add('list-item-title');
      noteTitle.innerText = note.title;
      noteTitle.addEventListener('click', handleNoteView);
      listItem.appendChild(noteTitle);

      const deleteButton = document.createElement('i');
      deleteButton.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
      deleteButton.addEventListener('click', handleNoteDelete);
      listItem.appendChild(deleteButton);

      noteList.appendChild(listItem);
    });
  };

  const getAndRenderNotes = async () => {
    const notes = await getNotes();
    renderNoteList(notes);
  };

  if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    noteTitle.addEventListener('keyup', handleRenderSaveBtn);
    noteText.addEventListener('keyup', handleRenderSaveBtn);
  }

  getAndRenderNotes();
});