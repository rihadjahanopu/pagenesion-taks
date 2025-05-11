import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useTrip, type Trip } from "../hooks/useTrip";

export const Route = createFileRoute("/trips")({
	component: RouteComponent,
});

function RouteComponent() {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const screchTram = useDebounce(search, 500);
	const navigate = useNavigate({ from: Route.fullPath });
	const query = Route.useSearch();
	const { data: tripData } = useTrip(query);

	useEffect(() => {
		navigate({ search: (prev) => ({ ...prev, q: screchTram }) });
	}, [screchTram, navigate]);
	useEffect(() => {
		navigate({ search: (prev) => ({ ...prev, page }) });
	}, [page, navigate]);

	const handleNextPage = () => setPage((prev) => prev + 1);
	const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

	return (
		<div>
			<div className='p-2 flex justify-center'>
				<input
					onChange={(e) => setSearch(e.target.value)}
					value={search}
					type='text'
					className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Enter your text here'
				/>
			</div>
			<div className='p-2 grid grid-cols-5 gap-2 text-center border-gray-200'>
				{tripData?.data.map((trip: Trip) => (
					<div
						key={trip.id}
						className='p-2 border border-gray-200 rounded-md shadow-sm'>
						<img
							src={trip.photos[0]}
							className='w-full h-32 object-cover rounded-md mb-4'
							alt={trip.destination}
						/>
						<h1 className='text-2xl'>{trip.destination}</h1>
						<p>{trip.tripType}</p>
						<p>{trip.location}</p>
					</div>
				))}
			</div>
			<div className='flex justify-center gap-4 mt-4'>
				<button
					className='bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
					onClick={handlePreviousPage}
					disabled={page === 1}>
					Previous
				</button>
				<button
					className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
					onClick={handleNextPage}>
					Next
				</button>
			</div>
		</div>
	);
}
