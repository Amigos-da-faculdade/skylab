"use client"

import { Crop, FileSpreadsheet as FileLucide, RefreshCw, X } from "lucide-react"
import Image from "next/image"
import React from "react"
import Cropper, { type ReactCropperElement } from "react-cropper"
import type { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form"
import { Else, If, Then } from "react-if"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { isImage } from "@/utils/is-image"
import { Button } from "./button"
import { FileWithPreview } from "./dropzone"

interface FileCardProps<TFieldValues extends FieldValues> {
  i: number
  file: FileWithPreview
  name: Path<TFieldValues>
  setValue?: UseFormSetValue<TFieldValues>
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
}

export const FileCard = <TFieldValues extends FieldValues>({
  i,
  file,
  name,
  setValue,
  files,
  setFiles,
}: FileCardProps<TFieldValues>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [cropData, setCropData] = React.useState<string | null>(null)
  const cropperRef = React.useRef<ReactCropperElement>(null)

  // Crop image
  const onCrop = React.useCallback(() => {
    if (!files || !cropperRef.current) return
    setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())

    cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
      if (!blob) return
      const croppedImage = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      })
      files.splice(i, 1, croppedImage as FileWithPreview)
      setValue && setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>)
    })
  }, [file.name, file.type, files, i, name, setValue])

  // Crop image on enter key press
  React.useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        onCrop()
        setIsOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [onCrop])

  return (
    <div className="relative mt-2 flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <If condition={isImage(file)}>
          <Then>
            <Image
              src={cropData ? cropData : file.preview}
              alt={file.name}
              className="h-10 w-10 shrink-0 rounded-md"
              width={40}
              height={40}
              loading="lazy"
            />
          </Then>
          <Else>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <FileLucide size={20} />
            </div>
          </Else>
        </If>

        <div className="flex flex-col">
          <p className="line-clamp-1 text-sm font-medium text-muted-foreground">{file.name}</p>
          <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)}MB</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {file.type.startsWith("image") && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="h-7 w-7 p-0">
                <Crop className="h-4 w-4 text-white" aria-hidden="true" />
                <span className="sr-only">Crop image</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
                Crop image
              </p>
              <div className="mt-8 grid place-items-center space-y-5">
                <Cropper
                  ref={cropperRef}
                  className="h-[450px] w-[450px] object-cover"
                  zoomTo={0.5}
                  initialAspectRatio={1 / 1}
                  preview=".img-preview"
                  src={file.preview}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    aria-label="Crop image"
                    type="button"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      onCrop()
                      setIsOpen(false)
                    }}
                  >
                    <Crop className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                    Crop Image
                  </Button>
                  <Button
                    aria-label="Reset crop"
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      cropperRef.current?.cropper.reset()
                      setCropData(null)
                    }}
                  >
                    <RefreshCw className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                    Reset Crop
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => {
            if (!files) return
            setFiles(files.filter((_, j) => j !== i))
            setValue &&
              setValue(
                name,
                files.filter((_, j) => j !== i) as PathValue<TFieldValues, Path<TFieldValues>>,
                {
                  shouldValidate: true,
                }
              )
          }}
        >
          <X className="h-4 w-4 hover:text-red-500" aria-hidden="true" />
          <span className="sr-only">Remover arquivo</span>
        </Button>
      </div>
    </div>
  )
}
