import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText, PrismicText } from "@prismicio/react";
import React from "react"; // Ensure React is imported

export type VideoGalleryProps = SliceComponentProps<Content.VideoGallerySlice>;

// Using React.FC (Function Component) is the cleanest way to type this
const VideoGallery: React.FC<VideoGalleryProps> = ({ slice }) => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl text-black font-bold tracking-tight">
          {slice.primary.title}
        </h2>
        {/* Helper to handle Rich Text description */}
        <div className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          <PrismicRichText field={slice.primary.description} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {slice.primary.items.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:shadow-xl"
          >
            {/* Aspect Ratio Container for Responsive Video */}
            <div className="aspect-video w-full overflow-hidden bg-slate-900">
              <div
                className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full"
                dangerouslySetInnerHTML={{ __html: item.video_url.html || "" }}
              />
            </div>

            {/* Caption Area */}
            {isFilled.richText(item.text) && (
              <div className="p-6">
                <div className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors [&_a]:text-blue-600 [&_a:hover]:underline">
                  <PrismicRichText field={item.text} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoGallery;