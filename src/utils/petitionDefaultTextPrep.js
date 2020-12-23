function petitionDefaultTextPrep(setIsPoemReady, setPoemText) {
    const defaultPoems = [['Когда б вы знали, из какого сора', 'Растут стихи, не ведая стыда,', 'Как желтый одуванчик у забора,',
        'Как лопухи и лебеда.', 'Сердитый окрик,', 'дегтя запах свежий'],['Не выходи из комнаты, не совершай ошибку.',
        'Зачем тебе Солнце, если ты куришь Шипку?',
        'За дверью бессмысленно всё, особенно — возглас счастья.',
        'Только в уборную — и сразу же возвращайся.']]
    
    const defaultPoemNun=Math.floor(Math.random()*defaultPoems.length)
    
    
    setPoemText(defaultPoems[defaultPoemNun])
    setIsPoemReady(true)
}

export default petitionDefaultTextPrep
