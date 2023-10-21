export function isImage(file: File): boolean {
  const imageTypes = ["image/jpeg", "image/png", "image/gif"]

  return imageTypes.includes(file.type)
}
