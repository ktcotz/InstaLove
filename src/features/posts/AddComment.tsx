import { useForm } from "react-hook-form";
import { Form } from "../../ui/form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateComment, CreateCommentSchema } from "./schema/CommentSchema";
import { useAddComment } from "./mutations/useAddComment";
import { useState } from "react";
import { Button } from "../../ui/Button";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

type AddCommentProps = {
  user_id: string;
  post_id: number;
};

export const AddComment = ({ user_id, post_id }: AddCommentProps) => {
  const { addComment } = useAddComment(post_id);
  const [showEmotes, setShowEmotes] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<CreateComment>({
    resolver: zodResolver(CreateCommentSchema),
  });

  const submitHandler = ({ comment }: CreateComment) => {
    if (!comment) return;

    addComment(
      { comment, post_id, user_id },
      {
        onSuccess: () => {
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
                setValue("comment", emoji.emoji);
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
              <Form.Label id="comment">Dodaj komentarz...</Form.Label>
            </Form.InputContainer>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
