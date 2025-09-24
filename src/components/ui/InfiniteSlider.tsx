"use client";

import Image from "next/image";
import React from "react";

type InfiniteSliderProps = {
  images?: string[];
  /** Seconds for one full loop */
  durationSeconds?: number;
  /** Tailwind size in pixels; used for both width and height of items */
  itemSize?: number;
  /** Spacing between items in pixels */
  gap?: number;
  /** Reverse the direction */
  reverse?: boolean;
  /** Indices of images (based on the provided images array) to mirror horizontally */
  mirrorIndices?: number[];
  /** Background colors that map to images by index and repeat. */
  backgrounds?: string[];
  /** Vertical offset to nudge the image down inside the circle (percentage of its size). */
  imageOffsetYPercent?: number;
  className?: string;
};

const defaultImages: string[] = [
    "/slide/WhiteMan.png",
    "/slide/RedHead.png",
    "/slide/BlackMan.png",
    "/slide/BlackGirl.png",
];

export default function InfiniteSlider({
  images = defaultImages,
  durationSeconds = 22,
  itemSize = 120,
  gap = 48,
  reverse = false,
  mirrorIndices = [0, 1],
  backgrounds = ["#F4B840", "#BFD7D0", "#C8F0F2", "#A5BD92"],
  imageOffsetYPercent = 15,
  className = "",
}: InfiniteSliderProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [group, setGroup] = React.useState<string[]>(images);

  // Ensure one group is at least as wide as the container to avoid blanks
  React.useEffect(() => {
    if (!containerRef.current) return;

    const compute = () => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const perItem = itemSize + gap; // approximate width including gap
      const minItemsNeeded = Math.max(1, Math.ceil((containerWidth + perItem) / perItem));
      const repeats = Math.max(1, Math.ceil(minItemsNeeded / images.length));
      const nextGroup = Array.from({ length: repeats })
        .flatMap(() => images);
      setGroup(nextGroup);
    };

    compute();
    const ro = new ResizeObserver(() => compute());
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [images, itemSize, gap]);

  const duplicated = React.useMemo(() => [...group, ...group], [group]);
  type CSSVars = React.CSSProperties & { [key: string]: string | number };
  const styleVars: CSSVars = {
    "--infinite-duration": `${durationSeconds}s`,
    "--infinite-gap": `${gap}px`,
    "--infinite-direction": reverse ? "reverse" : "normal",
  };

  return (
    <div
      ref={containerRef}
      className={
        `infinite-slider relative w-full select-none ` + className
      }
      style={styleVars}
      aria-label="infinite slider"
    >
      <div className="infinite-slider-mask pointer-events-none" aria-hidden />

      <ul className="infinite-slider-track" role="list">
        {duplicated.map((src, index) => {
          const groupIndex = index % group.length;
          const imageOriginalIndex = groupIndex % images.length;
          const shouldMirror = mirrorIndices.includes(imageOriginalIndex);
          const bgColor = backgrounds[imageOriginalIndex % backgrounds.length];
          const transformParts: string[] = [];
          if (shouldMirror) transformParts.push("scaleX(-1)");
          if (imageOffsetYPercent !== 0)
            transformParts.push(`translateY(${imageOffsetYPercent}%)`);
          return (
            <li
              key={`${src}-${index}`}
              className="infinite-slider-item"
              style={{ width: itemSize, height: itemSize }}
            >
              <div
                className="rounded-full overflow-hidden w-full h-full"
                style={{ backgroundColor: bgColor }}
              >
                <Image
                  src={src}
                  alt="slide item"
                  width={itemSize}
                  height={itemSize}
                  className="w-full h-full object-cover object-center"
                  style={
                    transformParts.length
                      ? { transform: transformParts.join(" ") }
                      : undefined
                  }
                  priority={index < 4}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


