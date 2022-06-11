
interface IStats {
    accuracy?: number;
    attack?: number;
    attack_interval?: number;
    attack_speed?: number;
    crit?: number;
    critDamage?: number;
    currentHp?: number;
    defence?: number;
    evasion?: number;
    hp?: number;
    [x: string]: any;
} 

export {IStats}