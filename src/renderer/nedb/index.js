import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

//对应订单表
export default new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/paydata.db')
})