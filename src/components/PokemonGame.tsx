import { useEffect, useState } from "react"
import axios from "axios"

const MAX_POKEMON_ID = 151

function PokemonGame() {
  const [pokemonName, setPokemonName] = useState("")
  const [guess, setGuess] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [revealed, setRevealed] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [score, setScore] = useState(0) // Contador de puntos
  const [attempts, setAttempts] = useState(0) // Contador de intentos

  // Función para obtener un Pokémon aleatorio
  const fetchPokemon = async () => {
    const id = Math.floor(Math.random() * MAX_POKEMON_ID) + 1
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const name = res.data.name
      const image = res.data.sprites.other["official-artwork"].front_default
      setPokemonName(name)
      setImageUrl(image)
      setGuess("")
      setRevealed(false)
      setFeedback("")
      setAttempts((prevAttempts) => prevAttempts + 1) // Incrementa los intentos
    } catch (error) {
      console.error("Error fetching Pokémon:", error)
    }
  }

  useEffect(() => {
    fetchPokemon() // Inicializa con un Pokémon aleatorio al cargar el componente
  }, [])

  // Función para manejar la adivinanza del usuario
  const handleGuess = () => {
    if (guess.trim().toLowerCase() === pokemonName.toLowerCase()) {
      setRevealed(true)
      setFeedback("¡Correcto! Es " + pokemonName + " 🎉")
      setScore((prevScore) => prevScore + 1) // Incrementa el puntaje si el usuario acierta
    } else {
      setFeedback("¡Incorrecto! Intenta de nuevo.")
    }
  }

  return (
    <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg max-w-md w-full">
      <h1 className="text-3xl font-bold mb-4 text-white">¿Quién es este Pokémon?</h1>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="pokemon silhouette"
          className={`mx-auto mb-4 h-64 transition-all duration-500 ${
            revealed ? "brightness-100" : "brightness-0"
          }`}
        />
      )}
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Escribe el nombre..."
        className="px-4 py-2 rounded text-black w-full mb-2"
      />
      <button
        onClick={handleGuess}
        className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded font-semibold w-full"
      >
        ¡Adivinar!
      </button>
      {feedback && <p className="mt-4 text-lg text-white">{feedback}</p>}
      <button
        onClick={fetchPokemon}
        className="mt-6 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
      >
        Nuevo Pokémon
      </button>

      {/* Mostrar el puntaje y los intentos */}
      <div className="mt-4 text-white">
        <p><strong>Puntaje:</strong> {score}</p>
        <p><strong>Intentos:</strong> {attempts}</p>
      </div>
    </div>
  )
}

export default PokemonGame