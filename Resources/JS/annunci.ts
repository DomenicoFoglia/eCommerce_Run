//! JSON - JavaSCript Object Notation
//* estensione che viene utilizzata per la trasmissione di dati in modo rapido

//* prende tutto l'array di oggetti, lo trasforma in una stringa, quindi lo trasmette piu' rapidamente. Quando tutto cio' e' avvenuto lo rielabora sotto forma di oggetto

// chiamata asincrona

//!STEP 1: fetch() -> chiamata asincrona, che chiede dei dati ad un json attraverso una REQUEST. Il json risponde restituendo una PROMISE -> la trasmissione dei dati sotto forma di stringa (tipo di dato primitivo piu' facile da trasmettere).
//* La built-in function fetch() vuole un parametro, ossia il percorso dal quale andare a prendedre i dati.

//! STEP 2: .then() -> prende la PROMISE e la trasmette in una RESPONSE-> la trasformazione della promise (dati sotto forma di stringa) in un oggetto che puo' essere manipolato.
//* il metodo then si aspetta un parametro che sara' una call back ( ()=> ), dentro questa call back sfrutteremo il metodo .json() che si occupa esattamente di convertire quella stringa in oggetto.

//!STEP 3: .then() -> attraverso una call back, di prendere come paramentro l'oggetto ricavato e manipolato


