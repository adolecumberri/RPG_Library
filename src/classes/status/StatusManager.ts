import discriminators from "../../constants/discriminators"
import { statusAppliedOn } from "../../interfaces/status.interface"
import TemporalStatus from "./TemporalStatus"

class StatusManager {

    status: TemporalStatus[] = []

    //overloads
    add(status: TemporalStatus): void
    add(status: TemporalStatus[]): void 
    add ( status ) {

        if( (<TemporalStatus>status).discriminator === discriminators.TEMPORAL_STATUS ){
            this.status.push(status)
        }else{
            this.status = this.status.concat(status)
        }
        this.status
    }


    remove ( id: number ){
        this.status = this.status.filter( c => c.id != id )
    }

    activateStatus ( appliedOn: statusAppliedOn ) {
        this.status.forEach( status => {
            //if appliedOn when intended, it activates
            status.appliedOn === appliedOn && status.activate()
            //if status is not active the status is removed
            !status.isActive && this.remove(status.id)
        })
    }

    getStatusByAppliedOn ( appliedOn: statusAppliedOn){
        return this.status.filter( c => c.appliedOn === appliedOn )
    }

}

export default StatusManager
