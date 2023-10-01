'use client';

import type { NextPage } from "next";

export interface Film {
  title: string
  year: string
  thumbnail: string
  slug: string
  video: string
  poster: string
}

const films = [
  {
    title: 'Horsing Around',
    slug: 'horsing-around',
    year: '2021',
    thumbnail: 'https://creepyparty.com/cdn/shop/products/p20-tuya_560x560.jpg',
    video: 'https://www.youtube.com/embed/NxDXjoCEJkM',
    poster: 'https://creepyparty.com/cdn/shop/products/p20-tuya_560x560.jpg',
    roles: [{
      position: 'Music By',
      name: 'Mary Kerr'
    }, {
      position: 'Edited By',
      name: 'Andrew Pichot'
    }, {
      position: 'Cinematography By',
      name: 'Isabella Michel'
    }]
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
]

export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())

  return films.map((film) => ({
    slug: film.slug
  }))
}

export interface FilmPageProps {
  params: Film;
}

const FilmPage: NextPage<FilmPageProps> = ({ params }) => {
  const { slug } = params
  const film = films.find(film => film.slug === slug) || null
  // ...
  return film && (
    <main>
      <section className='relative flex h-[500px] flex-col items-start justify-end p-12 text-center space-y-8 bg-cover bg-[center_top_-16rem]' style={{
        backgroundImage: `url(${film.thumbnail})`
      }}>

      </section>
      <section className="px-96 py-48">
        <h1 className="text-6xl relative mb-12">
          {film.title}<span className="text-sm relative -top-6 pl-4">{film.year}</span>
        </h1>
        <div className={`grid grid-cols-${film.roles?.length} gap-16 grid-rows-none`}>
          {film.roles && film.roles.map(role => (
            <div key={role.name}>
              <h2 className="text-4xl">{role.name}</h2>
              <h3 className="text-lg">{role.position}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="px-96 pb-48">
        <iframe className="w-full aspect-video" src={film.video} />
      </section>
      <section className="px-96 pb-48 flex items-center justify-center">
        <img src={film.poster} alt={film.title} />
      </section>
    </main>
  )
}

export default FilmPage;