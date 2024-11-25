import { NoteParam } from "../types"
import React from "react"
import { formatDate } from '../utils/util'

interface SidebarItemProps extends NoteParam {
  activeId: number,
  onClick: (id: number) => void
  onDelete: (id: number) => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  title,
  content,
  date,
  update,
  activeId,
  onClick,
  onDelete
}) => {

  const handleDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    onDelete(id)
  }

  return <div className={`group relative bg-gray-200 p-4 rounded-lg cursor-pointer flex flex-col gap-2 ${id === activeId ? '' : 'bg-gray-50'}`} key={id} onClick={() => onClick(id)}>
    <div className="text-sm">{formatDate(date)}</div>
    <div className="text-xl font-bold">{title}</div>
    <div className="line-clamp-2">{content}</div>
    {
      update !== date &&
      <div className="text-sm text-gray-400">Last Modified: {formatDate(update)}</div>
    }
    <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute top-0 right-0 w-6 h-6 rounded text-white bg-danger" onClick={handleDelete}>D</div>
  </div>
}

export default React.memo(SidebarItem)