import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText, JSXMapSerializer } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next"; // 👈 Import this

export type TextProps = SliceComponentProps<Content.TextSlice>;

// This "serializer" tells Prismic: "Whenever you see a link, use this component"
const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data} className="font-bold underline decoration-blue-500/30 transition-colors hover:text-blue-600">
      {children}
    </PrismicNextLink>
  ),
};

const Text = ({ slice }: TextProps) => {
  return (
    <section className="px-4 py-12 flex justify-center">
      <div className="prose dark:prose-invert prose-headings:text-black prose-headings:font-bold prose-strong:text-black prose-strong:font-bold mx-auto max-w-3xl">
        {/* Pass the components map here */}
        <PrismicRichText field={slice.primary.text} components={components} />
      </div>
    </section>
  );
};

export default Text;