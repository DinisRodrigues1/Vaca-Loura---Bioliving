/* Variáveis globais */
var info, skipu, background;
var txt1, txt2;
var character, velocidade = 8;
var characterlarg = 105 + "px", characteralt = 55 + "px";
var macaalt = 58 + "px", macalarg = 50 + "px";
var peraalt = 50 + "px", peralarg = 40 + "px";
var tiroalt = 6 + "px", tirolarg = 12 + "px";
var bossalt = 65 + "px", bosslarg = 145 + "px";
var passaroalt = 98 + "px", passarolarg = 150 + "px";
var contatempo = 0, limitenivel = 1385;
var limittop = 0, limitbottom = 611;
var randomaltura, randomlargura, randomlarg2;
var enemystart, hpvalue = 3;
var lastlevel, pressed;
var boss, female, bossattacking;
var verticalspeed = -6;
var contasalto = 0;
var maxsalto = 13;
var jumping = false, estadotirochar = false;
var tirochar;
var tiroboss;
var hpboss = 100;
tiroposition = 0;
var somFundo1 = new Audio ("audio/8bit_theme2.wav");
var somComer1= new Audio("audio/escaravelho_comer.wav");
var somFundo2 = new Audio("audio/bossfight_2.wav");
var somAtaque= new Audio("audio/ataque_1.wav");
var somLose = new Audio("audio/loser.mp3");
var somWin = new Audio("audio/win_win.wav");
var somDano = new Audio ("audio/damage_bossfight.ogg");
var contador = 0;



