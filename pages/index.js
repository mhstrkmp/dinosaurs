import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const defaultEndpoint = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=dinosaur&safesearch=true&per_page=200`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const { hits = [] } = data;
  const defaultImage = hits[0].webformatURL;
  const [image, setImage] = useState(defaultImage);
  const [isLoading, setIsLoading] = useState(false);
  const getNewImage = () => {
    setIsLoading(true);
    setImage(hits[Math.floor(Math.random() * hits.length)].webformatURL);
  };
  const handleOnClick = async () => {
    getNewImage();
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center text-white font-body tracking-wide bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900">
      <Head>
        <title>Tyrannosaurus Lennart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1 className="p-8 text-center text-3xl font-semibold my-2 py-0">
          Tyrannosaurus
        </h1>
        <h2 className="p-8 text-center text-3xl font-semibold py-1">
          🦖 Lennart 🦖
        </h2>
      </header>
      <main className="p-4 flex flex-grow justify-center items-center">
        <div className="z-10">
          <img
            className="objectj-cover max-h-60 md:max-h-full"
            src={image}
            alt=""
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        </div>
      </main>
      <div className="py-8 tracking-widest">
        {isLoading ? (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 cursor-not-allowed"
            disabled=""
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            lädt ...
          </button>
        ) : (
          <button
            className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleOnClick}
          >
            Nächster Dino
          </button>
        )}
      </div>
      <footer className="container mx-auto text-center text-sm space-y-2 mb-2">
        <p>Mit ❤️ gebastelt von Matthias</p>
        <p className="text-gray-500 text-xs">
          Bilder von{" "}
          <Link href="https://pixabay.com/">
            <a>Pixabay</a>
          </Link>
        </p>
      </footer>
    </div>
  );
}
