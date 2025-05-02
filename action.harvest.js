const { filter } = require("lodash");

var actionHarvest = {
    run: function(creep){
        var target = creep.pos.findClosestByPath(FIND_SOURCES,{
            filter: (s) => {
                var creeps = s.pos.findInRange(FIND_MY_CREEPS, 1);
                return (creeps.length == 0 || (creeps.length == 1 && creeps[0].id == creep.id));
            }
        });
        creep.moveTo(target, {
            visualizePathStyle: {
                stroke: '#ffaa00'
            }
        });
        creep.harvest(target);
    }
};
module.exports = actionHarvest;