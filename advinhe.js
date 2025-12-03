const animals = [
    { 
        name: "coala", 
        img: "3.png",
        curiosity: "Esse animal fofinho passa a maior parte do tempo agarrado às árvores e pode dormir até 20 horas por dia! Os coalas se alimentam quase exclusivamente de folhas de eucalipto, das quais também obtêm a maior parte da água que precisam — por isso quase não bebem água diretamente. Eles têm garras fortes, perfeitas para subir e se segurar nos galhos. E quando nasce, o filhote fica protegido na bolsa da mãe e, depois de crescer um pouco, passa a andar agarradinho nas costas dela."
    },
    { 
        name: "tubarão", 
        img: "tubarao.jpg",
        curiosity: "Os tubarões não possuem ossos — seu esqueleto é feito de cartilagem, o que os torna mais leves e ágeis na água. Eles têm sentidos extremamente aguçados e são capazes de detectar eletricidade e vibrações emitidas por outros animais, mesmo a longas distâncias. Também possuem a habilidade única de substituir dentes continuamente ao longo da vida, podendo trocar milhares deles! Algumas espécies podem viver por centenas de anos, como o tubarão-da-Groelândia, um dos animais mais longevos do planeta. E o mais curioso: muitos tubarões precisam continuar nadando mesmo enquanto dormem, porque é assim que conseguem manter a água fluindo pelas brânquias para respirar. Além disso, sua pele é feita de pequenas estruturas dentadas, chamadas dentículos dérmicos, que reduzem o atrito e permitem nadar com grande eficiência."
    },
    { 
        name: "coruja", 
        img: "coruja.png",
        curiosity: "Cachorros conseguem entender mais de 150 palavras!"
    },
    { 
        name: "tartaruga", 
        img: "tartaruga.png",
        curiosity: "O rugido do leão pode ser ouvido a 8 km de distância!"
    }
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
            current = (current + 1) % animals.length;
            loadAnimal();
        }, 1200);

    } else {
        result.textContent = "❌ Tente novamente!";
        result.style.color = "red";
    }
});

loadAnimal();
