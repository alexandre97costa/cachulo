import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, query, collection, doc, getDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
const firebaseConfig = {
    apiKey: "AIzaSyD9vWZAcnUBuz0PcIkxwYfS8-5aPfugCVY",
    authDomain: "cachulo.firebaseapp.com",
    projectId: "cachulo",
    storageBucket: "cachulo.appspot.com",
    messagingSenderId: "83110940074",
    appId: "1:83110940074:web:3158a87c7d6d7a23716fd3"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();


// var dateInput = document.getElementById('date-input');
// var today = new Date();
// dateInput.value = today.toISOString().substr(0, 10);



var spinner = document.getElementById('spinner');
window.onload = getMyShit()
    .then(console.table(cachulo))
    .then(addJanela2)
    .then(spinner.parentNode.removeChild(spinner));


async function getMyShit() {
    console.log('%cRetrieving data...', 'color:limegreen;');

    const getAlu_Series = await getDocs(query(collection(db, "aluminios")));

    getAlu_Series.forEach(async (serie) => {

        //* Code explanation
        // getDocs() returns a promise resolved, in the form of a querySnapshot (https://firebase.google.com/docs/reference/js/firestore_#getdocs)
        // querySnapshots have a 'docs' array, which can then be iterated with a forEach (https://firebase.google.com/docs/reference/node/firebase.firestore.QuerySnapshot#docs)
        // the elements on this array have an id (element.id) which we want to copy into our database object (cachulo)
        //! We DO NOT want to: 
        // - Declare an array outside of a loop
        // - Use push(), as it is a mutating function
        //? We DO want to:
        // - declare and directly assign 'cachulo.aluminios[serie.id]'
        // - use an immutable function, like Array.map() or Array.from(), to copy the values

        const getAlu_Refs = await getDocs(query(collection(db, "aluminios/" + serie.id + '/perfis')))
        .then((response) => {
            cachulo.aluminios[serie.id] = Array.from(response.docs, (element) => {return element.id});
        })
        

        //* This is our initial attempt, that used Imperative Programming
        //* Let it rest in a comment block, as it is a sign of progress!

        // cachulo.aluminios[serie.id] = [];
        // getAlu_Refs.forEach((ref) => {
        //         cachulo.aluminios[serie.id].push(ref.id);
        //     })
            
        });
}