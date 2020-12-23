function petitionDefaultTextPrep(setIsPoemReady, setPoemText) {
    const defaultPoems = [['Когда б вы знали, из какого сора', 'Растут стихи, не ведая стыда,', 'Как желтый одуванчик у забора,',
        'Как лопухи и лебеда.', 'Сердитый окрик,', 'дегтя запах свежий'],['Не выходи из комнаты, не совершай ошибку.',
        'Зачем тебе Солнце, если ты куришь Шипку?',
        'За дверью бессмысленно всё, особенно — возглас счастья.',
        'Только в уборную — и сразу же возвращайся.'], ['Уме недозрелый, плод недолгой науки!', 'Покойся, не понуждай к перу мои руки:',
        'Не писав летящи дни века проводити', 'Можно, и славу достать, хоть творцом не слыти.',
        'Ведут к ней нетрудные в наш век пути многи,', 'На которых смелые не запнутся ноги.']]
    
    const defaultPoemNun=Math.floor(Math.random()*defaultPoems.length)
    console.log(defaultPoemNun);
    
    setPoemText(defaultPoems[defaultPoemNun])
    setIsPoemReady(true)
}

export default petitionDefaultTextPrep
