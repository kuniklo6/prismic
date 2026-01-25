import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

/**
 * Props for `Text`.
 */
export type TextProps = SliceComponentProps<Content.TextSlice>;

/**
 * Component for "Text" Slices.
 */
const Text = ({ slice }: TextProps): JSX.Element => {
  return (
    <section className="px-4 py-12 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* ✅ Use a standard tag for Key Text strings */}
        <h2 className="text-3xl font-bold">{slice.primary.text}</h2>
      </div>
    </section>
  );
};
export default Text;