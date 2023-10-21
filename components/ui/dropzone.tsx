"use client"

import { Trash, UploadCloud, XCircle } from "lucide-react"
import React from "react"
import { useDropzone, type Accept, type FileRejection, type FileWithPath } from "react-dropzone"
import type { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form"
import { Unless } from "react-if"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { formatBytes } from "@/utils/format-bytes"
import { Button } from "./button"
import { Card } from "./card"
import { FileCard } from "./file-card"

export type FileWithPreview = FileWithPath & {
  preview: string
}

interface FileDialogProps<TFieldValues extends FieldValues>
  extends React.HTMLAttributes<HTMLDivElement> {
  name: Path<TFieldValues>
  setValue?: UseFormSetValue<TFieldValues>
  accept?: Accept
  maxSize?: number
  maxFiles?: number
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
  isUploading?: boolean
  disabled?: boolean
}

export const Dropzone = <TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    "image/*": [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  ...props
}: FileDialogProps<TFieldValues>) => {
  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      setValue &&
        setValue(name, acceptedFiles as PathValue<TFieldValues, Path<TFieldValues>>, {
          shouldValidate: true,
        })

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast.error(`O arquivo é muito grande. O tamanho máximo é ${formatBytes(maxSize)}`)
            return
          }
          errors[0]?.message && toast.error(errors[0].message)
        })
      }
    },

    [maxSize, name, setFiles, setValue]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  })

  return (
    <>
      <Unless condition={maxFiles === 1 && files?.length === 1}>
        <div
          {...getRootProps()}
          className={cn(
            "group relative grid min-h-[12rem] w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-4 text-center transition hover:bg-muted/25",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isDragActive && "border-muted-foreground/50",
            isDragReject && "bg-red-200",
            disabled && "pointer-events-none opacity-60",
            className
          )}
          {...props}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="group grid w-full place-items-center gap-1 sm:px-10">
              <UploadCloud
                className="h-9 w-9 animate-pulse text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          ) : isDragActive ? (
            isDragReject ? (
              <div className="grid place-items-center gap-2 text-red-500 sm:px-5">
                <XCircle className="h-8 w-8 " aria-hidden="true" />
                <p className="text-base font-medium">Arquivo inválido</p>
              </div>
            ) : (
              <div className="grid place-items-center gap-2 text-muted-foreground sm:px-5">
                <UploadCloud
                  className={cn("h-8 w-8", isDragActive && "animate-bounce")}
                  aria-hidden="true"
                />
                <p className="text-base font-medium">Solte o arquivo aqui</p>
              </div>
            )
          ) : (
            <div className="grid place-items-center justify-stretch gap-1 sm:px-5">
              <UploadCloud className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <p className="mt-2 text-base font-medium text-muted-foreground">
                Arraste o arquivo aqui, ou clique para selecioná-lo
              </p>
              <div className="w-full space-y-1">
                <Card className="p-2">
                  <p className="text-sm text-slate-500">
                    O arquivo deve ser menor que <b>{formatBytes(maxSize)}</b>
                  </p>
                </Card>
                <Card className="p-2">
                  <p className="text-sm text-slate-500">
                    Você pode importar até{" "}
                    <b>
                      {maxFiles} {maxFiles === 1 ? "arquivo" : "arquivos"}
                    </b>
                  </p>
                </Card>
                <Card className="p-2">
                  <p className="text-sm text-slate-500">
                    O arquivo de ser do tipo{" "}
                    <b>
                      <i>{Object.keys(accept).map((item) => item)}</i>
                    </b>
                  </p>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Unless>

      {files?.length ? (
        <div className="grid">
          {files?.map((file, i) => (
            <FileCard
              key={i}
              i={i}
              name={name}
              setValue={setValue}
              files={files}
              setFiles={setFiles}
              file={file}
            />
          ))}
        </div>
      ) : null}
      {files?.length ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2.5 w-full hover:text-red-500"
          onClick={() => {
            setFiles(null)
            setValue &&
              setValue(name, null as PathValue<TFieldValues, Path<TFieldValues>>, {
                shouldValidate: true,
              })
          }}
        >
          <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
          Remover todos
          <span className="sr-only">Remover todos</span>
        </Button>
      ) : null}
    </>
  )
}
