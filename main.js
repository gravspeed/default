var inventory = require('sub.inventory')
var manage = require('sub.manage')
var construct = require('sub.construct')
var pathfinder = require('sub.pathfinder')
var clearsites = require('sub.clearsites')
 
var harvester = require('role.harvester')
var carrier = require('role.carrier')
var upgrader = require('role.upgrader')
var builder = require('role.builder')

module.exports.loop = function () {
    console.log('running main')

    inventory.run()

    manage.run()
 
    construct.run()  

    pathfinder.run() 
    //clearsites.run()

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            harvester.run(creep)
        }
        if (creep.memory.role == 'carrier') {
            carrier.run(creep)
        }
        if (creep.memory.role == 'upgrader') {
            upgrader.run(creep);
        }
        if (creep.memory.role == 'builder') { 
            builder.run(creep);
        }
    }



    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}