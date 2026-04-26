import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import GalleryScreen from '../screens/GalleryScreen';
import LensScreen from '../screens/LensScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#00cfff',
                tabBarInactiveTintColor: '#333',
                tabBarStyle: {
                    height: 80,
                    paddingTop: 8,
                    paddingBottom: 20,
                    backgroundColor: '#fffdf6',
                },
            }}
        >
            <Tab.Screen name="Gallery" component={GalleryScreen} />
            <Tab.Screen name="Lens" component={LensScreen} />
        </Tab.Navigator>
    )
}