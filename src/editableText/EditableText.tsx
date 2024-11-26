import React, { useState, useRef, useEffect, useCallback } from 'react'

interface EditInputProps {
  type?: 'input' | 'textarea'
  contentClassName?: string
  value: string
  onChange: (data: string) => void
}

const Sidebar: React.FC<EditInputProps> = ({
  type = 'input',
  contentClassName = '',
  value,
  onChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<number | null>(null);

  const [data, setData] = useState<string>(value || '')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if ((containerRef.current && !containerRef.current.contains(e.target as Node))) {
        setIsEditing(false)
      }
    };
    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditing]);

  const debounceOnChange = useCallback((value: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = window.setTimeout(() => {
      onChange(value)
    }, 300)
  }, [onChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(e.target.value)
    debounceOnChange(e.target.value)
  }

  const handleCanInput = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  return <div className="w-full h-full" ref={containerRef}>
    {
      isEditing ?
        (
          type === 'input' ?
            <input type="text" autoFocus className={`${contentClassName} w-full outline-none outline-b-2 outline-primary`} value={data} onChange={handleChange} />
            :
            <textarea autoFocus className={`${contentClassName} scrollbar outline-none border-none bg-gray-50 rounded-lg`} value={data} onChange={handleChange} ></textarea>
        )
        :
        <div className={contentClassName} onClick={handleCanInput}>{value}</div>
    }
  </div>
}


export default Sidebar