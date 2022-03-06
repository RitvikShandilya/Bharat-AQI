
## Authors

- [Ritvik Shandilya](https://github.com/ritvikshandilya)


# Rest API for getting data from aqi stations working all over india



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
