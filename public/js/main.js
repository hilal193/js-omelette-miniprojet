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
        lieu.personnes.push(this);
        if (depart != null) {
            depart.personnes.pop();
        }
        return `${this.nom} se trouve maintenant à ${lieu.nom}`;
    };
    payerArticle=(article)=> {
        if (this.argent>=article.prix) {
            return this.argent -= article.prix;
            
        }else{
            console.log("Vous n'avez pas assez d'argent !!!");
        }
    };
    couper(ingredient, outil) {
        ingredient.etats = "coupé";
        return ingredient + outil;
    }
}
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
        plat[0].etat = "cuit";
        setTimeout(() => {
            console.log(`votre plat : ${plat[0].nom} est ${plat[0].etat} en 4 secondes!`);
        }, 4000);
    }
}
class Bol extends Outil {
    constructor(nom, action, contenu) {
        super(nom, action);
        this.contenu = contenu;
        this.melanger = (nomMelange) => {
            let newMelange = {
                nom : nomMelange,
                etat : "non cuit"
            };
            this.contenu = newMelange
            console.log("apres avoir bien melangé j'obtient une : "+newMelange.nom+" " +newMelange.etat);
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


console.log(perso.seDeplacer(null,maison));
console.log(maison);


console.log(`${perso.nom} est actuellement à la ${maison.nom}`);

console.log(perso.seDeplacer(maison,epicerie));
console.log(maison);
console.log(epicerie);

perso.mainDroite.push(panierTout[0]);
console.log(perso);
panierTout.shift();
console.log(panierTout);

console.log(`${perso.nom} a pris un ${perso.mainDroite[0].type}`);

console.log(perso.mainDroite[0]);
console.log(panierTout);
console.log(`${perso.nom} a pris le ${perso.mainDroite[0].type}`);

copie.forEach(element => {
    perso.mainDroite[0].contenu.push(element);
    console.log(`${perso.nom} s'arrête et prends ${element.nom} du rayon`);

});
console.log(perso);
console.log("_____________");

console.log("_____________");

copie.forEach(element => {
    console.log(`${perso.nom} achete ${element.nom} au prix de ${element.prix} euro`);
    console.log("il me reste en poche : " + perso.payerArticle(element)+" euro");
});
console.log("_____________");
console.log(`${perso.nom} a ${perso.argent} euro restant en poche`);
console.log(perso.seDeplacer(epicerie, maison));
console.log(maison);
console.log("_____________");

perso.mainDroite[0].contenu.forEach(element => {
    bol.contenu.push(element);
    console.log(`${perso.nom} mets ${element.nom} dans le bol`);
});
console.log(bol.contenu);
console.log("_____________");

console.log("faut rapporter le panier a l'épicerie");
perso.mainDroite[0].contenu.forEach(element => {
    perso.mainDroite[0].contenu.splice(element);
});
console.log(perso.mainDroite[0]);

console.log(
    perso.seDeplacer(maison,epicerie)
);
epicerie.paniers.unshift(perso.mainDroite[0]);
perso.mainDroite.pop();
console.log(epicerie);
console.log(
perso.seDeplacer(epicerie,maison)
);
console.log("je continue mon omelette : ");
console.log("_____________");

let compte=0;
while (compte<bol.contenu.length) {
    if (bol.contenu[compte].etats=="entier") {
        perso.couper(bol.contenu[compte],couteau);
        console.log(`${perso.nom} coupe ${bol.contenu[compte].nom}`);
    }
    compte++;
}
console.log(bol.contenu);
console.log("_____________");


bol.melanger("omelette");
console.log("_____________");
console.log(bol.contenu);

console.log("Dans mon bol il y a l'" , bol.contenu.nom); 

console.log("_____________");

console.log(`${perso.nom} met l'${bol.contenu.nom} dans la ${poele.nom}`);

poele.contenu.push(bol.contenu);
bol.contenu = []
console.log(bol.contenu);
console.log(poele.contenu);

console.log("Final Message :");
poele.cuire(poele.contenu);








