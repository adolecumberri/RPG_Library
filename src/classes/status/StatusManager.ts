import { statusAppliedOn } from "../../interfaces/status.interface"
import TemporalStatus from "./TemporalStatus"

class StatusManager {

    statusActives: TemporalStatus[] = []

    add ( status: TemporalStatus ) {
        this.statusActives.push(status)
    }

    remove ( ){

    }

    activateStatus ( appliedOn: statusAppliedOn ) {

    }

}

export default StatusManager
