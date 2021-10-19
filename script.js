class Personne {
    constructor(nom, lieu, argent, mainGauche, mainDroite) {
        this.nom = nom;
        this.lieu = lieu;
        this.argent = argent;
        this.mainGauche = mainGauche;
        this.mainDroite = mainDroite;
    }
    seDeplacer = (depart,lieu) => {
        // depart = depart || null
        // console.log(depart);
        lieu.personnes.push(lieu.nom);
        if (depart != null) {
            depart.personnes.pop();
        }
        return `${this.nom} se trouve maintenant à ${lieu.nom}`;
    };
    payerArticle=(article)=> {
        return this.argent -= article.prix;
    };
    couper(ingredient, outil) {
        return ingredient + outil;
    }
}
// let personne = new Personne("perso","maison",2,[],[]);
let maison = {
    nom: "maison",
    personnes: []
}
class Outil {
    constructor(nom, action) {
        this.nom = nom;
        this.action = action;
    }
}
class Ingredient {
    constructor(nom, etats, prix) {
        this.nom = nom;
        this.etats = etats;
        this.prix = prix;
    }
}
class Panier {
    constructor(type, contenu) {
        this.type = type;
        this.contenu = contenu;
    }
}
class Lieu {
    constructor(nom, personnes) {
        this.nom = nom;
        this.personnes = personnes;
    }
}
class Epicerie extends Lieu {
    constructor(nom, personnes, paniers) {
        super(nom, personnes);
        this.paniers = paniers;
    }
}

class Poele extends Outil {
    constructor(nom, action, contenu) {
        super(nom, action);
        this.contenu = contenu;
    }
    cuire = (plat) => {
        plat.etats = "cuit";
        setTimeout(() => {
            console.log(`votre plat : ${plat.nom} est ${plat.etats} en 4 secondes!`);
        }, 4000);
    }
}
class Bol extends Outil {
    constructor(nom, action, contenu) {
        super(nom, action);
        this.contenu = contenu;
        this.melanger = (nomMelange) => {
            let newMelange = new Ingredient(nomMelange, "pas cuite", 30);
            console.log("apres avoir bien melangé j'obtient une : "+newMelange.nom+" " +newMelange.etats);
            return newMelange;
        }
    }
}

// instance
let perso = new Personne("Hilal", "", 100, [], []);
// ingredient
let oignon = new Ingredient("oignon","coupé",2);
let oeuf = new Ingredient("oeuf","entier",1);
let epice = new Ingredient("epice","moulu",3);
let fromage = new Ingredient("fromage","entier",4);
let sel = new Ingredient("sel","moulu",1);
let sucre = new Ingredient("sucre","moulu",1);
// panier
let premierPanier = new Panier("panierNumeroUn", []);
let deuxiemePanier = new Panier("deuxiemePanier", []);
let troisiemePanier = new Panier("troisiemePanier", []);
let panierTout = [premierPanier, deuxiemePanier, troisiemePanier]
let epicerie = new Epicerie("epicerie", [], panierTout);
let copie = [oignon,oeuf,epice,fromage,sel,sucre];
let bol= new Bol("bol_hilal","depose",[]);
let couteau = new Outil("couteau","");
let poele= new Poele("poele","",[]);


// Pour dire que le personnage est à la Maison :
perso.seDeplacer(null, maison);
console.log(perso.seDeplacer(null,maison));


// Avec l'objet personnage, utiliser la méthode seDeplacer et de passer en paramètre l'objet maison

console.log(`${perso.nom} est actuellement à la ${maison.nom}`);

// Pour aller à l'épicerie acheter les ingrédients pour l'omelette, je répète la première étape en changeant le paramètre de la méthode seDeplacer par l'epicerie
perso.seDeplacer(maison, epicerie);
console.log(perso.seDeplacer(maison,epicerie));


// Mon personnage prend un des paniers dans l'épicerie (il récupère le panier dans les objets de l'épicerie et le met dans sa main droite.);

// je prends
perso.mainDroite.push(panierTout[0]);
// je supprimer
panierTout.shift();

// Il doit y avoir un objet dans la main droite du personnage et un panier en moins. Vérifier avec des console.log() ensuite afficher un message du type : 
console.log(`${perso.nom} a pris un ${perso.mainDroite[0].type}`);

