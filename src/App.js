import React, { useState, useEffect } from "react";
import numeral from 'numeral';
import { Dropdown, Radio } from 'semantic-ui-react';
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

    const [unitSize, setUnitSize] = useState(100);

    const iconSize = '40px';

    const [gapAnalysis, setGapAnalysis] = useState();

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

    // const demandIcon = <div style={{float: 'left', backgroundColor: 'lightgrey', width: '20px', height: '20px', margin: '2px'}}> </div>;
    // const supplyIcon = <div style={{float: 'left', backgroundColor: 'lightgrey', width: '20px', height: '20px', margin: '2px'}}> </div>;


    
    useEffect(() => handleData(), [geoID])
    useEffect(() => handleOptions(), [])

    return(
        <div style={{ height: '250vh', padding: '30px'}}>
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
                    onChange={(event, data) => setGeoID(data.value)}
                />
                 <br></br>
                 Each <MdGroup /> equals 
                < Dropdown
                    placeholder={unitSize}
                    selection
                    compact
                    style={{ margin: '10px 0 10px 0'}}
                    options={[
                        {key: 10, value: 10, text: '10'},
                        {key: 100, value: 100, text: '100'},
                        {key: 500, value: 500, text: '500'},
                        {key: 1000, value: 1000, text: '1,000'},
                        {key: 5000, value: 5000, text: '5,000'},
                    ]}
                    onChange={(event, data) => setUnitSize(data.value)}
                />
                <br></br>
                <h3 style={{ margin: '20px 0 0 0'}}>Run Gap Analysis</h3>
                < Radio 
                    style={{ marginTop: '5px'}}
                    // label='Run Gap Analysis'
                    toggle 
                    onChange={(event, data) => setGapAnalysis(data.checked)}
                />  
                </div>

                <div style={{ 
                    zIndex: gapAnalysis ? '1' : null,
                    position: gapAnalysis ? 'absolute' : 'relative', 
                    top: gapAnalysis ? '35%' : '0',
                    float: 'left',
                    padding: '20px',
                    width: gapAnalysis ? '100%' : '50%'}}
                >
                    <h2 style={{
                        float: 'left',
                        width: '100%',
                        lineHeight: '20px'}}
                    >
                        {gapAnalysis ? 'Housing Gap Analysis' : 'Housing Demand'}
                    </h2>
                    <div 
                        style={{
                            float: 'left',
                            width: '100%',
                            marginBottom: '10px',
                            verticalAlign: 'center'
                        }}>
                            <MdGroup 
                                style={{
                                    padding: gapAnalysis ? '10px' : null, 
                                    float: 'left', 
                                    height: iconSize, 
                                    width: iconSize}}
                                /> 
                            <h4 style={{
                                    float: 'left',
                                    margin: '8px 0 0 5px'}}>
                                = {numeral(unitSize).format('0,0')} 
                                {gapAnalysis ? ' households in housing units' : ' households'}
                            </h4>
                    </div>
                {
                    labelArray.filter(labelObj => labelObj.type === 'Housing Demand')
                    .reverse()    
                    .map(labelObj => 
                        !gapAnalysis ?
                        <div style={{float: 'left', width: '100%'}}>
                            <h3 style={{margin: '10px 0 5px 0'}}>{labelObj.income}</h3>
                            {
                            iconRepeater(
                                labelObj.name, 
                                unitSize, 
                                <MdGroup style={{height: iconSize, width: iconSize, fill: labelObj.color, margin: '2px'}} />).map(icon => icon)
                            }
                        </div>:
                            iconRepeater(
                                labelObj.name, 
                                unitSize, 
                                <MdGroup style={{padding: '10px', height: iconSize, width: iconSize, fill: labelObj.color, margin: '2px'}} />).map(icon => icon)
                    )
                }
                </div>
                <div 
                    style={{ 
                        position: gapAnalysis ? 'absolute' : 'relative', 
                        top: gapAnalysis ? '35%' : '0',     
                        float: 'left', 
                        padding: '20px', 
                        width: gapAnalysis ? '100%' : '50%',
                        backgroundColor: null
                    }}
                >

                <h2 style={{float: 'left', width: '100%', lineHeight: '20px'}}>
                    {gapAnalysis ? 'Housing Gap Analysis' : 'Housing Demand'}
                </h2>
                <div 
                        style={{
                            float: 'left',
                            width: '100%',
                            marginBottom: '10px',
                            verticalAlign: 'center'
                        }}>
                            <IoMdHome style={{float: 'left', height: iconSize, width: iconSize}} /> 
                            <h4 style={{ float: 'left', margin: '8px 0 0 5px'}}>
                                = {numeral(unitSize).format('0,0')} 
                                {gapAnalysis ? ' households in housing units' : ' housing units'}
                            </h4>
                    </div>                {
                    labelArray.filter(labelObj => labelObj.type === 'Housing Supply')
                    .reverse()    
                    .map(labelObj => 
                        !gapAnalysis ?
                        <div style={{float: 'left', width: '100%'}}>
                        <h3 style={{margin: '10px 0 5px 0'}}>{labelObj.income}</h3>
                        {
                        iconRepeater(
                            labelObj.name, 
                            unitSize, <IoMdHome style={{height: iconSize, width: iconSize, fill: labelObj.color, margin: '2px'}} />).map(icon => icon)
                    }
                    </div> :
                        iconRepeater(
                            labelObj.name, 
                            unitSize, <IoMdHome style={{height: iconSize, width: iconSize, fill: labelObj.color, margin: '2px'}} />).map(icon => icon)
                            
                    )
                }
                </div>
            </div>
        : null }
        </div>)
};

export default App;
