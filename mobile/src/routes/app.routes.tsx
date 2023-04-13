import { ProductDTO, productImagesProps } from "@dtos/ProductDTO";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Ad } from "@screens/Ad";
import { AdPreview } from "@screens/AdPreview";
import { CreateAd } from "@screens/CreateAd";
import { EditAd } from "@screens/EditAd";
import { paymentMethodsProps } from "@screens/Home";
import { MyAd } from "@screens/MyAd";
import { HomeTabs } from "./appTabs.routes";

type AppRoutes = {
  myAds: undefined;
  stackHome: undefined;
  createAd: undefined;
  productDetails: { data: ProductDTO };
  editAd: { data: ProductDTO };
  adPreview: {
    editing?: boolean;
    id?: string;
    title: string;
    description: string;
    price: string;
    productPhotos: productImagesProps[];
    deletedPhotosID: string[];
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
      <Screen name="editAd" component={EditAd}></Screen>
    </Navigator>
  );
}
