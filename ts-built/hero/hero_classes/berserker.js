"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Berserker = void 0;
const Hero_1 = require("../Hero");
class Berserker extends Hero_1.Hero {
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
        //RAGE
        this.skillProb = 1;
        this.skill = () => {
            //stats
            // this.fightStats.addSkillUses();
            this.heroEfects = { dmg: +22, def: -16, att_interval: -4 };
        };
        this.skillUsed = false;
        this.attack = () => {
            let { accuracy, crit, critDmg, dmg } = this.heroStats;
            let { dmg: dmgEf } = this.heroEfects;
            let damage = 0;
            if (accuracy > this.getProb()) {
                //golpeo?
                if (crit > this.getProb()) {
                    //critico
                    damage = this.rand((dmg + dmgEf) * (critDmg + 1) * 0.85, (dmg + dmgEf) * (critDmg + 1) * 1.15);
                    //stats
                    // this.fightStats.addCrit();
                }
                else {
                    //stats
                    // this.fightStats.addHit();
                    damage = this.rand((dmg + dmgEf) * 0.85, (dmg + dmgEf) * 1.15);
                }
            }
            else {
                // this.fightStats.addMiss();
            }
            this.calcNextTurn(this.heroEfects.att_interval);
            return damage;
        };
        this.defend = (enemi) => __awaiter(this, void 0, void 0, function* () {
            let { hp, currentHp, def, evasion } = this.heroStats;
            let { def: defEffect } = this.heroEfects;
            let finalDamage = 0;
            if (evasion <= this.getProb()) {
                //Evade o no.
                let enemiAttack = enemi.attack();
                let attMultiplier = 40 / (40 + def + defEffect);
                finalDamage = Math.round(enemiAttack * attMultiplier);
                //Stats
                // enemi.fightStats.set('total_damage', enemi.fightStats.get('total_damage') + finalDamage);
                // this.fightStats.addHitReceived();
            }
            else {
                enemi.calcNextTurn(enemi.heroEfects.att_interval);
                //stats
                // this.fightStats.addEvasion();
            }
            this.heroStats.currentHp = currentHp - finalDamage > 0 ? currentHp - finalDamage : 0; //
            //stats
            // this.fightStats.set('currhp', this.heroStats.currentHp);
            if (this.heroStats.currentHp === 0) {
                this.isDead = true;
            }
            else {
                if (this.heroStats.currentHp <= hp * 0.3 && !this.skillUsed) {
                    this.skill();
                    this.skillUsed = true;
                }
            }
        });
    }
}
exports.Berserker = Berserker;
