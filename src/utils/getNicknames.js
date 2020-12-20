import {nicknameNames,nicknameSurname} from '../data/data'


function getNicknames() {
    function getRandom(array) {
        const counter = array.length;
        const index = Math.floor(Math.random() * counter);
        return array[index];
    }

const randomName=getRandom(nicknameNames);
    const randomSurname1=getRandom(nicknameSurname);
    const randomSurname2=getRandom(nicknameSurname);
    return randomName+' '+randomSurname1+'-'+randomSurname2;
}

export default getNicknames
