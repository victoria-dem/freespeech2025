import {db} from './firebase'
// import all_django from '../data/all_django.json'  /*  uncomment if needed to load authors into firebase */


function loadAuthorData() {
    const rowAuthorData = [];
    all_django.forEach((title, i) => {
        rowAuthorData.push(title.fields.author)
    })
    const uniqAuthorData=[...new Set(rowAuthorData)]
    uniqAuthorData.forEach((title, i) => {
            console.log(i)
            db.collection("authors").doc(i.toString()).set({
                author: title
            }).then(function () {
                console.log("Document successfully written!");
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
    });
}

export default loadAuthorData
