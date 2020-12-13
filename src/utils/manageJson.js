import {db} from './firebase'
import all_django from '../data/all_django.json'

function manageJson () {
    all_django.forEach( (title, i) => {
        if (title.fields.author && title.fields.name && title.fields.text) {
            console.log(i)
            db.collection("poems").doc(i.toString()).set({
                author: title.fields.author,
                name: title.fields.name,
                text: title.fields.text
            }).then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }
    })
}
export default manageJson
