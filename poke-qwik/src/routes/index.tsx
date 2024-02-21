import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from '../components/pokemons/pokemon-image';

export default component$(() => {

  const pokemonId = useSignal<number>( 1 ); // primitivos, booleans, strings
  const showBackImage = useSignal<boolean>( false );
  const visiblePokemon = useSignal<boolean>( true );

  // const pokemonId2 = useStore(); // arrays, objects

  const changePokemonId = $(( value: number ) => {
    if( ( pokemonId.value + value ) <= 0 ) return;
    pokemonId.value += value;
  })

  return (
    <>
      <span class='text-2xl'>Buscador simple</span>
      <span class='text-9xl'>{ pokemonId }</span>
      <PokemonImage 
        backImage={ showBackImage.value }
        id={ pokemonId.value } 
        size={ 200 }
        isVisible={ visiblePokemon.value }
      />
      <div class='mt-2'>
        <button onClick$={ () => changePokemonId( -1 ) } class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={ () => changePokemonId( +1 ) } class='btn btn-primary mr-2'>Siguiente</button>
        <button onClick$={ () => showBackImage.value = !showBackImage.value } class='btn btn-primary mr-2'>Voltear</button>
        <button onClick$={ () => visiblePokemon.value = !visiblePokemon.value } class='btn btn-primary mr-2'>Revelar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Primera aplicacion con Qwik",
    },
  ],
};
