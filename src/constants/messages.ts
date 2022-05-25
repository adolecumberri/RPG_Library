let M =  {
    errors: { 
        logical: {
            // max_min_crossed: 'Maximun must be lower than minimum.'
        },
        out_of_bounds: {
            between_one_and_zero: (name:string)=> `${name} must have a value between zero and one. (it's a %, 0 never and 1 always) `,
            lower_than_zero: (name:string)=> `${name} must have a value  higher than 0 `,
            lower_than_one: (name:string)=> `${name} must have a value higher than 1 `,
            // accuracy: 'Accuracy must be greater than 0 to be able to hit.',
            // attack_speed: 'Attack speed must have a value higher than 0',
            // crit: "Critical probabilities must have a value between zero and one. (it's a %, 0 never and 1 always)", 
            // damage: ' must have a value higher than 0',
            // evasion: "Evasion must have a value between zero and one",
            // max_variation: 'MaxVariation must have a value higher than 0',
            // min_damage: 'minDamage must have a value higher or equal to 0',
            // min_variation: "MinVariation must have a value between 0 and 1 (it's a %, 0 never and 1 always)",
            // variation: 'Variation must have a value between 0 and 1',
        },
        types: {
            // wrong_id: 'Id must be a number or a string'
        }
    }
}


export default M;