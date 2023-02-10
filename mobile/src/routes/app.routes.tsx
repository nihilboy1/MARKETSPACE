import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { CreateAd } from "@screens/CreateAd";
import { PostedProduct } from "@screens/Home";
import { ProductDetails } from "@screens/ProductDetails";
import { HomeTabs } from "./appTabs.routes";

type AppRoutes = {
  stackHome: undefined;
  myAds: undefined;
  createAd: undefined;
  productDetails: { data: PostedProduct };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="stackHome" component={HomeTabs} />
      <Screen name="productDetails" component={ProductDetails} />
      <Screen name="createAd" component={CreateAd} />
    </Navigator>
  );
}
