# EUBFR Maps

Demonstrating integration with ES geolocation features and queries.

This project is not following the best practices of React (using state) in order to stay closer to how non-React clients would solve mapping issues with the DOM API of leaflet.

## Installation

```bash
$ npm install
```

## Set configurations

Copy `.env.example` to `.env` and enter information for the necessary keys.

## Run it locally

```bash
$ npm run start
```

Now editing the separate files will trigger a browser refresh.

### Notes

There are several files helping you to focus:

- `utils/getQuery.js` contains the query towards Elasticsearch
- `utils/visualizeData.js` is how you treat the results of your query putting the result information on a map.
