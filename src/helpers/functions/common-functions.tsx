export function dateGenerate() {
    let month: string | number = new Date().getMonth() + 1
    let day: string | number = new Date().getDate()
    if (month < 10) month = `0${month}`
    if (day < 10) day = `0${day}`

    return `${new Date().getFullYear()}-${month}-${day}`
}