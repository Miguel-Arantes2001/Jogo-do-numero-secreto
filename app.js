/*let título = document.querySelector('h1')
título.innerHTML='Jogo da advinhação !'

let parágrafo = document.querySelector('p')
parágrafo.innerHTML = 'Escolha um número entre 1 e 10'*/
let lista_numeros_sorteados=[]
let num_limite=prompt('Escolha o número limite:')
let número_secreto = gerarNumeroAleatorio()
let tentativas=1

function adicionarTextoNaTela(tag,texto){
    let campo = document.querySelector(tag)
    campo.innerHTML=texto
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}


function limparCampo(){
    chute = document.querySelector('input')
    chute.value=''
}


function verificarChute(){
    let chute = document.querySelector('input').value;

    let palavra_tentativas = tentativas>1 ? 'tentativas' : 'tentativa'

    let mensagem_tentativas = `Você acertou o número secreto com ${tentativas} ${palavra_tentativas}`
    if (chute == número_secreto){
        adicionarTextoNaTela('h1','Acertou !!');
        adicionarTextoNaTela('p',mensagem_tentativas);
        document.getElementById('reiniciar').removeAttribute('disabled')
}
    else{
        if (chute>número_secreto){
            adicionarTextoNaTela('p','O número secreto é menor');
        }
        else{
            adicionarTextoNaTela('p','O número secreto é maior');
        }
        tentativas++
        limparCampo()
    }

}

function gerarNumeroAleatorio(){
    let numero_escolhido = parseInt(Math.random()*num_limite+1)
    let quantidade_elementos_lista= lista_numeros_sorteados.length

    if (quantidade_elementos_lista==num_limite){
        lista_numeros_sorteados=[]
    }

    if (lista_numeros_sorteados.includes(numero_escolhido)){
        return	gerarNumeroAleatorio()
    }
    else{
        lista_numeros_sorteados.push(numero_escolhido)
        console.log(lista_numeros_sorteados)
        return numero_escolhido
    }
}

function mensagem_inicial(){
adicionarTextoNaTela('h1','Jogo da advinhação !')
adicionarTextoNaTela('p',`Escolha um número entre 1 e ${num_limite} `)
}

mensagem_inicial()

function reiniciar_jogo(){
    número_secreto = gerarNumeroAleatorio()
    limparCampo()
    tentativas=1
    mensagem_inicial()
    document.getElementById('reiniciar').setAttribute('disabled',true)
}

