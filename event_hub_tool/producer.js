/////////////////////////////////////////////////////////////////////////////////////////////////
//////////        TO LAUNCH SCRIPT: node producer.js number_of_events_to_send          //////////
//////////                         EXAMPLE: node producer.js 1000                      //////////
/////////////////////////////////////////////////////////////////////////////////////////////////

const uuid = require('uuid');
const { EventHubClient } = require("@azure/event-hubs");
const config = require("./config/config.js");

console.log('- connectionString: ', config.eventhub.connectionString);
console.log('- eventhub name: ', config.eventhub.name);

// Connection string - primary key of the Event Hubs namespace. 
const connectionString = config.eventhub.connectionString;

// Name of the event hub.
const eventHubsName = config.eventhub.name;

async function main() {
  console.log(process.argv);
  var numberOfEvents = process.argv[2];
  var eventType = 'warning';
  console.log('numberOfEvents: ', numberOfEvents);
  console.log('eventType: ', eventType);

  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  console.log('---> Producer started!');

  for (let i = 0; i < numberOfEvents; i++) {
    var id = uuid.v1();
	var date = new Date();
    
    var eventData = null;
    eventData = {
      body: {
        id: id.toString(),
		date: date.toString(),
        type: eventType.toString(),
      }
    };

    if (eventType == 'warning') {
      eventData.body.email = config.recipients.warning;
    } else {
      eventData.body.email = config.recipients.alarm;
    }

    //const eventData2 = {body: `Event ${i}`};
    //console.log(`Sending message: ${eventData2.body}`);

    console.log(`Sending message: `, eventData);
    await client.send(eventData);
  }

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});