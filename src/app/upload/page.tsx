'use client'

import { useState } from 'react'

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)

    const res = await fetch('/api', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Upload de Arquivo</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}
