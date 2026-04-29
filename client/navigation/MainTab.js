import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Feather} from '@expo/vector-icons';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import GalleryScreen from '../screens/GalleryScreen';
import CaptureScreen from '../screens/CaptureScreen';
import LensScreen from '../screens/LensScreen';

const Tab = createBottomTabNavigator();

function CameraBubbleButton({ children, onPress }) {
    return (
        <TouchableOpacity style={styles.bubbleWrap} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.bubble}>
                {children}
            </View>
        </TouchableOpacity>
    );
}

export default function MainTab() {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: '#fffdf6' }}
            screenOptions={({navigation}) => ({
                headerShown: true,
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#fffdf6',
                    height: 55 + insets.top,
                },
                headerTitleAlign: 'center',
                headerTitle: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Gallery')} activeOpacity={0.8}>
                        <Image source={require('../assets/shuttrIcon.png')} style={styles.headerLogo} resizeMode="contain" />
                    </TouchableOpacity>
                ),
                headerTitleContainerStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    bottom: 0,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#00cfff',
                tabBarInactiveTintColor: '#333',
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen
                name="Gallery"
                component={GalleryScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
                }}
            />

            <Tab.Screen
                name="Capture"
                component={CaptureScreen}
                options={{
                    tabBarIcon: () => <Feather name="camera" size={28} color="#fff" />,
                    tabBarButton: (props) => <CameraBubbleButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Lens"
                component={LensScreen}
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="user" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    headerLogo: {
        width: 50,
        height: 50,
    },
    tabBar: {
        height: 80,
        paddingTop: 8,
        paddingBottom: 20,
        backgroundColor: '#fffdf6',
    },
    bubbleWrap: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubble: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#00cfff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 4},
        elevation: 8,
    },
});