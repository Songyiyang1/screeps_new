module.exports = function () {
    // create a new function for StructureSpawn
    const harvesterBody = [MOVE, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, WORK, WORK, WORK, WORK, WORK, WORK,];
    const transporterBody = [MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY];
    const builderBody = [MOVE, WORK, CARRY, MOVE, WORK, MOVE, WORK, CARRY, MOVE, WORK, MOVE, WORK, CARRY, MOVE, WORK,];
    const upgraderBody = [MOVE, WORK, CARRY, WORK, WORK, MOVE, WORK, CARRY, WORK, WORK, MOVE, WORK, CARRY, WORK, WORK, MOVE, WORK, CARRY, WORK, WORK,];
    StructureSpawn.prototype.init =
        function () {
            var sources = this.room.find(FIND_SOURCES);
            for (let source of sources) {
                source.pos.createFlag(source.id, COLOR_YELLOW, COLOR_YELLOW);
            }
        };
    StructureSpawn.prototype.createCustomCreep =
        function (energy, roleName) {
            // create a balanced body as big as possible with the given energy
            //MOVE 	50; WORK 	100; CARRY 	50; ATTACK 	80; RANGED_ATTACK 	150; HEAL 	250; CLAIM 	600; TOUGH 	10;
            var body = [];
            var sum = 0;
            switch (roleName) {
                case 'harvester':
                    Parts = harvesterBody;
                    break;
                case 'transporter':
                    Parts = transporterBody;
                    break;
                case 'builder':
                    Parts = builderBody;
                    break;
                case 'upgrader':
                    Parts = upgraderBody;
                    break;
            }
            var i = 0;
            while (sum < energy) {
                switch (Parts[i]) {
                    case MOVE:
                        sum += 50;
                        break;
                    case WORK:
                        sum += 100;
                        break;
                    case CARRY:
                        sum += 50;
                        break;
                    case ATTACK:
                        sum += 80;
                        break;
                    case RANGED_ATTACK:
                        sum += 150;
                        break;
                    case HEAL:
                        sum += 250;
                        break;
                    case CLAIM:
                        sum += 600;
                        break;
                    case TOUGH:
                        sum += 10;
                        break;
                }
                if (sum <= energy) {
                    body.push(Parts[i]);
                    i++;
                } else break;
            }
            var newName = roleName + Game.time;
            console.log('Spawning new creep: ' + newName);

            // create creep with the created body and the given role
            return this.spawnCreep(body, newName, {
                memory: {
                    role: roleName,
                    working: false
                }
            });
        };
    StructureSpawn.prototype.createLongCreep =
        function (energy, roleName, Parts, target) {
            // create a balanced body as big as possible with the given energy
            //MOVE 	50; WORK 	100; CARRY 	50; ATTACK 	80; RANGED_ATTACK 	150; HEAL 	250; CLAIM 	600; TOUGH 	10;
            var body = [];
            var sum = 0;
            for (let i = 0; i < Parts.length; i++) {
                switch (Parts[i]) {
                    case MOVE:
                        sum += 50;
                        break;
                    case WORK:
                        sum += 100;
                        break;
                    case CARRY:
                        sum += 50;
                        break;
                    case ATTACK:
                        sum += 80;
                        break;
                    case RANGED_ATTACK:
                        sum += 150;
                        break;
                    case HEAL:
                        sum += 250;
                        break;
                    case CLAIM:
                        sum += 600;
                        break;
                    case TOUGH:
                        sum += 10;
                        break;
                }
                if (sum <= energy) {
                    body.push(Parts[i]);
                } else break;
            }

            var newName = roleName + Game.time;
            console.log('Spawning new creep: ' + newName);

            // create creep with the created body and the given role
            return this.spawnCreep(body, newName, {
                memory: {
                    role: roleName,
                    working: false,
                    targetRoom: target,
                    home: this.pos.roomName
                }
            });
        }
};