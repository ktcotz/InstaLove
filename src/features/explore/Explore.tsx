import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Post } from "../posts/Post";
import { Wrapper } from "../../ui/Wrapper";
import { useGetAllPostsAndReels } from "./queries/useGetAllPostsAndReels";
import { Modal } from "../../ui/modal/Modal";
import { Button } from "../../ui/Button";
import { IndividualModalPost } from "../posts/IndividualModalPost";
import { useCallback, useRef } from "react";
import { Loader } from "../../ui/Loader";

export const MAX_EXPLORE_POST = 2;

export const Explore = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useGetAllPostsAndReels();

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLButtonElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log(entries);
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const items = data?.pages.flat();

  return (
    <Wrapper>
      <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 768: 2, 1024: 3 }}>
        <Masonry gutter="20px">
          {items?.map((item) => {
            return (
              <Modal key={item.id}>
                <Modal.Open>
                  <Button modifier="close" ref={lastElementRef}>
                    <Post {...item} />
                  </Button>
                </Modal.Open>
                <Modal.Content>
                  <IndividualModalPost post={item} />
                </Modal.Content>
              </Modal>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
      {isLoading && (
        <div className="flex items-center justify-center p-6">
          <Loader />
        </div>
      )}
    </Wrapper>
  );
};
