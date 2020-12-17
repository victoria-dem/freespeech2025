import React from 'react';

function DefaultPicture({url}){
    console.log(url)
    return(
        <>
            <img className="petition-form__default-picture" src={url} alt={'картинка'}/>
        </>
    )
}

export default DefaultPicture