import StatusManager from "../classes/status/StatusManager"
import TemporalStatus from "../classes/status/TemporalStatus"

describe('', ( ) => {

    let status1 = new TemporalStatus ({
        statAffected: 'hp'
    })

    let status2 = new TemporalStatus ({
        statAffected: 'hp'
    })

    let status3 = new TemporalStatus ({
        statAffected: 'hp'
    })

    test('Status Manager can load status', () =>{
        let sm = new StatusManager()
        expect(sm).toEqual({status: []})
        expect(sm.status.length).toBe(0)

        sm.add(status1)
        expect(sm.status.length).toBe(1)

        sm.add([status2,status3])
        expect(sm.status.length).toBe(3)
    })
})