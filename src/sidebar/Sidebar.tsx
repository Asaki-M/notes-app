import { NoteParam } from '../types'
import React, { useMemo } from 'react'
import SidebarItem from '../sidebar-item/SidebarItem'
import ImportCSV from '../importCSV/ImportCSV'
import {
  PlusIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon
} from '@heroicons/react/20/solid'
import papa from 'papaparse'

interface SidebarProps {
  notes: NoteParam[]
  activeId: number
  onAddNote: () => void
  onChange: (id: number) => void
  onDeleteNote: (id: number) => void
  onImportNotes: (importNotes: NoteParam[]) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activeId,
  notes,
  onAddNote,
  onChange,
  onDeleteNote,
  onImportNotes
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

  const handleExportNotes = () => {
    const csv = papa.unparse(notes)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'notes-app.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const sortedNotes = useMemo(() => {
    return notes
      .slice()
      .sort((a, b) => new Date(b.update).getTime() - new Date(a.update).getTime())
  }, [notes])

  return <div className="w-full h-full px-4 flex flex-col gap-4">
    <div className="w-full flex justify-between items-center">
      <div className="w-fit py-2 px-4 flex items-center gap-4 bg-primary text-white rounded-lg cursor-pointer transition-colors duration-300 hover:bg-secondary" onClick={handleAddNote}>
        <PlusIcon className='w-6 h-6'></PlusIcon>
        <span>Add new note</span>
      </div>

      <div className="flex justify-center items-center gap-4">
        <ImportCSV onImportNotes={onImportNotes}></ImportCSV>
        <div className='w-8 h-8 rounded-md flex justify-center items-center cursor-pointer hover:bg-slate-100' onClick={handleExportNotes}>
          <ArrowTopRightOnSquareIcon className='w-3/5 h-3/5'></ArrowTopRightOnSquareIcon>
        </div>
      </div>
    </div>

    <div className="flex flex-col flex-1 gap-3 overflow-y-auto scrollbar">
      {
        sortedNotes.map((item: NoteParam) => {
          return <SidebarItem {...item} key={item.id} activeId={activeId} onClick={handleChange} onDelete={handleDeleteNote}></SidebarItem>
        })
      }
      {
        sortedNotes.length === 0 &&
        <div className="flex-1 flex flex-col justify-center items-center gap-4 bg-slate-50 rounded-lg">
          <DocumentTextIcon className='w-12 h-12 text-gray-400'></DocumentTextIcon>
          <span className='text-gray-400'>No Notes.</span>
        </div>
      }
    </div>
  </div>
}


export default Sidebar