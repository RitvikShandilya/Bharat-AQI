const { DownloaderHelper } = require('node-downloader-helper');
const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
const { default: axios } = require('axios');
const parser = new xml2js.Parser();

function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${year}-${month}-${day}-${hour}-${min}`
}

function bunty(result) {
    const states = result['AqIndex']['Country'][0]['State'];
    // console.log('States: ', states);
    const cities = states.reduce((acc, curr) => {
        // console.log('Curr: ', curr)
        if (curr['City']) {
            const icities = curr['City'].map(ic => {
                return {
                    name: ic['$']['id'],
                    state: curr['$']['id'],
                    station: ic['Station'].map(st => {
                        const lastupdate = st['$']['lastupdate'];
                        return {
                            name: st['$']['id'],
                            lastupdate,
                            pollutants: st['Pollutant_Index'].map(pi => pi['$']).reduce((icc, icurr) => {
                                const key = icurr['id'].replace('.', '');
                                return {
                                    ...icc,
                                    [key]: icurr
                                }
                            }, {}),
                            "Air_Quality_Index": st['Air_Quality_Index'] ? st['Air_Quality_Index'][0]['$'] : null
                        }
                    })
                }
            })
            return [
                ...acc,
                ...icities
            ]
        }
        return acc;
    }, [])
    return cities;
}

const dl = new DownloaderHelper('https://data.gov.in/sites/default/files/datafile/data_aqi_cpcb.xml', __dirname);
console.log(__dirname);

dl.on('end', () => {
    fs.rename('data_aqi_cpcb.xml', `./xml/realtime/realtime.xml`, (err) => {
        if (err) throw err;
        fs.readFile('./xml/realtime/realtime.xml', (err, data) => {
            parser.parseString(data, (err, result) => {
                const buntied = bunty(result);
                saveStations(buntied).then(res=>console.log(res)).catch(err=>console.log(err));
                fs.writeFileSync("./json/realtime/realtime.json", JSON.stringify(buntied, null, 4));
                fs.copyFile('./xml/realtime/realtime.xml', `./xml/fetches/${getDateString()}.xml`, (err) => {
                    if (err) throw err;
                    fs.readFile(`./xml/fetches/${getDateString()}.xml`, (err, data) => {
                        parser.parseString(data, (err, result) => {
                            fs.writeFileSync(`./json/fetches/${getDateString()}.json`, JSON.stringify(buntied, null, 4));
                        });
                    });
                });
            });
        });
    });

   // fs.readFile('./xml/realtime/realtime.xml', (err, data) => {
   //     parser.parseString(data, (err, result) => {
   //         fs.writeFileSync("./json/realtime/realtime.json", JSON.stringify(bunty(result), null, 4));
   //     });
   // });
//
   // fs.copyFile('./xml/realtime/realtime.xml', `./xml/fetches/${getDateString()}.xml`, (err) => {
   //     if (err) throw err;
   // });
//
   // fs.readFile(`./xml/fetches/${getDateString()}.xml`, (err, data) => {
   //     parser.parseString(data, (err, result) => {
   //         fs.writeFileSync(`./json/fetches/${getDateString()}.json`, JSON.stringify(bunty(result), null, 4));
   //     });
   // });

})
dl.start();

async function saveStations(input){
    try {
        const stations = [];
        console.log(input);
        input.forEach(city=>{
            console.log(city.station);
            if(city.station){
                const station = city.station.map(st => {
                    return {
                        ...st,
                        cityName: city.name,
                        stateName: city.state,
                    }
                })
                stations.push(...station);
            }
        })
        const data = {
            stations: stations.map(st=>{
                const { name, cityName, stateName, } = st;
                return {
                    name,
                    cityName,
                    stateName,
                    aqiData: {
                        pollutants: st.pollutants,
                        Air_Quality_Index: st.Air_Quality_Index
                    }
                }
            })
        }

        const results = await Promise.allSettled(data.stations.map(st=>{
            return axios.post('http://localhost:3000/api/v1/station', st);
        }))
        return results;
    } catch (error) {
        return error;
    }
}