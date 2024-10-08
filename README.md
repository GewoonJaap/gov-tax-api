# Dutch Tax API Cloudflare Worker
![207815865-9b471652-5723-4d35-8847-dce0fb9701eb](https://github.com/user-attachments/assets/c4eb5fe1-c956-4c6a-a5f6-9755eab8a7ba)

This Cloudflare Worker scrapes tax data from the Dutch Tax Authority website and provides it as a JSON response via a REST API.
Note that the prices from the Dutch Tax Authority are without BTW.

## Endpoints
GET `/api/netherlands/tax`
This endpoint returns the scraped tax data in JSON format.

## Response
The response is a JSON object containing the tax data:

```json
{
  "data": [
    {
      "title": "Belasting op aardgas (verlaagd tarief)",
      "data": {
        "2024": [
          {
            "title": "0 t/m 2.900 kWh",
            "price": 0.10880
          },
          {
            "title": "2.901 t/m 10.000 kWh",
            "price": 0.10880
          },
        ],
      }
    },
  ]
}
```
## Development
### Usage
Install dependencies:
```sh
npm install
```
### Start development server:
```sh
npm run dev
```
### Deploy to Cloudflare Workers:
```sh
npm run deploy
```
