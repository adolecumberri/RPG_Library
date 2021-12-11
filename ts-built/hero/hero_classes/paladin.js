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
exports.Paladin = void 0;
const Hero_1 = require("../Hero");
class Paladin extends Hero_1.Hero {
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
        //BLESSING -- se usa fuera
        this.skillProb = 0.23;
        this.skill = () => {
            //stats
            // this.fightStats.addSkillUses();
            this.heroStats.currentHp = this.rand(this.heroStats.hp * 0.3, this.heroStats.hp * 0.4);
        };
        this.skillUsed = false;
        this.defend = (enemi) => __awaiter(this, void 0, void 0, function* () {
            let { currentHp, def, evasion } = this.heroStats;
            let finalDamage = 0;
            if (evasion <= this.getProb()) {
                //Evade o no.
                let enemiAttack = enemi.attack();
                let attMultiplier = 40 / (40 + def);
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
            this.heroStats.currentHp = currentHp - finalDamage >= 0 ? currentHp - finalDamage : 0; //
            //stats
            // this.fightStats.set('currhp', this.heroStats.currentHp);
            if (this.heroStats.currentHp === 0) {
                this.isDead = true;
            }
        });
        this.end = () => {
            if (this.heroStats.currentHp < this.heroStats.hp * 0.6 && this.skillProb > this.getProb()) {
                this.skill();
            }
        };
    }
}
exports.Paladin = Paladin;
