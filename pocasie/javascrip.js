const buttonConfirm = document.getElementById('pressButtton');

//metoda pre zistenie polohy
buttonConfirm.addEventListener('click', function(){
    let mesto = document.getElementById("cityName").value;
    let skratka = document.getElementById("shortcutState").value;
    console.log(mesto + " " + skratka);
    //https://api.opencagedata.com/geocode/v1/json?key=c9387aeabfed4d55a4f8674471e1db60&q=Kosice+Slovakia&pretty=1
    //let link = "https://api.opencagedata.com/geocode/v1/json?q="+mesto+"+Slovakia&key=c9387aeabfed4d55a4f8674471e1db60"
    let link = "https://api.opencagedata.com/geocode/v1/json?key=c9387aeabfed4d55a4f8674471e1db60&q="+mesto+"+"+skratka+"&pretty=1";
    fetch(link)
    .then( resp => {
        if( !resp.ok ){//ine ako 200
            return (resp.statusText + " " + resp.status)
        } else {                
            return resp.json()                
        }  
     })

    .then(json => {
        
        let zemSuradnica1 = "";
        let zemSuradnica2 = "";
        zemSuradnica1 = json.results[0].annotations.DMS.lat;
        zemSuradnica2 = json.results[0].annotations.DMS.lng;
        
        let suradnica1 = "";
        let suradnica2 = "";
        if(zemSuradnica1.charAt(1)==='°'){
            suradnica1 = zemSuradnica1.charAt(0);
        }else{
            suradnica1 = zemSuradnica1.charAt(0) + zemSuradnica1.charAt(1);
        }
        if(zemSuradnica2.charAt(1)==='°'){
            suradnica2 = zemSuradnica2.charAt(0);
        }else{
            suradnica2 = zemSuradnica2.charAt(0) + zemSuradnica2.charAt(1);
        }
        console.log(suradnica1 + " " + suradnica2);
        zistiPocasie(suradnica1,suradnica2)
     })
    
    .catch(error => {
        console.log(error)
     });

});


//metoda na zistenie pocasia a vykreslenie
function zistiPocasie(zemSuradnica1, zemSuradnica2){

    //moj API KEY
    const apiKey = '21807aa9dae18dfe9a7b2c26baec1168';
    
    console.log(zemSuradnica1 + " " + zemSuradnica2)
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+zemSuradnica1+'&lon='+zemSuradnica2+'&appid='+apiKey+'&units=metric')
    .then( resp => {
        if( !resp.ok ){//ine ako 200
            return (resp.statusText + " " + resp.status)
        } else {                
            return resp.json()                
        }  
     })
     //z json z pola daily na 2 pozicii vyberame z pola weather na prvej pozicii main
    .then(json => {
         console.log(JSON.stringify(json.daily[1].weather[0].main))
         let i =JSON.stringify(json.daily[1].weather[0].main);
         console.log(i);
         
         if(i === "\"Rain\""){
            document.getElementById('label').innerHTML = i;
            document.getElementById('myImageID').src="picture/rain.jpg";
         }else if(i === "\"Clouds\""){
            document.getElementById('label').innerHTML = i;
            document.getElementById('myImageID').src="picture/cloud.jpg";
         }else{
            document.getElementById('label').innerHTML = i;
            document.getElementById('myImageID').src="picture/other.jpg";
         }
    })
    
    
    .catch(error => {
        console.log(error)
     });
    
    }
    