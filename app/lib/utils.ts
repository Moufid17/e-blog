export const convertDateToString = (value: Date) : string => {
  const language = navigator.language
  
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return value.toLocaleString(language, options)
}

export const toUppercaseFirstChar = (value: string | null): string  => {
    return value ? value.charAt(0).toLocaleUpperCase().concat(value.slice(1)) : ""
}