import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { SignOutEmptyScreen } from "@screens/SignOutEmptyScreen";
import { useTheme } from "native-base";
import { HouseLine, SignOut, TagSimple } from "phosphor-react-native";
import { Platform } from "react-native";

type AppTabsRoutes = {
  home: undefined;
  myAds: undefined;
  signOutEmptyScreen: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppTabsRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppTabsRoutes>();

export function HomeTabs() {
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
        name="myAds"
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
        name="signOutEmptyScreen"
        component={SignOutEmptyScreen}
        options={{
          tabBarIcon: () => <SignOut size={26} color={colors.red[400]} />,
        }}
      />
    </Navigator>
  );
}
