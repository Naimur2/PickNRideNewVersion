import moment from "moment";
import { VStack } from "native-base";
import H3 from "@components/H3/H3";
import NotificationsCard, {
  INotificationsCard,
} from "../NotificationsCard/NotificationsCard";

export interface INotification {
  title: string | Date;
  data: INotificationsCard[];
}

const NewNotification = (props: INotification) => {
  return (
    <VStack w={"full"}>
      <H3>{props?.title ? moment(props?.title).format("MMM Do YY") : ""}</H3>
      <VStack space={4}>
        {props?.data?.map((item, index) => (
          <NotificationsCard
            key={item?.title + item?.data?.length.toString() + index.toString()}
            user={item?.user}
            description={item?.description}
            dateTime={item?.dateTime ? moment(item?.dateTime).fromNow() : ""}
          />
        ))}
      </VStack>
    </VStack>
  );
};

export default NewNotification;
