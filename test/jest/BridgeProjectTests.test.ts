// import { expect } from '@jest/globals';
// import {fc, test} from "@fast-check/jest";
// import BridgeProjectFactory from "../../src/config/BridgeProjectFactory";
// import {data} from "../../assets/project/bridge1.js";
import BridgeProjectFactory from "../../src/config/BridgeProjectFactory";





// describe ('CONSOLE', () => {

test('vs', () => {
//         // bf: BridgeProjectFactory = new BridgeProjectFactory();
//         this.load.json('data', '../../assets/project/bridge1.json');
//         console.log(this.cache.json.get('funds'));
        // @ts-ignore
        // fetch('assets/project/bridge1.json')
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(data => console.log(data));
        //     // .then((response) => response.json())
        //     // .then((json) => console.log(json));

        // fetch('https://api.chucknorris.io/jokes/random?category=dev')
        //     .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
        //     .then(data => console.log(data));

        // console.log(data);

        const data = require('../../assets/project/bridge1.json');
        const b = new BridgeProjectFactory();

        const tasks = b.createTasks(data);

        console.log(tasks);




        // const data = require('../../assets/project/bridge1.json');
        // console.log(data.tasks);
        // console.log(data);
//
//         data.get(funds);

    });
//
// });