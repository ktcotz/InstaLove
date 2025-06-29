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
    <div className="grid grid-rows-3 grid-cols-2 sm:grid-cols-3 sm:grid-rows-2 gap-3 max-h-[500px]">
      {data.map((explore) => {
        return (
          <>
            <Modal.Open openClass={`explore-${explore.id}`}>
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
                <Post {...explore} maxHeight={800} />
              </Button>
            </Modal.Open>
            <Modal.Content
              manageClass={`explore-${explore.id}`}
              parentClass="mx-auto max-w-6xl w-full"
            >
              <IndividualModalPost post={explore} />
            </Modal.Content>
          </>
        );
      })}
    </div>
  );
};
