import Image from "next/image";

export default function AboutHeroSection() {
  return (
    <div className="relative h-44 md:h-84">
      <Image
        src="/images/about/slider.png"
        alt="banner"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid place-items-center">
          <h2 className="text-white text-base lg:text-[40px] font-bold">
            درباره ترخینه بیشتر بدانید!
          </h2>
        </div>
      </div>
    </div>
  );
}
