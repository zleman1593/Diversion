import methods from './methods';
import workers from './libs';
import addInitialData from './configs/initial_adds.js';

//Expose methods
methods();

//Add Initial Data for Testing
//addInitialData();

//Start Workers
// const {ContentCollectors} = workers()
// ContentCollectors.startDailyCreation();
