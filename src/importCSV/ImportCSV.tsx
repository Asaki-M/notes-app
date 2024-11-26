import { NoteParam } from '../types'
import React, { useRef } from 'react'
import {
  ArrowRightEndOnRectangleIcon
} from '@heroicons/react/20/solid'
import papa from 'papaparse'

interface ImportCSVProps {
  onImportNotes: (importNotes: NoteParam[]) => void
}

const ImportCSV: React.FC<ImportCSVProps> = ({
  onImportNotes
}) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const handleImportNotes = () => {
    inputFileRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        alert('Please upload a valid CSV file!')
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must not exceed 2MB')
        return
      }

      papa.parse(file, {
        header: true,
        complete: (result) => {
          const { data = [] } = result
          onImportNotes(data as NoteParam[])
        }
      })
      e.target.value = ''
    }
  }

  return <div className='w-8 h-8 rounded-md flex justify-center items-center cursor-pointer hover:bg-slate-100' onClick={handleImportNotes}>
    <ArrowRightEndOnRectangleIcon className='w-3/5 h-3/5'></ArrowRightEndOnRectangleIcon>
    <input type="file" accept='.csv' ref={inputFileRef} className='hidden' onChange={handleFileChange} />
  </div>
}


export default ImportCSV