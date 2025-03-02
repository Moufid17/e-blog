import { CATEGORY_DEFAULT_COLOR } from "../help/constants";

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

export const dateTimeToLastTimeAgo = (value: Date, lang: string="en") : string => {
  const currentDate = new Date()
  const diff = currentDate.getTime() - value.getTime()
  const seconds = Math.floor(diff /1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  switch (lang) {
    case "fr":
        if (seconds < 60) {
          return `il y a ${seconds} secondes`
        } else if (minutes < 60) {
          return `il y a ${minutes} minutes`
        } else if (hours < 24) {
          return `il y a ${hours} heures`
        } else if (days < 30) {
          return `il y a ${days} jours`
        } else if (months < 12) {
          return `il y a ${months} mois`
        } else {
          return `il y a ${years} ans`
        }
    default:
      if (seconds < 60) {
        return `${seconds} seconds ago`
      } else if (minutes < 60) {
        return `${minutes} minutes ago`
      } else if (hours < 24) {
        return `${hours} hours ago`
      } else if (days < 30) {
        return `${days} days ago`
      } else if (months < 12) {
        return `${months} months ago`
      } else {
        return `${years} years ago`
      }
  }
}

export const getCategoryBgColorAndColor = (color?: string) => {
  const categoryBgColorAndColor = (color == undefined) ? CATEGORY_DEFAULT_COLOR.split(".") : color.split(".") 
  return {bgcolor: categoryBgColorAndColor[0] + "." + categoryBgColorAndColor[1], color: categoryBgColorAndColor[0]+ "." + categoryBgColorAndColor[2]}
}