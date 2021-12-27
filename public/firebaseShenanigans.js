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
    .then(console.log(cachulo))
    .then(addJanela2)
    .then(spinner.parentNode.removeChild(spinner));


async function getMyShit() {
    console.log('%cRetrieving data...', 'color:limegreen;');

    const query_Aluminio_Series = query(collection(db, "aluminios"));
    const getAlu_Series = await getDocs(query_Aluminio_Series);

    getAlu_Series.forEach(async (serie) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(serie.id);
        const query_Aluminio_Series_Ref = query(collection(db, "aluminios/" + serie.id + '/perfis'));
        const getAlu_Refs = await getDocs(query_Aluminio_Series_Ref);
        cachulo.aluminios[serie.id] = [];
        getAlu_Refs.forEach((ref) => {
            cachulo.aluminios[serie.id].push(ref.id);
            console.log(serie.id + ' / ' + ref.id);
        })

    });

}