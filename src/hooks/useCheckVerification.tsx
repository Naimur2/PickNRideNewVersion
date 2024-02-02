import { useLazyGetGetUserDocumentsStatusApiQuery } from "@store/api/v1/userDocumentApi/userDocumentApi";
import React from "react";

export default function useCheckVerification() {
    const [checkDocumentVerification, { isLoading }] =
        useLazyGetGetUserDocumentsStatusApiQuery();

    const [verificationStatuses, setVerificationStatuses] = React.useState({
        isEmailVerified: false,
        isMobileVerified: false,
        isAddressVerified: false,
        isLicenceVerified: false,
        isSelfieVideoVerified: false,
        isSignatureVerified: false,
    });

    const checkVerification = async () => {
        try {
            const documentRes = await checkDocumentVerification(
                undefined
            ).unwrap();

            const hasEmailVerified =
                documentRes?.data?.customerInfo?.is_email_verified;
            const hasMobileVerified =
                documentRes?.data?.customerInfo?.is_mobile_verified;

            const addressStatus = documentRes?.data?.documentsStatus?.Address;
            const licenceStatus = documentRes?.data?.documentsStatus?.Licence;
            const selfieStatus = documentRes?.data?.documentsStatus?.Selfie;
            const selfieVideoStatus =
                documentRes?.data?.documentsStatus?.SelfieVideo;
            const signatureStatus =
                documentRes?.data?.documentsStatus?.Signature;
            const passportStatus = documentRes?.data?.documentsStatus?.Passport;

            const isAddressVerified =
                addressStatus === "Approved" || passportStatus === "Approved";
            const isLicenceVerified = licenceStatus === "Approved";
            // const isSelfieVerified = selfieStatus === "Approved";
            const isSelfieVideoVerified = selfieVideoStatus === "Approved";
            const isSignatureVerified = signatureStatus === "Approved";

            const isAccountVerified =
                hasEmailVerified &&
                hasMobileVerified &&
                isAddressVerified &&
                isLicenceVerified &&
                // isSelfieVerified &&
                isSelfieVideoVerified &&
                isSignatureVerified;
            setVerificationStatuses({
                isEmailVerified: hasEmailVerified,
                isMobileVerified: hasMobileVerified,
                isAddressVerified,
                isLicenceVerified,
                isSelfieVideoVerified,
                isSignatureVerified,
            });
            return isAccountVerified;
        } catch (error) {
            return false;
        }
    };

    const checkMobileVerification = async () => {
        try {
            const documentRes = await checkDocumentVerification(
                undefined
            ).unwrap();

            const hasMobileVerified =
                documentRes?.data?.customerInfo?.is_mobile_verified;

            return hasMobileVerified;
        } catch (error) {
            return false;
        }
    };

    return {
        checkVerification,
        data: verificationStatuses,
        isLoading,
        checkMobileVerification,
    };
}
