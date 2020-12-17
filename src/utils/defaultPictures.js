const defaultPicturesSet = ['11.jpeg', '22.jpeg', '33.jpeg', '44.jpeg', '55.jpeg']

function getDefaultPictures() {
    let counter = defaultPicturesSet.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = defaultPicturesSet[counter];
        defaultPicturesSet[counter] = defaultPicturesSet[index];
        defaultPicturesSet[index] = temp;
    }
    return defaultPicturesSet;
}

export default getDefaultPictures