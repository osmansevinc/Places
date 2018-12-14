import {Navigation} from 'react-native-navigation';
import Iconss from 'react-native-vector-icons/Ionicons';

const startTabs = () =>{
    Promise.all([
        Iconss.getImageSource('md-map',30),
        Iconss.getImageSource('ios-share-alt',30),
        Iconss.getImageSource('ios-menu',30)
    ]).then(sources => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            id: 'leftSideDrawer',
                            name: 'myProject.SideDrawer',
                            passProps: {
                                text: 'This is a left side menu screen'
                            }
                        }
                    },
                    center: {
                        bottomTabs: {
                            children: [{
                                stack: {
                                    children: [{
                                        component: {
                                            name: 'myProject.FindPlaceScreen',
                                        }
                                    }],
                                    options: {
                                        bottomTab: {
                                            text: 'Find Place',
                                            selectedIconColor: 'purple',
                                            icon: sources[0]

                                        },
                                        topBar: {
                                            title: {
                                                text: 'Find Place'
                                            },
                                            leftButtons: [
                                                {
                                                    id: 'buttonOne',
                                                    icon: sources[2],
                                                    text: 'Menu',
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                                {
                                    stack: {
                                        children: [{
                                            component: {
                                                name: 'myProject.SharePlaceScreen'
                                            }
                                        }],
                                        options: {
                                            bottomTab: {
                                                text: 'Share Place',
                                                selectedIconColor: 'purple',
                                                icon: sources[1]
                                            },
                                            topBar: {
                                                title: {
                                                    text: 'Share Place'
                                                }
                                                ,
                                                leftButtons: [
                                                    {
                                                        id: 'buttonTwo',
                                                        icon: sources[2],
                                                        text: 'Menu',
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        });
    });

    // Button press listener
    Navigation.events().registerNavigationButtonPressedListener((event) => {
        console.log(event)
        // launching menu
        if (event.buttonId == 'buttonTwo' || event.buttonId == 'buttonOne'){
            Navigation.mergeOptions('leftSideDrawer', {
                sideMenu: {
                    left: {
                        visible: true
                    }
                }
            });
        }

    })

};

export default startTabs;

