import React from 'react'

type Props = {}

const Hero = (props: Props) => {
    return (
        <section
            className="relative max-h-[600px] bg-[url(../public/theaterroom.jpg)] bg-cover bg-center bg-no-repeat text-white"
        >
            <div
                className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Conheça nossas incríveis

                        <strong className="block font-extrabold text-blue-700"> salas especiais. </strong>
                    </h1>

                    <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                        Salas modernas equipadas com telas e sistemas de áudio de ultima geração, perfeitos para garantir uma experiência inequecível.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 justify-center text-center">
                        <a
                            href="#"
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                        >
                            CONHEÇA MAIS
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero