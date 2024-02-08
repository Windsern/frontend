import {useDispatch, useSelector} from 'react-redux';
import {
	updateBuilding,
	updateName,
	updateDescription,
	updateFloors,
	updateImage, updateYear
} from "../../store/buildings/buildingSlice";
import {api} from "../../utils/api";

export function useBuilding() {
	const building = useSelector(state => state.building.building);

	const dispatch = useDispatch()

	const setBuilding = (value) => {
		dispatch(updateBuilding(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setFloors = (value) => {
		dispatch(updateFloors(value))
	}

	const setYear = (value) => {
		dispatch(updateYear(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchBuilding = async (id) => {

		const {data} = await api.get(`buildings/${id}`);

		setBuilding(data)

	};

	return {
		building,
		setBuilding,
		fetchBuilding,
		setName,
		setDescription,
		setFloors,
		setYear,
		setImage
	};
}