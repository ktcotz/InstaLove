import { useTranslation } from "react-i18next";

type ImageProps = {
  path: string;
  delay: string;
  alt: string;
};

const Image = ({ path, delay, alt }: ImageProps) => {
  return (
    <img
      src={path}
      alt={alt}
      className="animate-fade-image absolute top-[26px] right-[57px]"
      style={{
        animationDelay: delay,
      }}
      width={250}
      height={541}
    />
  );
};

export const AnimatedImages = () => {
  const { t } = useTranslation();
  return (
    <div
      className="w-[465px] h-[635px] bg-no-repeat bg-cover place-self-end relative animate-fade-left"
      style={{
        backgroundImage: `url("./images/home-phones.png")`,
      }}
    >
      <Image path="./images/screenshot1.png" delay="0" alt={t("images.home")} />
      <Image
        path="./images/screenshot2.png"
        delay="3s"
        alt={t("images.chat")}
      />
      <Image
        path="./images/screenshot3.png"
        delay="6s"
        alt={t("images.profile")}
      />
    </div>
  );
};
