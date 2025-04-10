import { Dimensions } from "react-native"

type dimentionType = 'window' | 'screen';
export const getWidth = (type:dimentionType) => {
    return Dimensions.get(type).width;
}