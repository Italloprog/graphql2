"use client"

export default async function ButtonRemover({id,tipo}: {id: number, tipo: string}){

    async function removerMontadora(){
        let mutationRMV = ``;

        if (tipo == 'montadora'){
            mutationRMV = `
        mutation{
            deletarMontadora (id: ${id}){
                id
            }
        }
        `
        }else if (tipo == 'modelo'){
            mutationRMV = `
        mutation{
            deletarModelos (id: ${id}){
                id
            }
        }
        `
        }
         
        const response = await fetch('http://localhost:4000/graphql',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({query: mutationRMV}),
        });

        if (!response.ok) {
            throw new Error('Erro ao apagar montadoras');
        }
    }
    
    return (
        <button onClick = {removerMontadora}>Remover</button>
    )
}