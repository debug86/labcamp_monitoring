const { EventHubClient, delay } = require("@azure/event-hubs");
const config = require("./config/config.js");

console.log('- connectionString: ', config.eventhub.connectionString);
console.log('- eventhub name: ', config.eventhub.name);

// Connection string - primary key of the Event Hubs namespace. 
const connectionString = config.eventhub.connectionString;

// Name of the event hub.
const eventHubsName = config.eventhub.name;

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  const allPartitionIds = await client.getPartitionIds();
  const firstPartitionId = allPartitionIds[0];
  console.log('---> Consumer started!');

  const receiveHandler = client.receive(firstPartitionId, eventData => {
	 console.log('Received message: ', eventData.body);
    console.log(`Received message: ${eventData} from partition ${firstPartitionId}`);
  }, error => {
    console.log('Error when receiving message: ', error)
  });

  // Sleep for a while before stopping the receive operation.
  await delay(15000);
  await receiveHandler.stop();

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});