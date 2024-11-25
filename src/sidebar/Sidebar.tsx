import { NoteParam } from '../types'
import React from 'react'
import SidebarItem from '../sidebar-item/SidebarItem'

interface SidebarProps {
  notes: NoteParam[]
  activeId: number
  onAddNote: () => void
  onChange: (id: number) => void
  onDeleteNote: (id: number) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activeId,
  notes,
  onAddNote,
  onChange,
  onDeleteNote
}) => {
  const handleDeleteNote = (id: number) => {
    onDeleteNote(id)
  }
 
  const handleAddNote = () => {
    onAddNote()
  }

  const handleChange = (id: number) => {
    onChange(id)
  }

  return <div className="w-full h-full px-4 flex flex-col gap-4">
    <div className="w-full py-2 px-4 bg-primary text-white rounded-lg cursor-pointer transition-colors duration-300 hover:bg-secondary" onClick={handleAddNote}>Add new note</div>
    <div className="flex flex-col flex-1 gap-3 overflow-y-auto scrollbar">
      {
        notes.map((item: NoteParam) => {
          return <SidebarItem {...item} key={item.id} activeId={activeId} onClick={handleChange} onDelete={handleDeleteNote}></SidebarItem>
        })
      }
    </div>
  </div>
}


export default Sidebar