//Onload com função carregaElementos
window.onload = function () {
    CarregaElementos();
};
function CarregaElementos(){
character = document.getElementById("character");
txt1 = document.getElementById("texto1_2");
txt2 = document.getElementById("texto2_2");
info = document.getElementById("infor");
skip = document.getElementById("setaskip");
health = document.getElementById("health");
points = document.getElementById("pointstwo");
background = document.getElementById("corpodois");
background.style.backgroundPositionX = 0;
background.style.backgroundColor = "#b9d2ff";
background.style.backgroundImage = "url(Imagens/nivel2.png)";
background.style.backgroundSize = "100%";
background.style.backgroundRepeat = "repeat-x";
info.style.display = "block";
character.style.display = "block";
maca1 = document.getElementById("maca1");
maca1.style.left = parseInt(window.innerWidth / 1.1) + "px";
maca1.style.top = 90 + "px";
maca2 = document.getElementById("maca2");
maca2.style.left = parseInt(window.innerWidth / 2.2) + "px";
maca2.style.top = 180 + "px";
pera1 = document.getElementById("pera1");
pera1.style.left = parseInt(window.innerWidth / 3.2) + "px";
pera1.style.top = 480 + "px";
pera2 = document.getElementById("pera2");
pera2.style.left = parseInt(window.innerWidth / 1.5) + "px";
pera2.style.top = 580 + "px";
bird1 = document.getElementById("predador1");
bird1.style.left = window.innerWidth - 100 + "px";
bird1.style.top = 50 + "px";
bird2 = document.getElementById("predador2");
bird2.style.left = window.innerWidth - 100 + "px";
bird2.style.top = 350 + "px";
bird3 = document.getElementById("predador3");
passaroalt = 98 + "px";
passarolarg = 150 + "px";
passaro2alt = 80 + "px";
passaro2larg = 100 + "px";
bird3.style.left = window.innerWidth - 100 + "px";
bird3.style.top = 550 + "px";
boss = document.getElementById("finalboss");
boss.style.top = 328 + "px";
boss.style.left = 450 + "px";
female = document.getElementById("femea");
female.style.top = 345 + "px";
female.style.left = 650 + "px";
tirochar = document.getElementById("ataque");
tirochar.style.left = parseInt(character.style.left) + 70 + "px";
tirochar.style.top = parseInt(character.style.top) + 23 + "px";
tirochar.style.display = "none";
tiroboss = document.getElementById("ataque1");
tiroboss.style.display = "none";
vida1 = document.getElementById("vida1");
vida2 = document.getElementById("vida2");
vida1.style.top = 100 + "px";
vida1.style.left = 1200 + "px";
vida2.style.top = 30 + "px";
vida2.style.left = 1800 + "px";
tiroboss.style.left = parseInt(boss.style.left) + 30 + "px";
tiroboss.style.top = parseInt(boss.style.top) + 30 + "px";
getitem = localStorage.getItem("pontosfeitos");
skip.onclick = function () {nextext();};

}
function nextext(){
    txt1.innerHTML = "Utiliza as teclas de navegação UP e DOWN para apanhar comida e fugir aos predadores.";
    txt2.innerHTML = "";
    points.style.display = "block";
    health.style.display = "block";
    points.style.zIndex = 4;
    document.getElementById("jogodois").firstElementChild.innerHTML = "Pontos: " + getitem;
    health.innerHTML = "<img id='health3' src='Imagens/vidat2.png'/>";
    hpimg = document.getElementById("health3");
    health.style.zIndex = 5;
    character.style.left = 120 + "px";
    character.style.top = 280 + "px";
    maca1.style.visibility = "visible";
    maca2.style.visibility = "visible";
    pera1.style.visibility = "visible";
    pera2.style.visibility = "visible";


    skip.onclick = function(){segundonivelstart();};
}
function segundonivelstart(){
    somFundo1.play();
    info.style.display = "none";
    skip.style.display = "none";
    backgroundanimation = setInterval("backgroundmove()",80);
    enemystart = setInterval("movepredadores()",100);

    

    window.onkeydown = function(event){
        teclaspremidas(event);
    };

    

}
function movepredadores() {
    //movimentação predadores
    bird1.style.left = parseInt(bird1.style.left) - velocidade * 4 + "px";
    bird1.style.display = "block";
    bird2.style.left = parseInt(bird2.style.left) - velocidade * 7 + "px";
    bird2.style.display = "block";
    bird3.style.left = parseInt(bird3.style.left) - velocidade * 10 + "px";
    bird3.style.display = "block";
    predadorreturn1 = Math.floor((Math.random() * 180) + 40);
    predadorreturn2 = Math.floor((Math.random() * 300) + 180);
    predadorreturn3 = Math.floor((Math.random() * 400) + 300);
    if (parseInt(bird1.style.left) <= -150) {
        bird1.style.left = window.innerWidth + 450 + "px";
        bird1.style.top = predadorreturn1 + "px";

    }
    if (parseInt(bird2.style.left) <= -150) {
        bird2.style.left = window.innerWidth + 1450 + "px";
        bird2.style.top = predadorreturn2 + "px";

    }
    if (parseInt(bird3.style.left) <= -150) {
        bird3.style.left = window.innerWidth + 1750 + "px";
        bird3.style.top = predadorreturn2 + "px";

    }
    //deteção de colisão entre jogador e predador 1
    colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(bird1.style.top), parseInt(bird1.style.left), passaroalt, passarolarg);
    //deteção de colisão entre jogador e predador 2
    colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(bird2.style.top), parseInt(bird2.style.left), passaroalt, passarolarg);
    //deteção de colisão entre jogador e predador 3
    colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(bird3.style.top), parseInt(bird3.style.left), characteralt, characterlarg);
    //colisao
    
    if (colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(bird1.style.top), parseInt(bird1.style.left), passaroalt, passarolarg) == true){
        hpvalue--; //condição para javascript
        somDano.play();
        bird1.style.left = window.innerWidth + 450 + "px";
        bird1.style.top = predadorreturn1 + "px";
        if (hpvalue == 2){
            hpimg.src = "Imagens/vidat3.png";
        }
        if (hpvalue == 1){
            hpimg.src = "Imagens/vidat4.png";
        }
        if (hpvalue == 0){
            hpimg.src = "Imagens/vidat5.png";
            fimJogolose ();
            somLose.play();

        }

    }

    if (colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(bird2.style.top), parseInt(bird2.style.left), passaroalt, passarolarg) == true){
        hpvalue--;
        somDano.play();
        bird2.style.left = window.innerWidth + 1450 + "px";
        bird2.style.top = predadorreturn2 + "px";
        if (hpvalue == 2){
            hpimg.src = "Imagens/vidat3.png";
        }
        if (hpvalue == 1){
            hpimg.src = "Imagens/vidat4.png";
        }
        if (hpvalue == 0){
            hpimg.src = "Imagens/vidat5.png";
            fimJogolose ();
            somLose.play();
        }
    }

    if (colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(bird3.style.top), parseInt(bird3.style.left), passaroalt, passarolarg) == true){
        hpvalue--;
        somDano.play();
        bird3.style.left = window.innerWidth + 1750 + "px";
        bird3.style.top = predadorreturn2 + "px";
        if (hpvalue == 2){
            hpimg.src = "Imagens/vidat3.png";
        }
        if (hpvalue == 1){
            hpimg.src = "Imagens/vidat4.png";
        }
        if (hpvalue == 0){
            hpimg.src = "Imagens/vidat5.png";
            fimJogolose ();
            somLose.play();
            
        }

    }
}