fetch('annunci2.json')//STEP 1 chiediamo i dati al json (request)
.then( (response)=> response.json()  )//STEP 2 trasformiamo la stringa in oggetto col metodo .json() (PROMISE trasformata in RESPONSE)
.then((data)=>{//STEP 3 manipoliamo i dati ricavati
    console.log(data);

    // cattura
    let radioWrapper = document.querySelector('#radioWrapper') as HTMLElement;
    let cardsWrapper = document.querySelector('#cardsWrapper') as HTMLElement;
    let numberPrice = document.querySelector('#numberPrice') as HTMLElement;
    let inputRange = document.querySelector('#inputRange') as HTMLInputElement;
    let wordInput = document.querySelector('#wordInput') as HTMLInputElement;
    let radioBrand = document.querySelector('#radioBrand') as HTMLInputElement;
    let btnReset = document.querySelector('#btnReset') as HTMLInputElement;


    //evento per lanciare la filter by price
    inputRange.addEventListener('input', ()=>{
        // filterByPrice(inputRange.value);
        // numberPrice.innerHTML = `${inputRange.value}`;
        globalFilter();
        numberPrice.innerHTML = `${inputRange.value}`
    })


    //evento per lanciare filter by word
    wordInput.addEventListener('input',()=>{
        setTimeout(()=>{ //funzione asincrona che ritardfa di un secondo la ricerca
            // filterByWord(wordInput.value)
            globalFilter();
        },1000);  
    })
    

    //estrapolare le categorie uniche
    function setCategory(){
        let uniqueCategories= [];

        data.forEach(annuncio => {
            if(!uniqueCategories.includes(annuncio.category)){
                uniqueCategories.push(annuncio.category);
            }
        });
    

    // creare dinamicamente i radio button per ognuna delle categorie trovate
        uniqueCategories.forEach( (category)=>{
            // crea un elemento
            let div = document.createElement('div');
            // dare delle classi
            div.classList.add('form-check');
            // riempi con i radio button
            div.innerHTML=`
                <input class="form-check-input" type="radio" name="categories" id="${category}">
                <label class="form-check-label" for="${category}">
                ${category}
                </label>
            `;
            // appendi al wrapper
            radioWrapper.appendChild(div);
        })
    }

    

    //estrapolo i Brand unici
    function setBrand(){
        let uniqueBrand = [];

        data.forEach((annuncio) => {
            if(!uniqueBrand.includes(annuncio.brand)){
                uniqueBrand.push(annuncio.brand);
            }
        });
    
    
    //creo dinamicamente i radio button per ognuna delle marche trovate
        uniqueBrand.forEach((marca) =>{
            let div = document.createElement('div');

            div.classList.add('form-check');

            div.innerHTML = `
                <input class="form-check-input" type="radio" name="brands" id="${marca}">
                <label class="form-check-label" for="${marca}">${marca}</label>
            `;

            radioBrand.appendChild(div);
        })
    }


    
    //creare card dinamicamente
    function createCards(array){
        //svuoto il wrapper
        cardsWrapper.innerHTML=``;
        // console.log(array);
        
        //ciclare sull'array principale 
        array.forEach((annuncio)=> {
            //per ogni singolo annuncio crea la card
            // crea un elemento
            let div = document.createElement('div');
            //dargli delle classi
            div.classList.add('col-6','col-md-3','p-3');
            // animazione
            div.setAttribute('data-aos', 'fade-right');
            //riempiamo con le card
            div.innerHTML=`
                <div class="card" style="width: 100%;">
                    <img src="media/card-image2.jpg" class="card-img-top" alt="...">
                    <div class="card-body bg-t">
                        <h5 class="card-title">${annuncio.product_name}</h5>
                        <p class="card-text">${annuncio.brand}</p>
                        <p class="card-text">${annuncio.category}</p>
                        <p class="card-text">${annuncio.price} €</p>
                        <a href="#" class="btn btnCustom ">Guarda</a>
                    </div>
                </div>
            `;
            //appendo al wrapper
            cardsWrapper.appendChild(div);
        })
        
    }

    setCategory();
    setBrand();
    createCards(data);

     //evento per lanciare la filterByCategory
    //catturo tutti i radio buttons
    let radioCategories = document.querySelectorAll('input[name="categories"]'); //si puo' fare anceh tramite una classe comune come form-check-input
    radioCategories.forEach( (radioButton)=> { 
        radioButton.addEventListener('click',()=>{
            // let category = radioButton.id;
            // filterByCategory(category);
            globalFilter();
        })
    });

    //! FILTER BY CATEGORY

    function filterByCategory(array){
        //in radiocategories abbiamo le nodelist che abbiamo catturato col queryselectorAll. Sono dei nodelist e li trasformiamo in array
        //genero quindi un array a partire dalla nodelist di radio buttons
        let arrayFromNodelist = Array.from(document.querySelectorAll('input[name="categories"]')) as HTMLInputElement[];
        // console.log(arrayFromNodelist);
        

        //troviamo il radiobutton a cui viene associato l'atrtibuto checked
        let checkedCategory = arrayFromNodelist.find(radioButton => radioButton.checked);
        // Verifica se checkedCategory è definito prima di accedere alla proprietà 'id'
        if (!checkedCategory) {
            // Se non è selezionato alcun radio button, ritorna l'array originale
            return array;
        }
        // di quel radiobutton strapolo l'id che conterra' il nome della categoria
        let category = checkedCategory.id;

        //* questo sotto era come era prima
        // let filtered = data.filter( (annuncio)=> annuncio.category == categoria);
        // if(categoria == "All"){
        //     createCards(data);
        // }else{
        //     createCards(filtered)
        // }

        if(category == "All"){
            return array;
        }else{
            let filtered = array.filter(annuncio => annuncio.category == category);
            return filtered;
        }
        
    }

      //!FILTER BY PRICE

    //imposta il range del filtro del prezzo
    function setInputPrice(){
        //estraggo tutti i prezzi degli annunci
        let prices = data.map((annuncio)=> +annuncio.price);

        //trovo il massimo e il minimo
        let maxPrice = Math.max(...prices);
        // let minPrice = Math.min(...prices);

        //assegnato il massimo all'input e al paragrafo
        inputRange.max = maxPrice.toString();
        inputRange.value = maxPrice.toString();
        numberPrice.innerText = `${maxPrice} €`;
    }
    setInputPrice();

    function filterByPrice(array){
        let filtered = array.filter((annuncio) => +annuncio.price <= +inputRange.value);
        // createCards(filtered);
        return filtered;

    }


    //!FILTER BY WORD
    function filterByWord(array){
        // Verifica che array sia un array prima di tentare di usarne il metodo filter
        if (!Array.isArray(array)) {
            console.error('L\'argomento non è un array', array);
            return [];
        }
        if(!wordInput.value.trim().toLowerCase()){
            return array;
        }
        let filtered = array.filter((annuncio)=> annuncio.product_name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    }


    //!FILTER BY BRAND
    function filterByBrand(array){
        let arrayFromNodelist = Array.from(document.querySelectorAll('input[name="brands"]')) as HTMLInputElement[];
        let checkedBrand = arrayFromNodelist.find((radioButton) => radioButton.checked);
        let brand = checkedBrand ? checkedBrand.id : "All";

        if(brand === "All"){
            return array;
        }else{
            let filtered = array.filter((annuncio) => annuncio.brand === brand);
            return filtered;
        }
        // let filtered = data.filter((marcaBrand)=> marcaBrand.brand == marca);
        //     if(marca == 'All'){
        //         createCards(data);
        //     }else{
        //         createCards(filtered);
        //     }
    }

    //! GLOBAL FILTER
    function globalFilter(){
        console.log("Esecuzione filtro globale...");
        let resultFilterByCategory = filterByCategory(data);
        // console.log("Filtrati per categoria:", resultFilterByCategory);
        let resultFilterByPrice = filterByPrice(resultFilterByCategory);
        // console.log("Filtrati per prezzo:", resultFilterByPrice);
        let resultFilterByWord = filterByWord(resultFilterByPrice);
        // console.log("Filtrati per parola:", resultFilterByWord);
        let resultFilterByBrand = filterByBrand(resultFilterByWord);
        // console.log("Filtrati per brand:", resultFilterByBrand);
        createCards(resultFilterByBrand)
    }


    //evento per lanciare filter by brand

    let radioMarche = document.querySelectorAll('input[name="brands"]');
        radioMarche.forEach((radioButton) => {
            radioButton.addEventListener('click', () => {
            // let marca = radioButton.id; // Ogni radioButton ha un id uguale al nome del brand
            // filterByBrand(marca); // Filtro per il brand selezionato
            globalFilter();
        });
    });

    //bottone reset

    btnReset.addEventListener('click', ()=> {
    (radioCategories[0] as HTMLInputElement).checked = true;

    let radioBrands = document.querySelectorAll('input[name="brands"]') as NodeListOf<HTMLInputElement>;
    radioBrands[0].checked = true;

    setInputPrice();
    wordInput.value = ``;
    globalFilter();
});

});


