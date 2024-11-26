import { NoteParam } from '../types'
import React from 'react'
import EditableText from '../editableText/EditableText'
import { formatDate } from '../utils/util'

interface EditPanelProps {
  note: NoteParam | null
  onUpdateNote: (newNote: NoteParam) => void
}

const Sidebar: React.FC<EditPanelProps> = ({
  note,
  onUpdateNote
}) => {
  const onTitleChange = (value: string) => {
    const newNote = Object.assign({}, note)
    newNote.title = value
    newNote.update = new Date().toISOString()
    onUpdateNote(newNote)
  }

  const onContentChange = (value: string) => {
    const newNote = Object.assign({}, note)
    newNote.content = value
    newNote.update = new Date().toISOString()
    onUpdateNote(newNote)
  }

  return <div className="w-full h-full flex flex-col overflow-y-auto scrollbar">
    {
      !!note &&
      <>
        <header className='flex flex-col gap-6 pb-6 border-solid border-b'>
          <EditableText key={`${note.id}__input`} contentClassName="text-3xl font-bold" value={note.title} onChange={onTitleChange}></EditableText>
          <div className="text-sm text-gray-400">
            <span>Creation Date:</span>
            <span className='pl-2'>{formatDate(note.date)}</span>
          </div>
          <div className="text-sm text-gray-400">
            <span>Last Modified:</span>
            <span className='pl-2'>{formatDate(note.update)}</span></div>
        </header>
        <main className='mt-6 flex-1'>
          <EditableText key={`${note.id}__textarea`} type='textarea' contentClassName='p-2 w-full h-full whitespace-pre-line' value={note.content} onChange={onContentChange}></EditableText>
        </main>
      </>
    }
  </div>
}


export default Sidebar