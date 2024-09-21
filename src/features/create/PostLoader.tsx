import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type PostLoaderProps = {
  uploadProgress: number;
};

export const PostLoader = ({ uploadProgress }: PostLoaderProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center">
      <div className="w-32 h-32">
        <CircularProgressbar
          maxValue={100}
          minValue={1}
          value={uploadProgress}
          text={`${uploadProgress} %`}
          styles={buildStyles({
            backgroundColor: "#000",
            trailColor: "#000",
            pathColor: "#fff",
            textColor: "#fff",
          })}
        />
      </div>
    </div>
  );
};
