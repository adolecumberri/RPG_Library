
interface IStats {
    accuracy?: number;
    attack?: number;
    att_interval?: number;
    att_speed?: number;
    crit?: number;
    critDamage?: number;
    currentHp?: number;
    defence?: number;
    evasion?: number;
    hp?: number;
    [x: string]: any;
} 

export {IStats}