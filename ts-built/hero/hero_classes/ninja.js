"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ninja = void 0;
const Hero_1 = require("../Hero");
class Ninja extends Hero_1.Hero {
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
        //BACK STAB
        this.skillProb = 0.19;
        //skill: any = (damage: number) => damage * 2.05;
        this.skill = () => {
            let { dmg, critDmg, accuracy, crit } = this.heroStats;
            let damage = 0;
            //statas
            // this.fightStats.addSkillUses();
            for (let i = 0; i < 3; i++) {
                if (accuracy > this.getProb()) {
                    if (crit > this.getProb()) {
                        // this.fightStats.addCrit();
                        damage += this.rand(dmg * (critDmg + 1) * 0.85, dmg * (critDmg + 1) * 1.15 * 0.7);
                    }
                    else {
                        // this.fightStats.addHit();
                        damage += this.rand(dmg * 0.85, dmg * 1.15 * 0.7);
                    }
                }
            }
            return damage;
        };
        this.skillUsed = false;
        //HIT
        this.attack = () => {
            let { accuracy, crit, critDmg, dmg } = this.heroStats;
            let damage = 0;
            if (this.skillProb < this.getProb()) {
                damage = this.skill();
            }
            else {
                if (accuracy > this.getProb()) {
                    //golpeo?
                    if (crit > this.getProb()) {
                        // this.fightStats.addCrit();
                        //critico
                        damage = this.rand(dmg * (critDmg + 1) * 0.85, dmg * (critDmg + 1) * 1.15);
                    }
                    else {
                        // this.fightStats.addHit();
                        damage = this.rand(dmg * 0.85, dmg * 1.15);
                    }
                }
                else {
                    // this.fightStats.addMiss();
                }
            }
            this.calcNextTurn();
            return damage;
        };
    }
}
exports.Ninja = Ninja;
