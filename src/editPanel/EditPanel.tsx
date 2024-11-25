import { NoteParam } from '../types'
import React from 'react'
import { formatDate } from '../utils/util'

interface EditPanelProps {
  note: NoteParam | null
}

const Sidebar: React.FC<EditPanelProps> = ({
  note
}) => {


  return <div className="w-full h-full">
    {
      !!note &&
      <>
        <header className='flex flex-col gap-6 pb-6 border-solid border-b'>
          <div className="text-3xl font-bold">{note.title}</div>
          <div className="text-sm text-gray-400">
            <span>Creation Date:</span>
            <span className='pl-2'>{formatDate(note.date)}</span>
          </div>
          <div className="text-sm text-gray-400">
            <span>Last Modified:</span>
            <span className='pl-2'>{formatDate(note.update)}</span></div>
        </header>
        <main className='mt-6'>
          {note.content}
        </main>
      </>
    }
  </div>
}


export default Sidebar