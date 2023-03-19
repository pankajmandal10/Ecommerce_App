import {StackNavigationProp} from '@react-navigation/stack';
import {MainRoutes, MainStackParamList} from './Routing';

export type MainNavigationProp<
  RouteName extends keyof MainStackParamList = MainRoutes,
> = StackNavigationProp<MainStackParamList, RouteName>;