function backgroundmove(){
    randomaltura = Math.floor((Math.random()*600)) + 40;
    randomlargura = (Math.random()*1.1) + 0.6;
   
    conta = parseInt(window.innerWidth / randomlargura);
    background.style.backgroundPositionX = parseInt(background.style.backgroundPositionX) - velocidade + "px";
    contatempo++;
    if (contatempo == 650){ 
        clearInterval(backgroundanimation);
        clearInterval(enemystart);
        maca1.style.display="none";
        maca2.style.display="none";
        pera1.style.display="none";
        pera2.style.display="none";
        bird1.style.display="none";
        bird2.style.display="none";
        bird3.style.display="none";
        charactermove = setInterval("startAnimation()", 120); 
    }
    //movimentação dinamica frutas
    maca1.style.left = parseInt(maca1.style.left) - velocidade + "px";
    maca2.style.left = parseInt(maca2.style.left) - velocidade + "px";
    pera1.style.left = parseInt(pera1.style.left) - velocidade + "px";
    pera2.style.left = parseInt(pera2.style.left) - velocidade + "px";
    

    //deteção de colisão com parametros de função entre jogador e frutas
    colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(maca1.style.top), parseInt(maca1.style.left), macaalt, macalarg);
    colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(maca2.style.top), parseInt(maca2.style.left), macaalt, macalarg);
    colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(pera1.style.top), parseInt(pera1.style.left), peraalt, peralarg);
    colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(pera2.style.top), parseInt(pera2.style.left), peraalt, peralarg);


    

    // colisão entre jogador e maçã 1
    if (colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(maca1.style.top), parseInt(maca1.style.left), macaalt, macalarg) == true){
        getitem++;
        somComer1.play();
        document.getElementById("jogodois").firstElementChild.innerHTML = "Pontos: " + getitem;

        while (conta <= 320){
            randomlargura = (Math.random()*1.1) + 0.6;
        }
        maca1.style.left = parseInt(conta) + "px";
        maca1.style.top = randomaltura + "px";
    }
    else if (parseInt(maca1.style.left) <= 0 ){
        maca1.style.left = parseInt(conta) + "px";
        maca1.style.top = randomaltura + "px";
        while (conta <= 320){
            randomlargura = (Math.random()*1.1) + 0.6;
        }
    }

    // colisão entre jogador e maçã 2
    if (colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(maca2.style.top), parseInt(maca2.style.left), macaalt, macalarg) == true){
        somComer1.play();
        getitem++;
        document.getElementById("jogodois").firstElementChild.innerHTML = "Pontos: " + getitem;
        maca2.style.top = randomaltura + "px";
        maca2.style.left = parseInt(conta) + "px";

        while (conta <= 320){
            randomlargura = (Math.random()*1.1) + 0.6;
        }
    }
    else if (parseInt(maca2.style.left) <= 0 ){
        maca2.style.left = parseInt(conta) + "px";
        maca2.style.top = randomaltura + "px";

        while (conta <= 320){
            randomlargura = (Math.random()*1.1) + 0.6;
        }
    }
    // colisão entre jogador e pera 1
    if (colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(pera1.style.top), parseInt(pera1.style.left), peraalt, peralarg) == true){
        getitem++;
        somComer1.play();
        document.getElementById("jogodois").firstElementChild.innerHTML = "Pontos: " + getitem;
        pera1.style.top = randomaltura + "px";
        pera1.style.left = parseInt(conta) + "px";
        while (conta <= 320){
            randomlargura = (Math.random()*1.1) + 0.6;
        }
    }
    else if (parseInt(pera1.style.left) <= 0){
        pera1.style.left = parseInt(conta) + "px";
        pera1.style.top = randomaltura + "px";

        while (conta <= 320){
            randomlargura = (Math.random()*1.1) + 0.6;
        }
    }
    // colisão entre jogador e pera 2
    if (colisao(parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg, parseInt(pera2.style.top), parseInt(pera2.style.left), peraalt, peralarg) == true){
        getitem++;
        somComer1.play();
        document.getElementById("jogodois").firstElementChild.innerHTML = "Pontos: " + getitem;
        pera2.style.top = randomaltura + "px";
        pera2.style.left = parseInt(conta) + "px";
        while (conta <= 320){
            randomlargura = (Math.random()*1.1) + 0.6;
        }

    }
    else if (parseInt(pera2.style.left) <= 0 ){
        pera2.style.left = parseInt(conta) + "px";
        pera2.style.top = randomaltura + "px";

        while (conta <= 320){
            randomlargura = (Math.random()*1.1) + 0.6;
        }
    }


}

