'use strict';

var config = {
    eventhub: {
        connectionString: 'Endpoint=sb://labcampmoneh.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=Tl3ibARm9JMzgivWvhi6IMLcMkSNKbZMqNsKXCbvhBc=',
        name: 'labcamp_test_eh'
    },
    recipients: {
        warning: 'test@outlook.it',
        alarm: 'test@outlook.it'
    }
};

module.exports = config;