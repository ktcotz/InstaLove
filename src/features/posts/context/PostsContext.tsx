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
    id?: number;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      comment: string;
      id?: number;
    },
    undefined
  >;
  reset: UseFormReset<{
    comment: string;
    id?: number;
  }>;
  setValue: UseFormSetValue<{
    comment: string;
    id?: number;
  }>;
  getValues: UseFormGetValues<{
    comment: string;
    id?: number;
  }>;
  setFocus: UseFormSetFocus<{
    comment: string;
    id?: number;
  }>;
  watch: UseFormWatch<{
    comment: string;
    id?: number;
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
