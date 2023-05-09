import { useState, useCallback } from 'react';
import userService from '../services/userService';

const usePost = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [post, setPost] = useState(null);

	const sendPost = useCallback(async (postData) => {
		setLoading(true);
		setError(null);
		try {
			const response = await userService.sendPosts(postData);
			console.log("fromUsePost",response);
			setLoading(false);
			setPost(response.data);
			return { data: response.data };
		} catch (error) {
			setLoading(false);
			setError(error.message);
			return { error: error.message };
		}
	}, []);

	const deletePost = useCallback(async (id) => {
		setLoading(true);
		setError(null);
		try {
			const response = await userService.deletePost(id);
			setLoading(false);
			return { data: response.data };
		} catch (error) {
			setLoading(false);
			setError(error.message);
			return { error: error.message };
		}
	}, []);
	
	return { sendPost, deletePost, loading, error, post };
};

export default usePost;