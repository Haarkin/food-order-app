import useHttp from "../hooks/useHttp"
import Error from "./Error"
import Mealitem from "./Mealitem"

const requestConfig = {}

export default function Meals() {
    const { data: loadedMeals, isLoadingState, error } = useHttp('http://localhost:3000/meals', requestConfig, [])

    if (isLoadingState) {
        return <p className="center">Fetching meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals." message={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <Mealitem key={meal.id} meal={meal} />
            ))}
        </ul>)
}