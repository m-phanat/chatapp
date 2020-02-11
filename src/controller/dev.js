const mongoose = require('mongoose')
const express = require('express')

const Room = require('../model/room')
const GroupMessage = require('../model/groupMessage')
const Account = require('../model/account')
const Message = require('../model/message')
const Device = require('../model/device')
const DeviceRoomStatus = require('../model/devicrRoomStatus')

const {
    accountResponse,
    errorStatusCode
} = require('../function/response')

async function getAllAccount() {
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
async function getAccount(accountId) {
    return new Promise((resolve, reject) => {
        Account.findOne({
            _id: mongoose.Types.ObjectId(accountId)
        }, (err, account) => {
            if (err) {
                reject(err)
            }
            if (!account) {
                reject('error')
            } else {
                resolve(account)
            }
        })
    })
}
async function addRoom(room) {
    return new Promise((resolve, reject) => {
        room.save((err, result) => {
            if (err) {
                reject(err)
            }
            if (!result) {
                reject('result is nil')
            } else {
                resolve(result)
            }
        })
    })
}
async function addGroup(group) {
    return new Promise((resolve, reject) => {
        group.save((err, result) => {
            if (err) {
                reject(err)
            }
            if (!result) {
                reject('result is nil')
            } else {
                resolve(result)
            }
        })
    })
}
async function addMessage(roomId, message) {
    return new Promise((resolve, reject) => {
        const result = GroupMessage.updateOne({
            _id: roomId
        }, {
            $push: {
                'messages': message
            }
        }, (err, result) => {
            if (err) {
                reject(err)
            }
            if (!result) {
                reject('error')
            } else {
                resolve(result)
            }
        })
    })
}
async function countMessageInGroup(roomId) {
    return new Promise((resolve, reject) => {
        const result = GroupMessage.aggregate([
            {
                $match: {
                    '_id': mongoose.Types.ObjectId(roomId)
                }
            },
            {
                $project: {
                    'numberOfMessage': {
                        $size: '$messages'
                    }
                }
            }
        ], function(err, result) {
            if (err) {
                reject(err)
            }
            if (!result) {
                reject('error')
            } else {
                resolve(result)
            }
        })
    })
}
async function getRoom(roomId) {
    return new Promise((resolve, reject) => {
        const result = Room.findOne({
            _id: roomId
        }, (err, result) => {
            if (err) {
                reject(err)
            }
            if (!result) {
                reject('error')
            } else {
                resolve(result)
            }
        })
    })
}
async function updateDeviceRoomStatusStartMessageId(accountId, uuid, message, room) {
    return new Promise((resolve, reject) => {
        const result = Account.updateOne({
            _id: accountId
        }, {
            $set: {
                'devices.$[d].rooms.$[r].startMessageId': message._id
            }
        },
        {
            arrayFilters: [
                {
                    'd.uuid': uuid
                },
                {
                    'r.roomId': room._id
                }
            ]
        }, (err, result) => {
            if (err) {
                reject(err)
            }
            if (!result) {
                reject('error')
            } else {
                resolve(result)
            }
        })
    })
}
async function accountAuth(sqlId, uuid) {
    return new Promise((resolve, reject) => {
        const result = Account.findOne({
            sqlId: sqlId
        }, (err, account) => {
            if (err) {
                reject(err)
            }
            if (!account) {
                reject('error')
            } else {
                var newDevice = new Device()
                newDevice.uuid = uuid
                account.devices.push(newDevice)
                account.save((err, result) => {
                    if (err) {
                        reject(err)
                    }
                    if (!result) {
                        reject('error')
                    } else {
                        resolve(result)
                    }
                })
            }
        })
    })
}
async function addDeviceRoomStatus(accountId, uuid, deviceRoomStatus) {
    return new Promise((resolve, reject) => {
        const result = Account.updateOne({
            _id: mongoose.Types.ObjectId(accountId)
        }, {
            $push: {
                'devices.$[d].rooms': deviceRoomStatus
            }
        }, {
            arrayFilters: [
                {
                    'd.uuid': uuid
                }
            ]
        }, (err, result) => {
            if (err) {
                reject(err)
            }
            if (!result) {
                reject('error')
            } else {
                resolve(result)
            }
        })
    })
}

//
async function getAccountWithSqlId(id) { 
   return new Promise((resolve, reject) => {  
       const result = Account.findOne({
           sqlId: id
       }, (err, account) => {
           if (err) {
               reject(err)
           }
           if (!account) {
               reject('error')
           } else {
               resolve(account)
           }
       })
   }) 
}
async function updateAccountFcmToken(userId, uuid, fcmToken) { 
   return new Promise((resolve, reject) => {  
       const result = Account.updateOne({
           _id: mongoose.Types.ObjectId(userId)
       }, {
           $set: {
               'devices.$[d].fcmToken': fcmToken
           }
       }, {
           arrayFilters: [
               {
                   'd.uuid': uuid
               }
           ]
       }, (err, result) => {
            if (err) {
                reject(err)
            }
            if (!result) {
                reject('error')
            } else {
                resolve(result)
            }
       })
   }) 
}
async function getRoomWithUser(id) { 
   return new Promise((resolve, reject) => {  
       const result = Room.find({
           'users._id': {
               $in: [mongoose.Types.ObjectId(id)]
           }
       }, (err, room) => {
           if (err) {
               reject(err)
           }
           if (!room) {
               reject('error')
           } else {
               resolve(room)
           }
       })
   }) 
}
async function addDeviceToAccount(id, device) { 
   return new Promise((resolve, reject) => {  
       const result = Account.updateOne({
           _id: id
       }, {
           $push: {
               devices: device
           }
       }, (err, result) => {
           if (err) {
               reject(err)
           }
           if (!result) {
               reject('error')
           } else {
               resolve(result)
           }
       })
   }) 
}
async function updateDeviceStatusLogAllInactive(id, status) { 
   return new Promise((resolve, reject) => {  
       const result = Account.updateOne({
           _id: id
       }, {
           $push: {
               'devices.$[d].statusLogs': status
           }
       }, {
           arrayFilters: [
               {
                   'd.currentDevice': false
               }
           ]
       }, (err, result) => {
           if (err) {
               reject(`Unable to update device status`)
           }
           if (!result) {
                reject(`Unable to update device status`)
           } else {
                resolve(result)
           }
       })
   }) 
}
async function updateDeviceStatusLog(id, uuid, status) { 
   return new Promise((resolve, reject) => {  
       const result = Account.updateOne({
            _id: id
       }, {
            $push: {
                'devices.$[d].statusLogs': status
            }
       }, {
            arrayFilters: [
                {
                    'd.uuid': uuid
                }
            ]
       }, (err, result) => {
            if (err) {
                reject(`Unable to update device status`)
            }
            if (!result) {
                reject(`Unable to update device status`)
            } else {
                resolve(result)
            }
       })
   }) 
}
async function updateDeviceCurrentToDefault(id) { 
   return new Promise((resolve, reject) => {  
       const result = Account.updateOne({
           _id: id
       }, {
           $set: {
               'devices.$[d].active': false,
                'devices.$[d].logout': true,
                'devices.$[d].currentDevice': false
           }
       }, {
           arrayFilters: [
               {
                   'd.currentDevice': true
               }
           ],
           multi: true
       }, (err, result) => {
           if (err) {
                reject(`Unable to update account device to default`)
           }
           if (!result) {
                reject(`Unable to update account device to default`)
           } else {
                resolve(result)
           }
       })
   }) 
}
async function updateDeviceCurrentToCurrent(id, uuid) { 
   return new Promise((resolve, reject) => {  
       const result = Account.updateOne({
           _id: id
       }, {
           $set: {
               'devices.$[d].active': true,
               'devices.$[d].logout': false,
               'devices.$[d].currentDevice': true
           }
       }, {
           arrayFilters: [
               {
                   'd.uuid': uuid
               }
           ]
       }, (err, result) => {
            if (err) {
                reject(`Unable to update account device to current`)
            }
            if (!result) {
                reject(`Unable to update account device to current`)
            } else {
                resolve(result)
            }
       })
   }) 
}
//
module.exports = function(router) {

    router.get('/', (req, res) => {
        console.log('/dev/')
    })

    router.post('/room/add', async (req, res) => {
        console.log('/dev/room/add')
        var userId = req.body.userId

        var users = await getAllAccount()
        // console.log(users)

        
        var newRoom = new Room()
        newRoom.createdBy = users[0]._id
        newRoom.users = users

        var newGroup = new GroupMessage()
        newGroup._id = newRoom._id
        var room = await addRoom(newRoom)
        // console.log(room)
        var group = await addGroup(newGroup)
        // console.log(group)
        var newDeviceRoomStatus = new DeviceRoomStatus()
        newDeviceRoomStatus.roomId = newRoom._id
        const promises = newRoom.users.map(async (user, idx) => {
            console.log(`Todo ${idx+1}`, await addDeviceRoomStatus(user._id, 'CAT1234$$##', newDeviceRoomStatus))
        })
        await Promise.all(promises)
        console.log('Finished!')

    })

    router.post('/room/message/add', async (req, res) => {
        console.log('/dev/room/message/add')

        var roomId = req.body.roomId
        var sender = req.body.sender
        var localId = req.body.localId
        var text = req.body.text

        var reads = []
        var members = []

        var room = await getRoom(roomId)
        var usersInRoom = room.users

        var newMessage = new Message()
        newMessage.text = text
        newMessage.kind = 'Text'
        newMessage.sender = sender
        newMessage.localId = localId
        newMessage.reads = reads
        newMessage.members = members
        newMessage.numberOfUsers = members

        var count = await countMessageInGroup(roomId)
        var numberOfMessageInGroup = count[0].numberOfMessage
        if (numberOfMessageInGroup == 0) {
            console.log('update start id')
            const promises = room.users.map(async (user, idx) => {
                console.log(`Todo ${idx+1}, user._id: ${user._id}`)
                var ac = await getAccount(user._id)
                const nestPromises = ac.devices.map(async (device, inde) => {
                    console.log(`Nest ${inde+1}, uuid: ${device.uuid}`)
                    console.log(`Todo ${idx+1}`, await updateDeviceRoomStatusStartMessageId(user._id, device.uuid, newMessage, room))
                })
                await Promise.all(nestPromises)
                console.log('Nest Finished!')
            })
            await Promise.all(promises)
            console.log('Finished!')
        }
        console.log()
        // console.log(newMessage)
        var message = await addMessage(roomId, newMessage)
        console.log(message)
    })

    router.post('/account/auth', async (req, res) => {
        console.log('/dev/account/auth')

        var sqlId = req.body.sqlId
        var uuid = req.body.uuid
        var fcmToken = req.body.fcmToken
        var firebaseToken = req.body.firebaseToken
        var appVersion = req.body.appVersion
        var deviceType = req.body.deviceType
        var operationType = req.body.operationType
        var operationVersion = req.body.operationVersion
        var deviceModel = req.body.deviceModel
        var macAddress = req.body.macAddress
        var deviceName = req.body.deviceName

        var account = await getAccountWithSqlId(sqlId).catch((err) => {
            var response = errorStatusCode(404, err)
            res.status(404).json(response)
            return
        })

        if (account) {
            if (account.devices.length == 0) {

                var status = {
                    active: new Date()
                }

                var newDevice = {
                    uuid: uuid,
                    fcmToken: fcmToken,
                    firebaseToken: firebaseToken,
                    active: true,
                    logout: false,
                    rooms: [],
                    statusLogs: [],
                    deviceType: deviceType,
                    operationType: operationType,
                    operationVersion: operationVersion,
                    appVersion: appVersion,
                    deviceModel: deviceModel,
                    macAddress: macAddress,
                    deviceName: deviceName,
                    currentDevice: true
                }
                newDevice.statusLogs.push(status)

                var rooms = await getRoomWithUser(account._id)
                rooms.forEach(room => {
                    var roomToShow = {
                        _is: room._id,
                        isShow: true
                    }
                    newDevice.rooms.push(roomToShow)
                })
                var ac = await addDeviceToAccount(account._id, newDevice)
                account.devices.push(newDevice)

                var response = accountResponse(200, account)
                res.status(200).json(response)
            } else {
                var device = account.devices.find(c => c.uuid === uuid)
                if (!device) {
                    var sactive = {
                        active: new Date()
                    }
                    // MARK: - update token
                    var ff = await updateAccountFcmToken(account._id, uuid, fcmToken)
                    //
                    var newDevice = {
                        uuid: uuid,
                        fcmToken: fcmToken,
                        firebaseToken: firebaseToken,
                        active: true,
                        logout: false,
                        rooms: [],
                        statusLogs: [],
                        deviceType: deviceType,
                        operationType: operationType,
                        operationVersion: operationVersion,
                        appVersion: appVersion,
                        deviceModel: deviceModel,
                        macAddress: macAddress,
                        deviceName: deviceName,
                        currentDevice: true
                    }
                    newDevice.statusLogs.push(sactive)
    
                    var rooms = await getRoomWithUser(account._id)
                    rooms.forEach(room => {
                        var roomToShow = {
                            _is: room._id,
                            isShow: true
                        }
                        newDevice.rooms.push(roomToShow)
                    })
                    var sinactive = {
                        inactive: new Date()
                    }
                    updateDeviceCurrentToDefault(account._id).then((ac) => {
                        updateDeviceCurrentToCurrent(account._id, uuid).then((bc) => {
                            updateDeviceStatusLogAllInactive(account.id, sinactive).then((cc) => {
                                addDeviceToAccount(account._id, newDevice).then((errorStatusCode) => {
                                    account.devices.push(newDevice)
                                    var response = accountResponse(200, account)
                                    res.status(200).json(response)
                                }).catch((err) => {
                                    var response = errorStatusCode(404, err)
                                    res.status(404).json(response)
                                })
                            }).catch((err) => {
                                var response = errorStatusCode(404, err)
                                res.status(404).json(response)
                            })
                        }).catch((err) => {
                            var response = errorStatusCode(404, err)
                            res.status(404).json(response)
                        })
                    }).catch((err) => {
                        var response = errorStatusCode(404, err)
                        res.status(404).json(response)
                    })
                    
                    
                } else {
                    var sinactive = {
                        inactive: new Date()
                    }
                    // MARK: - update token
                    var ff = await updateAccountFcmToken(account._id, uuid, fcmToken)
                    //
                    updateDeviceCurrentToDefault(account._id).then((ac) => {
                        updateDeviceCurrentToCurrent(account._id, uuid).then((bc) => {
                            updateDeviceStatusLogAllInactive(account.id, sinactive).then((cc) => {
                                var response = accountResponse(200, account)
                                res.status(200).json(response)
                            }).catch((err) => {
                                var response = errorStatusCode(404, err)
                                res.status(404).json(response)
                            })
                        }).catch((err) => {
                            var response = errorStatusCode(404, err)
                            res.status(404).json(response)
                        })
                    }).catch((err) => {
                        var response = errorStatusCode(404, err)
                        res.status(404).json(response)
                    })
                }
            }
        } else {
            // catch
        }
    })

    router.post('/room/on', async (req, res) => {
        console.log('/dev/room/on')

        var uuid = req.body.uuid
        var accountId = req.body.userId
        var roomId = req.body.groupKey

        console.log('uuid: ', uuid)
        console.log('accountId: ', accountId)
        console.log('roomId: ', roomId)

        var account = await getAccount(accountId)
        // console.log(account)
        var device = account.devices.find((deve) => {
            return deve.uuid == uuid
        })

        var room = device.rooms.find((roo) => {
            return roo.roomId == roomId
        })
        // console.log(device)
        // console.log(room)

        console.log(room.startMessageId)
    })
}