import Link from "next/link";
import { Montadora } from "../../page";
import ButtonRemover from "../../buttonRemover";

interface ModeloProps {
    params: Promise<{id: number}>;
}

interface Modelo {
    id: number;
    nome: string;
    montadora: Montadora
}

const ModelosPage = async ({params}: ModeloProps) => {
    const {id} = await params;

    const queryModelos = `
        query {
            modelos(idMontadora: ${id}) {
                id
                nome
                montadora {
                    nome
                }
            }
        }
    `

    const response = await fetch('http://localhost:4000/graphql',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({query: queryModelos}),
    });

    let jsonResponse = await response.json();
    const modelos: Modelo[] = jsonResponse.data.modelos;
    let montadora
    if(modelos.length > 0){
        montadora = modelos[0].montadora;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            
            <a href= {`/montadoras/${id}/modelos/add`} className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Novo modelo
            </a>
                {modelos.length > 0 ?
                <div>
                <h1 className="text-3xl font-bold mb-4 text-white">Modelos da Montadora {montadora!.nome}</h1>
                <ul className="bg-gray-700 shadow-md rounded-lg p-6 w-full max-w-md">
                    {modelos.map((modelo) => (
                        <div key={modelo.id} className="bg-gray-600 shadow-md rounded-lg p-4 m-2 w-48 h-48 flex flex-col items-center justify-center text-white">
                            <h2 className="text-xl font-bold mb-2">{modelo.nome} <span className="text-gray-400">#{modelo.id}</span></h2>
                            <ButtonRemover id={modelo.id} tipo="modelo"/>
                        </div>
                    ))}
                </ul>
                </div>
                : <h2>nenhum modelo encontrado!</h2>
                }
                
        </div>
    );
};

export default ModelosPage;