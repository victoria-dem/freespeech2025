import React from 'react';
import cn from 'classnames';

const PoemLine = ({line, isAnimationIn}) => {
    return <p className={cn("petition-form__poem-line",
        {"petition-form__poem-line_animation": isAnimationIn},
        )}>
        {line}
    </p>
}
export default PoemLine