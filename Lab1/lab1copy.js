const imported = require("./inventory.js");

let bas = Object.keys(imported.inventory).filter(key => imported.inventory[key].foundation);
let protein = Object.keys(imported.inventory).filter(key => imported.inventory[key].protein);
let tillbehör = Object.keys(imported.inventory).filter(key => imported.inventory[key].extra);
let sås = Object.keys(imported.inventory).filter(key => imported.inventory[key].dressing);

console.log('Foundations: ' + bas.join(", "));
console.log('Proteins: ' + protein.join(", "));
console.log('Extras: ' + tillbehör.join(", "));
console.log('Dressings: ' + sås.join(", "));
console.log('')

class Salad {

  constructor(foundation, proteins, extras, dressing) {
    this.foundation = foundation;
    this.proteins = proteins;
    this.extras = extras;
    this.dressing = dressing;
  }

  add(element, type) {
    switch (type) {
      case 'foundation':
        this.foundation = element;
        break;
      case 'proteins':
        if (typeof this.proteins === 'undefined') {
          this.proteins = element;
        } else {
          let temp = this.proteins;
          if (typeof temp !== 'object') {
            let v = [];
            v.push(temp);
            v.push(element);
            this.proteins = v;
          } else {
            temp.push(element);
            this.proteins = temp;
          }
        }
        break;
      case 'extras':
        if (typeof this.extras === 'undefined') {
          this.extras = element;
        } else {
          let temp = this.extras;
          if (typeof temp !== 'object') {
            let v = [];
            v.push(temp);
            v.push(element);
            this.extras = v;
          } else {
            temp.push(element);
            this.extras = temp;
          }
        }
        break;
      case 'dressing':
        this.dressing = element;
        break;
    }
  }

  remove(element, type) {
    switch (type) {
      case 'foundation':
        this.foundation = undefined;
        break;
      case 'proteins':
        let temp = this.proteins;
        if (typeof temp !== 'object') {
          this.proteins = undefined;
        } else {
          const index = temp.indexOf(element);
          if (index > -1) {
            temp.splice(index, 1);
          }
        }
        break;
      case 'extras':
        let temp2 = this.extras;
        if (typeof temp2 !== 'object') {
          this.extras = undefined;
        } else {
          const index = temp2.indexOf(element);
          if (index > -1) {
            temp2.splice(index, 1);
          }
        }
        break;
      case 'dressing':
        this.dressing = undefined;
        break;
    }
  }

  price() {
    let priceFondationAndDressing = imported.inventory[this.foundation].price + imported.inventory[this.dressing].price;
    let temp1 = this.proteins;
    let temp2 = this.extras;
    let priceProtein;
    if(typeof temp1 === 'object'){
      priceProtein = temp1.reduce((accumulator, currentValue) => accumulator + imported.inventory[currentValue].price, 0) 
    } else {
      priceProtein = imported.inventory[this.proteins].price;
    }
    let priceExtras = temp2.reduce((accumulator, currentValue) => accumulator + imported.inventory[currentValue].price, 0);
    let total = priceFondationAndDressing + priceProtein + priceExtras;
    return total;
  }
}


//ExtraGreenSalad.prototype = Object.create(Salad.prototype)

class ExtraGreenSalad extends Salad {
  
  constructor(foundation, proteins, extras, dressing) {
    super(foundation, proteins, extras, dressing);
  }
  
  price() {
    let priceFondationAndDressing = imported.inventory[this.foundation].price * 1.3 + imported.inventory[this.dressing].price * 0.5;
    let temp1 = this.proteins;
    let temp2 = this.extras;
    let priceProtein;
    if(typeof temp1 === 'object'){
      priceProtein = temp1.reduce((accumulator, currentValue) => accumulator + imported.inventory[currentValue].price, 0) 
    } else {
      priceProtein = imported.inventory[this.proteins].price;
    }
    let priceExtras = temp2.reduce((accumulator, currentValue) => accumulator + imported.inventory[currentValue].price, 0);
    let total = priceFondationAndDressing + (priceProtein + priceExtras) * 0.5;
    return total;
  }
}

