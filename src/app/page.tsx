"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { CheckCheck } from 'lucide-react';
import { Progress } from "@/components/ui/progress"
import { useState } from "react"


export default function Home() {

let [progress,setStartTime]=useState(0) 
let [checked,setChecket]=useState(true)
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


  function ProgressBar(){
 
 for(let i =10; i>progress;i--){
 progress=progress+100
 setStartTime(progress)
 setChecket(false)
return   console.log(progress)




}


}
  return (
    
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start ">
     <form onSubmit={handleSubmit}>     
  <Card  className="px-40 py-10">
  <CardHeader>
    <CardTitle>Planilha de dados</CardTitle>
    <CardDescription>Anexe sua planilha</CardDescription>
  </CardHeader>
  
  <CardContent>

      <Label htmlFor="file" className="m-3"></Label>
    
      
<div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 px-20 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Inserir</span> Arquivo</p>
            <p className="text-xs text-gray-500 dark:text-gray-400"> xlsx,xls ou csv (maximo 20 MB)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
    </label>
</div> 

<div className="mt-3 ">
    <Progress value={progress}  /> 
  {  <p className="text-xs text-gray-900 dark:text-white ml-100">100%</p> }
   {message && <p className="text-xs text-gray-900 dark:text-white ">{message}</p>}
  </div>   
    <div className="mt-3">
       <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" onSubmit={handleSubmit} variant="outline" className="mt-1 "  >Enviar
        
        

        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja enviar sua base de dados?</AlertDialogTitle>
          <AlertDialogDescription>
            Certifique que todos os dados estão corretos antes de enviar!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit" onSubmit={handleSubmit} onClick={ProgressBar}>Enviar
             </AlertDialogAction>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    
    </div>
    
  </CardContent>





</Card>
 
</form>

      </main>
      
    </div>
  );
}
