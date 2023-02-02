import { HouseLine, SignOut, TagSimple } from "phosphor-react-native";

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { SignOutEmptyScreen } from "@screens/SignOutEmptyScreen";
import { useTheme } from "native-base";
import { Platform } from "react-native";

type AppRoutes = {
  home: undefined;
  myads: undefined;
  signOutEmptyScreen: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[8],
          paddingTop: sizes[8],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: () => <HouseLine size={26} />,
        }}
      />

      <Screen
        name="myads"
        component={MyAds}
        options={{
          tabBarIcon: () => (
            <TagSimple
              size={26}
              style={{ transform: [{ rotate: "-135deg" }] }}
            />
          ),
        }}
      />
      <Screen
        name="signOutEmptyScreen"
        component={SignOutEmptyScreen}
        options={{
          tabBarIcon: () => <SignOut size={26} />,
        }}
      />
    </Navigator>
  );
}
