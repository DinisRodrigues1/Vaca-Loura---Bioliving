/* Variáveis globais */
var startgame;
var janela, pontos, tempo;
var tempojogo = 20, pontostot = 0;
var background;
var num = 30;
var cog = 5;
var windhrand = window.innerWidth - 100;
var velocidade = 15;
var minhoca, minhocah = 18, minhocav = 81;
var cogh = 34.25, cogv = 34.25;
var madeirah = 90, madeirav = 35;
var limiteCima = 110, limiteBaixo = 611, limiteEsquerda = 0, limiteDireita = 1285;
var somFundo = new Audio ("audio/8bit_theme1.wav");
var somcomer = new Audio("audio/escaravelho_comer.wav");
var somCog = new Audio ("audio/damage_bossfight.ogg");

//Onload com funçao carregaElementos
window.onload = function () {
   carregaElementos();
};
//função de inicio de jogo através de event onclick e IDs
function carregaElementos() {
    background = document.getElementById("corpo");
    imgseq = document.getElementById("animeimg");
    startgame = document.getElementById("btnjogar");
    janela = document.getElementById("main");
    pontos = document.getElementById("points");
    tempo = document.getElementById("time");
    tempo.innerHTML = "Tempo restante: " + tempojogo;
    pontos.innerHTML = "Pontos: " +  pontostot;
    info = document.getElementById("info");
    skipu = document.getElementById("setaski");
    startgame.onclick = function() {comecaamima1();};
    


}
//animacao inicial com onclick para começo de jogo
function comecaamima1(){
    janela.style.display = "none";
    info.style.display = "block";
    imgseq.style.display = "block";
    skipu.onclick = function () {comecajogo();};


}
//começa jogo
function comecajogo() {
    somFundo.play();
    
    window.onkeydown = function(evt){
        processaTeclasum(evt);
    };
    temponivelum = setInterval("tempodesconto()", 1000);
    info.style.display = "none";
    imgseq.style.display = "none";
    skipu.style.display = "none";
    pontos.style.display = "block";
    tempo.style.display = "block";
    background.style.backgroundColor = "#b9d2ff";
    background.style.backgroundImage = "url(Imagens/nivel1.png)";
    background.style.backgroundRepeat = "no-repeat";
    background.style.backgroundSize = "100%";
    //for com posicionamento dos elementos
    for (i = 1; i <= num; i++) {
        //inserção madeiras podres
        console.log(i);
        document.getElementById("jogo").innerHTML +=
            "<img id='madeira" + i + "' alt = 'madeira" + i + "' src='Imagens/madeira_0.png'/>";
            document.getElementById("madeira" + i).style.display = "block";
            document.getElementById("madeira" + i).style.position = "absolute";

        if (i == num) {
            //inserção personagem
            document.getElementById("jogo").innerHTML += "<img id='personagem' src='Imagens/larva-top.png'/>";
            minhoca = document.getElementById("personagem");
            minhoca.style.display = "block";
            minhoca.style.position = "absolute";
            for (j = 1; j <= num; j++) {
                document.getElementById("madeira" + j).style.left = Math.floor((Math.random() * windhrand)) + "px";
                document.getElementById("madeira" + j).style.top = Math.floor((Math.random() * 500)) + 100 + "px";
                if (j == num) {
                    //posicionamento minhoca
                    minhoca.style.left = Math.floor((Math.random() * windhrand)) + "px";
                    minhoca.style.top = Math.floor((Math.random() * 450)) + 100 + "px";
                    
                    for (y = 1; y <= cog; y++){
                        //inserção cogumelos
                        document.getElementById("jogo").innerHTML += "<img id='cog" + y + "' alt = 'cog" + y + "' src='Imagens/cg3.png'/>";
                        document.getElementById("cog" + y).style.display = "block";
                        document.getElementById("cog" + y).style.position = "absolute";
                        



                    if (y == cog){
                        for (z = 1; z <= cog; z++) {
                            //posicionamento cogumelos
                            document.getElementById("cog"+ z).style.left = Math.floor((Math.random() * windhrand)) + "px";
                            document.getElementById("cog"+ z).style.top = Math.floor((Math.random() * 500)) + 100 + "px";
                        }
                    }
                    }
                }
            }
        }
    }
}


