type ModalStorieProps = {
  active?: boolean;
  mobile?: boolean;
};

export const ModalStorie = ({ active, mobile }: ModalStorieProps) => {
  return (
    <div
      style={{ backgroundImage: "url(https://picsum.photos/250/400)" }}
      className={`${active ? "h-[600px] flex-3" : "h-[300px]"}
      
        ${mobile && "h-[600px] w-[600px]"}
      shrink-0 w-full transition-all duration-500 bg-no-repeat bg-cover bg-center`}
    >
      asd
    </div>
  );
};
