# BetterQDB
Quick.db but with a slight few adjustments.
Added more functions/methods to fiddle around with.
Fixed Bugs that quick.db could not offer at the moment.

|                   Original Makers                  	| Discord Support (600+ Members) 	|   NPM Page  	|
|:--------------------------------------------------:	|:------------------------------:	|:-----------:	|
| [Quick.db](https://www.npmjs.com/package/quick.db) 	|[discord.gg/WYH6n6w](discord.gg/WYH6n6w)| Coming Soon 	|

# Documentation
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
