# BetterQDB
Quick.db but with a slight few adjustments.
Added more functions/methods to fiddle around with.
Fixed Bugs that quick.db could not offer at the moment.

|                   Original Makers                  	| Discord Support (600+ Members) 	|   NPM Page  	|
|:--------------------------------------------------:	|:------------------------------:	|:-----------:	|
| [Quick.db](https://www.npmjs.com/package/quick.db) 	|[discord.gg/WYH6n6w](https://discord.gg/WYH6n6w)| Coming Soon 	|

# Introduction
*Most functions shown are similar to the original quick.db documentation.*
*This package just altars everything. Credit to [TrueXPixels](https://discord.gg/plexidev)*


```js
const db = require('betterdqb');
 
// Setting an object into the key "Bob"
db.set('Bob', { health: 100, mana: 100 })
// Whole key returns -> { health: 100, mana: 100 }
 
// Pushing an element into an array ( This array does not exist yet )
db.push('Bob.inventory', 'Apple')
// Whole key returns -> { health: 100, mana: 100, inventory: ['Apple'] }
// Bob.inventory returns => ['Apple']
 
// Adding a number to a new field ( This field does not exist yet )
db.add('Bob.balance', 500)
// Whole key returns -> { health: 100, mana: 100, inventory: ['Apple'], balance: 500 }
// Bob.balance returns => 500
 
// Repeating previous examples:
db.push('Bob.inventory', 'Grape')
// Whole key returns -> { health: 100, mana: 100, inventory: ['Apple', 'Grape'], balance: 500 }
// Bob.items returns => ['Apple', 'Grape']

db.set('Bob.balance', 1000)
// Whole key returns -> { health: 100, mana: 100, inventory: ['Apple', 'Grape'], balance: 1000 }
// Bob.balance returns => 1000
 
// Fetching individual properties
// Using either .get or .fetch works

db.get('Bob.balance') // -> 1000
db.fetch('Bob.inventory') // ['Sword', 'Watch']
```

# Documentation

### Methods
- new db.table(name)
- add(key, number, [options])
- .all() -> array
- .delete(key, [options])
- get(key, [options])
- .has(key, [options])
- .push(key, element, [options])
- .set(key, data, [options])
- .subtract(key, number, [options])
- .startsWith(string, { sort: ".data" });

#### new .table(name) 
This function creates a new table, allowing you to separate your data while being used exactly the same.
```js
const db = require('betterqdb');

let economy = new db.table('economy')
economy.set('balance', 500) // output -> 500
economy.get('balance') // output -> 500
db.get('balance') // output -> null
```

#### .add(key, number, [options])
This function adds a number to a key in the database. (If no existing number, it will add to 0)
```js
db.get('balance') // output -> 500
db.add('balance', 250) // output -> 750
```
Also allows for accessing properties using dot notation
```js
db.get('Bob') output // -> { guild: null, balance: 500 }
db.add('Bob.balance', 250) // output -> { guild: null, balance: 750 }
```

#### .all() -> array
This function returns the entire active table as an array.
```js
db.all() // output -> [Array]
```

#### .delete(key, [options])
This function deletes the specified key. Returns if it was a success or not.
```js
db.get('data') // -> "Hello World!"
db.delete('data') // true
```
Also allows for accessing properties using dot notation
```js
db.get('Bob') // output -> { guild: null, balance: 500 }
db.delete('Bob.balance') // output -> true
db.get('Bob') // output -> { guild: null }
```

#### .get(key, [options])
This function returns data from a row based on the key. **Alias: .fetch()**
```js
db.set('data', 'Hello World!') // output -> 'Hello World!'
db.get('data') // output -> 'Hello World!'
```
Also allows for accessing properties using dot notation\
```js
db.set('Bob', { guild: 'Plexi', balance: 500 }) // output -> { guild: 'Plixi Divilopmint', balance: 500 }
db.get('Bob.guild') // output -> "Plixi Divilopmint"
db.get('Bob.balance') // output -> 500
db.get('Bob.qwerty') // output -> undefined
```

#### .has(key, [options])
This function returns a boolean based on whether an element or property exists. **Alias: .exists()**
```js
db.set('data', 'Hello World!') // output -> 'Hello World!'
db.has('data') // output -> true
```
Also allows for accessing properties using dot notation
```js
db.set('Bob', { guild: 'Plixi Divilopmint', balance: 500 }) // output -> { guild: 'Plixi Divilopmint', balance: 500 }

db.has('Bob.guild') // output -> true
db.has('Bob.items') // output -> false
```

#### .push(key, element, [options])
This function will push into an array in the database based on the key. (If no existing array, it will create one)
```js
db.set('Bob.inventory', ['Grape', 'Apple']) // output -> ['Grape', 'Apple']
db.push('Bob.inventory', 'Pear') // output -> ['Grape', 'Apple', 'Pear']
```
Also allows for accessing properties using dot notation
```js
db.set('Bob', { balance: 500, inventory: ['Grape', 'Apple'] }) // output -> { balance: 500, inventory: ['Grape', 'Apple'] }
db.push('Bob.inventory', 'Pear') // output -> { balance: 500, items: ['Grape', 'Apple', 'Pear'] }
```

#### .set(key, data, [options])
This function sets new data based on a key in the database. (When using dot notation, if the object doesn't exist it'll create one)
```js
db.set('data', 'Hello World!') // output -> 'Hello World!'
db.set('data', 50) // output -> 50
db.set('data', { foo: 'bar' }) // output -> { foo: 'bar' }
```
Also allows for accessing properties using dot notation
```js
db.get('Bob') // -> null
db.set('Bob.guild.rank', 'Plixi Pro') // output -> { guild: { rank: 'Plixi Pro' } }
db.set('Bob.balance', 500) // output -> { guild: { rank: 'Plixi Pro' }, balance: 500 }
db.set('Bob.guild.rank', 'Plixi Overlord') // output -> { guild: { rank: 'Plixi Overlord' }, balance: 500 }
```

#### .subtract(key, number, [option])
This function subtracts a number to a key in the database. (If no existing number, it will subtract from 0)
```js
db.get('balance') // output -> 500
db.subtract('balance', 200) // output -> 300
```
Also allows for accessing properties using dot notation
```js
db.get('Bob', { league: 'Gold', XP: 500 }) // output -> { league: 'Gold', XP: 500 }
db.subtract('Bob.XP', 200) // output -> { league: 'Gold', XP: 300 }
```
