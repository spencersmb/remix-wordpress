// import type { Config } from 'stellate'

const config: any = {
  "config": {
    "schema": "./schema.graphql",
    "passThroughOnly": false,
    "rootTypeNames": {
      "query": "RootQuery",
      "mutation": "RootMutation"
    },
    "rules": [
      {
        "types": [
          "RootQuery"
        ],
        "maxAge": 9000,
        "swr": 900,
        "description": "Cache everything (default)"
      }
    ],
    "name": "etheadless",
    "originUrl": "https://api.every-tuesday.com/graphql/"
  }
}

export default config;
