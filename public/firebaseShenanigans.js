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
var aluminios_series = [];

console.log('hello');
var dateInput = document.getElementById('date-input');
var today = new Date();
dateInput.value = today.toISOString().substr(0, 10);
console.log('world');

window.onload = async function () {
    console.log('%cRetrieving data...', 'color:limegreen;');

    const qAlu = query(collection(db, "aluminios"));
    const querySnapshot = await getDocs(qAlu);
    querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id);
        const qAluSerie = query(collection(db, "aluminios/"+doc.id+'/perfis'));
        const querySnapshotTwo = await getDocs(qAluSerie);
        querySnapshotTwo.forEach((serie) => {
            console.log(doc.id + ' / ' + serie.id);
        })
        console.log('\n');

        aluminios_series.push(doc.id);
    });
    console.log(aluminios_series);

    var pickRef = document.getElementById('pickRef');
    for (let i = 0; i < aluminios_series.length; i++) {
        let option = document.createElement('option');
        option.value = aluminios_series[i];
        option.innerText = aluminios_series[i];
        pickRef.appendChild(option);
    }
    console.log('%cData retrieved!', 'color:limegreen;');

    
}