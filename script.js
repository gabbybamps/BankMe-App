'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements, sort = false){
containerMovements.innerHTML= ``;


const movs = sort ? movements.slice().sort((a,b) => a-b) : movements;

movs.forEach(function(mov,i){

const type = mov >0 ? `deposit`: `withdrawal`;


const html= `
      
            <div class="movements__row">
              <div class="movements__type 
              movements__type--${type}">${i+1} ${type} </div>
              <div class="movements__value">${mov} EUR </div>
            </div>`


            containerMovements.insertAdjacentHTML(`afterbegin`, html);

})
}

const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc+mov, 0);

  labelBalance.textContent = `${acc.balance} EUR`;

}



const calcDisplaySummary = function(acc){
const incomes = acc.movements.filter(mov => mov>0).reduce((acc,mov)=> acc + mov, 0);

const out = acc.movements.filter(mov => mov<0).reduce((acc,mov) => acc + mov, 0);

const interest = acc.movements
.filter(mov => mov>0)
.map(deposit => deposit *acc.interestRate)
.filter((int,i, arr) =>{
  return int >=1
})
.reduce((acc,int)=> acc + int, 0);

labelSumIn.textContent = `${incomes} EUR`;

labelSumOut.textContent = `${Math.abs(out)} EUR`;

labelSumInterest.textContent = `${interest} EUR`


}




const createUsernames = function (accs){
accs.forEach(function(acc){
acc.username = acc.owner
  .toLowerCase().split(` `).map(name=>
    name[0] 
 ).join(``);
})
}

createUsernames (accounts)

const UpdateUI = function (acc){
  // Display movements
displayMovements(acc.movements);

// Display balance
calcDisplayBalance(acc)

// Display summary
calcDisplaySummary(acc)
}

// Event handlers
let currentAccount;

btnLogin.addEventListener(`click`, function(e){
  // Prevent form from submitting
  e.preventDefault();
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);



  if (currentAccount?.pin === Number(inputLoginPin.value)){
// Display UI and welcome message
labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(` `)[0]}`;

containerApp.style.opacity = 100;

// Clear input fields
inputLoginUsername.value = inputLoginPin.value = ``
    
inputLoginPin.blur();


// Update UI
UpdateUI(currentAccount)



  }
})

btnTransfer.addEventListener(`click`, function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value );
console.log(amount, receiverAcc);

inputTransferAmount.value = inputTransferTo.value = ``;

if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc.username !==currentAccount.username ){

  // Doing transfer
  currentAccount.movements.push(-amount);
  receiverAcc.movements.push(amount);

 // Update UI
UpdateUI(currentAccount)

}

});

btnLoan.addEventListener(`click`, function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

if(amount> 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)){

// Add the movement
currentAccount.movements.push(amount);
// Update UI
UpdateUI(currentAccount)
}
inputLoanAmount.value = ``;

});



btnClose.addEventListener(`click`, function(e){
  e.preventDefault();
  

 if( currentAccount.username === inputCloseUsername.value  &&  currentAccount.pin === Number(inputClosePin.value)){

  const index = accounts.findIndex(acc => acc.username === currentAccount.username);

  console.log(index);

  // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
 }

 inputCloseUsername.value = inputClosePin.value = ``;
})

let sorted = false
btnSort.addEventListener(`click`, function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


/*
/////////////////////////////////////////////////
// Simple array methods

let arr= [`a`, `b`, `c`, `d`, `e`];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(1,-2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE
// console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr);
arr.splice(1,2)
console.log(arr);

// REVERSE
arr= [`a`, `b`, `c`, `d`, `e`];
const arr2 =[`j`, `i`, `h`, `g`, `f`];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr,...arr2]);

// JOIN
console.log(letters.join(`- `));


/////////////////////////////////////////////////
// Looping Arrays : forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const movement of movements){
  for (const [i,movement] of movements.entries()){
  if(movement >0){
    console.log(`Movement ${i+1} : You deposited ${movement}`);
  }else{
    console.log(`Movement ${i+1} : You withdrew ${Math.abs(movement)}`);
  }
}
console.log(`-------forEach------`);
movements.forEach(function(mov, i, arr){
  if(mov >0){
    console.log(`Movement ${i+1} : You deposited ${mov}`);
  }else{
    console.log(`Movement ${i+1} : You withdrew ${Math.abs(mov)}`);
  }
})

// 0: function(200)
// 1: function(450)
// 2: function(-400)
// ...


/////////////////////////////////////////////////
// Looping Arrays : forEach with Maps and Sets

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
})

// Set

const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`, `EUR`]);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value, _value, set){
  console.log(`${value}: ${_value}`);
})


// Coding challenge 1

