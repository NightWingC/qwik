import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number;
    size?: number;
    backImage: boolean;
    isVisible?: boolean;
}

export const PokemonImage = component$(( { backImage = false, id, isVisible, size = 200  } : Props ) => {

    const imageLoader = useSignal( false );
    useTask$(({ track }) => {
        track( () => id );
        imageLoader.value = false;
    });
    
    const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`; 
    
    if ( backImage ) `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${ id }.png` ;

    
    return (
        <div 
            class="flex justify-center items-center"
            style={{ width: `${ size }px`, height: `${ size}px` }}    
        >
            { !imageLoader.value && ( <span>Cargando...</span> ) }
            <img 
                src={ urlImage } 
                alt="pokemon sprite" 
                // style={{ width: `${ size }px` }}
                width={ size } 
                height={ size }
                onLoad$={ () => imageLoader.value = true }
                class={[{
                    'hidden' : !imageLoader.value,
                    'brightness-0': isVisible,
                }, 'transition-all']}
            /> 
        </div>
    )
})
