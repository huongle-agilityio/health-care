import Image from "next/image";
import mountains from "../../../public/opengraph-image.png";

export default function Page() {
  return (
    <>
      <h1>Responsive</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Image
          alt="Mountains"
          // Importing an image will
          // automatically set the width and height
          src={mountains}
          sizes="100vw"
          // Make the image display full width
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <h1>Fill Container</h1>
      <div
        style={{
          display: "grid",
          gridGap: "8px",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, auto))",
        }}
      >
        <div style={{ position: "relative", height: "400px" }}>
          <Image
            alt="Mountains"
            src={mountains}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: "cover", // cover, contain, none
            }}
          />
        </div>
        {/* And more images in the grid... */}
      </div>
      <h1>Background Image</h1>
      {/* <Image
        alt="Mountains"
        src={mountains}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      /> */}
    </>
  );
}
