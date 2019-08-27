import React, { useState, useEffect } from "react";
import numeral from 'numeral';
import { Dropdown } from 'semantic-ui-react';
import { MdGroup } from "react-icons/md";
import { IoMdHome } from "react-icons/io";

import API from './utils/API.js';


const tractData = require('./data/HousingSupplyDemandTract.json');
const cityData = require('./data/HousingSupplyDemandCity.json')

const App = () => {

    const [geotype, setGeoTypoe] = useState('city');
    
    const [geoID, setGeoID] = useState(1304000);

    const [data, setData] = useState();

    const [optionsArray, setOptionsArray] = useState();

    const unitSize = 500;

    const iconSize = '30px'

    const labelArray = [

        { name: 'Housing Supply: Less than $20,000', 
          type: 'Housing Supply',
          income: 'Less than $20,000',
          color: 'blue'
        },
        { name: 'Housing Supply:  $20,000 to $39,999', 
          type: 'Housing Supply',
          income: '$20,000 to $39,999',
          color: 'red'
        },
        { name: 'Housing Supply: $40,000 to $59,999', 
          type: 'Housing Supply',
          income: '$40,000 to $59,999',
          color: 'green'
        },
        { name: 'Housing Supply: $60,000 to $99,999', 
          type: 'Housing Supply',
          income: '$60,000 to $99,999',
          color: 'orange'
        },
        { name: 'Housing Supply: $100,000 or more', 
          type: 'Housing Supply',
          income: '$100,000 or more',
          color: 'grey'
        },
        { name: 'Housing Demand: Less than $20,000', 
          type: 'Housing Demand',
          income: 'Less than $20,000',
          color: 'blue'
        },
        { name: 'Housing Demand: $20,000 to $39,999', 
          type: 'Housing Demand',
          income: '$20,000 to $39,999',
          color: 'red'
        },
        { name: 'Housing Demand: $40,000 to $59,999', 
          type: 'Housing Demand',
          income: '$40,000 to $59,999',
          color: 'green'
        },
        { name: 'Housing Demand: $60,000 to $99,999', 
          type: 'Housing Demand',
          income: '$60,000 to $99,999',
          color: 'orange'
        },
        { name: 'Housing Demand: $100,000 or more', 
          type: 'Housing Demand',
          income: '$100,000 or more',
          color: 'grey'
        }
        
    ]

    const handleOptions = () => {
        const options = cityData ? cityData.map(option => ({
            key: option.Id2,
            value: option.Id2,
            text: option.Geography
        })) : null
        setOptionsArray(options)
        }

    
    const handleData = () => {
        const data = geotype === 'tract' ? tractData : geotype === 'city' ? cityData : null;
        const filteredData = data && geoID ? data.find(obj => obj.Id2 === geoID) : null;
        setData(filteredData);
    }

    const iconRepeater = (indicator, unitSize, icon) => {
        const value = data[indicator];
        const numberOfRepeats = parseInt(value/unitSize);
        // const remainder = (value/unitSize) - numberOfRepeats;

        var iconArray = []

        for (let i=0; i < numberOfRepeats; i++) {
            iconArray.push(icon);
        }

        return iconArray
        
    }

    const demandIcon = <div style={{float: 'left', backgroundColor: 'blue', width: '20px', height: '20px', margin: '2px'}}> </div>;
    const supplyIcon = <div style={{float: 'left', backgroundColor: 'red', width: '20px', height: '20px', margin: '2px'}}> </div>;


    
    useEffect(() => handleData(), [geoID])
    useEffect(() => handleOptions(), [])

    return(
        <div style={{ padding: '30px'}}>
        { data ?
            <div>
                <h1 style={{ fontSize: '4em', width: '100%', textAlign: 'center', }}>
                    { data.Geography }
                </h1>
                <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>

                < Dropdown
                    placeholder='Change City'
                    search
                    selection 
                    options={optionsArray}
                    onChange={(event, data) => setGeoID(data.value)} />  
                </div>

                <div style={{ float: 'left', padding: '20px', width: '50%'}}>
                <h2 style={{float: 'left', width: '100%', lineHeight: '20px'}}>Housing Demand</h2>
                {/* <h4 style={{float: 'left', width: '100%', marginTop: '0px'}}>by Household Income</h4> */}
                <div style={{float: 'left', width: '100%', marginBottom: '10px'}}>{demandIcon} = {numeral(unitSize).format('0,0')} households</div>
                {
                    labelArray.filter(labelObj => labelObj.type === 'Housing Demand')
                    .reverse()    
                    .map(labelObj => 
                        <div style={{float: 'left', width: '100%'}}>
                        <h3 style={{margin: '10px 0 5px 0'}}>{labelObj.income}</h3>
                        {
                        iconRepeater(
                        labelObj.name, 
                        unitSize, <MdGroup style={{height: iconSize, width: iconSize, fill: labelObj.color, margin: '2px'}} />).map(icon => icon)
                    }
                        </div>
                    )
                }
                </div>
                <div style={{ 
                    // zIndex: '-1', 
                    // position: 'relative', 
                    // right: '50%', 
                    float: 'left', padding: '20px', width: '50%'}}>

                <h2 style={{float: 'left', width: '100%', lineHeight: '20px'}}>Housing Supply</h2>
                <div style={{float: 'right', width: '100%',marginBottom: '10px'}}>{supplyIcon} = {numeral(unitSize).format('0,0')} households</div>
                {
                    labelArray.filter(labelObj => labelObj.type === 'Housing Supply')
                    .reverse()    
                    .map(labelObj => 
                        <div style={{float: 'left', width: '100%'}}>
                        <h3 style={{margin: '10px 0 5px 0'}}>{labelObj.income}</h3>
                        {
                        iconRepeater(
                        labelObj.name, 
                        unitSize, <IoMdHome style={{height: iconSize, width: iconSize, fill: labelObj.color, margin: '2px'}} />).map(icon => icon)
                    }
                        </div>
                    )
                }
                </div>
                {/* <h3>$100K or more</h3>
                    {
                        iconRepeater(
                        'Housing Demand: $100,000 or more', 
                        unitSize, demandIcon).map(icon => icon)
                    } */}
            </div>
        : null }
        </div>)
};

export default App;
