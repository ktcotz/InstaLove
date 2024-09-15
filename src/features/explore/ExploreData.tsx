import { Button, Modal } from "../../ui";
import { IndividualModalPost } from "../posts/IndividualModalPost";
import { Post } from "../posts/Post";
import { GeneralPosts } from "../posts/schema/PostsSchema";

type ExploreDataProps = {
  data: GeneralPosts;
  lastElement: (node: HTMLButtonElement) => void;
  idx: number;
};

export const ExploreData = ({ data, lastElement, idx }: ExploreDataProps) => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1">
      {data.map((explore) => {
        return (
          <Modal key={explore.id}>
            <Modal.Open>
              <Button
                modifier={
                  explore.video_url
                    ? idx % 2 === 0
                      ? "explore-back"
                      : "explore"
                    : "close"
                }
                ref={lastElement}
              >
                <Post {...explore} />
              </Button>
            </Modal.Open>
            <Modal.Content>
              <IndividualModalPost post={explore} />
            </Modal.Content>
          </Modal>
        );
      })}
    </div>
  );
};