const checkDogs = function (dogsJulia, dogsKate){

  const dogsJuliaCorrect = dogsJulia.slice(1,-2);

const bothData = dogsJuliaCorrect.concat(dogsKate);

bothData.forEach(function(age, i, arr){

  const adultOrPuppy= age>=3 ? `is an adult, and is ${age} years old`: `is still a puppy `

  console.log(`Dog number ${i+1} ${adultOrPuppy} `);
})

}
checkDogs([3,5,2,12,7], [4,1,15,8,3])
checkDogs([9,16,6,8,3], [10,5,6,1,4])


/////////////////////////////////////////////////
// Data transformations: Map, filter, reduce

// The Map method

const eurToUSD = 1.1;

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementsUSD = movements.map(function(mov) {
//   return mov*eurToUSD;
// })

const movementsUSD = movements.map(mov=> mov*eurToUSD);
  


console.log(movements);
console.log(movementsUSD);

const movementsUSDfor= []
for (const mov of movements){
  movementsUSDfor.push(mov*eurToUSD);

}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map((mov, i, arr) => 
`Movement ${i+1}: You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(mov)}`
)
console.log(movementsDescriptions);



// The Filter method
const deposits = movements.filter(function (mov,i ,arr){
return mov>0;
})
console.log(movements);
console.log(deposits);


const withdrawals = movements.filter(mov=> mov<0)
console.log(withdrawals);

// const depositsFor= [];
// for (const mov of movements) if (mov> 0) depositsFor.push(mov);
// console.log(depositsFor);



// The Reduce method

console.log(movements);

// accumulator(acc) is like a snowball
// const balance = movements.reduce(function(acc, cur, i, arr){
//   console.log(`Iteration ${i}: ${acc}`);
// return acc + cur
// }, 0);
// console.log(balance);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);


// let balance2 = 0;
// for (const mov of movements) {
//   balance2 +=mov
// }
// console.log(balance2);


// Maximum value
const max = movements.reduce((acc,mov) => {
if(acc>mov)
  return acc;
else
  return mov;
},movements[0])
console.log(max);


// Coding challenge #2
const calAverageHumanAge = function (ages){
const humanAges = ages.map(age=> {

  if(age<= 2){
return 2*age;
  }else{
return 16 + (age*4);
  }
});

const adults = humanAges.filter(cur => cur >= 18)

const average = adults.reduce((acc,cur) =>  acc + cur/(adults.length),0)

return average;
}
console.log(calAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// The Magic of chaining methods


const eurToUSD = 1.1;
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
.filter((mov)=> mov >0)
.map((mov,i,arr) => {
  // console.log(arr);
 return mov*eurToUSD;

} )
// .map(mov => mov*eurToUSD)
.reduce((acc,mov) => acc+mov, 0);

console.log(totalDepositsUSD);


// Coding challenge #3
const calAverageHumanAge = function (ages){
  const humanAges = ages.map(age=> {
  
    if(age<= 2){
  return 2*age;
    }else{
  return 16 + (age*4);
    }
  })
  .filter(cur => cur >= 18)
  .reduce((acc,cur,i,arr) =>  acc + (cur/arr.length),0)
  
  return humanAges;
  }
  console.log(calAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
  console.log(calAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));



/////////////////////////////////////////////////
// The Find method
const firstWithdrawal = movements.find( mov=> mov<0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner===`Jessica Davis`)
console.log(account);

// let accountFor;
// for(const acc of accounts){
//   acc.owner ===`Jessica Davis`? accountFor = acc: undefined;
// }
// console.log(accountFor);


/////////////////////////////////////////////////
// Some and every
console.log(movements);
// Equality
console.log(movements.includes(-130));


// SOME : Condition
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov>1500)
console.log(anyDeposits);

// EVERY : Condition
console.log(movements.every( mov => mov>0));

console.log(account4.movements.every(mov => mov>0));


// Separate callback
const deposit = mov => mov>0;
console.log(movements.every(deposit));


///////////////////////
//Flat and flatMap

const arr = [[1,2,3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1,2],3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// Flat
const overallBalance = accounts
.map(acc=> acc.movements)
.flat()
.reduce((acc,mov) => acc+ mov, 0)
console.log(overallBalance);

// flatMap
const overallBalance2 = accounts
.flatMap(acc=> acc.movements)
.reduce((acc,mov) => acc+ mov, 0)
console.log(overallBalance2);


///////////////////////////
//Sorting arrays

// Strings
const owners = [`Jonas`, `Zach`, `Adam`, `Martha`]
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return <0, a before b (keep order)
// return >0, b before a (switch order)

// Ascending order
// movements.sort((a,b) => {
// if(a>b)
// return 1

// if(a<b)
// return -1

// });
movements.sort((a,b) => a-b);
console.log(movements);


// Descending order
// movements.sort((a,b) => {
//   if(a>b)
//   return -1
  
//   if(a<b)
//   return 1
  
//   });

movements.sort((a,b) => b-a);
console.log(movements);


/////////////////////
// More ways of creating and filling arrays
const arr = [1,2,3,4,5,6,7];
console.log(new Array(1,2,3,4,5,6,7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(()=>5));

// x.fill(1);
x.fill(1,3,5);
x.fill(1);
console.log(x);

arr.fill(23,2,6);
console.log(arr);

// Array.from
const y = Array.from({length:7}, () =>1);
console.log(y);

const z = Array.from({length:7}, (_,i) => i+1)
console.log(z);


// 100 random dice rolls
const p = Array.from({length:100}, (_, i) => Math.floor(Math.random() * 6) +1)
console.log(p);



labelBalance.addEventListener(`click`, function(){

  const movementsUI = Array.from(document.querySelectorAll(`.movements__value`), el => Number(el.textContent.replace(`EUR`, ``)) );

  console.log(movementsUI);


  const movementsUI2 = [...document.querySelectorAll(`.movements__value`)]

  console.log(movementsUI2);
})


//////////////////////
// Array methods practice

// 1.
const bankDepositSum = accounts
.flatMap(acc => acc.movements)
.filter(mov => mov>0)
.reduce((acc,mov) => acc+mov,0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts.flatMap(acc => acc.movements)
// .filter(mov => mov>=1000).length;

// const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count,cur) => (cur >=1000 ? count+1: count), 0)

const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count,cur) => (cur >=1000 ? ++count: count), 0);

console.log(numDeposits1000);


// Prefixed ++operator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const {deposits, withdrawals} = accounts
.flatMap(acc => acc.movements)
.reduce((sums,cur) => {
cur>0 ? sums.deposits+=cur : sums.withdrawals += cur;
return sums
}, {deposits: 0, withdrawals:0})

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function(title){

const capitalize = str=> str[0].toUpperCase()+ str.slice(1);

const exceptions = [`a`, `an`, `and`, `the`, `but`, `or`, `on`,`in`, `with`];

const titleCase = title
.toLowerCase()
.split(` `)
.map(word =>exceptions.includes(word)? word : capitalize(word))
.join(` `);
return capitalize (titleCase);

}
console.log(convertTitleCase(`this is a nice title`));
console.log(convertTitleCase(`this is a LONG title but not too long`));
console.log(convertTitleCase(`and here is another title with an EXAMPLE`));
*/

///////////////////////
// Coding challenge #4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

  // 1.
  dogs.forEach((dog,i)=> dog.recommendedFood = Math.trunc (dog.weight ** 0.75 * 28));
  console.log(dogs);

  // 2.
//   dogs.forEach((dog,i) => {
//     if (dog.owners.includes(`Sarah`) && dog.curFood >= dog.recommendedFood * 1.10){
// console.log(`Sarah: Your dog is eating too much`);
//     }else if (dog.owners.includes(`Sarah`) && dog.curFood <= dog.recommendedFood *0.90){
//       console.log(`Sarah: Your dog is eating too much`);
//     }
//     }
//   );

  const dogSarah = dogs.find(dog => dog.owners.includes(`Sarah`));
  console.log(dogSarah);
  console.log(`Sarah's dog is eating ${dogSarah.curFood>dogSarah.recommendedFood ? `too much`: `too little`} `);

  // 3.
  const ownersEatTooMuch = dogs.filter((dog, i) => {
     return dog.curFood > dog.recommendedFood 
  }).flatMap((dog,i) => dog.owners);
  console.log(ownersEatTooMuch);

  const ownersEatTooLittle = dogs.filter((dog, i) => {
    return dog.curFood < dog.recommendedFood
 }).flatMap((dog,i) => dog.owners);
 console.log(ownersEatTooLittle);

// 4.
const strTooMuch = function (toomuch) {
 console.log(`${toomuch.join(` and `)}'s dogs eat too much! `);
}

strTooMuch(ownersEatTooMuch);

const strTooLittle = function (toolittle) {
  console.log(`${toolittle.join(` and `)}'s  dogs eat too little! `);
 }
 
 strTooLittle(ownersEatTooLittle);

//  5.
const exactAmount =dogs.some((dog,i) => dog.curFood === dog.recommendedFood);
console.log(exactAmount);

// 6.
const okAmount = dogs.some((dog,i) => dog.curFood > dog.recommendedFood*0.90 && dog.curFood< dog.recommendedFood *1.10);
console.log(okAmount);
   

// 7.
const arrOkAmount = dogs.filter((dog,i) => 
   dog.curFood > dog.recommendedFood*0.90 && dog.curFood< dog.recommendedFood *1.10
)
console.log(arrOkAmount);

// 8.
const shallowCopySorted = dogs.slice().sort((dogNow,dogNext)=> 
dogNow.recommendedFood -dogNext.recommendedFood
) ;
console.log(shallowCopySorted);


