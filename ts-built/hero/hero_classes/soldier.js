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
exports.Soldier = void 0;
const Hero_1 = require("../Hero");
class Soldier extends Hero_1.Hero {
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
        //Head Shot
        this.skillProb = 0.23;
        this.skillDuration = 0;
        //Tortoise Form
        this.skill = () => {
            this.heroEfects.def = 18;
            this.skillDuration = 3;
            //stats
            // this.fightStats.addSkillUses();
        };
        this.skillOff = () => (this.heroEfects.def = 0);
        this.end = () => {
            //skill defender
            if (this.skillDuration === 0 && this.skillProb > this.getProb()) {
                this.skill();
            }
            else {
                this.skillDuration = this.skillDuration - 1 > 0 ? this.skillDuration - 1 : 0;
                if (this.skillDuration === 0) {
                    this.skillOff();
                }
            }
            // return this.isDead;
        };
        this.defend = (enemi) => __awaiter(this, void 0, void 0, function* () {
            let { currentHp, def, evasion } = this.heroStats;
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
        });
    }
}
exports.Soldier = Soldier;
