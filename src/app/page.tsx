"use client"
import { Label } from "@/components/ui/label"
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

import { Progress } from "@/components/ui/progress"
import {  useState } from "react"



export default function Home() {


  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [success, setMessage] = useState('');
  const [error, setError] = useState('');

  const FileType = ['xlsx', 'xls', 'csv'] as const;
  type FileExtension = typeof FileType[number];

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

  
    // Verifica existencia do arquivo
    if (!selectedFile) return setError('Arquivo Inexistente!');

    // Verifica tipo de arquivo
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !FileType.includes(fileExtension as FileExtension)) {
      return setError('Tipo de Arquivo Incorreto!');
    }

    // Verifica tamanho do arquivo
    const fileSize = selectedFile.size;
    if (fileSize > 100000) return setError('Arquivo Muito Grande');

    // Envia arquivo
    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch('/api', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);

    // Mostra barra de progresso simulada
    setChecked(false);
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) clearInterval(interval);
    }, 100);
  };


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
            <p className="text-xs text-gray-500 dark:text-gray-400"> xlsx,xls ou csv (maximo 1 MB)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
    </label>
</div> 

<div className="mt-3 ">
    <Progress value={progress}  /> 
  { progress ? (<p className="text-xs text-gray-500 dark:text-white ml-100 ">100% </p>):(
    <p className="text-xs text-gray-500 dark:text-white ml-100"></p>
  )  }
  { <p className="text-xs text-red-500 dark:text-white mt-2">{error}</p>}
  { <p className="text-xs text-green-500 dark:text-white mt-2 ">{success}</p>}
 
  </div>   
    <div className="mt-3">
       <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button  variant="outline" className="mt-1 " type="submit"   onSubmit={handleSubmit}  >Enviar
        
        

        </Button>
      </AlertDialogTrigger>
   
    </AlertDialog>
    
    </div>
    
  </CardContent>





</Card>
 
</form>

      </main>
       
    </div>
  );
}
