import { ProductDTO, paymentMethodsProps } from "@dtos/ProductDTO";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { AdDetails } from "@screens/AdDetails";
import { AdPreview } from "@screens/AdPreview";
import { CreateAd } from "@screens/CreateAd";
import { ProductDetails } from "@screens/ProductDetails";
import { HomeTabs } from "./appTabs.routes";

type AppRoutes = {
  stackHome: undefined;
  myAds: undefined;
  createAd: undefined;
  productDetails: { data: ProductDTO };
  adPreview: {
    title: string;
    description: string;
    price: string;
    productPhotos: any[];
    paymentMethods: paymentMethodsProps[];
    isNew: boolean;
    acceptTrade: boolean;
  };
  adDetails: { id: string };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="stackHome" component={HomeTabs} />
      <Screen name="productDetails" component={ProductDetails} />
      <Screen name="createAd" component={CreateAd} />
      <Screen name="adPreview" component={AdPreview} />
      <Screen name="adDetails" component={AdDetails} />
    </Navigator>
  );
}
