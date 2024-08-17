import { Form } from "../../ui/form/Form";
import { CreateComment } from "./schema/CommentSchema";
import { useAddComment } from "./mutations/useAddComment";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { usePostsContext } from "./context/usePostsContext";
import { CommentSuggestions } from "./CommentSuggestions";
import { suggestions } from "./helpers/suggestions";
import { useQueryClient } from "@tanstack/react-query";
import { useAddNotification } from "../notifications/mutations/useAddNotification";
import { useUser } from "../authentication/queries/useUser";

type AddCommentProps = {
  user_id: string;
  post_id: number;
  title?: string;
};

export const AddComment = ({
  user_id,
  post_id,
  title = "Dodaj komentarz...",
}: AddCommentProps) => {
  const { getValues, handleSubmit, register, reset, setValue, watch } =
    usePostsContext();

  const comment = suggestions(watch("comment"));
  const { user: current } = useUser();
  const queryClient = useQueryClient();
  const { addComment } = useAddComment(post_id);
  const { notify } = useAddNotification({ user_id: current?.id });
  const [showEmotes, setShowEmotes] = useState(false);

  const submitHandler = ({ comment, id }: CreateComment) => {
    if (!comment || !current) return;

    addComment(
      { comment, post_id, user_id, comment_id: id },
      {
        onSuccess: () => {
          notify({
            status: "unread",
            post_id,
            user_id: comment.slice(comment.indexOf("@"), comment.indexOf(" ")),
            by_user: current.id,
            type: id ? "comment_reply" : "mark",
          });
          queryClient.invalidateQueries({ queryKey: ["nested-comments", id] });
          reset();
          setShowEmotes(false);
        },
      }
    );
  };

  return (
    <>
      <div className="relative flex gap-2 bg-stone-50">
        <Button
          modifier="close"
          onClick={() => setShowEmotes((prev) => !prev)}
          aria-label="Emoji picker"
        >
          <MdOutlineInsertEmoticon className="text-xl" aria-label="Emoji" />
        </Button>
        {showEmotes && (
          <div className="absolute top-0 left-0 -translate-y-full">
            <EmojiPicker
              height={400}
              width={300}
              searchDisabled={true}
              skinTonesDisabled={true}
              onEmojiClick={(emoji) => {
                setValue("comment", `${getValues("comment")}${emoji.emoji}`);
              }}
            />
          </div>
        )}
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Item>
            <Form.InputContainer>
              <Form.Input
                id="comment"
                required
                type="text"
                {...register("comment")}
              />
              <Form.Label id="comment">{title}</Form.Label>
            </Form.InputContainer>
          </Form.Item>
        </Form>
        {comment && <CommentSuggestions query={getValues("comment")} />}
      </div>
    </>
  );
};
