import React from 'react';
import cn from 'classnames';

const PoemLine = ({line, isAnimationIn, isAnimationOut}) => {
    return <p className={cn("petition-form__poem-line",
        {"petition-form__poem-line_animation": isAnimationIn},
        {"petition-form__poem-line_animation-out": isAnimationOut}
        )}>
        {line}
    </p>
}
export default PoemLine