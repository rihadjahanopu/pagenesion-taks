import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Trip {
	id: number;
	destination: string;
	tripType: string;
	location: string;
	photos: string[];
}

export const useTrip = (query: Record<string, unknown>) => {
	const page = query.page ? query.page : 1;
	const limit = query.limit ? query.limit : 10;

	return useQuery({
		queryKey: ["trip", { page, limit, query }],
		queryFn: async () => {
			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/v1/trips`,
				{
					params: {
						page,
						limit,
						searchTerm: query.q,
					},
				}
			);
			return res.data;
		},
	});
};
