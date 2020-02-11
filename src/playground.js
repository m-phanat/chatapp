const mongoose = require('mongoose')
const mongooseURL = `mongodb://localhost/chatapp`
mongoose.set('useCreateIndex', true)
mongoose.connect(mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB: ', mongooseURL)
}).catch((err) => {
    console.log('Could not connect to MongoDB: ', err)
})

const Account = require('../src/model/account')
const Device = require('../src/model/device')
const DeviceRoomStatus = require('../src/model/devicrRoomStatus')
const Room = require('./model/room')
const AccountInRoom = require('./model/accountInRoom')
const Message = require('./model/message')
const GroupMessage = require('./model/groupMessage')

console.log('Playground Start')

function createAccount() {
    var accountA = new Account()
    accountA.sqlId = '1',
    accountA.username = 'AccountA'
    accountA.displayName = 'IS ACCOUNT A!!'
    accountA.companyId = '99'

    accountA.save((err, result) => {
        if (err) {
            console.log('AccountA Save Fail')
        }
        console.log('AccountA Save Done')
    })
    var accountB = new Account()
    accountB.sqlId = '2',
    accountB.username = 'AccountB'
    accountB.displayName = 'IS ACCOUNT B!!'
    accountB.companyId = '99'

    accountB.save((err, result) => {
        if (err) {
            console.log('AccountB Save Fail')
        }
        console.log('AccountB Save Done')
    })

    var accountC = new Account()
    accountC.sqlId = '3',
    accountC.username = 'AccountC'
    accountC.displayName = 'IS ACCOUNT C!!'
    accountC.companyId = '99'

    accountC.save((err, result) => {
        if (err) {
            console.log('AccountC Save Fail')
        }
        console.log('AccountC Save Done')
    })
}

function accountAAuth() {
    Account.findOne({
        sqlId: '1'
    }, (err, account) => {
        if (err) {
            console.log(err)
        }
        console.log(account)
        var newDevice = new Device()
        newDevice.uuid = 'CAT1234$$##'
        account.devices.push(newDevice)
        account.save((result, err) => {
            if (err) {
                console.log(err)
            }
            console.log('auth done')
        })
    })
}

function getAllAccount() {
    return new Promise((resolve, reject) => {
        Account.find({}, (err, accounts) => {
            if (err) {
                reject(err)
            }
            if (!accounts) {
                reject('error')
            } else {
                resolve(accounts)
            }
        })
    })
}
async function createRoom() {
    var newRoom = new Room()
    var all = await getAllAccount()
    
    var accountInRoom = []
    all.forEach(a => {
        var newAccountInRoom = new AccountInRoom()
        newAccountInRoom._id = a._id
        accountInRoom.push(newAccountInRoom)
    })

    newRoom.createdBy = accountInRoom[0]._id
    newRoom.users = accountInRoom

    console.log(newRoom)

    newRoom.save((err, result) => {
        if (err) {
            console.log(err)
            
        }
        console.log('create room done')

        var newGroupMessage = new GroupMessage()
        newGroupMessage.groupKey = newRoom._id
        newGroupMessage.save((err, result) => {
            if (err) {
                console.log(err);
                
            }
            console.log('create group')
            // var newDeviceRoomStatus = new DeviceRoomStatus()
            // newDeviceRoomStatus.roomId = newRoom._id

            // Account.updateOne({
            //     _id: newRoom.createdBy
            // }, {
            //     $push: {
            //         'devices.$[d].rooms': newDeviceRoomStatus
            //     }
            // }, {
            //     arrayFilters: [
            //         {
            //             'd.uuid': 'CAT1234$$##'
            //         }
            //     ]
            // }, (err, result) => {

            // })

        })

        
    })
}

function createMessage() {
    
    var newMessage = new Message()
    newMessage.sender = mongoose.Types.ObjectId('5e12dec94f6fc10fcdd70465')
    newMessage.text = 'Fury is here'
    newMessage.kind = 'Text'
    newMessage.save((err, result) => {
        if (err) {
            console.log(err);
            
        }
        console.log(result);
        
    })
}
// ## Create Account Dummy ##
// createAccount()
// ## AccountA Auth ##
// accountAAuth()


// createRoom()
createMessage()
// var cat = 'Cat'
// console.log(cat)
// var newDevice = new Device()
// newDevice.uuid = 'CAT1234'

// var newRoom = new Room()
// newRoom.name = "NEW ROOM HERE"
// newRoom.save(function (err) {
//     if (err) {
//         console.log(err)
//     }
//     console.log('done 2')
// })
// console.log(newRoom._id)

// var newDeviceRoomStatus = new DeviceRoomStatus()
// newDeviceRoomStatus.isShow = true
// newDeviceRoomStatus.roomId = newRoom._id

// newDevice.rooms.push(newDeviceRoomStatus)

// var newAccount = new Account()
// newAccount.sqlId = '1'
// newAccount.devices.push(newDevice)
// newAccount.save(function(err) {
//     if (err) {
//         console.log(err)
//     }
//     console.log('done')
// })