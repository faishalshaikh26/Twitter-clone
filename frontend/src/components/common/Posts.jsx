import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import {useQuery} from '@tanstack/react-query'
import { useEffect } from "react";

const Posts = ({feedType}) => {
	//const isLoading = false;

	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return "api/posts/all"
			case "following":
				return "api/posts/following"
			default:
				return "api/posts/all"
		}
	}

	const POST_ENDPOINT = 	getPostEndpoint()

	const {
		data: posts , 
		isLoading ,
		refetch , 
		isRefetching
	} = useQuery({
		queryKey: ['posts', feedType],
		queryFn: async() => {
			if (!POST_ENDPOINT) return []; // ✅ Ensure valid endpoint
			try {
				const res = await fetch(POST_ENDPOINT)
				// If response is not JSON, throw an error
				const contentType = res.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					throw new Error("Received non-JSON response");
				}

				const data = await res.json();

				if(!res.ok){
					throw new Error(data.error || "Something went wrong")
				}

				return data || [];

			} catch (error) {
				console.error(error);
				return []; // ✅ Return an empty array instead of undefined
			}
		}
	})

	useEffect(()=>{
		refetch()
	}, [feedType , refetch])

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;