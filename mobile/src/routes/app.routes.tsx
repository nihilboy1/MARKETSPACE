import { HouseLine, SignOut, TagSimple } from "phosphor-react-native";

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { AdDetails } from "@screens/AdDetails";
import { Home, PostedProduct } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { SignOutEmptyScreen } from "@screens/SignOutEmptyScreen";
import { useTheme } from "native-base";
import { Platform } from "react-native";

type AppRoutes = {
  home: undefined;
  myads: undefined;
  signOutEmptyScreen: undefined;
  addetails: { data: PostedProduct };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const iconsSizes = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[600],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[100],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[8],
          paddingTop: sizes[8],
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <HouseLine
              size={iconsSizes}
              color={color}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />

      <Screen
        name="myads"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TagSimple
              size={iconsSizes}
              color={color}
              weight={focused ? "bold" : "regular"}
              style={{ transform: [{ rotate: "-135deg" }] }}
            />
          ),
        }}
      />
      <Screen
        name="addetails"
        component={AdDetails}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="signOutEmptyScreen"
        component={SignOutEmptyScreen}
        options={{
          tabBarIcon: () => <SignOut size={26} color={colors.red[400]} />,
        }}
      />
    </Navigator>
  );
}
