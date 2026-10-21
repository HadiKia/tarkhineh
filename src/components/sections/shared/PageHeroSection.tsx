import Image from "next/image";

type PageHeroSectionProps = {
  image: string;
  title: string;
  imageAlt?: string;
};

export default function PageHeroSection({
  image,
  title,
  imageAlt = "banner",
}: PageHeroSectionProps) {
  return (
    <div className="relative h-44 md:h-84">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid place-items-center">
          <h2 className="text-white text-base lg:text-[40px] font-bold">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
