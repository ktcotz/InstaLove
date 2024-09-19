import ProgressBar from "@ramonak/react-progress-bar";

type PostLoaderProps = {
  uploadProgress: number;
};

export const PostLoader = ({ uploadProgress }: PostLoaderProps) => {
  return (
    <div className="p-4">
      <ProgressBar
        completed={uploadProgress}
        barContainerClassName="bg-stone-950 text-stone-50"
      />
    </div>
  );
};
