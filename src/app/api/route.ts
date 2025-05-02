import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { mkdir } from 'fs/promises'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file: File | null = formData.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ message: 'Nenhum arquivo enviado.' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadsDir = path.join(process.cwd(), 'public', 'uploadBase')
  await mkdir(uploadsDir, { recursive: true })

  const filePath = path.join(uploadsDir, file.name)
  await writeFile(filePath, buffer)

  return NextResponse.json({ message: 'Upload realizado com sucesso!' })
}


export async function GET(res: NextRequest) {
  
  return NextResponse.json({ message: 'Teste ok!' })
}
