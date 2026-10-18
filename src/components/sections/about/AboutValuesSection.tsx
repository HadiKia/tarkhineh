import { RESTAURANT_FEATURES } from "@/constants/restaurantFeatures";

export default function AboutValuesSection() {
  return (
    <section className="bg-gray-2 p-4 lg:py-9 xl:px-0">
      <div className="mx-auto flex items-start gap-4 lg:gap-0 w-full max-w-306 lg:divide-x divide-gray-4">
        {RESTAURANT_FEATURES.map(({ label, Icon }) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center justify-center gap-1 text-center lg:gap-4"
          >
            <Icon className="text-gray-8 size-4 lg:size-12" />
            <span className="text-xs lg:text-lg text-gray-7">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
