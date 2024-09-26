import ProgressBar from "@ramonak/react-progress-bar";

type NestedProgressBarProps = {
  timer: number;
  nestedStories: number;
  nestedStorie?: number;
};

export const NestedProgressBar = ({
  timer,
  nestedStories,
  nestedStorie,
}: NestedProgressBarProps) => {
  console.log(nestedStorie);

  const gridColumns = Array.from({ length: nestedStories }, () => "1fr").join(
    " "
  );

  const progressBars = Array.from({ length: nestedStories }, (_, i) => i);

  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: gridColumns,
      }}
    >
      {progressBars.map((bar) => (
        <ProgressBar
          key={bar}
          completed={nestedStorie === bar ? timer : 0}
          maxCompleted={25}
          baseBgColor="#eee"
          bgColor="#bbb"
          customLabel=" "
          height="4px"
          transitionTimingFunction="linear"
        />
      ))}
    </div>
  );
};
