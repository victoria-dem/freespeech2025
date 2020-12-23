import React from 'react';

const PoemLine = ({line, poemId}) => {
    
    const [prevPoemId, setPrevPoemId] = React.useState(0)
    
    
    React.useEffect(()=>{
        setPrevPoemId(poemId)
    }, [])
    
    console.log('renderagain', poemId, prevPoemId)
    return <p className="petition-form__poem-line">{line}</p>
}
export default React.memo(PoemLine)