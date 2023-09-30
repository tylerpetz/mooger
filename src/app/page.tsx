'use client';

import React, { useEffect, useMemo, useState } from 'react';



/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export interface Film {
  title: string
  year: string
  thumbnail: string
}

export default function HomePage() {
  const films: Film[] = useMemo(() => ([
    {
      title: 'Horsing Around',
      year: '2021',
      thumbnail: 'https://creepyparty.com/cdn/shop/products/p20-tuya_560x560.jpg',
    },
    {
      title: 'Gangsters Paradise',
      year: '2022',
      thumbnail: 'https://media.gettyimages.com/id/125145388/photo/1940s-black-gangster.jpg?s=612x612&w=gi&k=20&c=uevS8wbmxrCxuY16TpKlSs8EoLJW5ooXGMQzW0fNZCA=',
    },
    {
      title: 'Soulmatoes',
      year: '2023',
      thumbnail: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg',
    }
  ]), [])

  const [currentFilm, setCurrentFilm] = useState<Film>(films[0]);

  const handleMouseOver = (film: Film) => {
    setCurrentFilm(film);
  }

  // preload images
  useEffect(() => {
    films.forEach((film) => {
      const img = new Image();
      img.src = film.thumbnail;
    });
  }, [films]);

  const selectedFilm = useMemo(() => {
    const index = films.findIndex(film => film.title === currentFilm.title)
    return films[index]
  }, [films, currentFilm])

  return (
    <main>
      <section className='relative flex min-h-screen flex-col items-start justify-end p-12 text-center space-y-8 bg-cover' style={{
        backgroundImage: `url(${selectedFilm.thumbnail})`
      }}>
        {films.map((film) => (
          <h1 className="text-white text-6xl relative" key={film.title} onMouseOver={() => handleMouseOver(film)} onFocus={() => handleMouseOver(film)}>
            {film.title}<span className="text-sm relative -top-6 pl-4">{film.year}</span>
          </h1>
        ))}
      </section>
    </main>
  );
}
