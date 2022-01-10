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
    .then(addJanela2)
    .then(spinner.parentNode.removeChild(spinner))
    ;


async function getMyShit() {
    console.log('%cRetrieving data...', 'color:limegreen;');

    const getAlus2 = await getDocs(query(collection(db, "aluminios")));
    if (getAlus2.empty) throw Error('[BRUH] Error in requesting aluminios');

    const myAluDocs = Array.from(await getAlus2.docs, doc => { return doc.id; });

    myAluDocs.forEach(async doc => {
        const getThisDocRefs = await getDocs(query(collection(db, "aluminios/" + doc + "/perfis")))
        if (getThisDocRefs.empty) throw Error('[BRUH] Error in requesting refs');

        const aluminioObject = {
            id: doc,
            referencias: Array.from(await getThisDocRefs.docs, (referencia) => {
                const ref = {
                    id: referencia.id,
                    preco: referencia._document.data.value.mapValue.fields.preco.doubleValue
                }
                return ref;
            })
        }
        cachulo.aluminios.push(aluminioObject); // unfortunate push() but oh well

        if (cachulo.aluminios.length == myAluDocs.length) {
            console.table(cachulo.aluminios);
        }
    })

    const getVidros = await getDocs(query(collection(db, "vidros")))
        .then((response) => {
            cachulo.vidros = Array.from(response.docs, (element) => {
                const vidro = {
                    id: element.id,
                    preco: element._document.data.value.mapValue.fields.preco.doubleValue
                }
                return vidro;
            });
            return cachulo.vidros;
        })
        .then(console.table); // output cachulo.vidros


};