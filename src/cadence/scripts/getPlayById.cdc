import TopShot from 0x877931736ee77cff

pub fun main(playID: UInt32): {String:String} {

    let metadata = TopShot.getPlayMetaData(playID: playID) ?? panic("Play doesn't exist")

    return metadata
}
