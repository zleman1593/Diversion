import methods from './methods';
import workers from './libs';
import addInitialData from './configs/initial_adds.js';

//Expose methods
methods();


//addInitialData();
//addInitialUser();

//Start Workers
const {ContentCollectors} = workers()

ContentCollectors.startDailyCreation();
//Tests

//Add Initial Data for Testing
//ContentCollectors.getContentFromImgur("cow");
