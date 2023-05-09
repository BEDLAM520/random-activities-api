# How to Use the Endpoints for Activities and Load-Activities

This guide will explain how to use the two endpoints, namely activities and load-activities. (Note: The production endpoint will be shared with individuals by email).

##

To use the activities endpoint, make a GET request to the /activities route. You can optionally pass the "type" parameter as a query string to filter the results based on activity type. Here's an example request:

```bash
GET /activities?type=education
```

To use the load-activities endpoint, make a GET request to the /load-activities route. This will load 20 new activities from an API and save them in the MongoDB database for the activities endpoint to use. Here's an example request:

```bash
GET /load-activities
```