//movimentação personagem
function processaTeclasum(evt) {
    minhoca = document.getElementById("personagem");
    tecla = evt.key;
    console.log(tecla);

    switch (tecla){
        case "ArrowUp":
            minhoca.style.top = parseInt(minhoca.style.top) - velocidade + "px";
            minhoca.src ="Imagens/larva-top.png";
            console.log(minhoca.style.top);
            minhocah = 18;
            minhocav = 81;
            detetaColisoes();
            break;
        
        case "ArrowDown":
            minhoca.style.top = parseInt(minhoca.style.top) + velocidade + "px";
            minhoca.src ="Imagens/larva-bottom.png";
            console.log(minhoca.style.top);
            minhocah = 18; // orientação da minhoca na vertical
            minhocav = 81;
            detetaColisoes();
            break;
        
        case "ArrowLeft":
            minhoca.style.left = parseInt(minhoca.style.left) - velocidade + "px";
            minhoca.src ="Imagens/larva-left.png";
            console.log(minhoca.style.left);
            minhocah = 81; //orientação de minhoca da horizontal
            minhocav = 18;
            detetaColisoes();
            if (parseInt(minhoca.style.left >= limiteEsquerda)){
                minhoca.style.left = 0 + "px";
            }
            break;
        
        case "ArrowRight":
            minhoca.style.left = parseInt(minhoca.style.left) + velocidade + "px";
            minhoca.src ="Imagens/larva-right.png";
            console.log(minhoca.style.left);
            minhocah = 81;
            minhocav = 18;
            detetaColisoes();
            break;
    }

            if (parseInt(minhoca.style.top) <= limiteCima){
                minhoca.style.top = 110 + "px";
            }
            if (parseInt(minhoca.style.top) >= limiteBaixo){
                minhoca.style.top = limiteBaixo + "px";
            }
            if (parseInt(minhoca.style.left) <= limiteEsquerda){
                minhoca.style.left = 0 + "px";
            }
            if (parseInt(minhoca.style.left) >= limiteDireita){
                minhoca.style.left = limiteDireita + "px";
            }
}
//tempo restante de jogo
function tempodesconto() {

    document.getElementById("time").innerHTML = "Tempo restante: " + tempojogo;
    tempojogo--;
        if (tempojogo == -1){
            clearInterval(temponivelum);
            fimnivelum();

    }
}
//deteção de colisões
function detetaColisoes(){
   
   minhocay = parseInt(minhoca.style.top);
   minhocax = parseInt(minhoca.style.left);

   for (a = 1; a <= num; a++){
       madeiray = parseInt(document.getElementById("madeira" + a).style.top);
       madeirax = parseInt(document.getElementById("madeira" + a).style.left);

   for (b = 1; b <= cog; b++){
       cogy = parseInt(document.getElementById("cog" + b).style.top);
       cogx = parseInt(document.getElementById("cog" + b).style.left);

    if (madeirax < minhocax + parseInt(minhocah) && madeirax + parseInt(madeirah) > minhocax){
        if (madeiray < minhocay + parseInt(minhocav) && madeiray + parseInt(madeirav) > minhocay){
            document.getElementById("madeira" + a).style.display = "none";
            document.getElementById("madeira" + a).style.top = -35 + "px";
            document.getElementById("madeira" + a).style.left = -35 + "px";
            pontostot++;
            somcomer.play();
            document.getElementById("jogo").firstElementChild.innerHTML = "Pontos: " + pontostot; 

            


        }

    }
    if (cogx < minhocax + parseInt(minhocah) && cogx + parseInt(cogh) > minhocax){
        if (cogy < minhocay + parseInt(minhocav) && cogy + parseInt(cogv) > minhocay){
            document.getElementById("cog" + b).style.display = "none";
            document.getElementById("cog" + b).style.top = -35 + "px";
            document.getElementById("cog" + b).style.left = -35 + "px";
            somCog.play();
            pontostot = pontostot - 10;
            document.getElementById("jogo").firstElementChild.innerHTML = "Pontos: " + pontostot;
            console.log (pontostot);

        }

       }
   }
   }
}
//final do primeiro nivel com paragem no uso de teclas
function fimnivelum(){
    somFundo.pause();
    somFundo.currentTime = 0;
    window.onkeydown = function (){};
    comecaamima2();
    localStorage.setItem("pontosfeitos", pontostot);
}
//inicio da segunda animação
function comecaamima2(){
    info.style.display = "block";
    info.style.marginTop = 186 + "px";
    imgseq.style.display = "block";
    pontos.style.display = "none";
    tempo.style.display = "none";
    background.style.backgroundColor = "#dcdede";
    imgseq = document.getElementById("animeimg").src = "Imagens/gif/larva.gif";
    document.getElementById("animeimg").style.marginTop = 231 + "px";
    document.getElementById("animeimg").style.marginRight = "auto";
    document.getElementById("animeimg").style.marginBottom = 0 + "px";
    document.getElementById("animeimg").style.marginLeft = "auto";
    minhoca.style.display = "none";
    document.getElementById("points").innerHTML = "";
    document.getElementById("time").innerHTML = "";
    background.style.backgroundImage = ""; 
    document.getElementById("jogo").innerHTML = "";
    document.getElementById("texto1").innerHTML = "Agora que o teu escaravelho está mais alimentado poderá dar inicio à sua segunda fase, a metamorfose.";
    document.getElementById("texto2").innerHTML = "Passando de larva para escaravelho adulto e preparando-se para subir à" + "</br>" + "superficie da terra.";
    skipu.style.display = "block";
    skipu.onclick = function () {proximonivel();};
    console.log(pontostot);
}


function proximonivel(){
    window.open("htmlprojpart2.html");
}
// final do primeiro nível

