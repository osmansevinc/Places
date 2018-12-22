import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';


import configureStore from './src/store/configureStore';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";


const store = configureStore();

//Register Screens
Navigation.registerComponentWithRedux("myProject.AuthScreen",() => AuthScreen,Provider,store);
Navigation.registerComponentWithRedux("myProject.SharePlaceScreen",() => SharePlaceScreen,Provider,store);
Navigation.registerComponentWithRedux("myProject.FindPlaceScreen",() => FindPlaceScreen,Provider,store);
Navigation.registerComponentWithRedux("myProject.PlaceDetailScreen",() => PlaceDetailScreen,Provider,store);
Navigation.registerComponentWithRedux("myProject.SideDrawer",() => SideDrawer,Provider,store);


//Start an App
Navigation.events().registerAppLaunchedListener(() => {
    app();
});

export default app = () =>{
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: 'myProject.AuthScreen'
                        , passProps: {
                            text: 'stack with one child'
                        }
                    }
                }],
                options: {
                    topBar: {
                        title: {
                            text: 'Login'
                        }
                    }
                }
            }
        }
    });
}
