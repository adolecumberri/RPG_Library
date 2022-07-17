
interface IStats {
    accuracy?: number;
    attack?: number;
    attack_interval?: number;
    attack_speed?: number;
    crit?: number;
    crit_multiplier?: number;
    current_hp?: number;
    defence?: number;
    evasion?: number;
    hp?: number;
    [x: string]: any;
} 

export {IStats}