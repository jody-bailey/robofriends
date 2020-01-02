import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => {
    const [robotArray, setRobotArray] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if(robotArray.length === 0)
        {
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const robots = response.data;
                setRobotArray(robots);
            });
        }
        
    }, []);

    const searchChanged = (event) => {
        setSearch(event.target.value);
    }

    const filteredRobots = robotArray.filter(robot => {
        return robot.name.toLowerCase().includes(search.toLowerCase());
    })

    return (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox onChange={searchChanged} />
            {!filteredRobots.length &&
                <h1>Loading...</h1>
            }
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots} />
                </ErrorBoundary>
            </Scroll>
        </div>
    );
}

export default App;