function startAnimation(){
    window.onkeydown = function (){

    };
    character.style.left = parseInt(character.style.left) + velocidade + "px";
    if (parseInt(character.style.left) >= limitenivel){
        clearInterval(charactermove);
        character.style.display = "none";
        lastlevel = setInterval("ultimonivelanima()",100);
        somFundo1.pause();
        somFundo1.currentTime = 0;
    }




}
function ultimonivelanima(){
    if (parseInt(character.style.left) >= limitenivel){
        character.style.display = "block";
        character.style.left = -200 + "px";
        background.style.backgroundImage = "url(Imagens/nivel3.png)";
        background.style.backgroundSize = "100%";
        background.style.backgroundPositionX = 0;
        boss.style.display = "block";
        female.style.display = "block";
    }
    character.style.left = 92 + "px";
    character.style.top = 342 + "px";
    character.src = "Imagens/escaravelho_ground.png";
    info.style.display = "block";
    txt1.innerHTML = "Os machos têm pinças para lutar entre si na presença de fêmeas. Normalmente encontram-se nos ramos " +
        "altos das arvores e o macho vencedor é aquele que no final da luta se mantiver no tronco.";
    txt2.innerHTML = "Utiliza a barra de espaço para atacar e UP para saltar.";
    clearInterval(lastlevel);
    skip.style.display = "block";
    tiroboss.style.display = "block";
    tirochar.style.display = "block";
    skip.onclick = function(){bossfight();};

    

}

function bossfight() {
    info.style.display = "none";
    skip.style.display = "none";
    somFundo2.play();
    bosstimer = setInterval("tempoboss()", 1000/30);
    bossattacking = setInterval("bossshot()",1000/30);

    window.onkeydown = function (evt) {
        processaBossfight(evt);
    };
}
function tempoboss(){
    movertiro();


}
function bossshot(){
    bossattacks();
}

