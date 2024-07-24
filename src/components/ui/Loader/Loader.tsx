"use client";
import { FC, useState, useEffect, useRef } from "react";
import styles from "./Loader.module.scss";
import { useAppSelector } from "@store/hook";
import { $ } from "@helpers/classMerge";
import { Russo_One } from "next/font/google";

const russo_one = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Loader: FC = () => {
  const preloader_wrapper = useRef<HTMLDivElement>(null);
  const isLoading = useAppSelector((state) => state.loader.isLoading);

  const [visible, setVisible] = useState<boolean>(true);

  const recalculateLineSizes = () => {
    if (!preloader_wrapper.current) return;
    const paths = Array.from(
      preloader_wrapper.current.querySelectorAll("path")
    );
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDashoffset = `${length}px`;
      path.style.strokeDasharray = `${length}px`;
    });
  };

  useEffect(() => {
    window.addEventListener("resize", recalculateLineSizes);
    return () => window.removeEventListener("resize", recalculateLineSizes);
  });

  useEffect(() => {
    if (!preloader_wrapper.current) return;
    document.body.className = isLoading ? "lock-scroll" : "";

    if (isLoading) setVisible(true);
  }, [isLoading]);

  useEffect(() => recalculateLineSizes());

  return (
    <div
      className={$(
        styles.preloader,
        isLoading ? styles.active : "",
        visible ? styles.visible : ""
      )}
      ref={preloader_wrapper}
    >
      {/* <div className={$(styles.copyright, russo_one.className)}>
        <span>Developed by</span> AlphaDigital
      </div> */}
      <svg
        width="714"
        height="133.5"
        viewBox="0 0 714 133.5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="svgGroup"
          stroke-linecap="round"
          fill-rule="evenodd"
          font-size="9pt"
          stroke="#000"
          stroke-width="0.25mm"
          fill="none"
        >
          <path
            d="M 54 85.5 L 54 106.5 L 0 106.5 L 0 85.5 L 13.5 85.5 L 13.5 22.5 L 0 22.5 L 0 1.5 L 54 1.5 L 54 22.5 L 40.5 22.5 L 40.5 85.5 L 54 85.5 Z"
            id="0"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 115.5 47.25 L 110.25 47.25 A 50.675 50.675 0 0 0 102.614 47.866 Q 98.963 48.424 94.959 49.486 A 91.448 91.448 0 0 0 92.25 50.25 L 92.25 106.5 L 66 106.5 L 66 27 L 89.25 27 L 90.75 34.5 Q 97.8 29.85 105.225 27.675 A 68.731 68.731 0 0 1 110.055 26.437 Q 114.403 25.5 117.75 25.5 L 124.5 25.5 A 27.41 27.41 0 0 1 131.716 26.401 A 20.168 20.168 0 0 1 140.85 31.65 Q 147 37.8 147 48 L 147 106.5 L 120.75 106.5 L 120.75 52.5 A 5.544 5.544 0 0 0 120.409 50.526 A 4.983 4.983 0 0 0 119.25 48.75 Q 117.75 47.25 115.5 47.25 Z"
            id="1"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 216 87 L 216 106.5 Q 201.45 108 187.5 108 A 27.41 27.41 0 0 1 180.284 107.099 A 20.168 20.168 0 0 1 171.15 101.85 Q 165 95.7 165 85.5 L 165 47.25 L 156 47.25 L 156 27 L 165 27 L 168 9 L 191.25 9 L 191.25 27 L 210 27 L 210 47.25 L 191.25 47.25 L 191.25 81.75 A 5.544 5.544 0 0 0 191.591 83.724 A 4.983 4.983 0 0 0 192.75 85.5 Q 194.25 87 196.5 87 L 216 87 Z"
            id="2"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 298.5 86.25 L 298.5 105 Q 269.55 108 246 108 A 27.41 27.41 0 0 1 238.784 107.099 A 20.168 20.168 0 0 1 229.65 101.85 Q 223.5 95.7 223.5 85.5 L 223.5 49.5 A 32.067 32.067 0 0 1 224.253 42.342 Q 225.691 36.059 229.875 31.875 A 21.015 21.015 0 0 1 240.044 26.323 Q 243.35 25.526 247.248 25.501 A 39.419 39.419 0 0 1 247.5 25.5 L 277.5 25.5 A 32.067 32.067 0 0 1 284.658 26.253 Q 290.941 27.691 295.125 31.875 A 21.015 21.015 0 0 1 300.677 42.044 Q 301.474 45.35 301.499 49.248 A 39.419 39.419 0 0 1 301.5 49.5 L 301.5 77.25 L 249.75 77.25 L 249.75 83.25 A 5.544 5.544 0 0 0 250.091 85.224 A 4.983 4.983 0 0 0 251.25 87 Q 252.75 88.5 255 88.5 Q 266.37 88.5 285.828 87.181 A 1190.996 1190.996 0 0 0 298.5 86.25 Z M 269.25 44.25 L 255.75 44.25 A 8.638 8.638 0 0 0 253.376 44.547 Q 250.713 45.31 250.006 48.028 A 8.84 8.84 0 0 0 249.75 50.25 L 249.75 58.5 L 275.25 58.5 L 275.25 50.25 A 8.638 8.638 0 0 0 274.953 47.876 Q 274.19 45.213 271.472 44.506 A 8.84 8.84 0 0 0 269.25 44.25 Z"
            id="3"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 373.5 48.75 L 360.75 48.75 A 43.858 43.858 0 0 0 348.242 50.642 A 56.276 56.276 0 0 0 341.25 53.25 L 341.25 106.5 L 315 106.5 L 315 27 L 338.25 27 L 339.75 36.75 Q 352.65 25.5 366.75 25.5 L 373.5 25.5 L 373.5 48.75 Z"
            id="4"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 511.5 84.75 L 511.5 105 Q 489.026 107.016 471.698 107.677 A 413.471 413.471 0 0 1 456 108 Q 441.3 108 434.4 101.1 A 21.024 21.024 0 0 1 429.565 93.248 Q 427.5 87.541 427.5 79.5 L 427.5 31.5 Q 427.5 15.75 434.625 8.625 A 21.225 21.225 0 0 1 442.172 3.881 Q 448.395 1.5 457.5 1.5 L 511.5 1.5 L 511.5 22.5 L 463.5 22.5 Q 456.358 22.5 454.884 28.167 A 13.26 13.26 0 0 0 454.5 31.5 L 454.5 79.5 Q 454.5 82.95 456.525 84.975 A 6.833 6.833 0 0 0 460.93 86.968 A 9.185 9.185 0 0 0 461.7 87 A 304.085 304.085 0 0 0 465 86.981 A 394.941 394.941 0 0 0 468.6 86.925 A 445.789 445.789 0 0 0 474.394 86.77 A 500.236 500.236 0 0 0 476.4 86.7 Q 480.45 86.55 484.575 86.4 Q 488.265 86.266 493.875 85.892 A 601.229 601.229 0 0 0 495.225 85.8 Q 501.592 85.361 511.031 84.779 A 3894.641 3894.641 0 0 1 511.5 84.75 Z"
            id="6"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 517.5 30 L 555 30 L 555 106.5 L 528.75 106.5 L 528.75 50.25 L 517.5 50.25 L 517.5 30 Z M 528.75 21 L 528.75 0 L 555 0 L 555 21 L 528.75 21 Z"
            id="7"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 625.5 87 L 625.5 106.5 Q 610.95 108 597 108 A 27.41 27.41 0 0 1 589.784 107.099 A 20.168 20.168 0 0 1 580.65 101.85 Q 574.5 95.7 574.5 85.5 L 574.5 47.25 L 565.5 47.25 L 565.5 27 L 574.5 27 L 577.5 9 L 600.75 9 L 600.75 27 L 619.5 27 L 619.5 47.25 L 600.75 47.25 L 600.75 81.75 A 5.544 5.544 0 0 0 601.091 83.724 A 4.983 4.983 0 0 0 602.25 85.5 Q 603.75 87 606 87 L 625.5 87 Z"
            id="8"
            vector-effect="non-scaling-stroke"
          />
          <path
            d="M 634.5 132 L 634.5 112.5 L 648 112.5 A 15.887 15.887 0 0 0 650.565 112.309 Q 654.125 111.725 655.425 109.35 Q 656.866 106.719 655.429 102.309 A 23.177 23.177 0 0 0 654.75 100.5 L 624 27 L 651.75 27 L 670.5 78 L 686.25 27 L 714 27 L 684 109.5 A 59.897 59.897 0 0 1 680.544 117.271 Q 678.383 121.283 675.792 124.322 A 30.413 30.413 0 0 1 672.75 127.425 A 23.264 23.264 0 0 1 663.117 132.419 Q 658.999 133.5 654 133.5 A 107.636 107.636 0 0 1 647.531 133.289 Q 644.625 133.113 641.367 132.791 A 226.765 226.765 0 0 1 634.5 132 Z"
            id="9"
            vector-effect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>
  );
};

export default Loader;
