var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var source = creep.pos.findClosestByRange(FIND_SOURCES, {
            filter: s => {
                creeps = s.pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: (Object) => {
                        return Object.memory.role == 'harvester' && Object != creep;
                    }
                });
                return creeps.length == 0;
            }
        });
        var container = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => {
                return s.structureType == STRUCTURE_CONTAINER;
            }
        })[0];
        /*var source = source.pos.findClosestByRange(FIND_MY_STRUCTURES, 1, {
            filter: (s) => {
                return s.structureType == STRUCTURE_CONTAINER;
            }
        });

        var flags = creep.room.find(FIND_FLAGS, {
            filter: (Object) => {
                return Object.color == COLOR_YELLOW && Object.secondaryColor == COLOR_YELLOW;
            }
        });

        for (let flag of flags) {
            if (flag.memory.visiter == 'no') {
                flag.memory.visiter = creep.name;
                console.log(flag.name + " " + flag.memory.visiter + " " + creep.name);
                var target = flag;
                break;
            } else {
                console.log('exit');
            }
        }
        var source = creep.room.find(FIND_SOURCES, {
            filter: (Object) => {
                creeps = Object.pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: (c) => {
                        return c.memory.role == 'harvester' && c != creep;
                    }
                });
                return creeps.length == 0;
            }
        })[0];*/
        creep.harvest(source);
        if (container) {
            creep.moveTo(container, {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            });
        }
        else {
            creep.moveTo(source, {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            });
        }
        /*var link = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (Object) => {
                return Object.structureType == STRUCTURE_LINK;
            }
        });
        var containers = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => {
                return s.structureType == STRUCTURE_CONTAINER;
            }
        });
        creep.transfer(containers, RESOURCE_ENERGY);
        creep.transfer(link, RESOURCE_ENERGY);
        if (creep.body) {
            var store = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_SPAWN) &&
                        s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY);
                }
            });
            if (creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(RESOURCE_ENERGY && creep.transfer(store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)) {
                creep.moveTo(store, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }*/
    }
};

module.exports = roleHarvester;