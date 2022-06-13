import Character from '../classes/Character'

describe('Character tests', () => {

    const stats = {
        correct_basic_stats: {
            accuracy: 1,
            attack: 1,
            att_interval: 1,
            att_speed: 1,
            crit: 0,
            critDamage: 1,
            currentHp: 0,
            deffence: 0,
            evasion: 0,
            hp: 0,
        },
        incorrect_high_stats: {
            accuracy: -11,
            attack: -43,
            att_interval: -23,
            att_speed: 0,
            crit: -1,
            critDamage: 0,
            currentHp: -9,
            deffence: 0,
            evasion: -9,
            hp: -4,
        },
        base_stats: {
            accuracy: 1,
            attack: 1,
            currentHp: 0,
            hp: 0,
        }
    }

    const expected_basic_stats = {
        "accuracy": 1,
        "att_interval": 1,
        "att_speed": 1,
        "attack": 1,
        "crit": 0,
        "critDamage": 1,
        "currentHp": 0,
        "deffence": 0,
        "evasion": 0,
        "hp": 0
    }

    const expected_basic_object = {
        "actions": undefined,
        "alive": true,
        "checkErrors": jest.fn(),
        "getProb": jest.fn(),
        "rand": jest.fn(),
        "stats": expected_basic_stats
    }
    
    // test('Character Constructor is called', ()=> {
    //     jest.mock('../classes/Character') // Character is now a mock constructor.
    //     let char = new Character()
    //     expect(char).toHaveBeenCalledTimes(1);
    // })

    test('Created Character without params', () => {
        let char = new Character()

        expect(char.stats).toEqual(stats.base_stats)
    })

    test('Created Character with correct Stats', () => {
        let char = new Character({
            stats: stats.correct_basic_stats
        })

        expect(typeof char).toBe('object')
        console.log(char)
        expect (char.stats).toStrictEqual( stats.correct_basic_stats )
    })

    test('Created Character with wrong Stats', () => {
        let char = new Character({
            stats: stats.incorrect_high_stats
        })

        //TODO: when error bransh will be pushed, this will work.
        expect(() => char).not.toThrowError(Error)
    })

})
