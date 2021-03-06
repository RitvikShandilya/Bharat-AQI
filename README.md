
## Authors

- [Ritvik Shandilya](https://github.com/ritvikshandilya)


# Rest API for getting data from aqi stations working all over india - Deploy to any cloud provider to get the latest available AQI data.


## Inspiration Behind the project: While looking for an API where I could get air quality data for India, I came across a few options, but none of them gave up-to-date real-time and historical data. With this API that I have developed, you can deploy it to any nodejs server and start accumulating data for every hour

## Data Source: CSV files from data.gov.in are updated on an hourly basis which are then stored in the MongoDB database configured in this project

## Well tested on local environment
![AQIVIDEO](https://user-images.githubusercontent.com/5859629/163575215-a7240a27-8401-4e66-a638-802441c0f05c.gif)


## AQI Data Variables
`PM 2.5`
`NH3`
`SO2`
`NO2`
`Ozone Levels`
`CO`


## Collections
```
- Station
- AQIData
```


## Models
```
- Station
    - name: string unique
    - cityName
    - stateName
    
- AQIData
    - name: string
    - avg: number
    - max: number
    - min: number
    - isPredominant: boolean
    - station: (reference to Station)
    - createdAt: Date
```
## API Endpoints
```
POST Req: api/v1/aqidata

Body: {
    "date": "26-Feb-2022",
    "hour": 11,
    "stationName": "Pan Bazaar, Guwahati - APCB"
}

Four Retrieval options

1. Station Name, hour and date: Particular station AQI data for a particular hour on a given day

2. Station Name and date: Particular station AQI data on a given day

3. Date and hour: All stations AQI data for a particular hour on a given day

4. Date only: All stations AQI data for whole day on a given date
```
