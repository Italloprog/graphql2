// "use client"
// import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonRemover from "./buttonRemover";

export interface Montadora {
    id: number;
    nome: string;
    pais: string;
    ano_fundacao: number;
    modelos: string[];
}

export default async function Montadora() {

    const queryADC = `
        query{
            montadoras {
                id
                nome
                pais
                ano_fundacao
                modelos{
                    nome
                }
            }
        }
    `


    const response = await fetch('http://localhost:4000/graphql',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({query: queryADC}),
        }
    );

    if (!response.ok) {
        throw new Error('Erro ao solicitar montadoras');
    }
    
    let jsonResponse = await response.json();
    let montadoras: Montadora[] =  jsonResponse.data.montadoras;

    return (
        <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                  className="dark:invert"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={180}
                  height={38}
                  priority
                />

                <h1>Lista de Montadoras</h1>

                <Link href="/montadoras/add" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Nova Montadora
                </Link>

                <ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {montadoras.map(montadora => (
                            <li key={montadora.id} className="border rounded-lg p-4 shadow-md">
                                <h2 className="text-xl font-bold mb-2">{montadora.nome} <span className="text-gray-300">#{montadora.id}</span></h2>
                                <p className="text-gray-200">País: {montadora.pais}</p>
                                <p className="text-gray-200">Ano de Fundação: {montadora.ano_fundacao}</p>
                                {(montadora.modelos.length > 0 
                                    && (
                                        <Link href={`/montadoras/${montadora.id}/modelos`} className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
                                            Ver Modelos
                                        </Link>)) 
                                    || (
                                        <span className="text-gray-400 mt-4 inline-block">Sem modelos cadastrados</span>)
                                }
                                <br />
                                <a href= {`/montadoras/${montadora.id}/modelos/add`} className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Novo modelo
                                </a>
                                <ButtonRemover id = {montadora.id} tipo="montadora"/> 
                            </li>
                        ))}
                    </div>
                </ul>    
                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                    <p>Montadoras</p>
                </footer>
      
        </div>
    )
}//obs: tela n atualiza ao remover montadora pois estamos usando um server component, para atualizar interativamente, seria necessario
// transformar em client component e utilizar o useState para criar setState e passar como parametro para função utilizar e atualizar a tela.
// ou utilizando useEfect tbm.