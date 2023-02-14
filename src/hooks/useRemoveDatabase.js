import { useRef, useState } from "react";
import { ref, child, remove } from "firebase/database";
import { db } from "../services/database";

const useRemoveDatabase = () => {
	const [isLoading, setIsLoading] = useState(false)
	const error = useRef(null)
	const success = useRef(null)

	const removeValue = async (path) => {
		setIsLoading(true)
		try {
			const rootReference = ref(db)
			const dbPath = child(rootReference, path)
			await remove(dbPath)
			success.current = true
		} catch (updateEror) {
			error.current = updateEror.message
		}
		setIsLoading(false)
	}

	return {
		isLoading,
		error: error.current,
		success: success.current,
		removeValue,
	}
}

export default useRemoveDatabase