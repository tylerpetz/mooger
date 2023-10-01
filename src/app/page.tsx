'use client';

import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react';

export interface Film {
  title: string
  year: string
  thumbnail: string
  slug: string
  video: string
  poster: string
}

export default function HomePage() {
  const films: Film[] = useMemo(() => ([
    {
      title: 'Horsing Around',
      slug: 'horsing-around',
      year: '2021',
      thumbnail: 'https://creepyparty.com/cdn/shop/products/p20-tuya_560x560.jpg',
      video: '',
      poster: 'https://creepyparty.com/cdn/shop/products/p20-tuya_560x560.jpg'
    },
    {
      title: 'Gangsters Paradise',
      slug: 'gangsters-paradise',
      year: '2022',
      thumbnail: 'https://media.gettyimages.com/id/125145388/photo/1940s-black-gangster.jpg?s=612x612&w=gi&k=20&c=uevS8wbmxrCxuY16TpKlSs8EoLJW5ooXGMQzW0fNZCA=',
      video: '',
      poster: 'https://media.gettyimages.com/id/125145388/photo/1940s-black-gangster.jpg?s=612x612&w=gi&k=20&c=uevS8wbmxrCxuY16TpKlSs8EoLJW5ooXGMQzW0fNZCA=',
    },
    {
      title: 'Soulmatoes',
      slug: 'soulmatoes',
      year: '2023',
      thumbnail: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg',
      video: '',
      poster: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg',
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
      <section className='relative flex min-h-screen flex-col items-start justify-end p-12 text-center space-y-8 bg-cover bg-center' style={{
        backgroundImage: `url(${selectedFilm.thumbnail})`
      }}>
        {films.map((film) => (
          <h1 className="text-white text-6xl relative" key={film.title} onMouseOver={() => handleMouseOver(film)} onFocus={() => handleMouseOver(film)}>
            <Link href={`/${film.slug}`}>{film.title}<span className="text-sm relative -top-6 pl-4">{film.year}</span></Link>
          </h1>
        ))}
      </section>
    </main>
  );
}
