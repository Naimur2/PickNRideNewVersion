import {
    useGetEmailMobileStatusApiQuery,
    useGetGetUserDocumentsStatusApiQuery,
    useLazyGetEmailMobileStatusApiQuery,
    useLazyGetGetUserDocumentsStatusApiQuery,
} from "@store/api/v1/userDocumentApi/userDocumentApi";

export default function useCheckVerification() {
    const [checkDocumentVerification, checkDocumentVerificationRes] =
        useLazyGetGetUserDocumentsStatusApiQuery();

    const [checkEmailMobileVerification, checkEmailMobileVerificationRes] =
        useLazyGetEmailMobileStatusApiQuery();

    const checkVerification = async () => {
        try {
            const documentRes = await checkDocumentVerification(
                undefined
            ).unwrap();
            const emailMobileRes = await checkEmailMobileVerification(
                undefined
            ).unwrap();

            const hasError = documentRes?.error || emailMobileRes?.error;
            const hasEmailVerified =
                emailMobileRes?.data?.customerInfo?.is_email_verified;
            const hasMobileVerified =
                emailMobileRes?.data?.customerInfo?.is_mobile_verified;

            const isAccountVerified =
                hasEmailVerified && hasMobileVerified && !hasError;
            return isAccountVerified;
        } catch (error) {
            return false;
        }
    };

    return {
        checkVerification,
    };
}
