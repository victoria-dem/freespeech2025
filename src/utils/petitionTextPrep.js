function petitionTextPrep(docIds, setPoemText, tagText) {
    const randomPoemObj = docIds[Math.floor(Math.random() * docIds.length)]
    const randomPoem = Object.values(randomPoemObj)[0]
    const randomPoemLength = randomPoem.length
    console.log('randomPoem=', randomPoem)
    // TODO: стих меньше 6 строк
    // TODO: если стих не найден
    let baseString = -1
    const poemText = []
    let firstLine = 0
    let lastLine = 0
    let string = ''
    // TODO: надо протестировать на стихах разной длины и там, где нужное слово находиться вначале и в конце
    // TODO: точно есть ошибка на стихах, где ключевое слово встречается в последней строке
    
    randomPoem.forEach((line, i, arr) => {
        string = line.toLowerCase()
        if ((string.indexOf(tagText) !== -1) && (baseString === -1)) {
            baseString = i
            if (baseString < 2 && randomPoemLength > 5) {
                firstLine = 0
                lastLine = 5
            } else if (baseString > randomPoemLength - 3) {
                firstLine = randomPoemLength - 7
                lastLine = randomPoemLength - 1
            } else {
                firstLine = baseString - 2
                lastLine = baseString + 3
            }
        }
    })
    
    for (let i = firstLine; i < lastLine; i++) {
        poemText.push(randomPoem[i])
    }
    setPoemText(poemText)
}

export default petitionTextPrep
