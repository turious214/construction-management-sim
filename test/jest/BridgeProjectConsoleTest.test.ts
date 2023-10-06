// import { expect } from '@jest/globals';
// import {fc, test} from "@fast-check/jest";
import BridgeProjectFactory from "../../src/config/BridgeProjectFactory";

// describe ('CONSOLE', () => {

test('vs', () => {
//         // bf: BridgeProjectFactory = new BridgeProjectFactory();
//         this.load.json('data', '../../assets/project/Bridge.ts');
//         console.log(this.cache.json.get('funds'));
        // @ts-ignore
        // fetch('assets/project/Bridge.ts')
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

        // const data = require('../../assets/project/Bridge.ts');
        // const path: string = '../../assets/project/Bridge.ts';
        const projectName: string = 'bridge1';
        const b = new BridgeProjectFactory();
        b.manufactureProject(projectName);

        // const tasks = b.createTasks(data);
         // console.log(tasks);

        // const contractors = b.createContractors(data);
        // console.log(contractors);










        // const data = require('../../assets/project/Bridge.ts');
        // console.log(data.tasks);
        // console.log(data);
//
//         data.get(funds);

    });
//
// });