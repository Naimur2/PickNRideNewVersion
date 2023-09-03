import { IAuthState } from "../../redux/features/auth/authSlice.types";
export interface ILinearProps {
    colors?: string[];
    start?: number[];
    end?: number[];
    height?: number | string;
    width?: number | string;
    style?: any;
    children?: any;
    h?: number | string;
    w?: number | string;
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
    justifyContent?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "stretch";
    borderRadius?: number;
    p?: number | string;
    pt?: number | string;
    pb?: number | string;
    pl?: number | string;
    pr?: number | string;
    m?: number | string;
    mt?: number | string;
    mb?: number | string;
    ml?: number | string;
    mr?: number | string;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: "solid" | "dotted" | "dashed";
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
}

export interface IUser extends IAuthState {}
