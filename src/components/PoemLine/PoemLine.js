import React, {useState, useEffect} from 'react';

function PoemLine({line, poemId}) {
    
    const [isAnimated, setIsAnimated] = useState('false')
    const [prevPoemId, setPrevPoemId] = useState(0)
    
    console.log(isAnimated, prevPoemId, poemId, poemId===prevPoemId)
    
    useEffect(() => {
        
        prevPoemId===poemId && setIsAnimated(false)
        
    }, [poemId])
    
    useEffect(() => {
        
        prevPoemId!==poemId && setIsAnimated(true)
        prevPoemId!==poemId && setPrevPoemId(poemId)
        
    }, [poemId])
    
    
    return <p className="petition-form__poem-line">{line}</p>
}

export default PoemLine;