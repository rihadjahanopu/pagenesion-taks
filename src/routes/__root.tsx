import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className='p-2 container mx-auto'>
				<div className='p-2 flex gap-7 w-full'>
					<Link
						to='/'
						className='[&.active]:font-bold'>
						Home
					</Link>{" "}
					<Link
						to='/about'
						className='[&.active]:font-bold'>
						About
					</Link>{" "}
					<Link
						to='/trips'
						className='[&.active]:font-bold'>
						Trips
					</Link>
				</div>
				<Outlet />
				<TanStackRouterDevtools />
			</div>
		</>
	),
});
