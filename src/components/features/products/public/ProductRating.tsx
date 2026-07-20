"use client";

import { useState } from "react";
import { Rating } from "@/components/ui/rating";


export default function ProductRating() {
  const [starCount, setStarCount] = useState(2.5);
  return (
    <div dir="ltr">
      <Rating
        size={16}
        precision={0.5}
        value={starCount}
        onValueChange={setStarCount}
      />
    </div>
  );
}
