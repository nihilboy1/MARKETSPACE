import {
  ProductDTO,
  paymentMethodsProps,
  productImagesProps,
} from "@dtos/ProductDTO";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Ad } from "@screens/Ad";
import { AdPreview } from "@screens/AdPreview";
import { CreateAd } from "@screens/CreateAd";
import { MyAd } from "@screens/MyAd";
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
    productPhotos: productImagesProps[];
    paymentMethods: paymentMethodsProps[];
    isNew: boolean;
    acceptTrade: boolean;
  };
  ad: { id: string };
  myAd: { id: string };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="stackHome" component={HomeTabs} />
      <Screen name="productDetails" component={Ad} />
      <Screen name="createAd" component={CreateAd} />
      <Screen name="adPreview" component={AdPreview} />
      <Screen name="ad" component={Ad} />
      <Screen name="myAd" component={MyAd}></Screen>
    </Navigator>
  );
}