// panier que j'ai pris
console.log(perso.mainDroite);
// panier restant
console.log(panierTout);
//panier que j'ai pris de l'épicerie
console.log(`${perso.nom} a pris le ${perso.mainDroite[0].type}`);

// Je créer une boucle qui va prendre chaque élément (ingrédient) du contenu de l'épicerie (1 à 1) et en faire une COPIE dans le panier du personnage
copie.forEach(element => {
    perso.mainDroite[0].contenu.push(element);

});
console.log("_____________");
// Afficher un message à chaque ingrédient pris
copie.forEach(element => {
    console.log(`${perso.nom} s'arrête et prends ${element.nom} du rayon`);
});

// Payer chaque ingrédient récupéré dans le panier. Avec une boucle aussi, on va les passer 1 à 1 dans la fonction payerArticle()
console.log("_____________");

copie.forEach(element => {
    // perso.payerArticle(element);
    console.log(`${perso.nom} achete ${element.nom}`);
    console.log("il me reste en poche : " + perso.payerArticle(element)+" euro");
});

// Afficher un message de ce qu'il reste d'argent sur le personnage.
console.log("_____________");
console.log(`${perso.nom} a ${perso.argent} euro restant en poche`);


// rentrer à la maison (comme ça on pourra cuisiner)
// perso.seDeplacer(epicerie, maison);
console.log(perso.seDeplacer(epicerie, maison));

// mettre chaque ingrédient dans le bol (1 à 1 donc avec une boucle)
console.log("_____________");
perso.mainDroite[0].contenu.forEach(element => {
    bol.contenu.push(element);
    console.log(`${perso.nom} mets ${element.nom} dans le bol`);
});
// console.log(bol.contenu);
console.log("_____________");

// Vérifier que les ingrédients ne se trouvent plus dans le panier (oups ! on a oublié de le rapporter x)
// panier rempli
// console.log(perso.mainDroite[0]);
console.log("faut rapporter le panier a l'épicerie");
perso.mainDroite[0].contenu.forEach(element => {
    perso.mainDroite[0].contenu.splice(element);
});
// resultat de mon panier vide
console.log(perso.mainDroite[0]);

// Retourner à l'épicerie pour rapporter le panier. (donc seDeplacer 
perso.seDeplacer(maison,epicerie);
console.log(
    perso.seDeplacer(maison,epicerie)
);

// puis enlever le panier de la main droite et le remettre dans les paniers de l'épicerie.)
// panier 
console.log(perso.mainDroite);
// epicerie.panierTout.unshift(perso.mainDroite[0]);
// epicerie.panierTout.push(perso.mainDroite[0]);
// panier vide
perso.mainDroite.pop();
console.log(perso.mainDroite);
// Retourner à la maison pour continuer l'omelette
perso.seDeplacer(epicerie,maison);
console.log(
perso.seDeplacer(epicerie,maison)
);
console.log("je continue mon omelette : ");
console.log("_____________");

// Vérifier chaque ingrédient dans le bol et le couper seulement s'il est entier ! Pour ça on utilise la méthode couper de personnage
let compte=0;
while (compte<bol.contenu.length) {
    if (bol.contenu[compte].etats=="entier") {
        perso.couper(bol.contenu[compte],couteau);
        console.log(`${perso.nom} coupe ${bol.contenu[compte].nom}`);
    }
    compte++;
}
console.log("_____________");


// Mélanger le contenu du bol avec la méthode melanger. on va nommer ce mélange une 'omelette' (à passer en param).
// Afficher un message avec le nouveau mélange

let omelette = "omelette";
bol.melanger(omelette);
console.log("_____________");

// vider le contenu du bol dans la poêle. Il ne doit plus rien avoir dans le bol et y avoir juste l'omelette pas cuite.
let bolLongeur= bol.contenu.length;
bol.contenu.splice(0,bolLongeur);
console.log("mon bol est vide : " , bol.contenu); 

console.log("_____________");

console.log(`${perso.nom} met l'${omelette} dans la ${poele.nom}`);

// Cuire l'omelette avec la méthode de la poêle 
// je rajoute dans la poele
poele.contenu.push(bol.melanger(omelette));
console.log(poele.contenu);

console.log("Final Message :");
poele.cuire(bol.melanger(omelette));








