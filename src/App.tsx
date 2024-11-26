import { NoteParam } from './types'
import { useMemo, useState } from 'react'

import Sidebar from './sidebar/Sidebar'
import EditPanel from './editPanel/EditPanel'
import './style.css'

export const STORAGE_KEY = 'notesapp-notes'

function App() {
  const localStorage = window.localStorage
  const [activeNoteId, setActiveNoteId] = useState<number>(0)
  const [notes, setNotes] = useState<NoteParam[]>(() => {
    try {
      const localDataStr = localStorage.getItem(STORAGE_KEY)
      if (localDataStr) {
        return JSON.parse(localDataStr)
      } else {
        return []
      }
    } catch (error) {
      console.log('Init local notes data error: ', error)
      return []
    }
  })

  const activeNote = useMemo(() => {
    return notes.find(item => item.id === activeNoteId) || null
  }, [notes, activeNoteId])

  const handleSaveLocalNotes = (data: NoteParam[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const onChangeNote = (id: number) => {
    setActiveNoteId(id)
  }

  const onAddNote = () => {
    const noteId = Math.floor(Math.random() * 1000000)
    const noteData = {
      title: 'New Note' + noteId,
      content: 'Please input note content...',
      date: new Date().toISOString(),
      update: new Date().toISOString(),
      id: noteId
    }
    const newNotesData = [noteData, ...notes]
    setActiveNoteId(noteId)
    setNotes(newNotesData)
    handleSaveLocalNotes(newNotesData)
  }

  const onDeleteNote = (id: number) => {
    const newNotesData = notes.filter(item => item.id !== id)
    setNotes(newNotesData)
    if (id === activeNoteId) {
      setActiveNoteId(0)
    }
    handleSaveLocalNotes(newNotesData)
  }

  const onUpdateNote = (newNote: NoteParam) => {
    const newNotes = [...notes]
    const existing = notes.findIndex(item => item.id === newNote.id)
    if(existing !== -1) {
      newNotes[existing] = newNote
      setNotes(newNotes)
      handleSaveLocalNotes(newNotes)
    }
  }

  const onImportNotes = (importNotes: NoteParam[]) => {
    setNotes(importNotes)
    handleSaveLocalNotes(importNotes)
  }

  return (
    <div className='w-full h-screen overflow-hidden p-5 flex'>
      <div className="w-2/5 h-full">
        <Sidebar activeId={activeNoteId} notes={notes} onAddNote={onAddNote} onChange={onChangeNote} onDeleteNote={onDeleteNote} onImportNotes={onImportNotes}></Sidebar>
      </div>
      <div className="h-full w-3/5">
        <EditPanel note={activeNote} onUpdateNote={onUpdateNote}></EditPanel>
      </div>
    </div>
  )
}

export default App