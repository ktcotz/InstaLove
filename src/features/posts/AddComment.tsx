import { useForm } from "react-hook-form";
import { Form } from "../../ui/form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateComment, CreateCommentSchema } from "./schema/CommentSchema";
import { useAddComment } from "./mutations/useAddComment";

type AddCommentProps = {
  user_id: string;
  post_id: number;
};

export const AddComment = ({ user_id, post_id }: AddCommentProps) => {
  const { addComment } = useAddComment(post_id);

  const { register, handleSubmit, reset } = useForm<CreateComment>({
    resolver: zodResolver(CreateCommentSchema),
  });

  const submitHandler = ({ comment }: CreateComment) => {
    if (!comment) return;

    addComment(
      { comment, post_id, user_id },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
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
  );
};