function processaBossfight (evt){
    pressed = evt.key;
    if (pressed == "ArrowUp" && jumping == false){
        jumpcharacter = setInterval("jumpplayer()",1000/30);
        jumping = true;
    }
    if (pressed == " " && estadotirochar == false){
        ativatiro();
        somAtaque.play();
    }

}
function jumpplayer(){

    character.style.top = parseInt(character.style.top) + verticalspeed + "px";
    contasalto++;

    if(contasalto == maxsalto){
        verticalspeed = -verticalspeed;
    }
    if(contasalto == 26){
        clearInterval(jumpcharacter);
        verticalspeed = -verticalspeed;
        contasalto = 0;
        jumping = false;

    }
}
function ativatiro(){
    if(estadotirochar == false){
        tirochar.style.left = parseInt(character.style.left) + 70 + "px";
        tirochar.style.top = parseInt(character.style.top) + 23 + "px";
        tirochar.style.display = "block";
        
    }
}
function bossattacks() {
    tiroposition += 0.07;
    tiroboss.style.left = parseInt(tiroboss.style.left) - tiroposition + "px";

    if (tiroposition >= 5.85) {
        tiroposition = 0;
        tiroboss.style.left = parseInt(boss.style.left) + 30 + "px";
        tiroboss.style.display = "block";
    }
    if (colisao(parseInt(tiroboss.style.top), parseInt(tiroboss.style.left), tiroalt, tirolarg, parseInt(character.style.top), parseInt(character.style.left), characteralt, characterlarg) == true) {
        hpvalue--;
        tiroboss.style.display = "none";
        if (hpvalue == 2){
            hpimg.src = "Imagens/vidat3.png";
        }
        if (hpvalue == 1){
            hpimg.src = "Imagens/vidat4.png";
        }
        if (hpvalue == 0){
            hpimg.src = "Imagens/vidat5.png";
            character.src = "Imagens/escaravelho_dead .png";
            clearInterval(bossattacking);
            fimJogolose ();
            somLose.play();


        }
    }
}
function movertiro(){
    tirochar.style.left = parseInt(tirochar.style.left) + velocidade + "px";


    if(parseInt(tirochar.style.left) <= 650){
        estadotirochar = true;
    }else{
        estadotirochar = false;
    }
    if(estadotirochar == true){
        colisao(parseInt(tirochar.style.top), parseInt(tirochar.style.left), tiroalt, tirolarg, parseInt(boss.style.top), parseInt(boss.style.left), bossalt, bosslarg);
        //colisões mexer depois
    }
    if(colisao(parseInt(tirochar.style.top), parseInt(tirochar.style.left), tiroalt, tirolarg, parseInt(boss.style.top), parseInt(boss.style.left), bossalt, bosslarg) == true){
        ativatiro();
        estadotirochar = false;
        hpboss--;
        tirochar.style.display = "none";
        if (hpboss == 0){
            clearInterval(bossattacking);
            clearInterval(bosstimer);
            boss.src = "Imagens/boss_dead.png";
            tiroboss.style.display = "none";
            tiroboss.style.top = 0 + "px";
            tirochar.style.display = "none";
            tirochar.style.top = 0 + "px";
            endanimation =  setInterval(animacaofim,100);

        }
       

    }
}
function animacaofim(){
    window.onkeydown = function(){};
    contador++;
    boss.style.top = parseInt(boss.style.top) + velocidade + "px";
    character.style.left = parseInt(character.style.left) + velocidade - 1 +"px";
    character.src = "Imagens/gif/personagemfim.gif";
    if (parseInt(character.style.left) >= 550){
        character.src = "Imagens/escaravelho_ground.png";
        clearInterval(endanimation);
        escaravelhodead = setInterval("contadois()", 100);
        info.style.display = "block";
        txt1.innerHTML = "Após a vitória da luta e o reconhecimento da fêmea, estás pronto para acasalar. Assim que a continuidade da espécie é assegurada a tua missão acabou.";
        txt2.innerHTML ="";
        skip.style.display = "block";
        skip.onclick = function(){fimJogowin();};
    }



}
function contadois(){
    contador++;
    if (contador == 100){
        character.src = "Imagens/escaravelho_dead .png";
        female.style.display = "none";
    }
}
function teclaspremidas(event){
    press = event.key;

    switch (press){
        case "ArrowUp":
        character.style.top = parseInt(character.style.top) - velocidade + "px";
        break;

        case "ArrowDown":
        character.style.top = parseInt(character.style.top) + velocidade + "px";
        break;

    }
            if (parseInt(character.style.top) <= limittop){
                character.style.top = limittop + "px";
            }
            if (parseInt(character.style.top) >= limitbottom){
                character.style.top = limitbottom + "px";
            }


}
function fimJogolose(){
    somAtaque.pause();
    somAtaque.currentTime = 0;
    somAtaque.currentTime = 0;
    somFundo2.pause();
    somFundo2.currentTime = 0;
    background.innerHTML = "";
    background.style.backgroundColor = "#dcdede";
    background.style.backgroundImage = "";
    background.innerHTML = "<div class='menu' id='main2'>" + "<div class='menutitle' id='gameovertxt2'>GAME OVER</div>";
    localStorage.clear();
    somFundo1.pause();
    somFundo1.currentTime = 0;
    somDano.pause();
    somDano.currentTime = 0;
    somComer1.pause();
    somComer1.currentTime = 0;
    clearInterval(backgroundanimation);
    clearInterval(enemystart);

    
}
function fimJogowin(){
    somWin.play();
    somAtaque.pause();
    somAtaque.currentTime = 0;
    somFundo2.pause();
    somFundo2.currentTime = 0;
    background.innerHTML = "";
    background.style.backgroundColor = "#dcdede";
    background.style.backgroundImage = "";
    character.src = "Imagens/escaravelho_dead .png";
    background.innerHTML = "<div class='menu' id='main3'>" + "<div class='menutitle' id='gamewintxt'>YOU WIN</div>";
    localStorage.clear();
}

function colisao(elemento1y, elemento1x, elemento1Altura, elemento1Largura, elemento2y, elemento2x, elemento2Altura, elemento2Largura){
    if (elemento1x < elemento2x + parseInt(elemento2Largura) && elemento1x + parseInt(elemento1Largura) > elemento2x){

        if(elemento1y < elemento2y + parseInt(elemento2Altura) && elemento1y + parseInt(elemento1Altura) > elemento2y){


            return true;
        }
    }
}



