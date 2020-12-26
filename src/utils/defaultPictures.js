const defaultPicturesSet = ['template202012261149.jpg', 'template202012261150.jpg', 'template202012261151.jpg', 'template202012261152.jpg',
    'template202012261153.jpg', 'template202012261154.jpg', 'template202012261155.jpg', 'template202012261156.jpeg', 'template202012261157.png',
    'template202012261158.jpg', 'template202012261159.jpeg', 'template202012261160.jpg', 'template202012261161.jpg', 'template202012261162.jpeg',
    'template202012261163.jpg', 'template202012261164.jpeg', 'template202012261165.jpg', 'template202012261166.jpg']

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
