import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Post } from "../posts/Post";
import { Wrapper } from "../../ui/Wrapper";
import { useGetAllPostsAndReels } from "./queries/useGetAllPostsAndReels";
import { Modal } from "../../ui/modal/Modal";
import { Button } from "../../ui/Button";
import { IndividualModalPost } from "../posts/IndividualModalPost";

export const Explore = () => {
  const { data } = useGetAllPostsAndReels();

  console.log(data);

  return (
    <Wrapper>
      <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 768: 2, 1024: 3 }}>
        <Masonry gutter="20px">
          {data?.map((item) => (
            <Modal>
              <Modal.Open>
                <Button modifier="close">
                  <Post {...item} />
                </Button>
              </Modal.Open>
              <Modal.Content>
                <IndividualModalPost post={item} />
              </Modal.Content>
            </Modal>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Wrapper>
  );
};
