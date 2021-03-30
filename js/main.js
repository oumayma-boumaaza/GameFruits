// il va creer le plateau du jeu
// generer les nombres aleatoire doublons
// commencer le timer
let divTimer=document.getElementById("divTimer")
let timerStartCount=0;
let timer1;
let timer2;
let timer;
let countState;// 0: pas de click. 1: premier click
let tdNbr1,tdNbr2;
let loserMessage="<h>GAME OVER</h1>";
let winnerMessage="congratulations";
let find;
let pears;
 let message= document.querySelector(".message");
function create()
{ 
    if (timer1 != null) {
        clearInterval(timer1);
    }
    if (timer2 != null) {
        clearInterval(timer2);
    }
      find = 0;
    message.innerHTML = "";
    message.setAttribute("class","message");
    document.getElementById("spinner").setAttribute("class","spinner-border show");
    let colonne=document.getElementById("colonne").value;
    let ligne=document.getElementById("ligne").value;
    timer=document.getElementById("timer").value;
    let totalNbr=colonne*ligne;
    let tbody=document.getElementById("plateau");
    tbody.innerHTML="";
    pears = totalNbr/2;
    if(totalNbr%2!=0)
    {
        alert("la somme doit etre pair");
        document.getElementById("spinner").setAttribute("class","spinner-border hide");
        return;
    }
    // creation du tableau
    for(let i=0;i<ligne;i++)
    {
        let tr=document.createElement("tr");
        for(let j=0;j<colonne;j++)
        {
            let td=document.createElement("td");
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    // generation des nombres dans des cases aleatoires
    for(let i=1;i<=totalNbr/2;i++)
    {
        let randonLigne;
        let randonColonne;
        do{
        randonLigne=parseInt(Math.random()*1000%ligne)
        randonColonne=parseInt(Math.random()*1000%colonne)
        }while(tbody.children[randonLigne].children[randonColonne].innerHTML!="");
        tbody.children[randonLigne].children[randonColonne].innerHTML="<img src='./img/"+i+".png'>";
        
        let randonLigne2;
        let randonColonne2;
        do{
        randonLigne2=parseInt(Math.random()*1000%ligne)
        randonColonne2=parseInt(Math.random()*1000%colonne)
        }while(tbody.children[randonLigne2].children[randonColonne2].innerHTML!="");
        tbody.children[randonLigne2].children[randonColonne2].innerHTML="<img src='./img/"+i+".png'>";
    }
   
    let tds=document.getElementsByTagName("td");
    for(let i=0;i<tds.length;i++)
    tds[i].firstChild.setAttribute("class","tdShow")

    document.getElementById("spinner").setAttribute("class","spinner-border hide");
    timerStartCount=10;
    timer1=setInterval(timerStart,500);
}
let timerCount;
// avant le debut
function timerStart(){
    divTimer.innerHTML=timerStartCount;
    timerStartCount--;
    if(timerStartCount==-1)
    {
    initialiserGame();
    }
}
// au cours du jeu
function timerGame(){
    divTimer.innerHTML=timerStartCount;
    timerStartCount--;
    if(timerStartCount==-1)
    {
       lose(timer2);
    }
}

function initialiserGame()
{
    clearInterval(timer1);
    timerStartCount=timer;
    timer2=setInterval(timerGame,1000);
    let tds=document.getElementsByTagName("td");
    countState=0;
    for(let i=0;i<tds.length;i++)
    {
    tds[i].firstChild.setAttribute("class","tdHide")
    tds[i].firstChild.addEventListener('click', function (event) {
        let td=event.target.parentNode;
        // recuperer la td destination
        if(countState==0)
        {
            td.firstChild.setAttribute("class","tdShow")
            countState=1;
            tdNbr1=td;
        }
        else{
            td.firstChild.setAttribute("class","tdShow")
            countState=0;
            tdNbr2=td;
            setTimeout(tester,1000);
        }
      
    });
    }
}

function tester()
{
    if(tdNbr1.firstChild.getAttribute("src") ==tdNbr2.firstChild.getAttribute("src"))
    {
        tdNbr1.classList.add("trouve")
        tdNbr2.classList.add("trouve")
        find++;
        if(find == pears){
            win(timer2);
        }
    }
    else
    {
        tdNbr1.firstChild.setAttribute("class","tdHide")
        tdNbr2.firstChild.setAttribute("class","tdHide")
    }
}
function lose() {
    clearInterval(timer2);
    message.innerHTML= loserMessage;
    message.classList.add("loser");
    tbody.innerHTML ="";
}

function win(){
    clearInterval(timer2);
    message.innerHTML=winnerMessage;
    message.classList.add("winner");
}