"use client";

import React, { useState, useEffect } from "react";
import { getBannerResponse } from "@/app/libs/api-libs";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerAPI, setBannerAPI] = useState({});

  const bannerImages = [
    "banner_rikka.png",
    "banner_lain.png",
    "banner_another.png",
  ];

  useEffect(() => {
    const getBannerData = async () => {
      const data = await getBannerResponse();
      setBannerAPI(data);
    };

    getBannerData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    if (bannerAPI.banner) {
      setCurrentIndex((currentIndex - 1 + bannerAPI.banner.length) % 3);
    }
  };

  const handleNext = () => {
    if (bannerAPI.banner) {
      setCurrentIndex((currentIndex + 1) % 3);
    }
  };

  return (
    <div>
      {bannerAPI.banner && (
        <div
          className="relative w-full h-60 md:h-96 lg:h-120 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url(/banner/${bannerImages[currentIndex]})`,
          }}
        >
          <button
            className="absolute left-3 lg:left-6 top-1/2 transform -translate-y-1/2 z-40"
            onClick={handlePrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4  md:h-6 md:w-6 text-slate-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="absolute right-3 lg:right-6 top-1/2 transform -translate-y-1/2 z-40"
            onClick={handleNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4  md:h-6 md:w-6 text-slate-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="absolute left-10 md:left-16 lg:left-24 transition-all duration-500 ease-in-out top-1/2 -translate-y-1/2 md:translate-y-0">
            <Link
              href={
                bannerAPI.banner && bannerAPI.banner[currentIndex]
                  ? `/anime/${bannerAPI.banner[currentIndex].malID}`
                  : "#"
              }
            >
              <Image
                unoptimized={false}
                src={bannerAPI.banner[currentIndex].logo}
                alt={bannerAPI.banner[currentIndex].title}
                width={300}
                height={180}
                className="w-max h-12 md:h-20 lg:h-32 hover:scale-105 transition-all duration-300"
              />
            </Link>
            <h2 className="text-xs md:text-sm lg:text-base text-zinc-300 ml-2 lg:ml-4 hidden md:block">
              Genres | {bannerAPI.banner[currentIndex].genre}
            </h2>
            <h2 className="text-xs md:text-sm lg:text-base text-zinc-300 ml-2 lg:ml-4 hidden md:block">
              {bannerAPI.banner[currentIndex].rating}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
