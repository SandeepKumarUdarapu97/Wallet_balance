import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {UserScreen} from "../screens/UserScreen";

const RootNavigation = ()=>{
    const stackNavigator = createStackNavigator();

    return(
        <NavigationContainer initialState='Home'>
            <stackNavigator.Screen name="Home" component={UserScreen}/>
        </NavigationContainer>
    )
   
}
export default RootNavigation;