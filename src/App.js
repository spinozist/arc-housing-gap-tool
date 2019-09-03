import React, { useState, useEffect } from "react";
import numeral from 'numeral';
import { Dropdown, Radio } from 'semantic-ui-react';
import { MdGroup } from "react-icons/md";
// import { IoMdHome } from "react-icons/io";
import { Icon, InlineIcon } from '@iconify/react';
// import homeIcon from '@iconify/icons-jam/home';
import homeIcon from '@iconify/icons-fe/home';
// import styles from './style.css';

// import API from './utils/API.js';


const tractData = require('./data/HousingSupplyDemandTract.json');
const cityData = require('./data/HousingSupplyDemandCity.json')

const App = () => {

    const [geotype, setGeoTypoe] = useState('city');
    
    const [geoID, setGeoID] = useState(1304000);

    const [data, setData] = useState();

    const [optionsArray, setOptionsArray] = useState();

    const [unitSize, setUnitSize] = useState(100);

    const iconSize = '60px';

    const [gapAnalysis, setGapAnalysis] = useState();

    const colorMap = ['#810000', '#984d00', '#f4922f', '#015c02', '#8088a0'  ] 

    const labelArray = [

        { name: 'Housing Supply: Less than $20,000', 
          type: 'Housing Supply',
          income: 'Less than $20,000',
          color: colorMap[0]
        },
        { name: 'Housing Supply:  $20,000 to $39,999', 
          type: 'Housing Supply',
          income: '$20,000 to $39,999',
          color: colorMap[1]
        },
        { name: 'Housing Supply: $40,000 to $59,999', 
          type: 'Housing Supply',
          income: '$40,000 to $59,999',
          color: colorMap[4]
        },
        { name: 'Housing Supply: $60,000 to $99,999', 
          type: 'Housing Supply',
          income: '$60,000 to $99,999',
          color: colorMap[3]
        },
        { name: 'Housing Supply: $100,000 or more', 
          type: 'Housing Supply',
          income: '$100,000 or more',
          color: colorMap[2]
        },
        { name: 'Housing Demand: Less than $20,000', 
          type: 'Housing Demand',
          income: 'Less than $20,000',
          color: colorMap[0]
        },
        { name: 'Housing Demand: $20,000 to $39,999', 
          type: 'Housing Demand',
          income: '$20,000 to $39,999',
          color: colorMap[1]
        },
        { name: 'Housing Demand: $40,000 to $59,999', 
          type: 'Housing Demand',
          income: '$40,000 to $59,999',
          color: colorMap[4]
        },
        { name: 'Housing Demand: $60,000 to $99,999', 
          type: 'Housing Demand',
          income: '$60,000 to $99,999',
          color: colorMap[3]
        },
        { name: 'Housing Demand: $100,000 or more', 
          type: 'Housing Demand',
          income: '$100,000 or more',
          color: colorMap[2]
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
        const numberOfRepeats = Math.round(value/unitSize);
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
        <div style={{ padding: '30px'}}>
        { data ?
            <div>
                <div 
                    style={{ 
                        height: '35vh', 
                        float: 'left', 
                        width: gapAnalysis? '50%' : '100%'
                    }}
                >
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
                    <h4 style={{float: 'center', margin: '15px 0 5px 0'}}>
                        Change unit size
                    </h4>
                    < Dropdown
                        placeholder={unitSize}
                        selection
                        compact
                        style={{ margin: '0 0 5px 0'}}
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
                        style={{ 
                            marginTop: '5px',
                            background: data.checked ? 'orange' : 'grey',
                            borderRadius: '10px'}}
                        // label='Run Gap Analysis'
                        toggle 
                        onChange={(event, data) => setGapAnalysis(data.checked)}
                    />  
                    </div>
                </div>
                {gapAnalysis ? 
                <div style={{heigt: '35vh', float: 'left', width: '50%', }}>
                    {labelArray
                        .filter(lableObj => lableObj.type === 'Housing Supply')
                        .map(labelObj =>
                        <h2 style={{marginTop: '10px', borderRadius: '10px',width: '100%', float: 'right', padding: '5px 0 5px 20px', color: 'white', backgroundColor: labelObj.color}}>{labelObj.income}</h2>)
                        .reverse()}
                </div>
                : null
                }

                <div style={{ 
                    zIndex: gapAnalysis ? '1' : null,
                    position: gapAnalysis ? 'absolute' : 'relative', 
                    top: gapAnalysis ? '35vh' : '0',
                    marginTop: gapAnalysis ? '20px' : null, 
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
                                <MdGroup style={{padding: '12px 8px 4px 8px', height: iconSize, width: iconSize, fill: labelObj.color, margin: '2px'}} />).map(icon => icon)
                    )
                }
                </div>
                <div 
                    style={{ 
                        position: gapAnalysis ? 'absolute' : 'relative', 
                        top: gapAnalysis ? '35vh' : '0',     
                        float: 'left', 
                        padding: '20px',
                        marginTop: gapAnalysis ? '20px' : null, 
                        width: gapAnalysis ? '100%' : '50%',
                        backgroundColor: null
                    }}
                >

                <h2 style={{float: 'left', width: '100%', lineHeight: '20px'}}>
                    {gapAnalysis ? 'Housing Gap Analysis' : 'Housing Supply'}
                </h2>
                <div 
                        style={{
                            float: 'left',
                            width: '100%',
                            marginBottom: '10px',
                            verticalAlign: 'center'
                        }}>
                            <Icon icon={homeIcon} style={{float: 'left', height: iconSize, width: iconSize}} /> 
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
                            unitSize, <Icon icon={homeIcon} color={labelObj.color} style={{height: iconSize, width: iconSize, margin: '2px'}} />).map(icon => icon)
                        }
                        </div> :
                        iconRepeater(
                            labelObj.name, 
                            unitSize, <Icon icon={homeIcon} color={labelObj.color} style={{height: iconSize, width: iconSize, margin: '2px'}} />).map(icon => icon)
                    )
                }
                </div>
            </div>
        : null }
        </div>)
};

export default App;
