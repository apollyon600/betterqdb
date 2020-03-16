// Requiring Packages
const Database = require('better-sqlite3');
let db;

// Create the database so we can define db
if (!db) db = new Database('./betterqdb.sqlite');

// Declaring methods the user can use.
var methods = {
  fetch: require('../library/fetch.js'),
  set: require('../library/set.js'),
  add: require('../library/add.js'),
  subtract: require('../library/subtract.js'),
  push: require('../library/push.js'),
  delete: require('../library/delete.js'),
  has: require('../library/has.js'),
  all: require('../library/all.js'),
};

module.exports = { 
  
  version: '0.0.1',
  fetch: function(key, ops) {
    if (!key) throw new TypeError('No key specified // Ex. db.fetch(\'key\') // Request Support at discord.gg/WYH6n6w');
    return arbitrate('fetch', {id: key, ops: ops || {}});
  },
  get: function(key, ops) {
    if (!key) throw new TypeError('No key specified // Ex. db.get(\'key\') // Request Support at discord.gg/WYH6n6w');
    return arbitrate('fetch', {id: key, ops: ops || {}});
  },
  set: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified // Ex. db.set(\'key\', value) // Request Support at discord.gg/WYH6n6w');
    if (value === undefined) throw new TypeError('No value specified // Ex. db.set(\'key\', \'a string\') // Request Support at discord.gg/WYH6n6w');
    return arbitrate('set', {stringify: true, id: key, data: value, ops: ops || {}});
  },
  add: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified // Ex. db.add(\'key\', value) // Request Support at discord.gg/WYH6n6w');
    if (isNaN(value)) throw new TypeError('Must specify a value to add // Ex. db.add(\'key\', 1) // Request Support at discord.gg/WYH6n6w');
    return arbitrate('add', {id: key, data: value, ops: ops || {}});
  },
  subtract: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified // Ex. db.subtract(\'key\', value) // Request Support at discord.gg/WYH6n6w');
    if (isNaN(value)) throw new TypeError('Must specify a value to subtract // Ex. db.subtract(\'key\', 1) // Request Support at discord.gg/WYH6n6w');
    return arbitrate('subtract', {id: key, data: value, ops: ops || {}});
  },
  push: function(key, value, ops) {
    if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/plexidev');
    if (!value && value != 0) throw new TypeError('Must specify a value to push // Ex. db.push(\'key\', value) // Request Support at discord.gg/WYH6n6w');
    return arbitrate('push', {stringify: true, id: key, data: value, ops: ops || {}});
  },
  delete: function(key, ops) {
    if (!key) throw new TypeError('No key specified // Ex. db.delete(\'key\') // Request Support at discord.gg/WYH6n6w');
    return arbitrate('delete', {id: key, ops: ops || {}});
  },
  has: function(key, ops) {
    if (!key) throw new TypeError('No key specified // Ex. db.has(\'key\') // Request Support at discord.gg/WYH6n6w');
    return arbitrate('has', {id: key,  ops: ops || {}});
  },
  includes: function(key, ops) {
    if (!key) throw new TypeError('No key specified // Ex. db.includes(\'key\') // Request Support at discord.gg/WYH6n6w');
    return arbitrate('has', {id: key,  ops: ops || {}});
  },
  all: function(ops) { 
    return arbitrate('all', {ops: ops || {}});
  }
  
}

function arbitrate(method, params,) {

  // Verify Options
  if (params.ops.target && params.ops.target[0] === '.') params.ops.target = params.ops.target.slice(1); // Remove prefix if necessary
  if (params.data && params.data === Infinity) throw new TypeError(`You cannot set Infinity into the database @ ID: ${params.id}`)
  
  // Stringify
  if (params.stringify) {
    try { params.data = JSON.stringify(params.data); } catch (e) 
    { throw new TypeError(`Please supply a valid input @ ID: ${params.id}\nError: ${e.message}`); } 
  }
  
  // Translate dot notation from keys
  if (params.id && params.id.includes('.')) {
    let unparsed = params.id.split('.');
    params.id = unparsed.shift();
    params.ops.target = unparsed.join('.');
  }
  
  // Run & Return Method
  return methods[method](db, params);
  
}