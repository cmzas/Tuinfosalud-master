export const formatDateToSpanish = date => {
  if (date.includes("January")) return date.replace("January", "Enero")
  if (date.includes("February")) return date.replace("February", "Febrero")
  if (date.includes("March")) return date.replace("March", "Marzo")
  if (date.includes("April")) return date.replace("April", "Abril")
  if (date.includes("May")) return date.replace("May", "Mayo")
  if (date.includes("June")) return date.replace("June", "Junio")
  if (date.includes("July")) return date.replace("July", "Julio")
  if (date.includes("August")) return date.replace("August", "Agosto")
  if (date.includes("September")) return date.replace("September", "Septiembre")
  if (date.includes("October")) return date.replace("October", "Octubre")
  if (date.includes("November")) return date.replace("November", "Noviembre")
  if (date.includes("December")) return date.replace("December", "Diciembre")

  return date
}
