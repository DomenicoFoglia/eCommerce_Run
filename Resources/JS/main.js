let navbar = document.querySelector('#navbar');


// window.addEventListener('scroll',()=>{
//     if(window.scrollY > 100){
//         navbar.classList.add('bg-t');
//     }else{
//         navbar.classList.remove('bg-t');
//     }
    
// });

window.addEventListener('scroll', ()=>{
    if (window.scrollY > 200) { // Controlla la posizione dello scroll
        navbar.classList.add('nav-scrolled'); 
    } else {
        navbar.classList.remove('nav-scrolled'); 
    }
});






// CHIAMATE ASINCRONE
let usersNumbers=document.querySelector('#usersNumbers');
let productsNumbers=document.querySelector('#productsNumbers');
let reviewsNumbers=document.querySelector('#reviewsNumbers');

if(usersNumbers){
    function contatoreAnimato(elemento, target, intervallo){
        let cont = 0;
        let intervalloCont = setInterval(()=>{
            if(cont < target){
                cont++;
                elemento.innerHTML = `${cont}`;
            }else{
                clearInterval(intervalloCont);
            }
        },intervallo)
    }
    contatoreAnimato(usersNumbers,1000,10);
    contatoreAnimato(productsNumbers,30,300);
    contatoreAnimato(reviewsNumbers,170,50);
}

// //! Dark mode
// Al click del bottone
let btnDark = document.querySelector('#btnDark');

let isClicked = true;

btnDark.addEventListener('click',()=>{
    if(isClicked){
        document.documentElement.style.setProperty('--color-p', '#2e2d2d');
        document.documentElement.style.setProperty('--color-s', 'rgb(254, 185, 20)');

        // impostiamo una coppia chiave-valore all'interno del loca storage
        localStorage.setItem('mode','dark');

        console.log('dark-mode'); 
        isClicked = false;
    }else{
        document.documentElement.style.setProperty('--color-s', '#2e2d2d');
        document.documentElement.style.setProperty('--color-p', 'rgb(254, 185, 20)');
        console.log('light mode');

        // impostiamo una coppia chiave-valore all'interno del loca storage
        localStorage.setItem('mode','light');
        isClicked = true;
        
    }
})
// fine click bottone

//Settaggio base

//leggiamo il contenuto in una chiave del local storage
let mode = localStorage.getItem("mode");

if(mode == 'dark'){
    document.documentElement.style.setProperty('--color-p', '#2e2d2d');
    document.documentElement.style.setProperty('--color-s', 'rgb(254, 185, 20)');
    isClicked = false;
}else{
    document.documentElement.style.setProperty('--color-s', '#2e2d2d');
    document.documentElement.style.setProperty('--color-p', 'rgb(254, 185, 20)');
        
    isClicked = true;
}
