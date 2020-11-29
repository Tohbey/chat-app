const moment = require('moment')

function formatMessage(username,text,groupName){
    return{
        username,
        text,
        groupName,
        time:moment().format('h:mm a')
    }
}

module.exports = formatMessage