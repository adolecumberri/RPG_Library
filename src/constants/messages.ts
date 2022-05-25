let M =  {
    errors: { 
        out_of_bounds: {
            crit: "Critical probabilities must have a value between zero and one. (it's a %, 0 never and 1 always)", 
            evasion: "Evasion must have a value between zero and one",
            variation: 'Variation must have a value between 0 and 1',
            max_variation: 'MaxVariation must have a value higher than 0',
            min_variation: "MinVariation must have a value between 0 and 1 (it's a %, 0 never and 1 always)",
            accuracy: 'Accuracy must be greater than 0 to be able to hit.',
            attack_speed: 'Attack speed must have a value higher than 0',
            damage: ' must have a value higher than 0',
            min_damage: 'minDamage must have a value higher or equal to 0',
        },
        types: {
            wrong_id: 'Id must be a number or a string'
        },
        logical: {
            max_min_crossed: 'Maximun must be lower than minimum.'
        }

    }
}


export default M;