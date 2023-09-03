import { setCurrentModal } from "@store/features/ui/uiSlice";
import { ModalTypes } from "@store/features/ui/uiSlice.types";
import { useDispatch } from "react-redux";

export default function useShowModal(): (
    name: ModalTypes,
    props: {
        title: string;
        message: string;
    }
) => void {
    const dispatch = useDispatch();

    const showModal = (
        name: ModalTypes,
        props: {
            title: string;
            message: string;
        }
    ) => {
        dispatch(setCurrentModal({ name, props }));
    };

    return showModal;
}
