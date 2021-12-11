"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sniper = void 0;
const Hero_1 = require("../Hero");
class Sniper extends Hero_1.Hero {
    constructor() {
        // constructor(data: IHero) {
        // 	super({ ...data, curr_att_interval: data.att_interval });
        // }
        super(...arguments);
        //Propiedades.
        this.heroEfects = {
            dmg: 0,
            def: 0,
            att_interval: 0,
        }; //E stados cambiados
        this.skillProb = 1;
        //Head Shot
        this.skill = () => { }; //the skill is on the attack
        this.skillUsed = true;
        this.attack = (dmgEf = 0) => {
            let { accuracy, crit, critDmg, dmg } = this.heroStats;
            let damage = 0;
            if (this.skillUsed) {
                // this.fightStats.addSkillUses();
                if (0.75 > this.getProb()) {
                    //golpeo?
                    if (crit > this.getProb()) {
                        //stats
                        // this.fightStats.addCrit();
                        //critico
                        damage = this.rand((dmg + dmgEf) * (critDmg + 1) * 0.95, (dmg + dmgEf) * (critDmg + 1) * 1.15);
                        //console.log(`${id}.${name} ${surname}: ${damage}dmg!`);
                    }
                    else {
                        //stats
                        // this.fightStats.addHit();
                        damage = this.rand((dmg + dmgEf) * 0.95, (dmg + dmgEf) * 1.15);
                        //console.log(`${id}.${name} ${surname}: ${damage}dmg`);
                    }
                }
                else {
                    // this.fightStats.addMiss();
                }
                this.skillUsed = false; //Apago la skill
            }
            else {
                if (accuracy > this.getProb()) {
                    //golpeo?
                    if (crit > this.getProb()) {
                        //stats
                        // this.fightStats.addCrit()
                        //critico
                        damage = this.rand((dmg + dmgEf) * (critDmg + 1) * 0.85, (dmg + dmgEf) * (critDmg + 1) * 1.15);
                        //console.log(`${id}.${name} ${surname}: ${damage}dmg!`);
                    }
                    else {
                        //stats
                        // this.fightStats.addHit();
                        damage = this.rand((dmg + dmgEf) * 0.85, (dmg + dmgEf) * 1.15);
                        //console.log(`${id}.${name} ${surname}: ${damage}dmg`);
                    }
                }
                else {
                    // this.fightStats.addMiss();
                }
                this.calcNextTurn();
            }
            return damage;
        };
        this.start = () => this.skill();
    }
}
exports.Sniper = Sniper;
