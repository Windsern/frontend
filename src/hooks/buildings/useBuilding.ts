import {useDispatch, useSelector} from 'react-redux';
import {
	updateBuilding
} from "../../store/buildings/buildingSlice";
import {api} from "../../utils/api";

export function useBuilding() {
	const building = useSelector(state => state.building.building);

	const dispatch = useDispatch()

	const setBuilding = (value) => {
		dispatch(updateBuilding(value))
	}

	const fetchBuilding = async (id) => {

		const {data} = await api.get(`buildings/${id}`);

		setBuilding(data)

	};

	return {
		building,
		setBuilding,
		fetchBuilding
	};
}