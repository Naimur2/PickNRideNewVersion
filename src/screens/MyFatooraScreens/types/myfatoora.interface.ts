import { Region } from "react-native-maps";
import { ILatLng } from "../../MapScreen/MapScreen.types";
import {
  MFCurrencyISO,
  MFMobileCountryCodeISO,
  MFPaymentype,
} from "./enums.myfatoora";

export interface IGetSendPaymentRequest {
  invoiceValue: number;
  mobileCountryIsoCode: keyof typeof MFMobileCountryCodeISO;
  displayCurrencyIso: keyof typeof MFCurrencyISO;
}

export interface IExecuteResquestJson {
  invoiceValue: number;
  paymentMethods: any[];
  selectedIndex: number;
}

export interface IGetCardDetails {
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardSecureCode: string;
  paymentType: keyof typeof MFPaymentype;
  cardHolderName: string;
  saveToken?: boolean;
  bypass?: boolean;
}

export interface ICardProps {
  imageUrl: string;
  paymentMethodEn: string;
  isSelected: boolean;
  onSelect: () => void;
}

export interface ICardListProps {
  currencyIso: MFCurrencyISO;
  imageUrl: string;
  isDirectPayment: boolean;
  isEmbeddedSupported: boolean;
  paymentCurrencyIso: string;
  paymentMethodAr: string;
  paymentMethodCode: string;
  paymentMethodEn: string;
  paymentMethodId: number;
  serviceCharge: number;
  totalAmount: number;
}

export interface IMyFatooraRoutePaymentDetails {
  message: string;
  requiredAmount: number;
  currentBalance: number;
  from?: ILatLng;
  to?: ILatLng;
  distance?: number;
  duration?: number;
  amount?: number;
}

export interface IMyFatooraRouteParams {
  amount?: number;
  paymentDetails?: IMyFatooraRoutePaymentDetails;
  paymentFor?: "lowBalance" | "recharge";
  showTimers?: boolean;
}

export interface IPaymentAmount {
  _id?: string | number;
  amount: number;
  currency: string;
}