const ingredients = {};
class GourmetSalad extends Salad {

  constructor(foundation, proteins, extras, dressing) {
    super(foundation, proteins, extras, dressing);
  }

  add(element, type, amount) {//Lägger till alla ingredienser som finns i salladen i objektet ingredients med en extra property amount
    let temp1 = imported.inventory[element];
    let temp2 = {
      ...temp1, amount
    };
    //temp2.amount = amount;
    ingredients[element] = temp2;

    switch (type) {
      case 'foundation':
        this.foundation = element;
        break;
      case 'proteins':
        if (typeof this.proteins === 'undefined') {
          this.proteins = element;
        } else {
          let temp = this.proteins;
          if (typeof temp !== 'object') {
            let v = [];
            v.push(temp);
            v.push(element);
            this.proteins = v;
          } else {
            temp.push(element);
            this.proteins = temp;
          }
        }
        break;
      case 'extras':
        if (typeof this.extras === 'undefined') {
          this.extras = element;
        } else {
          let temp = this.extras;
          if (typeof temp !== 'object') {
            let v = [];
            v.push(temp);
            v.push(element);
            this.extras = v;
          } else {
            temp.push(element);
            this.extras = temp;
          }
        }
        break;
      case 'dressing':
        this.dressing = element;
        break;
    }
  }

  price(){
    let priceFondationAndDressing = ingredients[this.foundation].price*ingredients[this.foundation].amount + ingredients[this.dressing].price*ingredients[this.dressing].amount;
    let temp1 = this.proteins;
    let temp2 = this.extras;
    let priceProtein;//price for protein
    if(typeof temp1 === 'object'){
      priceProtein = temp1.reduce((accumulator, currentValue) => accumulator + ingredients[currentValue].price*ingredients[currentValue].amount,
      0) 
    } else {
      priceProtein = ingredients[this.proteins].price*ingredients[this.proteins].amount;
    }
    let priceExtras = temp2.reduce((accumulator, currentValue) => accumulator + ingredients[currentValue].price*ingredients[currentValue].amount, 0);
    let total = priceFondationAndDressing + priceProtein + priceExtras;
    return total;
  }
}

let myCaesarSalad = new Salad();
myCaesarSalad.add('Sallad + Pasta', 'foundation');
myCaesarSalad.add('Kycklingfilé', 'proteins');
myCaesarSalad.add('Rökt kalkonfilé', 'proteins');
myCaesarSalad.add('Krutonger', 'extras');
myCaesarSalad.add('Tomat', 'extras');
myCaesarSalad.add('Rödlök', 'extras');
myCaesarSalad.add('Parmesan', 'extras');
myCaesarSalad.add('Ceasardressing', 'dressing');

myCaesarSalad.remove('Sallad + Pasta', 'foundation')
myCaesarSalad.add('Sallad + Matvete', 'foundation');

console.log(myCaesarSalad);
console.log('Price is ' + myCaesarSalad.price());
console.log('');

let mySalad = new ExtraGreenSalad();
mySalad.add('Sallad + Pasta', 'foundation');
mySalad.add('Kycklingfilé', 'proteins');
mySalad.add('Rökt kalkonfilé', 'proteins');
mySalad.add('Krutonger', 'extras');
mySalad.add('Tomat', 'extras');
mySalad.add('Rödlök', 'extras');
mySalad.add('Parmesan', 'extras');
mySalad.add('Ceasardressing', 'dressing');

console.log(mySalad);
console.log('Price is ' + mySalad.price());
console.log();

let gourmetSalad = new GourmetSalad();
gourmetSalad.add('Sallad + Pasta', 'foundation', 0.8);
gourmetSalad.add('Kycklingfilé', 'proteins', 1.3);
gourmetSalad.add('Tomat', 'extras', 1.5);
gourmetSalad.add('Cashewnötter', 'extras', 1.2);
gourmetSalad.add('Kimchimayo', 'dressing', 1);
//gourmetSalad.remove('Tomat', 'extras', 1.5);

console.log(gourmetSalad);
console.log('Price is ' + gourmetSalad.price());
//console.log(ingredients);