require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleTransporter = require('role.transporter');

module.exports.loop = function () {
    var harvesters = [];
    var builders = [];
    var upgrader = [];
    var transporter = [];
    if (!Memory.creeps) Game.spawns['Spawn1'].init(); //初始化内存
    else {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            } else {
                switch (Game.creeps[name].memory.role) {
                    case 'harvester':
                        harvesters.push(Game.creeps[name]);
                        break;
                    case 'builder':
                        builders.push(Game.creeps[name]);
                        break;
                    case 'upgrader':
                        upgrader.push(Game.creeps[name]);
                        break;
                    case 'transporter':
                        transporter.push(Game.creeps[name]);
                        break;
                }
                var creep = Game.creeps[name];
                creep.say(creep.memory.role);
                switch (creep.memory.role) {
                    case 'harvester':
                        roleHarvester.run(creep);
                        break;
                    case 'upgrader':
                        roleUpgrader.run(creep);
                        break;
                    case 'builder':
                        roleBuilder.run(creep);
                        break;
                    case 'transporter':
                        roleTransporter.run(creep);
                        break;
                }
            }
        }
    }
    var energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
    if (!Game.spawns['Spawn1'].spawning && energyAvailable >= 250) {
        if (harvesters.length < 2) {
            Game.spawns['Spawn1'].createCustomCreep(energyAvailable, 'harvester');
        } else if (transporter < 2) {
            Game.spawns['Spawn1'].createCustomCreep(energyAvailable, 'transporter');
        } else if (Game.spawns['Spawn1'].pos.findClosestByPath(FIND_CONSTRUCTION_SITES) != null && builders.length < 2) {
            Game.spawns['Spawn1'].createCustomCreep(energyAvailable, 'builder');
        } else if (upgrader.length < 2) {
            Game.spawns['Spawn1'].createCustomCreep(energyAvailable, 'upgrader');
        }
    }




    console.log('Energy in Room ' + Game.spawns['Spawn1'].room.name + ' is ' + energyAvailable);
}