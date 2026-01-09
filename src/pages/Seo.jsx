import { Helmet } from "react-helmet-async";

export default function Seo({ title, description, canonical }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
