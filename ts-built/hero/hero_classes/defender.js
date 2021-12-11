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
exports.Defender = void 0;
const Hero_1 = require("../Hero");
class Defender extends Hero_1.Hero {
    constructor() {
        // constructor(data: IHero) {
        // 	super({ ...data, curr_att_interval: data.att_interval });
        // }
        super(...arguments);
        this.heroEfects = {
            dmg: 0,
            def: 0,
            att_interval: 0,
        }; //E stados cambiados
        //THORNMAIL
        this.skillProb = 1;
        this.skill = (damage) => {
            // this.fightStats.addSkillUses();
            return Math.floor(7 + damage * 0.2);
        };
        this.skillUsed = false;
        //CALC DAMAGE AFTER BLOCKING
        this.defend = (enemi) => __awaiter(this, void 0, void 0, function* () {
            let { currentHp, def, evasion } = this.heroStats;
            let finalDamage = 0;
            if (evasion <= this.getProb()) {
                //Evade o no.
                let enemiAttack = enemi.attack();
                let attMultiplier = 40 / (40 + def);
                finalDamage = Math.round(enemiAttack * attMultiplier);
                //if he hits, I use the skill.
                let skillDmg = this.skill(finalDamage);
                enemi.straightDamage(skillDmg);
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
exports.Defender = Defender;
