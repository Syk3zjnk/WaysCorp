const animals = [
    { name: "coala", img: "coala.png", curiosity: "Esse animal fofinho passa a maior parte do tempo agarrado às árvores e pode dormir até 20 horas por dia! Ele se alimenta quase que exclusivamente das folhas de eucalipto, de onde também obtém quase toda a água que precisa. Com garras fortes, consegue se segurar nos galhos com facilidade. Quando nasce, o filhote se protege na bolsa da mãe e, depois de crescer um pouco, passa a se pendurar nas costas dela." },
    { name: "tubarão", img: "tubarao.jpg", curiosity: "Esse incrível animal não possui ossos — seu esqueleto é feito de cartilagem! Ele tem sentidos extremamente aguçados, capazes de detectar eletricidade e vibrações à distância. Além disso, possui a habilidade única de substituir dentes continuamente ao longo da vida. Algumas espécies podem viver por centenas de anos! E curiosamente, muitos precisam continuar nadando mesmo enquanto dormem, para manter a água passando pelas brânquias e conseguir respirar." },
    { name: "coruja", img: "coruja.png", curiosity: "Essa ave de rapina noturna é famosa por sua audição e visão extremamente aguçadas. Seu voo é silencioso e ela consegue girar a cabeça em até 270°! Possui bico curvo e garras afiadas, perfeitos para a caça, e um disco facial que funciona como um “radar de som”, ajudando a localizar presas mesmo no escuro." },
    { name: "tartaruga", img: "tartaruga.png", curiosity: "Esse animal nasce na areia da praia e, assim que sai do ovo, corre rapidamente para o mar. Passa quase toda a vida nadando nas ondas, voltando à praia apenas para colocar seus ovos. De cada mil filhotes que nascem, apenas um chega à idade adulta. Ele não possui cordas vocais, mas se comunica através de movimentos e vibrações na água. Calmo, viajante e muito sábio, esse morador do oceano adora nadar longas distâncias." },
    { name: "coelho", img: "coelho.png", curiosity: "Esse animal fofinho tem orelhas compridas que se mexem constantemente para ouvir melhor. Ele possui uma memória incrível e consegue reconhecer diferentes rostos e vozes. Seus dentes nunca param de crescer, por isso precisa roer objetos para mantê-los no tamanho certo." },
    { name: "guaxinim", img: "guaxinim.png", curiosity: "Esse animal possui mãos muito parecidas com as nossas, com cinco dedos que ajudam a pegar e segurar objetos com facilidade. Muito curioso, ele vive explorando e procurando algo gostoso para comer, afinal, come de tudo um pouco! Quando encontra comida, costuma “lavá-la” antes de comer, como se estivesse dando um banho. Inteligente e esperto, esse bichinho noturno adora se aventurar." },
    { name: "rato", img: "rato.png", curiosity: "Esse animalzinho é pequeno, rápido e cheio de energia! Seus dentes nunca param de crescer, então ele está sempre roendo algo para mantê-los no tamanho certo. Muito inteligente, consegue aprender caminhos com facilidade e lembrar deles depois. Com um olfato incrível, percebe cheiros que nós nem notaríamos. Curioso e esperto, vive explorando cada cantinho em busca de comida ou abrigo." },
    { name: "ornitorrinco", img: "ornitorrinco.png", curiosity: "Esse animal parece ter sido montado com partes de vários outros: bico de pato, rabo de castor e corpo de mamífero, e ainda assim é totalmente único! O ornitorrinco é um nadador excelente e usa o bico para sentir vibrações na água, encontrando suas presas mesmo no escuro. Além disso, ele põe ovos, algo raríssimo entre mamíferos. Misterioso e fascinante, adora deslizar silenciosamente pelos rios da Austrália, como um verdadeiro espião da natureza." }
];

let current = 0;

const img = document.getElementById("animal-img");
const answer = document.getElementById("answer");
const result = document.getElementById("result");
const verifyBtn = document.getElementById("verifyBtn");

const slideArea = document.getElementById("slide-area");
const curiosityPanel = document.getElementById("curiosity-panel");
const curiosityText = document.getElementById("curiosity-text");

const lamp = document.getElementById("lamp");

// Cria a div de mensagem final
const gameMessage = document.createElement("div");
gameMessage.id = "game-message";
gameMessage.style.display = "none";
gameMessage.innerHTML = "<h2>🎉 Você ganhou! Parabéns! 🎉</h2>";
gameMessage.style.position = "absolute";
gameMessage.style.top = "50%";
gameMessage.style.left = "50%";
gameMessage.style.transform = "translate(-50%, -50%)";
gameMessage.style.background = "#4fb7fc";
gameMessage.style.color = "#fff";
gameMessage.style.padding = "30px 50px";
gameMessage.style.borderRadius = "20px";
gameMessage.style.textAlign = "center";
gameMessage.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
gameMessage.style.zIndex = "20";

document.querySelector(".game-card").appendChild(gameMessage);

lamp.addEventListener("click", () => {
    slideArea.classList.toggle("open");
    curiosityPanel.classList.toggle("open");
});

function loadAnimal() {
    img.src = animals[current].img;
    curiosityText.textContent = animals[current].curiosity;
    slideArea.classList.remove("open");
    curiosityPanel.classList.remove("open");
    result.textContent = "";
    answer.value = "";
}

verifyBtn.addEventListener("click", () => {
    const userAnswer = answer.value.toLowerCase().trim();

    if (userAnswer === animals[current].name) {
        result.textContent = "✔️ Correto!";
        result.style.color = "lightgreen";

        setTimeout(() => {
            current++;

            // Se acabou a lista de animais
            if (current >= animals.length) {
                gameMessage.style.display = "block";
            } else {
                loadAnimal();
            }

        }, 1200);

    } else {
        result.textContent = "❌ Tente novamente!";
        result.style.color = "red";
    }
});

loadAnimal();
