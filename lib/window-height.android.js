import { Dimensions, StatusBar } from "react-native";

export default () => Dimensions.get( "window" ).height - StatusBar.currentHeight;
