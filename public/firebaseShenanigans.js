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
    .then(spinner.parentNode.removeChild(spinner))
    ;


async function getMyShit() {
    console.log('%cRetrieving data...', 'color:limegreen;');

    const getAlus = await getDocs(query(collection(db, "aluminios")))
        .then((response) => {
            cachulo.aluminios = Array.from(response.docs, (serieElement) => {
                const serie = {
                    id: serieElement.id
                }
                return serie;
            });
        })
        .then(() => {
            cachulo.aluminios.forEach((aluminioElement) => {
                getDocs(query(collection(db, "aluminios/" + aluminioElement.id + '/perfis')))
                .then((response2) => {
                    Object.defineProperties(aluminioElement, {
                        id: { value: aluminioElement.id },
                        referencias: { value:  Array.from(response2.docs, (elementRef) => {
                            const ref = {
                                id: elementRef.id,
                                preco: elementRef._document.data.value.mapValue.fields.preco.doubleValue
                            }
                            return ref;
                        })}
                    })
                })
            })
            return cachulo.aluminios;
        })
        .then(console.log); // output cachulo.aluminios


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
        .then(console.log); // output cachulo.vidros


};