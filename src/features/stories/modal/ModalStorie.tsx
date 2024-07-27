type ModalStorieProps = {
  active?: boolean;
  mobile?: boolean;
};

export const ModalStorie = ({ active, mobile }: ModalStorieProps) => {
  return (
    <div
      style={{ backgroundImage: "url(https://picsum.photos/250/400)" }}
      className={`${active ? "h-[600px] w-full" : "h-[300px]"}
      
        ${
          mobile && "w-full h-full md:h-[600px] md:w-[600px]"
        } transition-all duration-500 bg-no-repeat bg-cover bg-center`}
    >
      asd
    </div>
  );
};
