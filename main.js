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
    if (harvesters.length < 2) {
        Game.spawns['Spawn1'].createCustomCreep(Game.spawns['Spawn1'].room.energyAvailable, 'harvester', [WORK, WORK, MOVE]);
    } else if (transporter < 2) {
        Game.spawns['Spawn1'].createCustomCreep(Game.spawns['Spawn1'].room.energyAvailable, 'transporter', [CARRY, CARRY, MOVE]);
    } else if (builders.length < 2) {
        Game.spawns['Spawn1'].createCustomCreep(Game.spawns['Spawn1'].room.energyAvailable, 'builder', [WORK, CARRY, MOVE]);
    } else if (upgrader.length < 2) {
        Game.spawns['Spawn1'].createCustomCreep(Game.spawns['Spawn1'].room.energyAvailable, 'upgrader', [WORK, CARRY, MOVE]);
    }



    console.log('Energy in Room ' + Game.spawns['Spawn1'].room.name + ' is ' + Game.spawns['Spawn1'].room.energyAvailable);
}