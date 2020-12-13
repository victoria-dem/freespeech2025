import {db} from './firebase'
// import all_django from '../data/all_django.json'  /*  uncomment if needed to load json into firebase */

function manageJson () {
    const punctuation = /[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~]/g;
    const newLineSymbol = /\r?\n|\r-/g;
    all_django.forEach((title, i) => {
        if (title.fields.author && title.fields.name && title.fields.text) {
            let tagNameArray =  title.fields.name.replace(punctuation,'').toLowerCase().split(' ');
            let tagTextArray = title.fields.text.replace(newLineSymbol,' ').replace(punctuation,'').toLowerCase().split(' ');
            let shortWordRemovedNameArray = tagNameArray.filter(word => word.length > 3);
            let shortWordRemovedTextArray = tagTextArray.filter(word => word.length > 3);
            console.log(i)
            db.collection("poems").doc(i.toString()).set({
                author: title.fields.author,
                name: title.fields.name,
                text: title.fields.text,
                tagName: shortWordRemovedNameArray,
                tagText: shortWordRemovedTextArray,
                arrayText: title.fields.text.split('\n')
            }).then(function () {
                console.log("Document successfully written!");
            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }
    })
}

export default manageJson
