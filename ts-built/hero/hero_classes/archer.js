"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Archer = void 0;
const Hero_1 = require("../Hero");
class Archer extends Hero_1.Hero {
    constructor() {
        super(...arguments);
        //Propiedades.
        this.heroEfects = {
            dmg: 0,
            def: 0,
            att_interval: 0,
        }; //E stados cambiados
        //Haste
        this.skillProb = 0.23;
        this.skill = () => {
            // this.fightStats.addSkillUses();
            this.heroEfects.att_interval = -2;
        };
        this.skillUsed = null;
        //HIT
        this.attack = () => {
            let { accuracy, crit, critDmg, dmg } = this;
            let { dmg: dmgEf } = this.heroEfects;
            let damage = 0;
            if (accuracy > this.getProb()) {
                //golpeo?
                if (crit > this.getProb()) {
                    //stats
                    // this.fightStats.addCrit();
                    //critico
                    damage = this.rand((dmg + dmgEf) * (critDmg + 1) * 0.85, (dmg + dmgEf) * (critDmg + 1) * 1.15);
                }
                else {
                    // this.fightStats.addHit();
                    damage = this.rand((dmg + dmgEf) * 0.85, (dmg + dmgEf) * 1.15);
                }
            }
            else {
                // this.fightStats.addMiss();
            }
            //archer Skill
            if (this.skillProb > this.getProb()) {
                this.skill();
            }
            else {
                this.heroEfects.att_interval = 0;
            }
            this.calcNextTurn(this.heroEfects.att_interval);
            return damage;
        };
    }
}
exports.Archer = Archer;
