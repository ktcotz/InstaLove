import { createContext, ReactNode } from "react";
import {
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CreateComment, CreateCommentSchema } from "../schema/CommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type PostsContextState = {
  register: UseFormRegister<{
    comment: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      comment: string;
    },
    undefined
  >;
  reset: UseFormReset<{
    comment: string;
  }>;
  setValue: UseFormSetValue<{
    comment: string;
  }>;
  getValues: UseFormGetValues<{
    comment: string;
  }>;
  setFocus: UseFormSetFocus<{
    comment: string;
  }>;
  watch: UseFormWatch<{
    comment: string;
  }>;
};

export const PostsContext = createContext<PostsContextState | null>(null);

type PostsContextProviderProps = {
  children: ReactNode;
};

export const PostsContextProvider = ({
  children,
}: PostsContextProviderProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setFocus,
    watch,
  } = useForm<CreateComment>({
    resolver: zodResolver(CreateCommentSchema),
  });

  return (
    <PostsContext.Provider
      value={{
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        setFocus,
        watch,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};