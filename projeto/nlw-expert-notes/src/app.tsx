import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'
import { Footer } from './components/footer'

// Teste
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Note {
  id: string,
  date: Date,
  content: string
}

export function App() {

  const [parent] = useAutoAnimate()

  const [search, setSearch] = useState('');

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes');

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return []
  })

  function onNoteCreated(content: string) {
    const newNote = { id: crypto.randomUUID(), date: new Date(), content, };
    const notesArray = [newNote, ...notes];

    setNotes([newNote, ...notes]);
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(notes => {
      return notes.id != id;
    })

    setNotes(notesArray);
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearch(query);
  }

  const filteredNotes = (search != '')
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes;

  return (
    <div className="flex flex-col min-h-screen transition-colors max-h-screen">
      <main className="flex-grow mx-auto max-w-6xl my-12 space-y-6 px-5 lg:px-0">
        <img src={logo} alt="Logo NLW Expert" />
        <form className="w-full">
          <input 
            type="text" 
            placeholder='Busque em suas notas...' 
            className="w-full bg-transparent text-xl sm:text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
            onChange={handleSearch}
          />
        </form>
        <div className="h-px bg-slate-700" />

        <div ref={parent} className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 auto-rows-[250px] py-4">
          <NewNoteCard onNoteCreated={onNoteCreated} />

          {filteredNotes.map(note => {
            return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}